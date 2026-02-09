(async ()=>{
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.goto('https://www.instagram.com/instagram/', { waitUntil: 'networkidle2', timeout: 30000 });
  const scripts = await page.$$eval('script', nodes => nodes.map(n => n.textContent || '').filter(Boolean));
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].includes('ProfilePage')) {
      console.log('FOUND at script index', i);
      console.log(scripts[i].slice(0, 3000));
      break;
    }
  }
  await browser.close();
})();
