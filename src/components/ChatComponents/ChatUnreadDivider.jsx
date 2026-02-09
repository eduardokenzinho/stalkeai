import styles from "./ChatUnreadDivider.module.css";

export default function ChatUnreadDivider({ text = "Novas mensagens" }) {
  return (
    <div className={styles.unreadDivider}>
      <div className={styles.unreadLine}></div>
      <span className={styles.unreadText}>{text}</span>
      <div className={styles.unreadLine}></div>
    </div>
  );
}