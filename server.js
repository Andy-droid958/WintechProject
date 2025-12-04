// Simple Express server for SPA routing on Render
// This ensures all routes redirect to index.html for React Router

const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Explicitly serve sitemap.xml and robots.txt before catch-all
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(__dirname, 'dist', 'sitemap.xml'), (err) => {
    if (err) {
      console.error('Error serving sitemap.xml:', err);
      res.status(500).send('Error loading sitemap');
    }
  });
});

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(__dirname, 'dist', 'robots.txt'), (err) => {
    if (err) {
      console.error('Error serving robots.txt:', err);
      res.status(500).send('Error loading robots.txt');
    }
  });
});

// Handle React Router - all other routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

