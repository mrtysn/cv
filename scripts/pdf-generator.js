const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { serveBuild } = require('./serve-build');

/**
 * Shared PDF generation logic
 * @param {Object} options - Configuration options
 * @param {string} options.pageUrl - URL to generate PDF from
 * @param {boolean} options.useLocalBuild - Serve build/ over HTTP instead of using the deployed URL
 * @param {number} options.scale - Scale factor for PDF content (0.1-2.0, default: 1.0). Lower values reduce content size.
 * @returns {Promise<{filename: string, outputPath: string, repoPath: string, version: string}>}
 */
async function generatePDF(options = {}) {
  const { pageUrl, useLocalBuild = false, scale = 1.0 } = options;
  let browser;
  let staticServer;

  try {
    console.log('🚀 Starting PDF generation...');
    console.log('🔍 Environment:', {
      CI: process.env.CI,
      NODE_ENV: process.env.NODE_ENV,
      PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH
    });

    // Launch browser with GitHub Actions compatible options
    browser = await puppeteer.launch({
      headless: process.env.CI === 'true' ? 'new' : false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--window-size=1920,1080'
      ],
      // Let Puppeteer auto-detect Chrome (available in PATH)
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    });

    // Read version and scale from constants.js
    const constantsPath = path.join(__dirname, '..', 'src', 'constants.js');
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    const versionMatch = constantsContent.match(/CV_VERSION\s*=\s*["']([^"']+)["']/);
    const version = versionMatch ? versionMatch[1] : 'v1.0';

    // Use provided scale or read from constants.js
    const scaleMatch = constantsContent.match(/PDF_SCALE\s*=\s*([\d.]+)/);
    const configScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1.0;
    const finalScale = scale !== 1.0 ? scale : configScale; // CLI argument overrides config

    console.log(`📋 Found version: ${version}`);
    console.log(`📐 Scale factor: ${finalScale}${scale !== 1.0 ? ' (from CLI)' : ' (from config)'}`);

    // Determine URL to use.
    //
    // useLocalBuild serves build/ over HTTP rather than loading it via file://.
    // `homepage` makes every asset path absolute ("/cv/static/..."), which
    // resolves to the filesystem root under file:// and renders the page
    // unstyled. Serving it means the PDF describes the commit being built
    // rather than whatever happens to be deployed at the time.
    let url;
    if (pageUrl) {
      url = pageUrl;
    } else if (useLocalBuild) {
      staticServer = await serveBuild();
      url = staticServer.url;
      console.log(`🗂️  Serving local build at ${url}`);
    } else {
      url = 'https://mrtysn.github.io/cv/';
    }

    console.log(`🌐 Loading page: ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Debug: Check if content loaded
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    console.log(`📋 Page content length: ${bodyContent.length} characters`);
    console.log(`📋 Page title: ${await page.title()}`);

    // Wait for fonts to load using modern Puppeteer approach
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });

    // Hide print-excluded elements and center scaled content
    await page.addStyleTag({
      content: `
        .hideFromPrint {
          display: none !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
        @page {
          margin: 10px 0 10px 0;
        }
        html {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
        }
      `
    });

    // Generate filename with version
    const versionForFilename = version.replace(/\./g, '_');
    const filename = `Mert_Yasin_CV_${versionForFilename}.pdf`;

    // Output to pdfs/ directory for local versioned copies
    const pdfsDir = path.join(__dirname, '..', 'pdfs');
    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir, { recursive: true });
    }
    const outputPath = path.join(pdfsDir, filename);

    console.log(`📄 Generating PDF: ${filename}`);

    // Generate PDF with optimized settings and scale applied at PDF generation level
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      scale: finalScale  // Apply zoom/scale at PDF generation time
    });

    console.log(`✅ PDF generated successfully: ${filename}`);
    console.log(`📍 Location: ${outputPath}`);

    // Chrome fills in /Title from document.title and nothing else. Some
    // resume parsers seed the candidate-name and title fields from the PDF's
    // metadata before they look at the text, so write the rest here. The name
    // comes from the same JSON the page renders from, so it cannot drift.
    await writeMetadata(outputPath);

    // Verify file exists and get size
    const stats = fs.statSync(outputPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

    // Every path also refreshes the repo-root copy, so the PDF tracked in git
    // cannot drift depending on which script produced it. scripts/check-cv-pdf
    // and the pre-commit hook both read this file.
    const repoPath = path.join(__dirname, '..', 'Mert_Yasin_CV.pdf');
    fs.copyFileSync(outputPath, repoPath);
    console.log(`📋 Copied to: ${path.basename(repoPath)} (tracked in git)`);

    return { filename, outputPath, repoPath, version };

  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
    }
    if (staticServer) {
      await staticServer.close();
      console.log('🔒 Static server stopped');
    }
  }
}

/**
 * Fill in the PDF metadata Chrome leaves empty (author, subject, creator),
 * reading the values from src/data/header.json so they track the CV itself.
 * Rewrites the file in place; a failure here is logged, not fatal, since the
 * PDF is already valid without it.
 */
async function writeMetadata(pdfPath) {
  try {
    const { PDFDocument } = require('pdf-lib');
    const header = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'header.json'), 'utf8')
    );

    const doc = await PDFDocument.load(fs.readFileSync(pdfPath), { updateMetadata: false });
    doc.setAuthor(header.name);
    doc.setTitle(header.documentTitle || `${header.name} CV`);
    doc.setSubject(header.title ? `${header.title} — CV` : 'CV');
    doc.setCreator(header.name);

    fs.writeFileSync(pdfPath, await doc.save());
    console.log(`🏷️  Metadata written: author "${header.name}"`);
  } catch (error) {
    console.warn(`⚠️  Could not write PDF metadata: ${error.message}`);
  }
}

module.exports = generatePDF;
