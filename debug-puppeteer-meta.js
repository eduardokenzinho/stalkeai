(async ()=>{
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.goto('https://www.instagram.com/instagram/', { waitUntil: 'networkidle2', timeout: 30000 });
  const ogDesc = await page.$eval('meta[property="og:description"]', n => n.getAttribute('content')).catch(() => null);
  const ogImage = await page.$eval('meta[property="og:image"]', n => n.getAttribute('content')).catch(() => null);
  console.log('ogDesc:', ogDesc && ogDesc.slice(0,300));
  console.log('ogImage:', ogImage);
  await browser.close();
})();
