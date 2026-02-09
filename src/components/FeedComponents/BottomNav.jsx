import { useState } from "react";
import styles from "./BottomNav.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";

import homeIcon from "../../assets/feed/casa.svg";
import searchIcon from "../../assets/feed/lupa.svg";
import reelsIcon from "../../assets/feed/reels.svg";
import profileIcon from "../../assets/feed/perfil-sem-foto.jpeg";

export default function BottomNav() {
  const [showPopup, setShowPopup] = useState(false);

  const handleBlocked = () => setShowPopup(true);
  let profileImageUrl = profileIcon;
  try {
    const stored = JSON.parse(localStorage.getItem('current_profile') || '{}');
    if (stored && stored.profileImageUrl) {
      profileImageUrl = stored.profileImageUrl;
    }
  } catch {
    // ignore storage parse errors
  }

  return (
    <>
      <nav className={styles.bottomNav}>
        <button className={styles.navBtn}>
          <img src={homeIcon} alt="Home" />
        </button>

        <button className={styles.navBtn} onClick={handleBlocked}>
          <img src={searchIcon} alt="Buscar" />
        </button>

        <button className={`${styles.navBtn} ${styles.navPlus}`} aria-label="Criar" onClick={handleBlocked}>
          <span className={styles.plusChar}>+</span>
        </button>

        <button className={styles.navBtn} onClick={handleBlocked}>
          <img src={reelsIcon} alt="Reels" />
        </button>

        <button className={`${styles.navBtn} ${styles.profile}`} onClick={handleBlocked}>
          <img src={profileImageUrl} alt="Perfil" />
        </button>
      </nav>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para acessar esta funcionalidade"
      />
    </>
  );
}
