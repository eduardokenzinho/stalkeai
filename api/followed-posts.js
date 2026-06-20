const axios = require('axios');
const { execFile } = require('child_process');
const path = require('path');

const DEFAULT_FOLLOWING_ACTOR = 'seemuapps/instagram-followers-scraper';
const DEFAULT_POSTS_ACTOR = 'apify/instagram-scraper';

function toActorPath(actorId) {
  return actorId.replace(/\//g, '~');
}

function cleanUsername(value) {
  return String(value || '').trim().replace(/^@+/, '');
}

function isValidUsername(value) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(value);
}

function getRequestValue(req, key) {
  return req.query?.[key] ?? req.body?.[key];
}

function makeProxyImageUrl(imageUrl) {
  return imageUrl ? `/api/proxy-image?raw=1&url=${encodeURIComponent(imageUrl)}` : '';
}

function runInstaloaderFollowedPosts(username, limit) {
  return new Promise((resolve) => {
    const pythonBin = process.env.PYTHON_BIN || 'python';
    const scriptPath = path.join(__dirname, 'instaloader-followed-posts.py');

    const child = execFile(
      pythonBin,
      [scriptPath, username, String(limit)],
      {
        timeout: parseInt(process.env.INSTALOADER_FOLLOWED_NODE_TIMEOUT || '90000', 10),
        windowsHide: true,
        maxBuffer: 1024 * 1024,
      },
      (error, stdout, stderr) => {
        const rawOutput = String(stdout || '').trim();
        if (rawOutput) {
          try {
            return resolve(JSON.parse(rawOutput));
          } catch {
            // Continua para o tratamento generico abaixo.
          }
        }

        if (error) {
          return resolve({
            success: false,
            configured: false,
            source: 'instaloader',
            posts: [],
            error: stderr || error.message,
          });
        }

        return resolve({
          success: false,
          configured: false,
          source: 'instaloader',
          posts: [],
          error: 'Resposta vazia ou invalida do Instaloader',
        });
      }
    );

    child.on('error', (error) => {
      resolve({
        success: false,
        configured: false,
        source: 'instaloader',
        posts: [],
        error: error.message,
      });
    });
  });
}

function normalizeImage(post) {
  return (
    post.displayUrl ||
    post.display_url ||
    post.imageUrl ||
    post.image_url ||
    post.thumbnailUrl ||
    post.thumbnail_url ||
    post.urlToImage ||
    post.mediaUrl ||
    post.media_url ||
    post.images?.[0]?.url ||
    post.images?.[0] ||
    post.childPosts?.[0]?.displayUrl ||
    ''
  );
}

function normalizeFollowingItems(items) {
  const rows = [];

  for (const item of items || []) {
    if (Array.isArray(item?.results)) rows.push(...item.results);
    if (Array.isArray(item?.following)) rows.push(...item.following);
    if (Array.isArray(item?.followings)) rows.push(...item.followings);
    if (Array.isArray(item?.data)) rows.push(...item.data);

    if (item?.username || item?.userName || item?.handle) {
      rows.push(item);
    }
  }

  const seen = new Set();
  return rows
    .map((item) => {
      const username = cleanUsername(item.username || item.userName || item.handle || item.login);
      if (!username || seen.has(username.toLowerCase())) return null;
      seen.add(username.toLowerCase());

      return {
        username,
        fullName: item.fullName || item.displayName || item.full_name || item.name || '',
        avatar: item.profilePicUrl || item.profile_pic_url || item.profilePicture || item.avatar || '',
        isPrivate: !!(item.isPrivate || item.is_private),
        isVerified: !!(item.isVerified || item.is_verified),
      };
    })
    .filter(Boolean);
}

