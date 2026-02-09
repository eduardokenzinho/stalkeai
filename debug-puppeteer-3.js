(async ()=>{
  const puppeteer = require('puppeteer');
  const username = 'instagram';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({'accept-language':'en-US,en;q=0.9'});
  await page.evaluateOnNewDocument(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});window.chrome={runtime:{}};Object.defineProperty(navigator,'plugins',{get:()=>[1,2,3]});Object.defineProperty(navigator,'languages',{get:()=>['en-US','en']});});
  await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  try{
    const data = await page.evaluate(async (u) => {
      const resp = await fetch(`/api/v1/users/web_profile_info/?username=${u}`);
      return { ok: resp.ok, status: resp.status, text: await resp.text().catch(()=>null)};
    }, username);
    console.log('fetch result', data.ok, data.status);
    console.log(data.text && data.text.slice(0,2000));
  } catch(e) { console.error('fetch error', e); }
  await browser.close();
})();
