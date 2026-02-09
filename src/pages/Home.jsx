import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import MatrixCanvas from '../components/HomeComponents/MatrixCanvas';
import HeroSection from '../components/HomeComponents/HeroSection';
import InstagramLogin from '../components/HomeComponents/InstagramLogin';
import ConfirmModal from '../components/HomeComponents/ConfirmModal';

const Home = () => {
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isBadgesVisible, setIsBadgesVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [statsNumber, setStatsNumber] = useState(84693);
  const [dayOfWeek, setDayOfWeek] = useState('domingo');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalProfileData, setModalProfileData] = useState(null);
  const [showInstagramLogin, setShowInstagramLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Limpa dados de trial expirados em vez de redirecionar automaticamente.
    // Isso facilita testes locais — se preferir, podemos restaurar o redirecionamento.
    const trialActive = localStorage.getItem('trial_active');
    const trialExpires = localStorage.getItem('trial_expires');

    if (trialActive && trialExpires) {
      const expires = parseInt(trialExpires, 10);
      if (Date.now() >= expires) {
        localStorage.removeItem('trial_active');
        localStorage.removeItem('trial_expires');
        localStorage.removeItem('current_profile');
        localStorage.removeItem('trial_start');
      }
    }
  }, []);

  // Animação de digitação
  useEffect(() => {
    const fullTitle = "O que seu Cônjuge faz quando está no Instagram?";
    const fullSubtitle = "Descubra a verdade sobre qualquer pessoa, acessando o instagram dela!";
    
    const typeAnimation = async () => {
      for (let i = 0; i <= fullTitle.length; i++) {
        setTitleText(fullTitle.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 40));
      }

      await new Promise(resolve => setTimeout(resolve, 150));

      for (let i = 0; i <= fullSubtitle.length; i++) {
        setSubtitleText(fullSubtitle.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      setIsButtonVisible(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsBadgesVisible(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsStatsVisible(true);
    };

    const timer = setTimeout(() => {
      typeAnimation();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Animar número de perfis
  useEffect(() => {
    if (!isStatsVisible) return;

    const savedValue = localStorage.getItem('stats_number');
    let current = savedValue ? parseInt(savedValue) : 84693;
    
    if (!savedValue) {
      localStorage.setItem('stats_number', current.toString());
    }

    setStatsNumber(current);

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 21) + 11;
      current += increment;
      localStorage.setItem('stats_number', current.toString());
      setStatsNumber(current);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStatsVisible]);

  // Obter dia da semana
  useEffect(() => {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const today = new Date();
    setDayOfWeek(days[today.getDay()]);
  }, []);

  const handleEspionarClick = () => {
    setShowUsernameInput(true);
  };

  const getApiBase = () => {
    const envBase = process.env.REACT_APP_API_BASE;
    if (envBase && envBase.trim()) {
      return envBase.trim().replace(/\/+$/, '');
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    return '';
  };

  const fetchAvatarAsBase64 = async (imageUrl) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const apiBase = getApiBase();
      const proxyUrl = `${apiBase}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`Proxy status: ${res.status}`);
      const data = await res.json();
      return data?.base64 || null;
    } catch {
      return null;
    }
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
    const postsMatch = bio.match(/([\d.,]+(?:\s*[kmb])?)\s*(posts|publica[c�][o�]es?)/i);

    return {
      followers: followersMatch ? parseCountToken(followersMatch[1]) : null,
      following: followingMatch ? parseCountToken(followingMatch[1]) : null,
      posts: postsMatch ? parseCountToken(postsMatch[1]) : null
    };
  };

  const handleUsernameSubmit = async () => {
    const cleanUsername = username.trim().replace(/^@+/, '');

    if (cleanUsername.length < 3) {
      alert('Digite um nome de usuário válido!');
      return;
    }

    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      // Em desenvolvimento (localhost), chama direto para API em 5000
      // Em produção, usa URL relativa
      const apiBase = getApiBase();
      const apiUrl = `${apiBase}/api/get-instagram-puppeteer?username=${encodeURIComponent(cleanUsername)}`;

      console.log('🔗 Chamando API de dados REAIS:', apiUrl);

      const response = await fetch(apiUrl, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

      const data = await response.json();
      console.log('✅ Resposta da API:', data);

      // Extrai dados da nova resposta da API
      const profile = data?.profile || null;

      if (profile) {
        const originalAvatarUrl = profile.avatar || '';

        // Converte avatar para base64 via proxy (evita CORS do Instagram CDN)
        let avatarBase64 = null;
        if (originalAvatarUrl) {
          avatarBase64 = await fetchAvatarAsBase64(originalAvatarUrl);
        }

        const parsedStats = parseStatsFromBio(profile.bio || '');
        const profileData = {
          profileImageUrl: avatarBase64 || `https://i.pravatar.cc/150?u=${cleanUsername}`,
          fullName: profile.name || cleanUsername,
          bio: profile.bio || '',
          postCount: profile.posts ?? parsedStats.posts ?? 0,
          followersCount: profile.followers ?? parsedStats.followers ?? 0,
          followingCount: profile.following ?? parsedStats.following ?? 0,
          is_private: false,
          is_verified: profile.is_verified || false,
          external_link: profile.external_link || null,
          fromApi: true
        };

        if (profileData.bio && /Instagram photos and videos/i.test(profileData.bio)) {
          const stats = parseStatsFromBio(profileData.bio);
          const followersText = stats.followers != null ? stats.followers.toLocaleString('pt-BR') : null;
          const followingText = stats.following != null ? stats.following.toLocaleString('pt-BR') : null;
          const postsText = stats.posts != null ? stats.posts.toLocaleString('pt-BR') : null;
          if (followersText && followingText && postsText) {
            profileData.bio = `${followersText} Seguidores, ${followingText} Seguindo, ${postsText} Publicacoes - Veja fotos e videos do Instagram de @${cleanUsername}`;
          }
        }

        setModalProfileData(profileData);

        // Salva no historico de usuarios pesquisados
        const savedUsers = JSON.parse(localStorage.getItem('searched_users') || '[]');
        const alreadyExists = savedUsers.some(u => u.username === cleanUsername);
        if (!alreadyExists) {
          savedUsers.push({
            username: cleanUsername,
            ...profileData,
            searchedAt: Date.now()
          });
          localStorage.setItem('searched_users', JSON.stringify(savedUsers));
        }

        setShowConfirmModal(true);
      } else {
        throw new Error('Perfil nao encontrado');
      }
    } catch (error) {
      console.error('❌ Erro ao buscar perfil:', error);
      console.error('Mensagem:', error.message);

      const mockProfileData = {
        profileImageUrl: `https://i.pravatar.cc/150?u=${cleanUsername}`,
        fullName: cleanUsername,
        bio: 'Usuário do Instagram',
        postCount: Math.floor(Math.random() * 100) + 10,
        followersCount: Math.floor(Math.random() * 10000) + 1000,
        followingCount: Math.floor(Math.random() * 500) + 50,
        is_private: Math.random() > 0.7,
        is_verified: false,
        fromApi: false
      };

      setModalProfileData(mockProfileData);
      setShowConfirmModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmModal = async () => {
    setShowConfirmModal(false);
    setShowInstagramLogin(true);

    // ====== PASSO 1: INICIAR TRIAL DE 5 MINUTOS ======
    const cleanUsername = username.trim().replace(/^@+/, '');

    localStorage.setItem('current_username', cleanUsername);

    const now = Date.now();
    localStorage.setItem('trial_start', now.toString());

    const fiveMinutes = 5 * 60 * 1000;
    const trialExpires = now + fiveMinutes;
    localStorage.setItem('trial_expires', trialExpires.toString());

    localStorage.setItem('trial_active', 'true');
    localStorage.setItem('current_profile', JSON.stringify(modalProfileData));
    // ====================================================
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUsernameSubmit();
    }
  };

  return (
    <div className={styles.homePage}>
      <MatrixCanvas />
      
      {!showInstagramLogin ? (
        <>
          <HeroSection
            titleText={titleText}
            subtitleText={subtitleText}
            isButtonVisible={isButtonVisible}
            isBadgesVisible={isBadgesVisible}
            username={username}
            showUsernameInput={showUsernameInput}
            isLoading={isLoading}
            onEspionarClick={handleEspionarClick}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onUsernameSubmit={handleUsernameSubmit}
            onKeyPress={handleKeyPress}
          />
          
          <div className={`${styles.homeStatsContainer} ${isStatsVisible ? styles.homeVisible : ''}`}>
            <p className={styles.homeStatsText}>
              <span className={styles.homeStatsNumber}>+{statsNumber.toLocaleString('pt-BR')}</span>{' '}
              perfis analisados hoje ({dayOfWeek})
            </p>
          </div>
        </>
      ) : (
        <InstagramLogin
          username={username}
          onLoginComplete={() => {
            navigate('/feed');
          }}
        />
      )}
      
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        username={username}
        modalProfileData={modalProfileData}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default Home;













