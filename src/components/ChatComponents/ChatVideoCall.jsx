import styles from "./ChatVideoCall.module.css";

export default function ChatVideoCall({ 
  duration = "01:43",
  type = "normal" // "normal" ou "ended"
}) {
  return (
    <div className={`${styles.messageSystem} ${styles[type]}`}>
      <div className={styles.messageSystemContent}>
        <i className="fas fa-video"></i>
        <div className={styles.messageSystemTextWrapper}>
          <span>{type === "ended" ? "Ligação de vídeo encerrada" : "Chamada de vídeo"}</span>
          <span className={styles.messageSystemTime}>{duration}</span>
        </div>
      </div>
    </div>
  );
}