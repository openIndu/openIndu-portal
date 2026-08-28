import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SHARED_ROUTES, ZH_ONLY_ROUTES } from "./public-routes.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.openindu.com";
const LAST_MODIFIED = "2026-08-28";

function localizedEntry(path, locale) {
  const localizedPath = locale === "en" ? `/en${path}` : path;
  const location = path === "/" && locale === "en" ? `${ORIGIN}/en` : `${ORIGIN}${localizedPath}`;
  const zh = `${ORIGIN}${path}`;
  const en = path === "/" ? `${ORIGIN}/en` : `${ORIGIN}/en${path}`;
  const priority = path === "/" ? "1.0" : path === "/resources" ? "0.9" : "0.8";
  const frequency = path === "/resources" ? "daily" : "weekly";
  return `  <url>
    <loc>${location}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>
  </url>`;
}

function zhOnlyEntry(path) {
  return `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;
}

const localizedRoutes = ["/", ...SHARED_ROUTES];
const entries = [
  ...localizedRoutes.flatMap((path) => [localizedEntry(path, "zh"), localizedEntry(path, "en")]),
  ...ZH_ONLY_ROUTES.map(zhOnlyEntry),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

writeFileSync(resolve(ROOT, "public", "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${entries.length} URLs.`);

