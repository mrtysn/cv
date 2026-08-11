#!/usr/bin/env node
// DESC: Prerender the built app to static HTML so crawlers get content, not an empty div

/**
 * Runs as `postbuild`. Bundles the app for node, renders it with
 * `renderToString`, and writes the result into build/index.html's #root.
 * `src/index.js` branches on `rootElement.hasChildNodes()`, so the browser
 * hydrates that markup instead of rendering from scratch.
 *
 * Why not drive a browser and capture the DOM, which is what this script and
 * react-snap before it used to do: by the time you can read `outerHTML` the
 * browser has already rewritten every inline style. `color:#2185d0` comes back
 * as `color: rgb(33, 133, 208)`, `transition: all 0.2s ease` as
 * `transition: 0.2s`, and a trailing semicolon appears. React compares the
 * markup against its own serialization, finds a difference on the first of the
 * 265 inline styles in this app, and discards the entire prerendered tree to
 * client-render instead. The captured DOM also lacks the `<!-- -->` markers
 * React uses to separate adjacent text nodes. Neither is recoverable after the
 * fact, so the markup has to come from React rather than from a DOM.
 *
 * The trade is that the app must survive being imported in node.
 * scripts/prerender-entry.js is the entry, and anything it reaches may only
 * touch `window` or `document` inside an effect, which renderToString does not
 * run. `decodeStateFromURL` carries the one guard this needed.
 *
 * Deliberately not reproducing two react-snap behaviours: HTML minification
 * (one file, served gzipped, not worth a minifier dependency) and 200.html
 * (a SPA fallback for hosts that use it; GitHub Pages uses 404.html, and there
 * is none).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const EMPTY_ROOT = '<div id="root"></div>';
const HEAD_CLOSE = '</head>';

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Social and search metadata, built from src/data/header.json so it lives in
 * the data layer with every other user-facing string rather than being typed
 * into public/index.html. Cloning the template means editing one file.
 *
 * It is written here rather than by a React effect because no unfurler runs
 * JS: LinkedIn, Slack and Twitter read the raw HTML, so anything they are
 * meant to see has to be in the file this script writes.
 *
 * og:image points at og.png beside index.html, which `predeploy` generates
 * with scripts/screenshot-og.js. The dimensions below are that script's
 * defaults; overriding OG_WIDTH or OG_HEIGHT means changing them here too.
 */
function metaTags() {
  const header = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'header.json'), 'utf8'));
  const { homepage } = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

  if (!header.description) {
    throw new Error('src/data/header.json has no "description"; social cards need one');
  }
  if (!homepage) {
    throw new Error('package.json has no "homepage"; og:url and og:image must be absolute');
  }

  const site = homepage.endsWith('/') ? homepage : `${homepage}/`;
  const title = `${header.name} CV`;
  const image = `${site}og.png`;

  const tags = [
    ['name', 'description', header.description],
    ['property', 'og:type', 'profile'],
    ['property', 'og:title', title],
    ['property', 'og:description', header.description],
    ['property', 'og:url', site],
    ['property', 'og:image', image],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', header.description],
    ['name', 'twitter:image', image],
  ]
    .map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeAttr(value)}"/>`)
    .join('');

  // public/index.html carries a placeholder title so no name is hardcoded
  // outside src/data. Users get documentTitle from Header.js's effect; a
  // crawler runs no effects, so it is written here instead.
  return { tags, documentTitle: header.documentTitle };
}

/** Bundle the app for node and hand back its render(). */
async function loadRenderer() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-prerender-'));
  const outfile = path.join(dir, 'app.cjs');

  await esbuild.build({
    entryPoints: [path.join(__dirname, 'prerender-entry.js')],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    // CRA allows JSX in .js files; stylesheets have nothing to contribute to a
    // string of markup, so they resolve to nothing rather than being parsed.
    loader: { '.js': 'jsx', '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
    absWorkingDir: ROOT,
    logLevel: 'warning',
  });

  const { render } = require(outfile);
  return { render, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

async function prerender() {
  const buildIndex = path.join(ROOT, 'build', 'index.html');
  if (!fs.existsSync(buildIndex)) {
    throw new Error(`no build at ${buildIndex}; run "pnpm run build" first`);
  }

  const html = fs.readFileSync(buildIndex, 'utf8');
  if (!html.includes(EMPTY_ROOT)) {
    throw new Error(`${EMPTY_ROOT} not found in build/index.html; already prerendered?`);
  }
  if (!html.includes(HEAD_CLOSE)) {
    throw new Error(`${HEAD_CLOSE} not found in build/index.html; cannot place meta tags`);
  }

  const { render, cleanup } = await loadRenderer();
  try {
    const markup = render();
    // An empty render would ship a blank page that still returns 200.
    if (!markup || !markup.trim()) {
      throw new Error('the app rendered nothing; refusing to overwrite build/index.html');
    }

    const { tags, documentTitle } = metaTags();
    const out = html
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(documentTitle)}</title>`)
      .replace(HEAD_CLOSE, `${tags}${HEAD_CLOSE}`)
      .replace(EMPTY_ROOT, `<div id="root">${markup}</div>`);

    if (!out.includes(`<title>${escapeAttr(documentTitle)}</title>`)) {
      throw new Error('no <title> found in build/index.html to replace');
    }

    fs.writeFileSync(buildIndex, out);
    console.log(
      `✅ Prerendered ${(markup.length / 1024).toFixed(1)} KB into build/index.html, ` +
        `plus ${(tags.match(/<meta /g) || []).length} meta tags and the title`
    );
  } finally {
    cleanup();
  }
}

if (require.main === module) {
  prerender().catch((error) => {
    console.error(`❌ Prerender failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = prerender;
