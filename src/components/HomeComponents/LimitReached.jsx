import React from 'react';
import styles from './LimitReached.module.css';
import fallbackAvatar from '../../assets/home/limit-avatar.svg';

const LimitReached = ({ username, avatarUrl, onUnlock }) => {
  const displayUsername = (username || 'usuario').replace(/^@+/, '');

  return (
    <main className={styles.limitScreen}>
      <section className={styles.limitCard} aria-labelledby="limit-title">
        <div className={styles.avatarRing}>
          <img
            src={avatarUrl || fallbackAvatar}
            alt=""
            className={styles.avatar}
            onError={(event) => {
              event.currentTarget.src = fallbackAvatar;
            }}
          />
        </div>

        <h1 className={styles.title} id="limit-title">
          <span className={styles.alertIcon}>!</span>
          Limite Atingido
        </h1>

        <p className={styles.message}>
          Você já utilizou sua pesquisa gratuita para espionar{' '}
          <strong>@{displayUsername}</strong>
        </p>

        <p className={styles.submessage}>
          Adquira o acesso VIP e tenha acesso ao instagram completo agora mesmo!
        </p>

        <button className={styles.unlockButton} type="button" onClick={onUnlock}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Desbloquear Acesso VIP
        </button>

        <div className={styles.warningBox}>
          <strong>Sua identidade está comprometida!</strong>{' '}
          {displayUsername} pode ser avisado sobre sua espionagem, somente membros VIP's tem sigilo preservado nas espionagens.
        </div>
      </section>
    </main>
  );
};

export default LimitReached;
