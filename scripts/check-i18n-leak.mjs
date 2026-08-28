#!/usr/bin/env node
/**
 * Ground truth for the i18n complaint: load every prerendered /en/ page and
 * report CJK that is actually VISIBLE to a reader. Grepping .tsx over-counts
 * (comments, zh locale data) and under-counts (strings built at runtime).
 * Product names that are legitimately Chinese-only are allowlisted.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173';
const CJK = /[一-鿿]/;

// Text that is correct to leave in Chinese on an English page.
// The ICP filing number is a legal notice that must render in Chinese everywhere.
const ALLOW = [/^工控$/, /^自动化$/, /^工艺$/, /^简体中文$/, /^中文$/, /ICP备/];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/en', '/en/architecture', '/en/use-cases', '/en/craftsmanship', '/en/about',
     '/en/motion-control', '/en/vision', '/en/iiot-platform', '/en/resources',
     '/en/team', '/en/forum', '/en/edge-computing', '/en/infrastructure',
     '/en/motion-control/studio', '/en/vision/station'];

let total = 0;
const report = [];
for (const route of routes) {
  const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  if (!res?.ok()) { report.push([route, -1, [`HTTP ${res?.status()}`]]); continue; }

  const leaks = await page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const el = n.parentElement;
      if (!el || el.closest('script,style,noscript')) continue;
      if (!el.offsetParent && el.tagName !== 'BODY') continue; // not rendered
      const txt = n.textContent.trim();
      if (txt && /[一-鿿]/.test(txt)) out.push(txt.replace(/\s+/g, ' ').slice(0, 70));
    }
    return [...new Set(out)];
  });

  const real = leaks.filter((t) => !ALLOW.some((re) => re.test(t)));
  total += real.length;
  if (real.length) report.push([route, real.length, real]);
}

for (const [route, n, items] of report) {
  console.log(`\n${route}  —  ${n} 处中文残留`);
  items.slice(0, 12).forEach((t) => console.log(`    ${t}`));
  if (items.length > 12) console.log(`    … 另有 ${items.length - 12} 处`);
}
console.log(`\n共 ${total} 处可见中文残留，覆盖 ${report.length}/${routes.length} 个英文页面`);
await browser.close();
process.exit(total ? 1 : 0);
