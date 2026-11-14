// Screenshots of the site for visual checks and as video material.
// Usage: node shots.cjs [baseUrl] [outDir]
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4399';
const OUT = process.argv[3] || path.join(__dirname, 'captures');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const pages = [
  ['home', '/'],
  ['project-file', '/projects/'],
  ['coscaros', '/projects/coscaros/'],
  ['servesync', '/projects/servesync/'],
  ['warden-plus', '/projects/warden-plus/'],
  ['packmerger', '/projects/packmerger/'],
  ['multitool', '/projects/multitool/'],
  ['pwnagotchi-server', '/projects/pwnagotchi-server/'],
  ['skills', '/projects/skills/'],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'phone']]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'phone' ? 2 : 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const [name, url] of pages) {
      await page.goto(BASE + url, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')); document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')); await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))); });
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(OUT, `${name}-${tag}.png`) });
      // Grow the viewport to the full page so fixed layers (sky, rail) cover everything.
      const full = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.setViewportSize({ width: vw, height: full });
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `${name}-${tag}-full.png`) });
      await page.setViewportSize({ width: vw, height: vh });
    }
    if (errors.length) console.log(tag, 'console errors:', errors);
    await ctx.close();
  }
  await browser.close();
  console.log('done', OUT);
})();
