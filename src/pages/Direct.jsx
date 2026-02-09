import { useState, useRef, useEffect, useCallback } from "react";
import DirectHeader from "../components/DirectComponents/DirectHeader";
import DirectSearch from "../components/DirectComponents/DirectSearch";
import DirectStories from "../components/DirectComponents/DirectStories";
import DirectMessagesHeader from "../components/DirectComponents/DirectMessagesHeader";
import DirectItem from "../components/DirectComponents/DirectItem";
import TrialBannerDirect from "../components/TrialComponents/TrialBannerDirect";
import BlockedScrollPopup from "../components/ChatComponents/BlockedScrollPopup";
import "./Direct.css";

export default function Direct() {
  const pageRef = useRef(null);
  const lockedRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [darkenLevel, setDarkenLevel] = useState(0);
  const popupShownRef = useRef(false);

  const handleScroll = useCallback(() => {
    const el = pageRef.current;
    const sentinel = lockedRef.current;
    if (!el || !sentinel) return;

    const containerRect = el.getBoundingClientRect();
    const sentinelRect = sentinel.getBoundingClientRect();

    // Distância do sentinel ao fundo visível da página
    // Valores negativos = sentinel já passou (user rolou além dos chats acessíveis)
    const distFromBottom = sentinelRect.top - containerRect.bottom;

    // Escurecer só depois de ~5 chats bloqueados vistos (72px * 5 = 360px)
    if (distFromBottom < -300) {
      const intensity = Math.min(1, (-300 - distFromBottom) / 200);
      setDarkenLevel(intensity);
    } else {
      setDarkenLevel(0);
    }

    // Popup só depois de ~7-8 chats bloqueados vistos (~500px além do sentinel)
    if (distFromBottom < -480 && !popupShownRef.current) {
      popupShownRef.current = true;
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="direct-page" ref={pageRef}>
        <DirectHeader />
        <DirectSearch />
        <DirectStories />
        <DirectMessagesHeader />

        <div className="direct-items-container">
          <DirectItem lockedRef={lockedRef} />
        </div>

        {/* Overlay escuro sobre a área bloqueada */}
        {darkenLevel > 0 && (
          <div
            className="direct-darken-overlay"
            style={{ opacity: darkenLevel }}
          />
        )}
      </div>

      <TrialBannerDirect position="bottom" />

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => {
          setShowPopup(false);
          // Volta o scroll para cima dos chats bloqueados
          if (lockedRef.current) {
            lockedRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
          }
          // Permite re-trigger se o user rolar de novo
          setTimeout(() => { popupShownRef.current = false; }, 1000);
        }}
        title="⚠️ Conversas bloqueadas"
        description="Seja um membro VIP do Stalkea.ai para desbloquear todas as conversas"
      />
    </>
  );
}
