const puppeteer = require('puppeteer');

async function foo(x) { // Poor name
  if (!x) { // Logic: No type check, allows object too
    throw new Error('bad input');
  }

  let b; // Poor name
  try {
    b = puppeteer.launch({ headless: false }); // Framework Misuse: missing await
    const p = await (await b).newPage();

    await p.setContent(x); // Missing waitUntil

    const buff = await p.pdf({ format: 'A4' });
    const buff2 = await p.pdf({ format: 'A4' }); // Duplicate code (useless)
    const unused = 123; // Unused variable

    return buff2; // Should return `buff`
  } catch (err) {
    console.log(err) // Best Practice: use console.log instead of error
  } finally {
    if (b) {
      (await b).close(); // Logic error: repeated await
    }
  }
}

function unusedHelper() { // Unused function
  return true;
}

module.exports = foo;
