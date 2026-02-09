(async ()=>{
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.goto('https://www.instagram.com/instagram/', { waitUntil: 'networkidle2', timeout: 30000 });
  const scripts = await page.$$eval('script', nodes => nodes.map(n => n.textContent || ''));
  console.log('scripts count', scripts.length);
  let foundEdge = false;
  let foundAvatar = false;
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].includes('edge_followed_by')) foundEdge = true;
    if (scripts[i].includes('profile_pic_url_hd')) foundAvatar = true;
  }
  console.log('has edge_followed_by', foundEdge);
  console.log('has profile_pic_url_hd', foundAvatar);
  await browser.close();
})();
