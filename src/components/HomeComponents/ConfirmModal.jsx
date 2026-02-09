import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({
  showConfirmModal,
  username,
  modalProfileData,
  onClose,
  onConfirm
}) => {
  if (!showConfirmModal || !modalProfileData) return null;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      const millions = num / 1000000;
      return millions.toFixed(1).replace('.', ',') + ' mi';
    } else if (num >= 100000) {
      return Math.floor(num / 1000) + ' mil';
    } else if (num >= 11000) {
      const thousands = num / 1000;
      return thousands.toFixed(1).replace('.', ',') + ' mil';
    }
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
        {/* Título */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Confirme o Instagram</h3>
          <p className={styles.modalSubtitle}>
            {modalProfileData.fromApi
              ? <>Perfil encontrado! Confirmar teste com <span className={styles.highlightUsername}>@{username}</span>?</>
              : <>Oque seu Cônjuge faz quando está no Instagram? ? <span className={styles.highlightUsername}>@{username}</span>?</>
            }
          </p>
        </div>

        {/* Layout Instagram: Foto + Stats em linha */}
        <div className={styles.profilePreview}>
          {/* Foto à esquerda */}
          <div className={styles.profileImageContainer}>
            <div className={styles.profileImageWrapper}>
              <img
                src={modalProfileData.profileImageUrl}
                alt="Foto de perfil"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className={styles.profileImageFallback}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {modalProfileData.fullName && (
              <div className={styles.profileName}>
                <span className={styles.fullName}>{modalProfileData.fullName}</span>
                {modalProfileData.is_verified && (
                  <svg className={styles.verifiedBadge} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#3897f0"/>
                    <path d="M17.5 29.5L9 21l2.5-2.5 6 6 13-13L33 14z" fill="#fff"/>
                  </svg>
                )}
              </div>
            )}
          </div>

          {/* Stats à direita */}
          <div className={styles.profileStatsHorizontal}>
            <div className={styles.statItem}>
              <p className={styles.statNumber}>{formatNumber(modalProfileData.postCount)}</p>
              <p className={styles.statLabel}>posts</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statNumber}>{formatNumber(modalProfileData.followersCount)}</p>
              <p className={styles.statLabel}>seguidores</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statNumber}>{formatNumber(modalProfileData.followingCount)}</p>
              <p className={styles.statLabel}>seguindo</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {modalProfileData.bio && (
          <div className={styles.profileBio}>
            <p>{modalProfileData.bio.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < modalProfileData.bio.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}</p>
          </div>
        )}

        {/* Aviso de Limite */}
        <div className={styles.modalWarning}>
          <div className={styles.warningContent}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>
              <strong>Aviso:</strong> Limite de apenas 1 pesquisa por dispositivo, certifique-se que digitou o usuário corretamente.
            </span>
          </div>
        </div>

        {/* Botões */}
        <div className={styles.modalButtons}>
          <button 
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Corrigir @
          </button>
          <button     
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            Confirmar
            <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;