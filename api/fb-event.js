const fetch = global.fetch || require('node-fetch');

const safeString = (value) => {
  if (typeof value !== 'string') return undefined;
  return value.trim().slice(0, 2000);
};

const safeObject = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  return undefined;
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const pixelId = process.env.FB_PIXEL_ID || process.env.FB_PIXEL || null;
  const accessToken = process.env.FB_ACCESS_TOKEN || process.env.FB_TOKEN || null;
  const apiVersion = process.env.FB_API_VERSION || 'v16.0';
  const testEventCode = process.env.FB_TEST_EVENT_CODE || null;

  if (!pixelId || !accessToken) {
    return res.status(500).json({
      success: false,
      error: 'Facebook Conversion API not configured. Set FB_PIXEL_ID and FB_ACCESS_TOKEN in environment variables.'
    });
  }

  const {
    eventName = 'PageView',
    eventSourceUrl,
    actionSource = 'website',
    customData,
    userData
  } = req.body || {};

  const eventTime = Math.floor(Date.now() / 1000);
  const sourceUrl = safeString(eventSourceUrl) || req.headers.referer || `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const payload = {
    data: [
      {
        event_name: safeString(eventName) || 'PageView',
        event_time: eventTime,
        action_source: safeString(actionSource) || 'website',
        event_source_url: sourceUrl,
        custom_data: safeObject(customData) || {},
        user_data: safeObject(userData) || {}
      }
    ]
  };

  if (testEventCode) {
    payload.test_event_code = safeString(testEventCode);
  }

  const endpoint = `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const fbResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const fbResult = await fbResponse.json();
    if (!fbResponse.ok) {
      console.error('[FB CAPI] Error sending event', fbResult);
      return res.status(502).json({
        success: false,
        error: 'Facebook Conversion API returned an error',
        details: fbResult
      });
    }

    console.log('[FB CAPI] Event sent', payload.data[0].event_name, payload.data[0].event_source_url);
    return res.status(200).json({
      success: true,
      details: fbResult
    });
  } catch (error) {
    console.error('[FB CAPI] Request failed', error && error.message ? error.message : error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send event to Facebook Conversion API',
      details: error && error.message ? error.message : String(error)
    });
  }
};
