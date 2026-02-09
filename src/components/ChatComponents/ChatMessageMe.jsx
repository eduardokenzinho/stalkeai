import styles from "./ChatMessage.module.css";

export default function ChatMessageMe({ 
  text, 
  reaction = null, 
  blurWords = [],
  replyTo = null // { label: "Você respondeu", text: "G adivinha o que vc esqueceu aqui?" }
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
    <div className={`${styles.igMessage} ${styles.igMessageMe}`}>
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
        <div className={`${styles.igMessageBubble} ${styles.igMessageBubbleMe}`}>
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