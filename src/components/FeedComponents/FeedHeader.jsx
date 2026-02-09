import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FeedHeader.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import instaLogo from "../../assets/feed/logo-insta.png";
import heartIcon from "../../assets/feed/coracao.svg";
import sendIcon from "../../assets/feed/enviar.svg";

export default function FeedHeader() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <header className={styles.feedHeader}>
        <div className={styles.feedHeaderLeft}>
          <img src={instaLogo} alt="Instagram" className={styles.feedLogo} />
        </div>

        <div className={styles.feedHeaderRight}>
          <button className={styles.iconButton} onClick={() => setShowPopup(true)}>
            <img src={heartIcon} alt="Curtidas" />
            <span className={styles.notificationDot} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate('/direct')}>
            <img src={sendIcon} alt="Directs" />
            <span className={styles.notificationBadge}>2</span>
          </button>
        </div>
      </header>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para ver solicitações e notificações"
      />
    </>
  );
}