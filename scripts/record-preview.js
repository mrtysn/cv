#!/usr/bin/env node
// DESC: Record the built site scrolling, as the preview GIF the README embeds

/**
 * Replaces PabloLec/website-to-gif, which had two problems. It recorded
 * https://mrtysn.github.io/cv/ rather than the build in hand, and deploys are
 * manual, so a push-triggered recording captured whatever gh-pages happened to
 * be serving at the time — usually the previous version. And it drove Firefox
 * through Selenium inside Docker, unmaintained since May 2024, which failed on
 * a marionette crash.
 *
 * This serves build/ and drives the same Chrome that generates the PDF, so the
 * recording matches the commit that triggered it. Frames go to ffmpeg, which is
 * preinstalled on GitHub's ubuntu runners.
 *
 * Two ffmpeg passes rather than one: generating a palette from the frames and
 * then applying it produces a GIF about a third the size of letting ffmpeg pick
 * colours per frame, and this page is flat text on white so it loses nothing.
 *
 * Tunable through the environment; the defaults are what the README wants.
 *   PREVIEW_FRAMES  how many frames to capture           (default 24)
 *   PREVIEW_FPS     playback rate                        (default 10)
 *   PREVIEW_COLORS  palette size, 2-256                  (default 64)
 *   PREVIEW_WIDTH   output width in px, height follows   (default 640)
 *   PREVIEW_OUT     output path                          (default ./cv-preview.gif)
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');
const { serveBuild } = require('./serve-build');

const ROOT = path.join(__dirname, '..');
const FRAMES = Number(process.env.PREVIEW_FRAMES || 24);
const FPS = Number(process.env.PREVIEW_FPS || 10);
const COLORS = Number(process.env.PREVIEW_COLORS || 64);
const WIDTH = Number(process.env.PREVIEW_WIDTH || 640);
const OUT = path.resolve(process.env.PREVIEW_OUT || path.join(ROOT, 'cv-preview.gif'));

/** Capture width is larger than output width so the downscale sharpens text. */
const VIEWPORT = { width: 960, height: 720, deviceScaleFactor: 1 };

function ffmpeg(args, label) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
  if (r.error && r.error.code === 'ENOENT') {
    throw new Error('ffmpeg not found. CI installs it via apt in build-and-publish.yml; locally, "brew install ffmpeg".');
  }
  if (r.status !== 0) throw new Error(`ffmpeg failed during ${label} (exit ${r.status})`);
}

async function captureFrames(dir) {
  const server = await serveBuild({ root: ROOT });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(server.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });
    // Let the entrance settle so frame 1 is not mid-paint.
    await new Promise((r) => setTimeout(r, 400));

    const scrollable = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight
    );
    if (scrollable <= 0) throw new Error('page is not scrollable; nothing to record');

    for (let i = 0; i < FRAMES; i++) {
      // Ease in and out, so the scroll reads as a gesture rather than a machine
      // stepping through a page at constant speed.
      const t = i / (FRAMES - 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(scrollable * eased));
      await new Promise((r) => setTimeout(r, 90));
      await page.screenshot({ path: path.join(dir, `f-${String(i).padStart(3, '0')}.png`) });
    }
    return scrollable;
  } finally {
    await browser.close();
    await server.close();
  }
}

async function record() {
  if (!fs.existsSync(path.join(ROOT, 'build', 'index.html'))) {
    throw new Error('no build found; run "pnpm run build" first');
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-preview-'));
  const started = Date.now();
  try {
    console.log(`🎬 Recording ${FRAMES} frames at ${VIEWPORT.width}x${VIEWPORT.height}`);
    await captureFrames(dir);

    const pattern = path.join(dir, 'f-%03d.png');
    const palette = path.join(dir, 'palette.png');
    const scale = `fps=${FPS},scale=${WIDTH}:-1:flags=lanczos`;

    ffmpeg(['-framerate', String(FPS), '-i', pattern,
            '-vf', `${scale},palettegen=stats_mode=diff:max_colors=${COLORS}`, palette],
           'palette generation');

    ffmpeg(['-framerate', String(FPS), '-i', pattern, '-i', palette,
            '-lavfi', `${scale}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
            OUT],
           'encoding');

    const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
    console.log(`✅ ${path.relative(ROOT, OUT)} — ${kb} KB, ${FRAMES} frames, ${COLORS} colours, ` +
                `${((Date.now() - started) / 1000).toFixed(1)}s`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  record().catch((error) => {
    console.error(`❌ Preview recording failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = record;
