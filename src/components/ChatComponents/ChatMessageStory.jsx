import { useState } from "react";
import styles from "./ChatMessageStory.module.css";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";
import BlockedScrollPopup from "./BlockedScrollPopup";

export default function ChatMessageStory({ 
  storyImage,
  username = "usuario",
  userAvatar = null,
  reaction = null, 
  showAvatar = true,
  isSent = false
}) {
  const [showBlockPopup, setShowBlockPopup] = useState(false);

  const handleClick = () => {
    // Bloquear ao clicar no story
    setShowBlockPopup(true);
  };

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
        
        <div className={styles.igMessageBubbleContainer}>
          <div className={styles.storyContainer} onClick={handleClick}>
            {/* Header com avatar e nome */}
            <div className={styles.storyHeader}>
              <img 
                src={userAvatar || avatarFallback} 
                alt={username}
                className={styles.storyAvatar}
              />
              <div className={styles.storyInfo}>
                <span className={styles.storyName}>{username}</span>
              </div>
            </div>

            {/* Imagem do Story */}
            <img 
              src={storyImage} 
              alt="Story" 
              className={styles.storyImage}
            />

            {/* Botão de Play no centro */}
            <div className={styles.playButton}>
              <svg width="32.5" height="32.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5 L8 19 L19 12 Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Ícone de Clip no canto inferior esquerdo */}
            <div className={styles.clipIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="play-mask">
                    <rect width="24" height="24" fill="#F9F9F9"/>
                    <path d="M10 8 L10 16 L16 12 Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                  </mask>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="#F9F9F9" mask="url(#play-mask)"/>
              </svg>
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
        show={showBlockPopup} 
        onClose={() => setShowBlockPopup(false)}
        title="🔒 Conteúdo bloqueado"
        description="Apenas membros VIP podem visualizar stories compartilhados"
      />
    </>
  );
}