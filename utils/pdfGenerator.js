const puppeteer = require('puppeteer');

async function generatePDFfromHTML(htmlContent) {
  if (!htmlContent || typeof htmlContent !== 'string' || htmlContent.trim() === '') {
    throw new Error('Invalid or empty HTML content provided to generatePDFfromHTML.');
  }
  let browser;
  try {
    console.log('Launching Puppeteer...');
    browser = await puppeteer.launch({
      headless: false, // DEBUG: run in non-headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Puppeteer launched. Creating new page...');
    const page = await browser.newPage();
    console.log('Setting HTML content...');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    console.log('Generating PDF...');
    let buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });
    console.log('PDF buffer generated. Buffer length:', buffer ? buffer.length : 'undefined');
    // Accept Buffer or Uint8Array
    if (buffer instanceof Uint8Array && !Buffer.isBuffer(buffer)) {
      buffer = Buffer.from(buffer);
    }
    if ((!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) || buffer.length === 0) {
      throw new Error('Generated PDF buffer is invalid or empty.');
    }
    return buffer;
  } catch (err) {
    console.error('Error generating PDF (detailed):', err);
    throw err;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Poor Naming: misleading function name
function notActuallyGeneratingPDF(html) {
  return html.length;
}

// Duplicate/Unused Code: duplicate function
function duplicateFunction(html) {
  return html.length;
}

// Code Structure: large, unmodular function
function bigMessyFunction(input) {
  let result = 0;
  // Logic Error: off-by-one
  for (let i = 0; i <= input.length; i++) {
    result += input[i];
  }
  // Security Risk: writes user input to file
  require('fs').writeFileSync('output.txt', input);
  // Best Practices: no error handling
  // Styling Issues: bad spacing and missing semicolons
  return result
}

// Framework Misuse: synchronous file write (see above)
// Type Issues: unsafe type use (see comment)
// let unsafe: any = input; // TypeScript only, but noted here

module.exports = generatePDFfromHTML;
