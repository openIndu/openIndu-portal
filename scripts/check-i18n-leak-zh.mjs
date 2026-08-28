#!/usr/bin/env node
/**
 * Mirror of check-i18n-leak.mjs: find pure-English sentences left on the
 * CHINESE pages. Brand names, product names and technical acronyms are
 * legitimately English, so only multi-word prose (>= 4 English words with no
 * CJK anywhere in the string) counts as a leak.
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const routes = ['/', '/architecture', '/use-cases', '/craftsmanship', '/about',
  '/motion-control', '/vision', '/iiot-platform', '/resources', '/team',
  '/forum', '/edge-computing', '/infrastructure', '/motion-control/studio', '/vision/station'];

let total = 0;
for (const route of routes) {
  const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  if (!res?.ok()) { console.log(`${route}  HTTP ${res?.status()}`); continue; }

  const leaks = await page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const el = n.parentElement;
      if (!el || el.closest('script,style,noscript')) continue;
      if (!el.offsetParent && el.tagName !== 'BODY') continue;
      const txt = n.textContent.trim().replace(/\s+/g, ' ');
      if (!txt || /[一-鿿]/.test(txt)) continue;
      // >= 4 space-separated word-ish tokens => running English prose, not a name
      const words = txt.split(' ').filter((w) => /[A-Za-z]{2,}/.test(w));
      if (words.length >= 4) out.push(txt.slice(0, 80));
    }
    return [...new Set(out)];
  });

  total += leaks.length;
  if (leaks.length) {
    console.log(`\n${route}  —  ${leaks.length} 处英文残留`);
    leaks.slice(0, 10).forEach((t) => console.log(`    ${t}`));
    if (leaks.length > 10) console.log(`    … 另有 ${leaks.length - 10} 处`);
  }
}
console.log(`\n中文页面共 ${total} 处英文长句`);
await browser.close();
