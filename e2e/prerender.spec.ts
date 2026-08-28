import { test, expect } from "@playwright/test";

/**
 * Verifies the prerendered dist/ output, not the dev-server SPA.
 * Run with: npm run build && npm run test:prerender
 * (this spec is excluded from the default playwright.config.ts run — see
 * playwright.prerender.config.ts's header comment for why the two are
 * kept separate).
 *
 * Two harness gaps this file works around, both confirmed by hand against
 * this project's actual `vite preview` behavior (not assumed):
 *
 * 1. `vite preview`'s static resolution does not replicate nginx's
 *    `try_files $uri $uri/ /index.html` for extensionless directory
 *    paths. A bare `/en` (no trailing slash) silently falls back to the
 *    root dist/index.html (ZH) instead of dist/en/index.html -- nginx's
 *    `$uri/` step + `index index.html;` directive resolves this
 *    correctly in production (verified: `curl /en` -> zh-CN,
 *    `curl /en/` -> en, `curl /en/index.html` -> en). All navigation
 *    below uses a trailing slash to get the same file nginx would serve.
 *
 * 2. SEO.tsx recomputes canonical/hreflang from `window.location.origin`
 *    on mount (client-side), so a live post-hydration DOM check reflects
 *    *this test's* origin (http://localhost:4174), not the production
 *    domain prerender.mjs's saveHtml() bakes into the static files. The
 *    thing worth verifying -- what a non-JS crawler actually sees -- is
 *    the raw response body, so domain-sensitive assertions read
 *    `response.text()` before any hydration, not the live DOM.
 */

const SHARED = [
  "/motion-control",
  "/motion-control/studio",
  "/vision",
  "/vision/station",
  "/iiot-platform",
  "/infrastructure",
  "/resources",
];
const ZH_ONLY = ["/privacy", "/legal", "/cookies", "/legal-center"];

// Golden titles -- cross-checked against the `npm run build` prerender log
// output, not derived from the locale JSON (see i18n-test-rework-plan.md
// 1.1 on why golden values must hold their own opinion).
const TITLES: Record<string, string> = {
  "/": "openIndu Community｜工业自动化的端到端开源操作系统",
  "/en": "openIndu Community | The End-to-End Open-Source OS for Industrial Automation",
  "/motion-control": "AI+运动控制｜openIndu 智能制造",
  "/en/motion-control": "AI + Motion Control | openIndu Smart Manufacturing",
  "/motion-control/studio": "openIndu-studio 介绍｜openIndu",
  "/en/motion-control/studio": "openIndu-studio Overview | openIndu",
  "/vision": "AI+视觉｜openIndu 工业机器视觉",
  "/en/vision": "AI + Machine Vision | openIndu Industrial Machine Vision",
  "/vision/station": "openIndu-station 介绍｜openIndu",
  "/en/vision/station": "openIndu-station Overview | openIndu",
  "/iiot-platform": "工业互联网平台 IIoT｜openIndu",
  "/en/iiot-platform": "Industrial IoT Platform | openIndu",
  "/infrastructure": "AI+基础设施｜openIndu",
  "/en/infrastructure": "AI + Infrastructure | openIndu",
  "/resources": "下载中心｜openIndu",
  "/en/resources": "Downloads | openIndu",
  "/privacy": "隐私声明｜openIndu社区",
  "/legal": "法律声明｜openIndu社区",
  "/cookies": "关于 Cookies｜openIndu社区",
  "/legal-center": "法律与隐私｜openIndu社区",
};

const PRERENDERED = [...SHARED, ...ZH_ONLY, ...SHARED.map((p) => `/en${p}`), "/en", "/"];
expect(PRERENDERED.length).toBe(20);

/** vite preview needs the trailing slash to resolve <path>/index.html; nginx doesn't. */
function servePath(path: string) {
  return path === "/" ? "/" : `${path}/`;
}

