const https = require('https');
const http = require('http');
const { URL } = require('url');

const ALLOWED_HOSTS = [
  'scontent-',
  'instagram.',
  'cdninstagram.com',
  'fbcdn.net',
  'i.pravatar.cc'
];

function isAllowedUrl(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return ALLOWED_HOSTS.some(host => parsed.hostname.includes(host));
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  if (!isAllowedUrl(url)) {
    return res.status(403).json({ error: 'Domínio não permitido' });
  }

  try {
    const imageBuffer = await new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const request = protocol.get(url, { timeout: 10000 }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          const redirectUrl = response.headers.location;
          if (!isAllowedUrl(redirectUrl)) {
            return reject(new Error('Redirect para domínio não permitido'));
          }
          const proto2 = redirectUrl.startsWith('https') ? https : http;
          proto2.get(redirectUrl, { timeout: 10000 }, (res2) => {
            const chunks = [];
            res2.on('data', chunk => chunks.push(chunk));
            res2.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res2.headers['content-type'] }));
            res2.on('error', reject);
          }).on('error', reject);
          return;
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`Status: ${response.statusCode}`));
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: response.headers['content-type'] }));
        response.on('error', reject);
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Timeout'));
      });
    });

    const base64 = imageBuffer.buffer.toString('base64');
    const contentType = imageBuffer.contentType || 'image/jpeg';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json({
      base64: `data:${contentType};base64,${base64}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
