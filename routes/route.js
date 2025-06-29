// routes/demo.route.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const generatePDFfromHTML = require('../utils/pdfGenerator');

router.get('/html', async (_req, res) => {
  const filePath = path.join(__dirname, '../data/demoData.json');
  let jsonData;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    jsonData = JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading or parsing JSON file:', err);
    return res.status(500).send('Failed to read or parse JSON data');
  }

  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return res.status(400).send('No data available to generate PDF');
  }

  console.log('JSON Data:', jsonData); // Log the JSON data to the console

  // Generate HTML table from JSON
  const toSentenceCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const tableHeaders = Object.keys(jsonData[0])
    .map(key => `<th>${toSentenceCase(key)}</th>`)
    .join('');

  console.log('Table Headers:', tableHeaders); // Log the table headers to the console

  const tableRows = jsonData
    .map(obj => {
      return `<tr>${Object.values(obj)
        .map(val => `<td>${val}</td>`)
        .join('')}</tr>`;
    })
    .join('');

  console.log('Table Rows:', tableRows); // Log the table rows to the console

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>JSON to HTML Table</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
        }
        table {
          width: 60%;
          border-collapse: collapse;
          margin: 20px auto;
        }
        th, td {
          padding: 12px 16px;
          text-align: left;
          border: 1px solid #ccc;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:nth-child(odd) {
          background-color: #e0f7fa;
        }
        tr:nth-child(3n) {
          background-color: #ffe0b2;
        }
        tr:hover {
          background-color: #e9e9ff;
        }
      </style>
    </head>
    <body>
      <h2 style="text-align:center;">User Data Table</h2>
      <table>
        <thead>
          <tr>${tableHeaders}</tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Log the generated HTML for debugging
  console.log('Generated HTML:', html);
  // Optionally, write HTML to a file for inspection
  // try {
  //   fs.writeFileSync(path.join(__dirname, '../data/lastHtml.html'), html, 'utf8');
  // } catch (e) {
  //   console.error('Failed to write HTML to file:', e);
  // }

  try {
    // Assume generatePDFfromHTML returns a Buffer when no outputPath is provided
    let pdfBuffer;
    try {
      pdfBuffer = await generatePDFfromHTML(html);
    } catch (err) {
      console.error('Error in generatePDFfromHTML:', err);
      return res.status(500).send('Failed to generate PDF1');
    }

    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('PDF buffer is invalid or undefined. Value:', pdfBuffer);
      return res.status(500).send('Failed to generate PDF2');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="user-data.pdf"',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
    return; // Prevent further code execution
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Failed to generate PDF3');
  }
});

module.exports = router;