test.describe("Prerendered HTML", () => {
  for (const path of PRERENDERED) {
    test(`${path} serves its own file with the right title`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      const response = await page.goto(servePath(path));
      expect(response?.status()).toBe(200);

      const html = await response!.text();
      expect(html).toContain(`<title>${TITLES[path]}</title>`);
      expect(html).toMatch(/<h1[\s>]/);

      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("EN home lang/canonical are correct in the raw response and it carries no ZH-only content", async ({ page }) => {
    const response = await page.goto(servePath("/en"));
    const html = await response!.text();

    expect(html).toContain('lang="en"');
    // Trailing slash here is real, consistent React Router behavior for the
    // index route under a non-root basename (`/en`'s location.pathname is
    // "/en/", not "/en") -- not a bug, just inconsistent with the no-slash
    // "/en" used elsewhere (sitemap.xml, robots.txt, nginx). Flagged as a
    // minor known nit, not fixed here (would mean touching routes.tsx/
    // SEO.tsx, out of scope for this batch).
    expect(html).toContain('<link rel="canonical" href="https://www.openindu.com/en/"');
    // Hero tagline is ZH-only; its presence would mean the EN build got
    // ZH content baked in (ADR C1 -- locale must resolve from the URL at
    // runtime, never get baked into the shared build).
    expect(html).not.toContain("一栈贯通");
  });

  test("ZH home raw response has lang=zh-CN and its own canonical", async ({ page }) => {
    const response = await page.goto(servePath("/"));
    const html = await response!.text();
    expect(html).toContain('lang="zh-CN"');
    expect(html).toContain('<link rel="canonical" href="https://www.openindu.com/"');
  });

  test("EN subpage raw response canonical self-references correctly", async ({ page }) => {
    const response = await page.goto(servePath("/en/motion-control"));
    const html = await response!.text();
    expect(html).toContain('<link rel="canonical" href="https://www.openindu.com/en/motion-control"');
  });

  test("ZH subpage raw response canonical self-references correctly", async ({ page }) => {
    const response = await page.goto(servePath("/motion-control"));
    const html = await response!.text();
    expect(html).toContain('<link rel="canonical" href="https://www.openindu.com/motion-control"');
  });

  test("EN/ZH raw responses carry hreflang alternates pointing back at each other", async ({ page }) => {
    const enResponse = await page.goto(servePath("/en/vision"));
    const enHtml = await enResponse!.text();
    expect(enHtml).toContain('hreflang="zh-Hans" href="https://www.openindu.com/vision"');
    expect(enHtml).toContain('hreflang="en" href="https://www.openindu.com/en/vision"');

    const zhResponse = await page.goto(servePath("/vision"));
    const zhHtml = await zhResponse!.text();
    expect(zhHtml).toContain('hreflang="zh-Hans" href="https://www.openindu.com/vision"');
    expect(zhHtml).toContain('hreflang="en" href="https://www.openindu.com/en/vision"');
  });

  test("ZH-only legal page raw response emits no hreflang alternates", async ({ page }) => {
    const response = await page.goto(servePath("/privacy"));
    const html = await response!.text();
    expect(html).not.toContain('rel="alternate"');
  });
});

test.describe("EN legal-page client-side fallback (ZhOnlyGuard)", () => {
  // Covers only the client-side fallback -- the authoritative redirect is
  // nginx's `return 302` (nginx.conf / nginx.k8s.conf), which needs the
  // real container to verify; `vite preview` has no nginx in front of it.
  for (const path of ["/en/privacy", "/en/legal", "/en/cookies", "/en/legal-center"]) {
    test(`${path} replaces to the ZH URL client-side`, async ({ page }) => {
      await page.goto(servePath(path));
      await page.waitForURL((url) => !url.pathname.startsWith("/en"));
      expect(new URL(page.url()).pathname.replace(/\/$/, "") || "/").toBe(path.replace("/en", ""));
    });
  }
});
