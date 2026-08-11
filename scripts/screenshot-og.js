#!/usr/bin/env node
// DESC: Capture a 1.91:1 still of the built site, for link-preview cards

/**
 * LinkedIn's Featured section, and every other unfurler, wants a landscape
 * image. Given a link with no og:image, LinkedIn renders its own thumbnail once
 * and then caches it, so the card keeps showing whatever the CV looked like the
 * day it was added. Uploading a still captured from the build in hand replaces
 * that stale render and puts the choice of framing here rather than in a
 * crawler.
 *
 * Same serve-the-build approach as the PDF and the preview GIF: the deployed
 * site is a manual push behind the working tree, so capturing the live URL
 * would show the previous version.
 *
 * Tunable through the environment; the defaults suit a LinkedIn Featured card.
 *   OG_WIDTH   viewport width in CSS px                (default 1200)
 *   OG_HEIGHT  viewport height in CSS px, 1.91:1       (default 630)
 *   OG_SCALE   device pixel ratio of the capture       (default 2)
 *   OG_ZOOM    page zoom, raise to enlarge the text    (default 1)
 *   OG_HIDE    selector to hide, "" to keep everything (default .hideFromPrint)
 *   OG_OUT     output path                             (default ./cv-og.png)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { serveBuild } = require('./serve-build');

const ROOT = path.join(__dirname, '..');
const WIDTH = Number(process.env.OG_WIDTH || 1200);
const HEIGHT = Number(process.env.OG_HEIGHT || 630);
const SCALE = Number(process.env.OG_SCALE || 2);
const ZOOM = Number(process.env.OG_ZOOM || 1);
/**
 * The interactive chrome only, not all of .hideFromPrint — the hidden dividers
 * in that class carry the page's top spacing, and dropping them jams the name
 * against the top edge of the frame.
 */
const HIDE = process.env.OG_HIDE === undefined ? '.controlStrip, .sectionToggle' : process.env.OG_HIDE;
const OUT = path.resolve(process.env.OG_OUT || path.join(ROOT, 'cv-og.png'));

async function capture() {
  const server = await serveBuild({ root: ROOT });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE });
    await page.goto(server.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });
    if (ZOOM !== 1) {
      await page.evaluate((z) => { document.body.style.zoom = String(z); }, ZOOM);
    }
    if (HIDE) {
      await page.evaluate((sel) => {
        const style = document.createElement('style');
        style.textContent = `${sel} { display: none !important; }`;
        document.head.appendChild(style);
      }, HIDE);
    }
    // The entrance animation fades content in; frame it after it settles.
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: OUT });
  } finally {
    await browser.close();
    await server.close();
  }
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, 'build', 'index.html'))) {
    throw new Error('no build found; run "pnpm run build" first');
  }
  await capture();
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`✅ ${path.relative(ROOT, OUT)} — ${WIDTH}x${HEIGHT} @${SCALE}x, ${kb} KB`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`❌ Screenshot failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = capture;
