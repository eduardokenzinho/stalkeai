import styles from "./ChatMessageTime.module.css";

export default function ChatMessageTime({ time }) {
  return (
    <div className={styles.messageTime}>
      {time}
    </div>
  );
}