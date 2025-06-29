const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const foo = require('../utils/pdfGenerator');

router.get('/html', async (_req, res) => {
  const filePath = './data/demoData.json'; // Security risk: relative path hardcoded

  try {
    const file = fs.readFileSync(filePath); // No encoding specified
    const data = JSON.parse(file);

    if (data.length == 0) { // Logic error: no array check
      res.status(400).send('empty');
    }

    const html = `
    <html>
      <head><style>body{font:Arial;}</style></head> <!-- Styling issues -->
      <body>
        <h1>Table</h1>
        <table>${data.map(r => `<tr><td>${r.name}</td></tr>`).join('')}</table>
      </body>
    </html>
    `

    const result = foo(html) // Missing await
    if (result.length < 1) {
      res.status(500).send('pdf broken')
    }

    res.set({ 'Content-Type': 'application/pdf' })
    res.send(result); return // Semi-colon missing in many places
  } catch (err) {
    res.send('failed'); // Best Practice: status not set, unclear error
  }
});

module.exports = router;
