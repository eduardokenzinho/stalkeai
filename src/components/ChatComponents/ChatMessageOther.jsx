import styles from "./ChatMessage.module.css";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";

export default function ChatMessageOther({ 
  text, 
  reaction = null, 
  blurWords = [], 
  showAvatar = true,
  replyTo = null // { label: "respondeu a você", text: "Na sua prima?" }
}) {
  // Função para aplicar blur nas palavras especificadas
  const renderTextWithBlur = () => {
    if (!blurWords || blurWords.length === 0) {
      return text;
    }

    let result = text;
    blurWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '<span class="' + styles.blurWord + '">$1</span>');
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className={`${styles.igMessage} ${styles.igMessageOther}`}>
      <img
        src={avatarFallback}
        alt=""
        className={`${styles.igMessageAvatar} ${!showAvatar ? styles.igMessageAvatarHidden : ''}`}
      />
      
      <div className={styles.igMessageBubbleContainer}>
        {/* Resposta FORA da bolha (se existir) */}
        {replyTo && (
          <div className={styles.igMessageReply}>
            <div className={styles.replyLabel}>
              {replyTo.label}
            </div>
            <div className={styles.replyContentWrapper}>
              <div className={styles.replyLine}></div>
              <div className={styles.replyContent}>
                {replyTo.text}
              </div>
            </div>
          </div>
        )}
        
        {/* Bolha com texto */}
        <div className={`${styles.igMessageBubble} ${styles.igMessageBubbleOther}`}>
          {renderTextWithBlur()}
        </div>
        
        {/* Reação (se existir) */}
        {reaction && (
          <div className={styles.igMessageReaction}>
            {reaction}
          </div>
        )}
      </div>
    </div>
  );
}