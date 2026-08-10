#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const generatePDF = require('./pdf-generator');

/**
 * Check if dev server is already running on localhost:3000
 */
async function isServerRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000/cv', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Wait for dev server to be ready by polling
 */
async function waitForServer(maxAttempts = 60, intervalMs = 1000) {
  console.log('⏳ Waiting for dev server to be ready...');
  for (let i = 0; i < maxAttempts; i++) {
    if (await isServerRunning()) {
      console.log('✅ Dev server is ready!');
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  throw new Error('Dev server failed to start within timeout period');
}

/**
 * Start dev server and return the process
 */
function startDevServer() {
  console.log('🚀 Starting dev server...');
  const serverProcess = spawn('pnpm', ['run', 'start'], {
    stdio: 'pipe',
    detached: false
  });

  // Suppress server output unless there's an error
  let errorOutput = '';
  serverProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start dev server:', error);
  });

  return { process: serverProcess, errorOutput: () => errorOutput };
}

// Generate PDF from localhost (starts dev server automatically)
if (require.main === module) {
  (async () => {
    let serverProcess = null;
    let serverStartedByUs = false;

    try {
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
      }

      // Check if server is already running
      const alreadyRunning = await isServerRunning();

      if (alreadyRunning) {
        console.log('✅ Dev server already running at http://localhost:3000/cv');
      } else {
        // Start the dev server
        const server = startDevServer();
        serverProcess = server.process;
        serverStartedByUs = true;

        // Wait for server to be ready
        await waitForServer();
      }

      // Generate PDF
      const result = await generatePDF({ pageUrl: 'http://localhost:3000/cv', scale });

      console.log(`\n🎉 PDF Generation Complete!`);
      console.log(`📁 Versioned file: ${result.filename} (in pdfs/)`);
      console.log(`🏷️  Version: ${result.version}`);
      // The repo-root copy is written by pdf-generator.js, so every entry point
      // refreshes it identically.

      // Clean exit
      if (serverStartedByUs && serverProcess) {
        console.log('🛑 Stopping dev server...');
        serverProcess.kill('SIGTERM');
      }

      process.exit(0);

    } catch (error) {
      console.error('❌ Error:', error.message);

      // Show server error output if available
      if (serverProcess && serverStartedByUs) {
        const errorOutput = serverProcess.errorOutput ? serverProcess.errorOutput() : '';
        if (errorOutput) {
          console.error('Server error output:', errorOutput);
        }
        serverProcess.kill('SIGTERM');
      }

      process.exit(1);
    }
  })();
}

module.exports = generatePDF;
