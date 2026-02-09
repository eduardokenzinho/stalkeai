import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = ({
  titleText,
  subtitleText,
  isButtonVisible,
  isBadgesVisible,
  username,
  showUsernameInput,
  isLoading,
  onEspionarClick,
  onUsernameChange,
  onUsernameSubmit,
  onKeyPress
}) => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <img 
                src="https://www.stalkea.ai/assets/images/logos/logo-vert-transparente.png" 
                alt="Stalkea.ai" 
                className={styles.logoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div className={styles.logoFallback}>STALKEA.AI</div>';
                }}
              />
            </div>
          </div>

          {/* Textos com animação de digitação */}
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              <span className={styles.typingText}>
                {titleText.includes('Cônjuge') ? (
                  <>
                    {titleText.substring(0, titleText.indexOf('Cônjuge'))}
                    <span className={styles.gradientText}>Cônjuge</span>
                    {titleText.substring(titleText.indexOf('Cônjuge') + 7)}
                  </>
                ) : titleText}
              </span>
            </h1>
            <h2 className={styles.subtitle}>
              <span className={styles.typingText}>
                {subtitleText.includes('qualquer pessoa') ? (
                  <>
                    {subtitleText.substring(0, subtitleText.indexOf('qualquer pessoa'))}
                    <span className={styles.gradientTextInline}>qualquer pessoa</span>
                    {subtitleText.substring(subtitleText.indexOf('qualquer pessoa') + 16)}
                  </>
                ) : subtitleText}
              </span>
            </h2>
          </div>

          {/* Botão ou Input */}
          <div className={styles.buttonContainer}>
            {!showUsernameInput ? (
              <button 
                className={`${styles.espionarBtn} ${isButtonVisible ? styles.show : ''}`}
                onClick={onEspionarClick}
              >
                <span className={styles.btnContent}>
                  <svg id={styles.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Testar agora</span>
                </span>
              </button>
            ) : (
              <div className={styles.usernameInputContainer}>
                <div className={styles.inputWrapper}>
                  <span className={styles.atSymbol}>@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={onUsernameChange}
                    onKeyPress={onKeyPress}
                    placeholder="Ex: nomedoconjuge_10"
                    className={styles.usernameInput}
                    autoFocus
                    disabled={isLoading}
                  />
                  <button
                    className={`${styles.confirmInputBtn} ${isLoading ? styles.loading : ''}`}
                    onClick={onUsernameSubmit}
                    disabled={username.length < 3 || isLoading}
                  >
                    {isLoading ? (
                      <div className={styles.spinner} />
                    ) : (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
                {username.length > 0 && username.length < 3 && (
                  <p className={styles.inputError}>Mínimo 3 caracteres</p>
                )}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className={`${styles.badgesContainer} ${isBadgesVisible ? styles.visible : ''}`}>
            <div className={styles.badge}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% Anônimo</span>
            </div>
            <div className={styles.badge}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Sem Senha</span>
            </div>
            <div className={styles.badge}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Teste Grátis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