function normalizePost(post, profile) {
  const image = normalizeImage(post);

  return {
    username: profile.username,
    fullName: profile.fullName,
    avatar: profile.avatar || post.ownerProfilePicUrl || post.owner_profile_pic_url || post.profilePicUrl || '',
    postImage: makeProxyImageUrl(image),
    postImageRaw: image,
    likes: post.likesCount || post.likes || post.likeCount || 0,
    comments: post.commentsCount || post.comments || post.commentCount || 0,
    time: post.takenAtIso || post.timestamp || post.createdAt || post.takenAt || '',
    description: post.caption || post.text || post.description || '',
    postUrl: post.url || post.postUrl || post.permalink || '',
    isVideo: post.type === 'Video' || !!post.videoUrl,
    source: 'apify',
  };
}

async function runActor({ token, actorId, input, timeout = 180 }) {
  const url = `https://api.apify.com/v2/acts/${toActorPath(actorId)}/run-sync-get-dataset-items`;
  const response = await axios.post(url, input, {
    params: {
      token,
      timeout,
    },
    timeout: (timeout + 30) * 1000,
    validateStatus: () => true,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Actor ${actorId} retornou HTTP ${response.status}`);
  }

  return Array.isArray(response.data) ? response.data : [];
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const username = cleanUsername(getRequestValue(req, 'username'));
  const limit = Math.min(Math.max(parseInt(getRequestValue(req, 'limit') || '5', 10) || 5, 1), 5);

  if (!isValidUsername(username)) {
    return res.status(400).json({ success: false, error: 'Username invalido' });
  }

  const instaloaderData = await runInstaloaderFollowedPosts(username, limit);
  if (instaloaderData?.success && Array.isArray(instaloaderData.posts) && instaloaderData.posts.length > 0) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(instaloaderData);
  }

  if (
    instaloaderData?.configured &&
    (instaloaderData.message === 'Perfil privado' || Array.isArray(instaloaderData.following))
  ) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(instaloaderData);
  }

  console.warn('[followed-posts] Fallback para Apify:', instaloaderData?.message || instaloaderData?.error || 'sem dados');

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return res.status(200).json({
      success: false,
      configured: false,
      source: 'instaloader',
      username,
      following: [],
      posts: [],
      message: instaloaderData?.message || instaloaderData?.error || 'Instaloader sem dados e APIFY_TOKEN nao configurado',
    });
  }

  const followingActor = process.env.APIFY_FOLLOWING_ACTOR_ID || DEFAULT_FOLLOWING_ACTOR;
  const postsActor = process.env.APIFY_POSTS_ACTOR_ID || DEFAULT_POSTS_ACTOR;

  try {
    const followingItems = await runActor({
      token,
      actorId: followingActor,
      input: {
        username,
        mode: 'following',
        maxItems: limit,
      },
      timeout: 180,
    });

    const following = normalizeFollowingItems(followingItems).slice(0, limit);

    if (following.length === 0) {
      return res.status(200).json({
        success: false,
        configured: true,
        username,
        following: [],
        posts: [],
        message: 'Nenhum perfil seguido retornado pela Apify',
      });
    }

    const postRuns = await Promise.allSettled(
      following.map(async (profile) => {
        const items = await runActor({
          token,
          actorId: postsActor,
          input: {
            resultsType: 'posts',
            directUrls: [`https://www.instagram.com/${profile.username}/`],
            resultsLimit: 1,
            addParentData: true,
          },
          timeout: 180,
        });

        const firstPost = items.find((item) => normalizeImage(item)) || items[0];
        return firstPost ? normalizePost(firstPost, profile) : null;
      })
    );

    const posts = postRuns
      .filter((result) => result.status === 'fulfilled' && result.value)
      .map((result) => result.value)
      .slice(0, limit);

    return res.status(200).json({
      success: posts.length > 0,
      configured: true,
      username,
      following,
      posts,
    });
  } catch (error) {
    console.error('[followed-posts] Erro:', error.message || error);
    return res.status(500).json({
      success: false,
      configured: true,
      error: error.message || String(error),
      posts: [],
    });
  }
};
