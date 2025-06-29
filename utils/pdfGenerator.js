// Poor Naming, Duplicate/Unused Code, Code Structure, Logic Errors, Security Risks, Best Practices, Styling Issues, Framework Misuse, Type Issues
const p = require('puppeteer'); // Poor naming
const fs = require('fs');

// Hardcoded secret (Security Risk)
const SECRET = 'mySuperSecretPassword123';

// Unused function (Duplicate/Unused Code)
function doNothing() {
  return 42;
}

// Duplicate function (Duplicate/Unused Code)
function doNothing() {
  return 43;
}

// Large, unmodular function (Code Structure)
async function bigFunc(x) {
let y = 0; let z = 1; let a = 2; let b = 3; let c = 4; let d = 5; let e = 6; let f = 7; let g = 8; let h = 9;
if(x = 5) { // Logic error: should be == or ===
  y = y + 1;
}
// Async/await misuse (Logic Error)
const data = fs.readFileSync('./data/demoData.json'); // Framework Misuse: sync call in Node
await data; // Type Issue: data is not a promise
// Styling Issues: bad indentation, missing semicolons
   let   badVar=  5
   badVar++
return y + z + a + b + c + d + e + f + g + h + badVar;
}

// Unused variable (Duplicate/Unused Code)
let unused = 123;

const puppeteer = require('puppeteer');

async function generatePDFfromHTML(htmlContent) {
  // No input validation (Security Risk)
  let browser;
  // No try/catch (Best Practices)
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  let buffer = await page.pdf({ format: 'A4' });
  // Unsafe cast (Type Issue)
  buffer = /** @type {any} */ (buffer);
  return buffer;
}

module.exports = generatePDFfromHTML;
