(async ()=>{
  const puppeteer = require('puppeteer');
  const username = 'instagram';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2', timeout: 20000 });
  const result = await page.evaluate(() => {
    try {
      const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
      console.log('og:title:', name);
      console.log('og:description:', ogDesc);
      console.log('og:image:', ogImage ? ogImage.slice(0, 100) : null);
      if (name || ogDesc || ogImage) {
        let followers = null;
        if (ogDesc) {
          const match = ogDesc.match(/^([\dMKB,\.]+)\s+seguidores|followers/i);
          if (match) {
            let num = match[1].toLowerCase().replace(/[,\.]/g, '');
            if (num.includes('m')) followers = Math.round(parseFloat(num) * 1000000);
            else if (num.includes('k')) followers = Math.round(parseFloat(num) * 1000);
            else followers = parseInt(num);
          }
        }
        return {
          name: name || null,
          bio: ogDesc && ogDesc.split(' — ').length > 1 ? ogDesc.split(' — ').slice(1).join(' — ') : ogDesc,
          avatar: ogImage || null,
          followers: followers,
          is_verified: null,
          is_private: null,
        };
      }
      return null;
    } catch (e) {
      console.error('error in evaluate:', e.toString());
      return null;
    }
  });
  console.log('final result:', JSON.stringify(result, null, 2));
  await browser.close();
})();
