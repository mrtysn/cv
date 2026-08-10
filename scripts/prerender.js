#!/usr/bin/env node
// DESC: Prerender the built app to static HTML so crawlers get content, not an empty div

/**
 * Runs as `postbuild`. Serves build/ over HTTP, loads it in the same Chrome the
 * PDF generator uses, and writes the rendered DOM back over build/index.html.
 * src/index.js branches on `rootElement.hasChildNodes()`, so the prerendered
 * markup is hydrated rather than thrown away.
 *
 * This replaces react-snap, which is unmaintained and bundles puppeteer 1.20 —
 * a 2019 Chromium whose download is disabled (see pnpm.ignoredBuiltDependencies),
 * so `pnpm build` died at postbuild on any clean install. Reusing the project's
 * own puppeteer removes both the second browser and the dead dependency.
 *
 * Deliberately not reproducing two react-snap behaviours: HTML minification
 * (one file, served gzipped, not worth a minifier dependency) and 200.html
 * (a SPA fallback for hosts that use it; GitHub Pages uses 404.html, and there
 * is none).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { serveBuild } = require('./serve-build');

async function prerender() {
  const buildIndex = path.join(__dirname, '..', 'build', 'index.html');
  let server;
  let browser;

  try {
    server = await serveBuild();
    console.log(`🖨️  Prerendering ${server.url}`);

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });

    const page = await browser.newPage();

    // Surface app errors instead of silently writing a broken shell.
    const failures = [];
    page.on('pageerror', (err) => failures.push(err.message));
    page.on('requestfailed', (req) => failures.push(`${req.url()} ${req.failure()?.errorText}`));

    await page.goto(server.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });
    // src/index.js sets this ~100ms after render; waiting for it means the
    // captured DOM matches what a real visitor ends up with.
    await page
      .waitForSelector('body.app-loaded', { timeout: 5000 })
      .catch(() => console.warn('⚠️  body.app-loaded never appeared; capturing anyway'));

    const rendered = await page.evaluate(
      () => `<!DOCTYPE html>${document.documentElement.outerHTML}`
    );

    // An empty #root means the app never mounted — writing that over the build
    // would ship a blank page that still returns 200.
    const rootContent = /<div id="root">([\s\S]*?)<\/div>\s*<script/.exec(rendered);
    if (!rendered.includes('id="root"') || (rootContent && rootContent[1].trim() === '')) {
      throw new Error('app did not render into #root; refusing to overwrite build/index.html');
    }

    if (failures.length) {
      console.warn(`⚠️  ${failures.length} page error(s) during prerender:`);
      failures.slice(0, 5).forEach((f) => console.warn(`     ${f}`));
    }

    fs.writeFileSync(buildIndex, rendered);
    console.log(`✅ Prerendered ${(rendered.length / 1024).toFixed(1)} KB to build/index.html`);
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }
}

if (require.main === module) {
  prerender().catch((error) => {
    console.error(`❌ Prerender failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = prerender;
