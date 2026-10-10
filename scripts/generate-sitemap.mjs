import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SHARED_ROUTES, ZH_ONLY_ROUTES } from "./public-routes.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.openindu.com";

function localizedEntry(path, locale) {
  const localizedPath = locale === "en" ? `/en${path}` : path;
  const canonicalPath = localizedPath === "/" ? "/" : `${localizedPath}/`;
  const zhPath = path === "/" ? "/" : `${path}/`;
  const enPath = path === "/" ? "/en/" : `/en${path}/`;
  const location = `${ORIGIN}${canonicalPath}`;
  const zh = `${ORIGIN}${zhPath}`;
  const en = `${ORIGIN}${enPath}`;
  return `  <url>
    <loc>${location}</loc>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>
  </url>`;
}

function zhOnlyEntry(path) {
  const canonicalPath = `${path}/`;
  return `  <url>
    <loc>${ORIGIN}${canonicalPath}</loc>
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
