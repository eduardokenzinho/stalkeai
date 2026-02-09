(async ()=>{
  const puppeteer = require('puppeteer');
  const username = 'instagram';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  const scripts = await page.$$eval('script', nodes => nodes.map(n => n.textContent || ''));
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].includes('"username":"' + username + '"')) {
      console.log('FOUND script index', i);
      const idx = scripts[i].indexOf('"username":"' + username + '"');
      console.log(scripts[i].slice(Math.max(0, idx-500), idx+500));
      break;
    }
  }
  await browser.close();
})();
