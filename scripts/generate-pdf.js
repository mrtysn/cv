#!/usr/bin/env node

const generatePDF = require('./pdf-generator');

// Generate the PDF from the local build, served over HTTP by serve-build.js.
//
// This used to fetch the deployed GitHub Pages URL, which meant the PDF
// described the previously deployed site rather than the commit being built.
// A CSS change would ship a PDF of the old site until someone deployed and
// re-ran the workflow. Building and serving locally removes that ordering
// dependency: the artifact always matches the commit that produced it.
if (require.main === module) {
  generatePDF({ useLocalBuild: true })
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