const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { username } = req.query;
  if (!username || typeof username !== 'string') return res.status(400).json({ error: 'Username e obrigatorio' });
  const clean = username.trim().replace(/^@+/, '');
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) return res.status(400).json({ error: 'Username invalido' });

  const parseFollowersFromBio = (bio) => {
    if (!bio) return null;
    const match = bio.match(/^([\d.,]+)\s*([kmb])?\s*(followers|seguidores)/i);
    if (!match) return null;
    const raw = match[1];
    const suffix = match[2] ? match[2].toLowerCase() : null;

    const normalizeDecimal = (value) => {
      const str = value.replace(/\s/g, '');
      const hasDot = str.includes('.');
      const hasComma = str.includes(',');
      if (hasDot && hasComma) {
        const lastDot = str.lastIndexOf('.');
        const lastComma = str.lastIndexOf(',');
        const decimalIsDot = lastDot > lastComma;
        return decimalIsDot
          ? str.replace(/,/g, '')
          : str.replace(/\./g, '').replace(/,/g, '.');
      }
      if (hasComma && !hasDot) return str.replace(/,/g, '.');
      return str;
    };

    if (suffix) {
      const num = parseFloat(normalizeDecimal(raw));
      if (Number.isNaN(num)) return null;
      if (suffix === 'k') return Math.round(num * 1000);
      if (suffix === 'm') return Math.round(num * 1000000);
      if (suffix === 'b') return Math.round(num * 1000000000);
      return null;
    }

    const intNum = parseInt(raw.replace(/[.,\s]/g, ''), 10);
    return Number.isNaN(intNum) ? null : intNum;
  };

  const parseCountToken = (token) => {
    if (!token) return null;
    const match = token.match(/^([\d.,]+)\s*([kmb])?$/i);
    if (!match) return null;
    const raw = match[1];
    const suffix = match[2] ? match[2].toLowerCase() : null;

    const normalizeDecimal = (value) => {
      const str = value.replace(/\s/g, '');
      const hasDot = str.includes('.');
      const hasComma = str.includes(',');
      if (hasDot && hasComma) {
        const lastDot = str.lastIndexOf('.');
        const lastComma = str.lastIndexOf(',');
        const decimalIsDot = lastDot > lastComma;
        return decimalIsDot
          ? str.replace(/,/g, '')
          : str.replace(/\./g, '').replace(/,/g, '.');
      }
      if (hasComma && !hasDot) return str.replace(/,/g, '.');
      return str;
    };

    if (suffix) {
      const num = parseFloat(normalizeDecimal(raw));
      if (Number.isNaN(num)) return null;
      if (suffix === 'k') return Math.round(num * 1000);
      if (suffix === 'm') return Math.round(num * 1000000);
      if (suffix === 'b') return Math.round(num * 1000000000);
      return null;
    }

    const intNum = parseInt(raw.replace(/[.,\s]/g, ''), 10);
    return Number.isNaN(intNum) ? null : intNum;
  };

  const parseStatsFromBio = (bio) => {
    if (!bio) return { followers: null, following: null, posts: null };
    const followersMatch = bio.match(/([\d.,]+(?:\s*[kmb])?)\s*(followers|seguidores)/i);
    const followingMatch = bio.match(/([\d.,]+(?:\s*[kmb])?)\s*(following|seguindo)/i);
    const postsMatch = bio.match(/([\d.,]+(?:\s*[kmb])?)\s*(posts|publica[cç][oõ]es?)/i);

    return {
      followers: followersMatch ? parseCountToken(followersMatch[1]) : null,
      following: followingMatch ? parseCountToken(followingMatch[1]) : null,
      posts: postsMatch ? parseCountToken(postsMatch[1]) : null
    };
  };

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled'
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
    const pickCookie = () => {
      if (process.env.IG_COOKIES_POOL) {
        try {
          const arr = JSON.parse(process.env.IG_COOKIES_POOL);
          if (Array.isArray(arr) && arr.length > 0) {
            return arr[Math.floor(Math.random() * arr.length)];
          }
        } catch (e) {
          const parts = process.env.IG_COOKIES_POOL.split('|').map((v) => v.trim()).filter(Boolean);
          if (parts.length > 0) return parts[Math.floor(Math.random() * parts.length)];
        }
      }
      return process.env.IG_COOKIES || null;
    };

    const cookieHeader = pickCookie();
    console.log('[Puppeteer API] Cookie mode:', cookieHeader ? 'header' : (process.env.IG_SESSIONID ? 'sessionid' : 'none'));
    if (cookieHeader) {
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
        'cookie': cookieHeader
      });
    } else if (process.env.IG_SESSIONID) {
      await page.setCookie({
        name: 'sessionid',
        value: process.env.IG_SESSIONID,
        domain: '.instagram.com',
        path: '/',
        httpOnly: true,
        secure: true
      });
    }
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      window.chrome = { runtime: {} };
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    });

    // Navega ate a pagina do perfil
    const pageUrl = `https://www.instagram.com/${clean}/`;
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Tenta pegar dados completos via endpoint web interno; fallback para meta tags
    const profileData = await page.evaluate(async (username) => {
      const result = {
        name: null,
        bio: null,
        avatar: null,
        followers: null,
        following: null,
        posts: null,
        is_verified: null,
        is_private: null,
        external_link: null
      };

      const applyUser = (user) => {
        if (!user) return;
        result.name = user.full_name || result.name;
        result.bio = user.biography || result.bio;
        result.avatar = user.profile_pic_url_hd || user.profile_pic_url || result.avatar;
        if (typeof user.follower_count === 'number') result.followers = user.follower_count;
        if (typeof user.edge_followed_by?.count === 'number') result.followers = user.edge_followed_by.count;
        if (typeof user.edge_follow?.count === 'number') result.following = user.edge_follow.count;
        if (typeof user.edge_owner_to_timeline_media?.count === 'number') result.posts = user.edge_owner_to_timeline_media.count;
        if (typeof user.is_verified === 'boolean') result.is_verified = user.is_verified;
        if (typeof user.is_private === 'boolean') result.is_private = user.is_private;
        if (typeof user.external_url === 'string') result.external_link = user.external_url;
      };

      const tryFetchUser = async (url, headers = {}) => {
        try {
          const resp = await fetch(url, {
            credentials: 'include',
            headers: {
              'x-ig-app-id': '936619743392459',
              ...headers
            }
          });
          if (!resp.ok) return null;
          const data = await resp.json();
          return data?.data?.user || data?.user || data?.graphql?.user || null;
        } catch {
          return null;
        }
      };

      console.log("[Puppeteer API] Fetching user via endpoints");
      const user =
        (await tryFetchUser(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`)) ||
        (await tryFetchUser(`https://www.instagram.com/${encodeURIComponent(username)}/?__a=1&__d=dis`)) ||
        (await tryFetchUser(`https://www.instagram.com/${encodeURIComponent(username)}/?__a=1`));
      console.log("[Puppeteer API] User loaded:", user ? "yes" : "no");
      applyUser(user);

      if (!result.name || !result.bio || !result.avatar) {
        const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
        const bio = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;
        const avatar = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
        result.name = result.name || name;
        result.bio = result.bio || bio;
        result.avatar = result.avatar || avatar;
      }

      return result;
    }, clean);

    const stats = parseStatsFromBio(profileData.bio);
    if (stats.followers != null) profileData.followers = stats.followers;
    if (stats.following != null) profileData.following = stats.following;
    if (stats.posts != null) profileData.posts = stats.posts;

    if (profileData.bio && /Instagram photos and videos/i.test(profileData.bio)) {
      const stats = parseStatsFromBio(profileData.bio);
      const followersText = stats.followers != null ? stats.followers.toLocaleString('pt-BR') : null;
      const followingText = stats.following != null ? stats.following.toLocaleString('pt-BR') : null;
      const postsText = stats.posts != null ? stats.posts.toLocaleString('pt-BR') : null;
      if (followersText && followingText && postsText) {
        profileData.bio = `${followersText} Seguidores, ${followingText} Seguindo, ${postsText} Publicacoes - Veja fotos e videos do Instagram de @${clean}`;
      }
    }

    // Retorna resultados se houver dados extraidos
    if (profileData.name || profileData.bio || profileData.avatar) {
      return res.status(200).json({
        success: true,
        source: 'puppeteer',
        profile: profileData
      });
    }
    return res.status(200).json({
      success: false,
      source: 'puppeteer',
      message: 'Nenhum dado encontrado',
      profile: null
    });
  } catch (err) {
    console.error('[Puppeteer API] Erro:', err.message || err);
    return res.status(500).json({
      success: false,
      error: err && err.message ? err.message : String(err)
    });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
  }
};










