#!/usr/bin/env node
// DESC: Run react-snap's prerender using the Chrome the project already has

/**
 * react-snap bundles puppeteer 1.20, whose postinstall would download a 2019
 * Chromium. That build script is disabled on purpose (see
 * pnpm.ignoredBuiltDependencies in package.json), so react-snap has no browser
 * and `pnpm run build` dies at postbuild with "Chromium revision is not
 * downloaded". That takes out build, deploy and generate-pdf on any clean
 * install.
 *
 * puppeteer 1.20 honours PUPPETEER_EXECUTABLE_PATH, so pointing it at the
 * modern puppeteer's Chrome fixes it without downloading a second browser and
 * without a machine-specific path in the repo. CI already exports the variable
 * itself, and that value wins.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function resolveChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return { source: 'PUPPETEER_EXECUTABLE_PATH', executable: process.env.PUPPETEER_EXECUTABLE_PATH };
  }
  try {
    const executable = require('puppeteer').executablePath();
    return { source: 'puppeteer', executable };
  } catch (err) {
    return { source: null, executable: null, error: err.message };
  }
}

const { source, executable, error } = resolveChrome();

if (!executable || !fs.existsSync(executable)) {
  console.error('prerender: no Chrome available for react-snap.');
  console.error(executable
    ? `  ${source} points at ${executable}, which does not exist`
    : `  could not resolve one from puppeteer: ${error}`);
  console.error('  install one with "npx puppeteer browsers install chrome",');
  console.error('  or set PUPPETEER_EXECUTABLE_PATH to an existing binary.');
  process.exit(1);
}

console.log(`🖨️  Prerendering with Chrome from ${source}`);

const bin = path.join(__dirname, '..', 'node_modules', '.bin', 'react-snap');
const result = spawnSync(bin, [], {
  stdio: 'inherit',
  env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: executable },
});

if (result.error) {
  console.error(`prerender: could not run ${bin}: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
