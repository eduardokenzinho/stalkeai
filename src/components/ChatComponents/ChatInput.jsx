import { useState } from "react";
import styles from "./ChatInput.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";

import cameraIcon from "../../assets/chat/camera.svg";
import micIcon from "../../assets/chat/microfone.svg";
import galleryIcon from "../../assets/chat/galeria.svg";
import stickerIcon from "../../assets/chat/sticker.svg";
import heartIcon from "../../assets/chat/coracao.svg";

export default function ChatInput() {
  const [showPopup, setShowPopup] = useState(false);

  const handleBlocked = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <>
      <div className={styles.chatInputContainer}>
        <div className={styles.chatInputPill}>
          <div className={styles.chatInputCamera} onClick={handleBlocked}>
            <img src={cameraIcon} alt="Câmera" />
          </div>

          <input
            type="text"
            className={styles.chatInputField}
            placeholder="Mensagem..."
            onFocus={handleBlocked}
            readOnly
          />

          <div className={styles.chatInputIcons}>
            <img src={micIcon} alt="Áudio" onClick={handleBlocked} />
            <img src={galleryIcon} alt="Galeria" onClick={handleBlocked} />
            <img src={stickerIcon} alt="Sticker" onClick={handleBlocked} />
            <img src={heartIcon} alt="Curtir" onClick={handleBlocked} />
          </div>
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para enviar mensagens"
      />
    </>
  );
}