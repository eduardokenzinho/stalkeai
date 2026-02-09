import { useState } from "react";
import styles from "./FeedPost.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";

import likeIcon from "../../assets/feed/coracao.svg";
import commentIcon from "../../assets/feed/comentario.svg";
import sendIcon from "../../assets/feed/enviar.svg";
import saveIcon from "../../assets/feed/salvar.svg";

function formatNumber(n) {
  if (n >= 1000000) {
    const val = (n / 1000000).toFixed(1).replace(".", ",");
    return `${val} mi`;
  }
  if (n >= 1000) {
    const val = (n / 1000).toFixed(n >= 10000 ? 1 : 0).replace(".", ",");
    return `${val} mil`;
  }
  return n.toLocaleString("pt-BR");
}

export default function FeedPost({ username, avatar, likes, comments, time, blurLevel = 0, location, description, postImage, imageBlur, avatarBlur }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleBlocked = () => setShowPopup(true);

  const blur = Math.max(0, (blurLevel - 2) * 1.5);
  const postStyle = blur > 0 ? { filter: `blur(${blur}px)` } : undefined;

  const finalAvatarBlur = avatarBlur !== undefined ? avatarBlur : 5;
  const avatarStyle = { filter: `blur(${finalAvatarBlur}px)` };

  return (
    <>
      <article className={styles.feedPost} style={postStyle}>

        {/* HEADER */}
        <header className={styles.postHeader}>
          <div className={styles.postUser}>
            <div className={styles.postAvatarWrapper}>
              <img src={avatar} alt="" className={styles.postAvatar} style={avatarStyle} />
            </div>
            <div className={styles.postUserInfo}>
              <span className={styles.postUsername}>{username}</span>
              {location && <span className={styles.postLocation}>{location}</span>}
            </div>
          </div>
          <button className={styles.postMenu} onClick={handleBlocked}>•••</button>
        </header>

        {/* IMAGEM */}
        <div className={styles.postImageContainer} onClick={handleBlocked}>
          <img
            src={postImage || avatar}
            alt=""
            className={styles.postImage}
            style={{
              filter: `blur(${imageBlur !== undefined ? imageBlur : 30}px)`,
              transform: "scale(1.15)",
            }}
          />
          <div className={styles.postRestricted}>
            <svg
              className={styles.restrictedIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M16.5 10.5V8a4.5 4.5 0 10-9 0v2.5M9 10.5h6a3 3 0 013 3v4.5a3 3 0 01-3 3H9a3 3 0 01-3-3v-4.5a3 3 0 013-3z"
              />
            </svg>
            <p className={styles.restrictedTitle}>Conteúdo restrito</p>
          </div>
        </div>

        {/* AÇÕES */}
        <div className={styles.postActions}>
          <div className={styles.postActionsLeft}>
            <button className={styles.actionBtn} onClick={handleBlocked}>
              <img src={likeIcon} alt="Curtir" />
            </button>
            <button className={styles.actionBtn} onClick={handleBlocked}>
              <img src={commentIcon} alt="Comentar" />
            </button>
            <button className={styles.actionBtn} onClick={handleBlocked}>
              <img src={sendIcon} alt="Enviar" />
            </button>
          </div>
          <button className={styles.actionBtn} onClick={handleBlocked}>
            <img src={saveIcon} alt="Salvar" />
          </button>
        </div>

        {/* CURTIDAS */}
        <div className={styles.postLikes} onClick={handleBlocked}>
          {formatNumber(likes)} curtidas
        </div>

        {/* DESCRIÇÃO */}
        {description && (
          <div className={styles.postDescription}>
            <span className={styles.postDescriptionUser}>{username}</span>
            <span className={styles.postDescriptionText}>{description}</span>
          </div>
        )}

        {/* COMENTÁRIOS */}
        {comments > 0 && (
          <div className={styles.postCommentsLink} onClick={handleBlocked}>
            Ver todos os {formatNumber(comments)} comentários
          </div>
        )}

        {/* DATA */}
        <div className={styles.postTime}>{time}</div>

      </article>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="🔒 Conteúdo bloqueado"
        description="Seja um membro VIP do Stalkea.ai para interagir com as publicações"
      />
    </>
  );
}
