const path = require('path');
const express = require('express');
const cors = require('cors');

const searchProfile = require('./api/search-profile');
const proxyImage = require('./api/proxy-image');
const getProfileScrape = require('./api/get-profile-scrape');
const getInstagramPuppeteer = require('./api/get-instagram-puppeteer');
const getInstagramPuppeteerClean = require('./api/get-instagram-puppeteer-clean');

const app = express();

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
  : null;

app.use(cors({
  origin: corsOrigins || '*',
  credentials: false
}));

app.get('/api/search-profile', (req, res) => searchProfile(req, res));
app.get('/api/proxy-image', (req, res) => proxyImage(req, res));
app.get('/api/get-profile-scrape', (req, res) => getProfileScrape(req, res));
app.get('/api/get-instagram-puppeteer', (req, res) => getInstagramPuppeteer(req, res));
app.get('/api/get-instagram-puppeteer-clean', (req, res) => getInstagramPuppeteerClean(req, res));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
