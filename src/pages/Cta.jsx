import React, { useEffect, useRef, useState } from 'react';
import s from './Cta.module.css';

import logoInsta from '../assets/feed/logo-insta.png';
import av1 from '../assets/feed/av-fallback-1.jpg';
import av2 from '../assets/feed/av-fallback-2.jpg';
import av3 from '../assets/feed/av-fallback-3.jpg';
import fotoblur1 from '../assets/chat/fotoblur1.jpg';
import nudesChat1 from '../assets/chat/nudes1-chat1.jpg';
import nudesChat2 from '../assets/chat/nudes1-chat2.jpg';
import packChat from '../assets/chat/pack1.1.chat2.png';
import perfilSemFoto from '../assets/feed/perfil-sem-foto.jpeg';
import story1 from '../assets/chat/chat3-story1.png';
import story2 from '../assets/chat/chat3-story2.png';

const Cta = () => {
  const [countdown, setCountdown] = useState('05:00');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTest, setActiveTest] = useState(0);
  const [popup, setPopup] = useState({ show: false, text: '' });
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  const canvasRef = useRef(null);

  // Dados do perfil salvo no localStorage
  const profile = JSON.parse(localStorage.getItem('current_profile') || '{}');
  const storedUsername = localStorage.getItem('current_username') || 'usuario';
  const avatarUrl = profile.profileImageUrl || perfilSemFoto;
  const followersCount = profile.followersCount || 0;
  const followingCount = profile.followingCount || 0;
  const postCount = profile.postCount || 0;
  const isVerified = profile.is_verified || false;

  // Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = '01';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    let animationFrame;
    let lastTime = 0;
    const interval = 1000 / 24;

    const draw = (currentTime) => {
      if (currentTime - lastTime < interval) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6452D4';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * 2)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Timer - 5 minutos
  useEffect(() => {
    const TIMER_DURATION = 300000;
    const TIMER_KEY = 'timer_start';

    let startTime = localStorage.getItem(TIMER_KEY);
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(TIMER_KEY, startTime);
    }

    const start = parseInt(startTime);

    const updateTimer = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, TIMER_DURATION - elapsed);
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      if (remaining === 0) localStorage.removeItem(TIMER_KEY);
    };

    updateTimer();
    const iv = setInterval(updateTimer, 1000);
    return () => clearInterval(iv);
  }, []);

  // Chat animation
  useEffect(() => {
    const msgs = [
      { text: 'Ei, você já testou essa nova ferramenta de visualização?', sent: false },
      { text: 'Sim, é incrível como ela mostra tudo de forma organizada!', sent: true }
    ];

    let index = 0;
    const timeouts = [];

    const animate = () => {
      if (index >= msgs.length) {
        timeouts.push(setTimeout(() => { setMessages([]); index = 0; animate(); }, 1500));
        return;
      }
      setMessages(prev => [...prev, { ...msgs[index], typing: true, id: Date.now() }]);
      timeouts.push(setTimeout(() => {
        setMessages(prev => [...prev.filter(m => !m.typing), { ...msgs[index], typing: false, id: Date.now() }]);
        timeouts.push(setTimeout(() => { index++; animate(); }, 2000));
      }, 1500));
    };

    timeouts.push(setTimeout(animate, 1000));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const iv = setInterval(() => setActiveTest(prev => (prev + 1) % 3), 5000);
    return () => clearInterval(iv);
  }, []);

  const testimonials = [
    { avatar: av1, name: 'marcosvianad', time: '3h', text: 'Achei que era complexo, mas testei mesmo assim. Em 3 minutos já estava navegando pela interface. Muito intuitivo!' },
    { avatar: av2, name: 'gieselferreira_34', time: '5h', text: 'O acesso foi super rápido. Em menos de 2 minutos já estava explorando todas as funcionalidades.' },
    { avatar: av3, name: 'o__prozind34', time: '1d', text: 'Testei a versão completa e funcionou perfeitamente. Interface muito limpa e responsiva.' }
  ];

  const faqs = [
    { q: 'A ferramenta realmente funciona?', a: 'Sim! É uma plataforma legítima de visualização com interface inspirada no Instagram.' },
    { q: 'É seguro usar?', a: 'Totalmente. Utilizamos protocolos de segurança padrão da indústria para proteger seus dados.' },
    { q: 'Preciso instalar alguma coisa?', a: 'Não! Funciona totalmente na nuvem, direto pelo navegador. Basta acessar o link.' },
    { q: 'Como funciona a garantia?', a: 'Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro.' },
    { q: 'Quanto tempo tenho acesso?', a: 'O acesso é vitalício! Uma vez adquirido, você pode usar para sempre.' }
  ];

  const galleryImages = [nudesChat1, nudesChat2, packChat];

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem('lead_fired')) {
      // Meta Pixel removed
      sessionStorage.setItem('lead_fired', '1');
    }
    // Redireciona para o checkout configurado
    window.location.href = 'https://pay.pagamentocerto.store/5pjw3RnWzLl32lQ';
  };

  const formatNum = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace('.', ',')} mi`;
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.', ',')} mil`;
    return n.toLocaleString('pt-BR');
  };

  return (
    <div className={s.ctaPage}>
      <canvas ref={canvasRef} className={s.matrixCanvas} />

      {/* Timer Bar */}
      <div className={s.timerBar}>
        <div className={s.timerContent}>
          <div className={s.timerIcon}>⏱️</div>
          <div className={s.timerText}>
            <strong>Sessão de demonstração termina em <span className={s.timerCountdown}>{countdown}</span></strong>
            <span className={s.timerWarning}>
              Ao zerar o cronômetro, esta visualização será encerrada para{' '}
              <span className={s.usernameRed}>{storedUsername}</span>
            </span>
          </div>
        </div>
      </div>

      <div className={s.container}>
        {/* Logo */}
        <div className={s.logoSection}>
          <img src={logoInsta} alt="Logo Instagram Clone" />
          <h1 className={s.mainTitle}>
            Plataforma de Visualização<br />com <span className={s.gradient}>Interface Instagram</span>
          </h1>
        </div>

        {/* Profile Card - DADOS DO LOCALSTORAGE */}
        <div className={s.profileCard}>
          <div className={s.profileCardContent}>
            <div className={s.profileAvatarBorder}>
              <div className={s.profileAvatarInner}>
                <img alt="Perfil" src={avatarUrl} />
              </div>
            </div>
            <div className={s.profileInfo}>
              <div className={s.profileUsernameRow}>
                <h2 className={s.profileUsername}>{storedUsername}</h2>
                {isVerified && (
                  <svg className={s.verifiedBadge} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>
              <p className={s.profileName}>@{storedUsername}</p>
            </div>
          </div>
          <div className={s.profileStats}>
            <div className={s.statItem}>
              <span className={s.statNumber}>{formatNum(postCount)}</span>
              <span className={s.statLabel}>posts</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>{formatNum(followersCount)}</span>
              <span className={s.statLabel}>seguidores</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statNumber}>{formatNum(followingCount)}</span>
              <span className={s.statLabel}>seguindo</span>
            </div>
          </div>
        </div>

        {/* VIP Badge */}
        <div className={s.vipBadge}>
          <div className={s.vipCheckIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className={s.vipBadgeInfo}>
            <strong>Visualização de demonstração para {storedUsername}</strong>
            <span>Algumas informações do perfil estão disponíveis nesta prévia</span>
          </div>
        </div>

        <div className={s.scrollIndicator}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Features */}
        <section className={s.featuresSection}>
          {/* Mídias */}
          <div className={s.featureCard}>
            <div className={s.featureHeader}>
              <div className={s.featureIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className={s.featureTitle}>Conteúdo de {storedUsername}</h3>
                <p className={s.featureDesc}>Visualize mídias em uma interface organizada</p>
              </div>
            </div>
            <div className={s.mediaGrid}>
              <div className={s.mediaLarge} onClick={() => setPopup({ show: true, text: 'ao conteúdo completo' })}>
                <img src={fotoblur1} alt="Prévia de mídia" />
                <div className={s.mediaLock}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
              {galleryImages.map((img, i) => (
                <div key={i} className={s.mediaItem} onClick={() => setPopup({ show: true, text: 'ao conteúdo completo' })}>
                  <img src={img} alt={`Prévia ${i + 1}`} />
                  <div className={s.mediaLock}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Localização */}
          <div className={s.featureCard}>
            <div className={s.featureHeader}>
              <div className={s.featureIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className={s.featureTitle}>Visualização geográfica</h3>
                <p className={s.featureDesc}>Interface de localização integrada</p>
              </div>
            </div>
            <div className={s.mapContainer}>
              <div className={s.mapWrapper}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }} />
                <div className={s.mapPin}>
                  <img src={avatarUrl} alt="Localização" />
                </div>
              </div>
              <div className={s.mapInfo}>
                <div>
                  <div className={s.mapInfoLabel}>Interface de Localização</div>
                  <div className={s.mapInfoUser}>@{storedUsername}</div>
                </div>
                <button className={s.mapButton} onClick={() => setPopup({ show: true, text: 'à localização completa' })}>Visualizar</button>
              </div>
            </div>
          </div>

          {/* Stories */}
          <div className={s.featureCard}>
            <div className={s.featureHeader}>
              <div className={s.featureIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className={s.featureTitle}>Stories e conteúdos</h3>
                <p className={s.featureDesc}>Visualização organizada de conteúdos temporários</p>
              </div>
            </div>
            <div className={s.storiesGrid}>
              {[story1, story2].map((img, i) => (
                <div key={i} className={s.storyItem} onClick={() => setPopup({ show: true, text: 'aos conteúdos completos' })}>
                  <img src={img} alt={`Story ${i + 1}`} />
                  <div className={s.storyOverlay}>
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <p>Conteúdo na versão completa</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct */}
          <div className={s.featureCard}>
            <div className={s.featureHeader}>
              <div className={s.featureIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className={s.featureTitle}>Interface de mensagens</h3>
                <p className={s.featureDesc}>Demonstração do sistema de visualização de mensagens</p>
              </div>
            </div>
            <div className={s.chatContainer}>
              <div className={s.chatHeader}>
                <div className={s.chatUser}>
                  <div className={s.chatAvatar} style={{ backgroundImage: `url(${avatarUrl})` }} />
                  <div>
                    <div className={s.chatUsername}>{storedUsername}</div>
                    <div className={s.chatStatus}>
                      <span className={s.statusDot} />
                      online
                    </div>
                  </div>
                </div>
                <div className={s.chatActions}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className={s.chatMessages} ref={chatRef}>
                {messages.map(m => (
                  <div key={m.id} className={`${s.chatMessage} ${m.sent ? s.sent : s.received}`}>
                    {m.typing ? (
                      <div className={s.typingIndicator}><span /><span /><span /></div>
                    ) : m.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={s.scrollIndicator}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Pricing */}
        <section className={s.pricingSection} id="pricing">
          <div className={s.pricingHeader}>
            <img src={logoInsta} alt="Logo Instagram Clone" />
            <h2 className={s.pricingTitle}>
              Com nossa plataforma você terá<br />
              acesso completo à interface de<br />
              <span className={s.highlight}>{storedUsername}</span> por apenas:
            </h2>
          </div>
          <div className={s.pricingCard}>
            <div className={s.pricingOld}>De: R$ 279,90</div>
            <div className={s.pricingPrice}>
              <span className={s.pricingCurrency}>R$</span>
              <span className={s.pricingValue}>47</span>
              <span className={s.pricingCents}>,90</span>
            </div>
            <div className={s.pricingBadges}>
              <div className={s.badgesTrack}>
                {[...Array(2)].map((_, g) => (
                  <React.Fragment key={g}>
                    <span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Versão gratuita
                    </span>
                    <span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Acesso imediato
                    </span>
                    <span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Plataforma segura
                    </span>
                    <span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Sem compromisso
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <ul className={s.pricingBenefits}>
            {[
              <>Interface completa de visualização para <strong>{storedUsername}</strong></>,
              'Todas as mídias organizadas por categorias',
              'Sistema de localização integrado',
              <>Notificações de interações de <strong>{storedUsername}</strong></>,
              '2 funcionalidades bônus incluídas'
            ].map((text, i) => (
              <li key={i}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://pay.pagamentocerto.store/5pjw3RnWzLl32lQ"
            className={s.ctaButton}
            onClick={handleCtaClick}
          >
            <span>Acessar plataforma gratuitamente</span>
            <span>Acesso liberado imediatamente</span>
          </a>
        </section>

        <div className={s.scrollIndicator}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Testimonials */}
        <section className={s.testimonialsSection}>
          <h2 className={s.testimonialsTitle}>
            Veja o que dizem sobre nossa <span className={s.gradient}>Plataforma</span>
          </h2>
          <div className={s.testimonialsCarousel}>
            <div className={s.testimonialsTrack} style={{ transform: `translateX(-${activeTest * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className={s.testimonialSlide}>
                  <div className={s.testimonialCard}>
                    <div className={s.testimonialHeader}>
                      <img src={t.avatar} alt={t.name} />
                      <div>
                        <h4>{t.name}</h4>
                        <span>{t.time}</span>
                      </div>
                    </div>
                    <p className={s.testimonialText}>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={s.testimonialsDots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${s.dot} ${activeTest === i ? s.dotActive : ''}`}
                  onClick={() => setActiveTest(i)}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Alert */}
        <div className={s.alertBox}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Esta é uma <strong>demonstração de interface</strong>. Use com responsabilidade e respeito à privacidade.</span>
        </div>

        {/* FAQ */}
        <section className={s.faqSection}>
          <h2 className={s.faqTitle}>Perguntas Frequentes</h2>
          <div className={s.faqList}>
            {faqs.map((item, i) => (
              <div key={i} className={`${s.faqItem} ${activeFaq === i ? s.faqItemActive : ''}`}>
                <button className={s.faqButton} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className={s.faqIcon}>{activeFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`${s.faqAnswer} ${activeFaq === i ? s.faqAnswerOpen : ''}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <div className={s.guaranteeBox}>
          <div className={s.guaranteeIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3>Demonstração Sem Risco</h3>
          <p>Experimente nossa interface gratuitamente. Sem compromisso.</p>
        </div>

        {/* Footer Warning */}
        <div className={s.footerWarning}>
          <div className={s.footerWarningContent}>
            <div className={s.footerWarningText}>
              <strong>Demonstração termina em {countdown}</strong>
              <span>Ao zerar, esta sessão de visualização será encerrada.</span>
            </div>
            <button className={s.footerWarningButton} onClick={scrollToPricing}>
              Continuar Visualização
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <>
          <div className={s.popupOverlay} onClick={() => setPopup({ show: false, text: '' })} />
          <div className={s.popupContent}>
            <div className={s.popupIcon}>⚠️</div>
            <h3>Funcionalidade limitada</h3>
            <p>Esta é uma versão de demonstração. Acesso {popup.text} disponível na versão completa.</p>
            <button onClick={() => { setPopup({ show: false, text: '' }); scrollToPricing(); }}>
              Ver Demonstração Completa
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cta;
