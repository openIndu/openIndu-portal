/**
 * Build-time prerender script for openIndu-portal.
 *
 * After `vite build`, this script:
 * 1. Starts a local `vite preview` server
 * 2. Uses Puppeteer to render each key route to static HTML
 * 3. Saves rendered HTML to `dist/<route>/index.html`
 *
 * The static HTML files are then served by nginx via the existing
 * `try_files $uri $uri/ /index.html` fallback — no nginx config change needed.
 *
 * Prerendered HTML includes:
 *   - Page-specific <title> and <meta> tags (set by SEO.tsx useEffect)
 *   - Page-specific JSON-LD structured data (set by StructuredData.tsx useEffect)
 *   - Visible text content for non-JS crawlers (GPTBot, Claude-Web, etc.)
 *
 * Requirements: puppeteer (devDependency — installs Chromium automatically)
 */

import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const PORT = 4173; // vite preview default

/** Routes to prerender — aligned with sitemap.xml. */
const ROUTES = [
  "/",
  "/motion-control",
  "/motion-control/studio",
  "/vision",
  "/iiot-platform",
  "/infrastructure",
  "/resources",
  "/privacy",
  "/legal",
  "/cookies",
  "/legal-center",
];

// ── helpers ──────────────────────────────────────────────────────────

/** Spawn `vite preview` and resolve when the server is listening. */
function startPreviewServer() {
  return new Promise((resolvePromise, reject) => {
    const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    const timeout = setTimeout(() => {
      // Fallback — if we didn't catch the "Local:" line, assume it's up
      resolvePromise(server);
    }, 8000);

    function onData(data) {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes("Local:") || text.includes("localhost")) {
        clearTimeout(timeout);
        // Give Vite an extra moment to finish initialisation
        setTimeout(() => resolvePromise(server), 500);
      }
    }

    server.stdout.on("data", onData);
    server.stderr.on("data", onData);

    server.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/** Render a single route to static HTML. Returns the HTML string. */
async function renderRoute(browser, route) {
  const page = await browser.newPage();

  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for React useEffect hooks to fire:
    //   - SEO.tsx sets document.title + meta tags
    //   - StructuredData.tsx injects <script type="application/ld+json">
    // A small fixed delay is more robust than polling for specific titles.
    await new Promise((r) => setTimeout(r, 1500));

    // Verify that JSON-LD structured data was injected
    const hasJsonLd = await page.evaluate(() => {
      return document.head.querySelector('script[data-openindu-jsonld]') !== null;
    });
    if (!hasJsonLd) {
      console.warn(`  ⚠ JSON-LD not injected for ${route} — waiting extra 2s...`);
      await new Promise((r) => setTimeout(r, 2000));
    }

    const html = await page.content();
    return html;
  } finally {
    await page.close();
  }
}

/** Write HTML to dist/<route>/index.html, creating directories as needed.
 *  Also replaces localhost origin with the production domain so that
 *  canonical URLs, og:url, and JSON-LD url fields are correct. */
function saveHtml(route, html) {
  // Replace prerender server origin with production origin
  const prodOrigin = "https://www.openindu.com";
  const localOrigin = `http://localhost:${PORT}`;
  const fixed = html.replaceAll(localOrigin, prodOrigin);

  const segments = route.split("/").filter(Boolean);
  const outDir = segments.length === 0 ? DIST : resolve(DIST, ...segments);
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "index.html");
  writeFileSync(outPath, fixed, "utf-8");
  return outPath;
}

// ── main ─────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🔨 openIndu-portal prerender\n");

  // Dynamic import — puppeteer is a devDependency, only needed at build time
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.error(
      "❌ puppeteer is not installed. Run: npm install --save-dev puppeteer"
    );
    process.exit(1);
  }

  // 1. Start preview server
  console.log("Starting vite preview server...");
  const server = await startPreviewServer();
  console.log("✓ Preview server ready\n");

  // 2. Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let successCount = 0;
  let failCount = 0;

  try {
    // 3. Render each route
    for (const route of ROUTES) {
      try {
        process.stdout.write(`  Rendering ${route}... `);
        const html = await renderRoute(browser, route);
        const outPath = saveHtml(route, html);

        // Extract title for verification
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1] : "(no title)";
        console.log(`✓ "${title}"`);
        successCount++;
      } catch (err) {
        console.log(`✗ ${err.message}`);
        failCount++;
      }
    }
  } finally {
    await browser.close();
    server.kill("SIGTERM");

    // Cleanup: vite preview sometimes leaves orphan processes on Windows
    if (process.platform === "win32") {
      try {
        spawn("taskkill", ["/F", "/T", "/PID", String(server.pid)], {
          stdio: "ignore",
        });
      } catch {
        // best-effort cleanup
      }
    }
  }

  // 4. Summary
  console.log(
    `\n${successCount} prerendered, ${failCount} failed, ${ROUTES.length} total\n`
  );

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
