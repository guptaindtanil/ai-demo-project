// server.js
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const demoRoutes = require('./routes/route');

// Middleware
app.use(express.json());

// Routes
app.use('/api/demo', demoRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
