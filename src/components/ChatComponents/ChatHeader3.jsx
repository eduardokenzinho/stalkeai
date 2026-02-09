import styles from "./ChatHeader.module.css";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";

export default function ChatHeader3() {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeaderLeft}>
        <button type="button" className={styles.backButton} aria-label="Voltar">
          <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
            <path 
              d="M15.6 18.6L8.4 12L15.6 5.4" 
              stroke="#F9F9F9" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.chatUserInfo}>
          <button type="button" className={styles.chatAvatarBtn} aria-label="Ver perfil">
            <span className={styles.chatAvatarGradient}>
              <span className={styles.chatAvatarInner}>
                <img 
                  src={avatarFallback} 
                  alt="" 
                  className={styles.chatAvatarImg}
                />
              </span>
            </span>
          </button>

          <button type="button" className={styles.chatNameBtn}>
            <span className={styles.chatUserName}>pedro_oliveira</span>
            <span className={styles.chatUserStatus}>online</span>
          </button>
        </div>
      </div>

      <div className={styles.chatHeaderRight}>
        <div className={styles.headerIconBtn} role="button" tabIndex="0">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
            <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Z"/>
          </svg>
        </div>

        <div className={styles.headerIconBtn} role="button" tabIndex="0">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
            <rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"/>
            <path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}