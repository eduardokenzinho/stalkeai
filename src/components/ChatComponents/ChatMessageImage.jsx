import { useState } from "react";
import styles from "./ChatMessageImage.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";

export default function ChatMessageImage({
  imageSrc,
  reaction = null,
  showAvatar = true,
  isSent = false
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className={`${styles.igMessage} ${isSent ? styles.igMessageMe : styles.igMessageOther}`}>
        {!isSent && (
          <img
            src={avatarFallback}
            alt=""
            className={`${styles.igMessageAvatar} ${!showAvatar ? styles.igMessageAvatarHidden : ''}`}
          />
        )}

        <div className={styles.igMessageBubbleContainer} onClick={() => setShowPopup(true)} style={{ cursor: "pointer" }}>
          <div className={styles.messagePhoto}>
            <img
              src={imageSrc}
              alt=""
              className={styles.videoBlurred}
            />

            <div className={styles.videoSensitiveOverlay}>
              <div className={styles.videoSensitiveContent}>
                <div className={styles.videoSensitiveIcon}>
                  <i className="fas fa-eye-slash"></i>
                </div>
              </div>
            </div>
          </div>

          {reaction && (
            <div className={styles.igMessageReaction}>
              {reaction}
            </div>
          )}
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="🔒 Conteúdo bloqueado"
        description="Apenas membros VIP podem visualizar fotos e vídeos"
      />
    </>
  );
}