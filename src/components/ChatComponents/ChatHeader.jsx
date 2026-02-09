import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatHeader.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";

import backIcon from "../../assets/chat/setaparaolado2.svg";
import phoneIcon from "../../assets/chat/telefone.svg";
import videoIcon from "../../assets/chat/video.svg";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";

export default function ChatHeader() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className={styles.chatPageHeader}>
        <div className={styles.chatPageHeaderLeft}>
          <button className={styles.chatPageBackButton} aria-label="Voltar" onClick={() => navigate('/direct')}>
            <img src={backIcon} alt="Voltar" />
          </button>

          <div className={styles.chatPageUserInfo}>
            <button className={styles.chatPageAvatarBtn} aria-label="Avatar">
              <span className={styles.chatPageAvatarGradient}>
                <span className={styles.chatPageAvatarInner}>
                  <img
                    src={avatarFallback}
                    alt=""
                    className={styles.chatPageAvatarImg}
                  />
                </span>
              </span>
            </button>

            <button className={styles.chatPageNameBtn}>
              <span className={styles.chatPageUserName}>Jo******</span>
              <span className={styles.chatPageUserStatus}>Online</span>
            </button>
          </div>
        </div>

        <div className={styles.chatPageHeaderRight}>
          <button className={styles.chatPageHeaderIconBtn} aria-label="Ligação de áudio" onClick={() => setShowPopup(true)}>
            <img src={phoneIcon} alt="Áudio" />
          </button>

          <button className={styles.chatPageHeaderIconBtn} aria-label="Ligação de vídeo" onClick={() => setShowPopup(true)}>
            <img src={videoIcon} alt="Vídeo" />
          </button>
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para realizar chamadas"
      />
    </>
  );
}