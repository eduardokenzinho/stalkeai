import styles from "./ChatBody.module.css";

export default function OldMessage({ children }) {
  return (
    <div className={styles.oldMessage}>
      {children}
    </div>
  );
}