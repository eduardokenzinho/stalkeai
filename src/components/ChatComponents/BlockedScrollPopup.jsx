import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BlockedScrollPopup.module.css";

export default function BlockedScrollPopup({
  show,
  onClose,
  title = "⚠️ Ação bloqueada",
  description = "Seja um membro VIP do Stalkea.ai para carregar mais mensagens"
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.popup}>
        <div className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L12 13M12 17L12 17.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>
          {description}
        </p>

        <button className={styles.button} onClick={() => navigate("/cta")}>
          Adquirir Acesso VIP
        </button>
      </div>
    </>
  );
}