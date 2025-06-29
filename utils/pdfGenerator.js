const puppeteer = require('puppeteer');

/**
 * Generates a PDF buffer from the provided HTML content using Puppeteer.
 *
 * @async
 * @function generatePDFfromHTML
 * @param {string} htmlContent - The HTML content to convert into a PDF. Must be a non-empty string.
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer containing the generated PDF data.
 * @throws {Error} Throws an error if the HTML content is invalid, or if PDF generation fails.
 */
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

module.exports = generatePDFfromHTML;
