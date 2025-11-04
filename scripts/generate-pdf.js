#!/usr/bin/env node

const generatePDF = require('./pdf-generator');

// Generate PDF from deployed GitHub Pages URL
if (require.main === module) {
  generatePDF({ useLocalBuild: false })
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