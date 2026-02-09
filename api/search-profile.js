const https = require('https');
const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  // Sanitização: só letras, números, pontos e underscores (padrão Instagram)
  const clean = username.trim().replace(/^@+/, '');
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
    return res.status(400).json({ error: 'Username inválido' });
  }

  try {
    console.log(`🔍 Iniciando busca via Scrape.do para: @${clean}`);

    // URL do Instagram que queremos raspar
    const instagramUrl = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(clean)}`;

    // Chamada POST para Scrape.do
    const scrapeDoConfig = {
      method: 'POST',
      url: 'https://api.scrape.do/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 51b7ef067dca49d9a9fca644326605a48b55d7d7549'
      },
      data: JSON.stringify({
        url: instagramUrl,
        render_js: false,
        premium_proxy: false,
        country_code: 'br',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'pt-BR,pt;q=0.9'
        }
      }),
      timeout: 30000,
      validateStatus: () => true // Não lança erro em status 400+
    };

    console.log('📤 Enviando requisição para Scrape.do:', { url: instagramUrl });
    const response = await axios(scrapeDoConfig);
    console.log('📥 Resposta Scrape.do recebida, status:', response.status);
    console.log('📊 Response data tipo:', typeof response.data);
    console.log('📊 Response data keys:', Object.keys(response.data || {}));

    // Se Scrape.do retornou sucesso
    if (response.status === 200 && response.data) {
      let profileData;
      
      try {
        // Tenta parsear a resposta
        if (typeof response.data === 'string') {
          profileData = JSON.parse(response.data);
        } else if (response.data.body) {
          profileData = typeof response.data.body === 'string' 
            ? JSON.parse(response.data.body) 
            : response.data.body;
        } else {
          profileData = response.data;
        }
        
        console.log('✅ JSON parseado com sucesso');
        console.log('📊 Resposta Scrape.do:', JSON.stringify(profileData).substring(0, 150) + '...');

        // Extrai objeto de usuário em possíveis formatos retornados
        const user = profileData?.data?.user || 
                     profileData?.user || 
                     profileData?.graphql?.user || 
                     profileData?.profile || 
                     null;

        if (user) {
          console.log('✅ Usuário encontrado via Scrape.do:', user.username || clean);

          const profile = {
            name: user.full_name || user.username || clean,
            avatar: user.profile_pic_url || user.profile_pic_url_hd || '',
            avatar_hd: user.profile_pic_url_hd || user.profile_pic_url || '',
            bio: user.biography || user.bio || '',
            posts: user.edge_owner_to_timeline_media?.count || user.media_count || 0,
            followers: user.edge_followed_by?.count || user.followed_by?.count || user.follower_count || 0,
            following: user.edge_follow?.count || user.following_count || user.follows?.count || 0,
            is_verified: !!user.is_verified,
            external_link: user.external_url || user.external_link || null,
            source: 'scrape.do'
          };

          console.log('✅ Perfil processado:', {
            name: profile.name,
            followers: profile.followers,
            posts: profile.posts,
            source: profile.source
          });

          res.setHeader('Cache-Control', 'public, max-age=300');
          return res.status(200).json({ profile });
        }
      } catch (parseErr) {
        console.warn('⚠️ Erro ao parsear resposta Scrape.do:', parseErr.message);
        console.warn('⚠️ Tentando fallback...');
      }
    }

    // Se Scrape.do falhou ou retornou erro, trier fallback
    console.warn('⚠️ Scrape.do retornou status:', response.status);
    throw new Error(`Scrape.do retornou status ${response.status}`);

  } catch (error) {
    console.error('❌ Falha na busca via Scrape.do:', error.message);
    
    // Fallback: retorna mockados ou dados gerados
    console.log(`📦 Utilizando dados gerados como fallback para: @${clean}`);
    
    const bios = [
      'Explorador de novas tecnologias 🚀',
      'Apaixonado por inovação',
      'Criador de conteúdo digital',
      'Tech enthusiast',
      'Vivendo o Instagram'
    ];

    const mockProfile = {
      name: clean.charAt(0).toUpperCase() + clean.slice(1),
      avatar: `https://i.pravatar.cc/150?u=${clean}`,
      avatar_hd: `https://i.pravatar.cc/300?u=${clean}`,
      bio: bios[Math.floor(Math.random() * bios.length)],
      posts: Math.floor(Math.random() * 500) + 10,
      followers: Math.floor(Math.random() * 5000) + 500,
      following: Math.floor(Math.random() * 1000) + 50,
      is_verified: Math.random() > 0.85,
      external_link: null,
      source: 'fallback'
    };

    console.log('✅ Retornando dados fallback:', {
      name: mockProfile.name,
      followers: mockProfile.followers,
      source: mockProfile.source
    });

    res.setHeader('Cache-Control', 'public, max-age=600');
    res.status(200).json({ profile: mockProfile, warning: 'Usando dados gerados (Scrape.do indisponível)'});
  }
};
