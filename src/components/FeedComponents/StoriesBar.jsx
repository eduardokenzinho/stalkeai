import { useState } from "react";
import styles from "./StoriesBar.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import selfAvatarFallback from "../../assets/feed/perfil-sem-foto.jpeg";
import av1 from "../../assets/feed/av-fallback-1.jpg";
import av2 from "../../assets/feed/av-fallback-2.jpg";
import av3 from "../../assets/feed/av-fallback-3.jpg";
import av4 from "../../assets/feed/av-fallback-4.jpg";
import av5 from "../../assets/feed/av-fallback-5.jpg";
import av6 from "../../assets/feed/av-fallback-6.jpg";
import av7 from "../../assets/feed/av-fallback-7.jpg";
import av8 from "../../assets/feed/av-fallback-8.jpg";
import av9 from "../../assets/feed/av-fallback-9.jpg";
import av10 from "../../assets/feed/av-fallback-10.jpg";

const STORIES = [
  { name: "Pe*****", type: "locked", avatar: av1 },
  { name: "Lo*****", type: "locked", avatar: av2 },
  { name: "Sw*****", type: "locked", avatar: av3 },
  { name: "En*****", type: "locked", avatar: av4 },
  { name: "La*****", type: "locked", avatar: av5 },
  { name: "Jo*****", type: "locked", avatar: av6 },
  { name: "Th*****", type: "locked", avatar: av7 },
  { name: "Be*****", type: "locked", avatar: av8 },
  { name: "So*****", type: "locked", avatar: av9 },
  { name: "Le*****", type: "locked", avatar: av10 },
  { name: "Ma*****", type: "locked", avatar: av1 },
  { name: "Ga*****", type: "locked", avatar: av2 },
  { name: "Is*****", type: "locked", avatar: av3 },
  { name: "Ra*****", type: "locked", avatar: av4 },
  { name: "Lu*****", type: "locked", avatar: av5 },
  { name: "Ca*****", type: "locked", avatar: av6 },
  { name: "Vi*****", type: "locked", avatar: av7 },
  { name: "Fe*****", type: "locked", avatar: av8 },
  { name: "Na*****", type: "locked", avatar: av9 },
  { name: "Di*****", type: "locked", avatar: av10 },
];

function maskUsername(username) {
  if (!username) return "Perfil";
  if (username.length <= 2) return `${username[0] || ""}*****`;
  return `${username.slice(0, 2)}*****`;
}

function toProxyImageUrl(imageUrl) {
  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `/api/proxy-image?raw=1&url=${encodeURIComponent(imageUrl)}`;
}

export default function StoriesBar({ followedProfiles = [] }) {
  const [showPopup, setShowPopup] = useState(false);

  const profile = JSON.parse(localStorage.getItem('current_profile') || '{}');
  const selfAvatar = profile.profileImageUrl || selfAvatarFallback;

  const visibleStories = followedProfiles.length > 0
    ? [
        ...followedProfiles.slice(0, 5).map((followed, index) => ({
          name: maskUsername(followed.username || followed.fullName),
          type: 'locked',
          avatar: toProxyImageUrl(followed.avatarRaw || followed.avatar) || STORIES[index]?.avatar,
        })),
        ...STORIES.slice(followedProfiles.length),
      ]
    : STORIES;

  return (
    <>
      <section className={styles.storiesWrapper}>
        <div className={styles.storiesContainer}>

          {/* SEU STORY */}
          <div className={styles.storyItem}>
            <button className={styles.storyButton} onClick={() => setShowPopup(true)}>
              <div className={`${styles.storyRing} ${styles.self}`}>
                <div className={styles.storyAvatar}>
                  <img src={selfAvatar} alt="Seu story" />
                </div>
                <div className={styles.addStory}>
                  <span>+</span>
                </div>
              </div>
            </button>
            <span className={styles.storyUsername}>Seu story</span>
          </div>

          {/* STORIES FAKE (IG-LIKE) */}
          {visibleStories.map((story, index) => (
            <div className={styles.storyItem} key={index}>
              <button className={styles.storyButton} onClick={() => setShowPopup(true)}>
                <div className={`${styles.storyRing} ${styles[story.type]} ${index >= 1 && index <= 2 ? styles.closeFriend : ''}`}>
                  <div className={styles.storyAvatar}>
                    <img src={story.avatar} alt={story.name} />
                  </div>
                </div>
              </button>
              <span className={styles.storyUsername}>{story.name}</span>
            </div>
          ))}

        </div>
      </section>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="🔒 Story bloqueado"
        description="Seja um membro VIP do Stalkea.ai para visualizar stories"
      />
    </>
  );
}
