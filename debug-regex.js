(async ()=>{
  const puppeteer = require('puppeteer');
  const username = 'instagram';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
  const pageUrl = `https://www.instagram.com/${username}/`;
  await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  const profileData = await page.evaluate(() => {
    const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
    const bio = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;
    const avatar = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
    
    let followers = null;
    if (bio) {
      console.log('[DEBUG] bio:', bio);
      const match = bio.match(/^([\dMKB.,]+)\s+(seguidores|Followers)/i);
      console.log('[DEBUG] match:', match);
      if (match) {
        let num = match[1].toLowerCase().replace(/[,\.]/g, '');
        console.log('[DEBUG] num after cleanup:', num);
        if (num.includes('m')) followers = Math.round(parseFloat(num) * 1000000);
        else if (num.includes('k')) followers = Math.round(parseFloat(num) * 1000);
        else followers = parseInt(num);
        console.log('[DEBUG] followers:', followers);
      }
    }
    return { name, bio, avatar, followers };
  });
  console.log('✅ Final:', JSON.stringify(profileData, null, 2));
  await browser.close();
})();
