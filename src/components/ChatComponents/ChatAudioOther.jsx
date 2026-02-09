import { useState, useRef } from "react";
import styles from "./ChatAudioOther.module.css";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";
import BlockedScrollPopup from "./BlockedScrollPopup";

export default function ChatAudioOther({ 
  duration = "0:20", 
  showAvatar = true, 
  showTranscript = true,
  reaction = null 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  
  const [waveHeights] = useState(() => {
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 11) + 18);
  });

  const togglePlay = () => {
    // BLOQUEAR - Mostrar popup de VIP
    setShowBlockPopup(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = 
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <>
      <div className={`${styles.message} ${reaction ? styles.hasReaction : ''}`}>
        <img
          src={avatarFallback}
          alt=""
          className={`${styles.avatar} ${!showAvatar ? styles.avatarHidden : ''}`}
          draggable={false}
        />

        <div className={styles.bubble}>
          <div className={styles.audioRecebido}>
            <button
              type="button"
              className={styles.playBtn}
              onClick={togglePlay}
              aria-label="Reproduzir áudio"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>

            <div className={styles.waveform} ref={waveformRef}>
              {waveHeights.map((height, i) => {
                const barProgress = (i / waveHeights.length) * 100;
                const isActive = barProgress <= progress;
                
                return (
                  <div
                    key={i}
                    className={`${styles.waveBar} ${isPlaying ? styles.playing : ''} ${isActive ? styles.active : ''}`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>

            <span className={styles.duration}>{duration}</span>

            {showTranscript && (
              <div className={styles.transcricao}>
                Ver transcrição
              </div>
            )}
          </div>

          {reaction && (
            <div className={styles.reaction}>
              {reaction}
            </div>
          )}
        </div>

        {false && (
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
        )}
      </div>

      <BlockedScrollPopup 
        show={showBlockPopup} 
        onClose={() => setShowBlockPopup(false)}
        title="🔒 Conteúdo bloqueado"
        description="Apenas membros VIP podem ouvir mensagens de áudio"
      />
    </>
  );
}
