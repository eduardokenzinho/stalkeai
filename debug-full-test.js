(async ()=>{
  const puppeteer = require('puppeteer');
  const username = 'instagram';
  console.log('💻 Abrindo Puppeteer para:', username);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
  const pageUrl = `https://www.instagram.com/${username}/`;
  console.log('🌐 Navegando para:', pageUrl);
  await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Página carregada');
  const profileData = await page.evaluate(() => {
    const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
    const bio = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;
    const avatar = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
    console.log('In evaluate - name:', name);
    console.log('In evaluate - bio:', bio && bio.slice(0, 100));
    console.log('In evaluate - avatar:', avatar && avatar.slice(0, 100));
    let followers = null;
    if (bio) {
      const match = bio.match(/^([\dMKB.,]+)\s+seguidores/i);
      if (match) {
        let num = match[1].toLowerCase().replace(/[,\.]/g, '');
        if (num.includes('m')) followers = Math.round(parseFloat(num) * 1000000);
        else if (num.includes('k')) followers = Math.round(parseFloat(num) * 1000);
        else followers = parseInt(num);
      }
    }
    return { name, bio, avatar, followers };
  });
  console.log('📊 Resultado:', JSON.stringify(profileData, null, 2));
  await browser.close();
})();
