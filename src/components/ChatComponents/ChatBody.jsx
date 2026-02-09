import { useRef, useEffect, useState } from "react";
import styles from "./ChatBody.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";

export default function ChatBody({ children }) {
  const bodyRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // Scroll automático para o final quando monta
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bodyRef.current) return;

      const scrollTop = bodyRef.current.scrollTop;

      // Mostrar popup SOMENTE quando chegar BEM no topo (primeiros 20px)
      if (scrollTop < 20) {
        setShowPopup(true);
      }
    };

    const element = bodyRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      <div 
        ref={bodyRef}
        className={styles.chatBody}
      >
        <div className={styles.chatBodyInner}>
          {children}
        </div>
      </div>

      <BlockedScrollPopup 
        show={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </>
  );
}