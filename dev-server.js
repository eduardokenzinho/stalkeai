const express = require('express');
const cors = require('cors');
const searchProfile = require('./api/search-profile');
const proxyImage = require('./api/proxy-image');
const getProfileScrape = require('./api/get-profile-scrape');
const getInstagramPuppeteer = require('./api/get-instagram-puppeteer');
const fbEvent = require('./api/fb-event');
const followedPosts = require('./api/followed-posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilita CORS para requisições do React em desenvolvimento
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000', 'http://127.0.0.1:3000', 'http://127.0.0.1:4000'],
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

app.post('/api/fb-event', (req, res) => {
  console.log('📍 POST /api/fb-event chamada');
  return fbEvent(req, res);
});
console.log('✓ Rota /api/fb-event registrada');

app.all('/api/followed-posts', (req, res) => followedPosts(req, res));
console.log('Rota /api/followed-posts registrada');
app.all('/api/analisar', (req, res) => followedPosts(req, res));
console.log('Rota /api/analisar registrada');

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

