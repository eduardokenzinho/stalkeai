import { useState, useEffect } from 'react';
import styles from "./ChatMessage.module.css";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";
import { useGeolocation, getNearbyCities } from "../../hooks/useGeolocation";

export default function ChatMessageLocation({ 
  textBefore = "Casa de",
  textAfter = "",
  reaction = null, 
  showAvatar = true,
  useNearbyCity = false // true para usar cidade vizinha, false para usar cidade do IP
}) {
  const { location, loading } = useGeolocation();
  const [displayCity, setDisplayCity] = useState("...");

  useEffect(() => {
    async function fetchCity() {
      if (!location) return;
      
      if (useNearbyCity) {
        // Tentar buscar cidade vizinha
        const nearbyCities = await getNearbyCities(
          location.lat, 
          location.lon, 
          location.city
        );
        
        // Usar primeira cidade encontrada, ou fallback para cidade do IP
        const city = nearbyCities[0] || nearbyCities[1] || location.city;
        setDisplayCity(city);
      } else {
        // Usar cidade do IP
        setDisplayCity(location.city);
      }
    }
    
    fetchCity();
  }, [location, useNearbyCity]);

  const fullText = `${textBefore} ${displayCity}${textAfter}`;

  return (
    <div className={`${styles.igMessage} ${styles.igMessageOther}`}>
      <img
        src={avatarFallback}
        alt=""
        className={`${styles.igMessageAvatar} ${!showAvatar ? styles.igMessageAvatarHidden : ''}`}
      />
      
      <div className={styles.igMessageBubbleContainer}>
        <div className={`${styles.igMessageBubble} ${styles.igMessageBubbleOther}`}>
          {textBefore} <span className={styles.blurWord}>{loading ? "..." : displayCity}</span>{textAfter}
        </div>
        
        {reaction && (
          <div className={styles.igMessageReaction}>
            {reaction}
          </div>
        )}
      </div>
    </div>
  );
}