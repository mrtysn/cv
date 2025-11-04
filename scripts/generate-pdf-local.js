#!/usr/bin/env node

const generatePDF = require('./pdf-generator');

// Generate PDF from localhost (assumes dev server is running)
if (require.main === module) {
  console.log('⚠️  Make sure your dev server is running at http://localhost:3000/cv');
  console.log('💡 Run `pnpm run start` in another terminal if not already running');

  // Parse scale argument from command line
  const args = process.argv.slice(2);
  const scaleArg = args.find(arg => arg.startsWith('--scale='));
  const scale = scaleArg ? parseFloat(scaleArg.split('=')[1]) : 1.0;

  if (scaleArg && (isNaN(scale) || scale < 0.1 || scale > 2.0)) {
    console.error('❌ Scale must be between 0.1 and 2.0');
    console.log('💡 Example: pnpm run generate-pdf-local --scale=0.95');
    process.exit(1);
  }

  if (scale !== 1.0) {
    console.log(`📐 Using custom scale: ${scale} (default: 1.0)`);
    console.log('💡 Lower values = smaller content, higher values = larger content\n');
  } else {
    console.log('💡 Use --scale=0.95 to reduce content size and avoid page breaks\n');
  }

  generatePDF({ pageUrl: 'http://localhost:3000/cv', scale })
    .then(({ filename, version }) => {
      console.log(`\n🎉 PDF Generation Complete!`);
      console.log(`📁 File: ${filename}`);
      console.log(`🏷️  Version: ${version}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = generatePDF;
