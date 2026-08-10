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

  const { render, cleanup } = await loadRenderer();
  try {
    const markup = render();
    // An empty render would ship a blank page that still returns 200.
    if (!markup || !markup.trim()) {
      throw new Error('the app rendered nothing; refusing to overwrite build/index.html');
    }

    fs.writeFileSync(buildIndex, html.replace(EMPTY_ROOT, `<div id="root">${markup}</div>`));
    console.log(`✅ Prerendered ${(markup.length / 1024).toFixed(1)} KB into build/index.html`);
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
