#!/usr/bin/env node
// DESC: Serve build/ over HTTP at the app's homepage path, with no dependencies

/**
 * The built app is not loadable over file://. `homepage` in package.json makes
 * every asset path absolute ("/cv/static/..."), which resolves to the
 * filesystem root under file:// and yields an unstyled page. Anything that
 * needs to load the real build (prerendering, PDF generation) has to serve it
 * over HTTP at the same base path it will be deployed under.
 *
 * Node's http and fs only, so this adds no dependency and works in CI.
 */

const fs = require('fs');
const http = require('http');
const path = require('path');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

/** The path the app expects to be mounted at, e.g. "/cv/". */
function basePathFromPackage(root) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  if (!pkg.homepage) return '/';
  const { pathname } = new URL(pkg.homepage);
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Start a static server over the build directory.
 * @returns {Promise<{url: string, port: number, close: () => Promise<void>}>}
 */
async function serveBuild({ root, buildDir, port = 0 } = {}) {
  const repoRoot = root || path.join(__dirname, '..');
  const dir = buildDir || path.join(repoRoot, 'build');

  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    throw new Error(`no build found at ${dir}; run "pnpm run build" first`);
  }

  const basePath = basePathFromPackage(repoRoot);

  const server = http.createServer((req, res) => {
    let pathname;
    try {
      ({ pathname } = new URL(req.url, 'http://localhost'));
    } catch {
      res.writeHead(400).end('bad request');
      return;
    }

    // Strip the mount point, then resolve inside the build directory only.
    let rel = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname.slice(1);
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';

    const target = path.join(dir, path.normalize(rel));
    if (!target.startsWith(dir)) {
      res.writeHead(403).end('forbidden');
      return;
    }

    fs.readFile(target, (err, body) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(target).toLowerCase()] || 'application/octet-stream',
        'Content-Length': body.length,
        'Cache-Control': 'no-store',
      });
      res.end(body);
    });
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });

  const actualPort = server.address().port;
  return {
    url: `http://127.0.0.1:${actualPort}${basePath}`,
    port: actualPort,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

module.exports = { serveBuild, basePathFromPackage };

// Standalone: `node scripts/serve-build.js [port]` for poking at a build by hand.
if (require.main === module) {
  const port = Number(process.argv[2]) || 4173;
  serveBuild({ port })
    .then(({ url }) => console.log(`serving build/ at ${url}  (ctrl-c to stop)`))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}
