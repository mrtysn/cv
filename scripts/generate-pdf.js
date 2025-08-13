#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  let browser;
  
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

    // Read version from constants.js
    const constantsPath = path.join(__dirname, '..', 'src', 'constants.js');
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    const versionMatch = constantsContent.match(/CV_VERSION\s*=\s*["']([^"']+)["']/);
    const version = versionMatch ? versionMatch[1] : 'v1.0';
    
    console.log(`📋 Found version: ${version}`);

    // Use GitHub Pages URL directly (already deployed and working)
    const pageUrl = 'https://mrtysn.github.io/cv/';
    
    console.log(`🌐 Loading page: ${pageUrl}`);
    await page.goto(pageUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Debug: Check if content loaded
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    console.log(`📋 Page content length: ${bodyContent.length} characters`);
    console.log(`📋 Page title: ${await page.title()}`);
    
    // Wait for fonts to load using modern Puppeteer approach
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });

    // Hide print-excluded elements
    await page.addStyleTag({
      content: `
        .hideFromPrint {
          display: none !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
      `
    });

    // Generate filename with version
    const versionForFilename = version.replace(/\./g, '_');
    const filename = `Mert_Yasin_CV_${versionForFilename}.pdf`;
    const outputPath = path.join(__dirname, '..', filename);

    console.log(`📄 Generating PDF: ${filename}`);

    // Generate PDF with optimized settings
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
      displayHeaderFooter: false
    });

    console.log(`✅ PDF generated successfully: ${filename}`);
    console.log(`📍 Location: ${outputPath}`);
    
    // Verify file exists and get size
    const stats = fs.statSync(outputPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

    return { filename, outputPath, version };

  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
    }
  }
}

// Run the generation
if (require.main === module) {
  generatePDF()
    .then(({ filename, version }) => {
      console.log(`\n🎉 PDF Generation Complete!`);
      console.log(`📁 File: ${filename}`);
      console.log(`🏷️  Version: ${version}`);
    })
    .catch(console.error);
}

module.exports = generatePDF;