import { useState } from "react";
import styles from "./ChatVideoCallMissed.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";

export default function ChatVideoCallMissed() {
  const [showPopup, setShowPopup] = useState(false);

  const handleCallBack = () => {
    // Bloquear ação
    setShowPopup(true);
  };

  return (
    <>
      <div className={styles.messageSystem}>
        <div className={styles.messageSystemContent}>
          <i className="fas fa-video"></i>
          <span>Ligação de vídeo perdida</span>
        </div>
        <button 
          className={styles.messageSystemBtn}
          onClick={handleCallBack}
        >
          Ligar de volta
        </button>
      </div>

      <BlockedScrollPopup 
        show={showPopup} 
        onClose={() => setShowPopup(false)}
        title="🔒 Ação bloqueada"
        description="Apenas membros VIP podem realizar chamadas de vídeo"
      />
    </>
  );
}