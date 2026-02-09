const express = require('express');
const cors = require('cors');
const searchProfile = require('./api/search-profile');
const proxyImage = require('./api/proxy-image');
const getProfileScrape = require('./api/get-profile-scrape');
const getInstagramPuppeteer = require('./api/get-instagram-puppeteer');

const app = express();

// Habilita CORS para requisições do React em desenvolvimento
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true
}));

console.log('🔧 Registrando rotas de API...');
app.get('/api/search-profile', (req, res) => searchProfile(req, res));
console.log('✓ Rota /api/search-profile registrada');
app.get('/api/proxy-image', (req, res) => proxyImage(req, res));
console.log('✓ Rota /api/proxy-image registrada');
app.get('/api/get-profile-scrape', (req, res) => getProfileScrape(req, res));
console.log('✓ Rota /api/get-profile-scrape registrada');
app.get('/api/get-instagram-puppeteer', (req, res) => {
  console.log('📍 GET /api/get-instagram-puppeteer chamada');
  return getInstagramPuppeteer(req, res);
});
console.log('✓ Rota /api/get-instagram-puppeteer registrada');

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

