import { useState } from "react";
import styles from "./DirectHeader.module.css";
import { useNavigate } from "react-router-dom";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";

export default function DirectHeader() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const username = localStorage.getItem('current_username') || 'Teste';

  return (
    <>
      <div
        className={styles.directHeader}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0B1014",
          zIndex: 50,
        }}
      >
        <div className={styles.directHeaderInner}>
          {/* ESQUERDA */}
          <div className={styles.directLeft}>
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => navigate("/feed")}
              className={styles.directBack}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F9F9F9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <h1
              className={styles.directUsername}
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.3px",
                color: "#F9F9F9",
              }}
            >
              {username}
            </h1>
          </div>

          {/* DIREITA */}
          <div className={styles.directRight}>
            {/* CAMERA ICON */}
            <svg
              id={styles.directCameraIconHeader}
              width="24"
              height="24"
              viewBox="0 0 69 69"
              fill="none"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPopup(true)}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.8471 0.558896C27.5641 1.4949 25.7521 3.6039 19.6111 13.6319C17.4081 17.2299 15.3201 19.0549 10.7811 21.3459C7.51206 22.9959 3.92306 25.5089 2.80506 26.9299C-2.18494 33.2729 -0.395945 40.6819 7.20506 45.1619C16.6311 50.7169 18.1311 52.0689 21.3811 57.9379C25.9281 66.1469 28.6881 68.4199 34.1131 68.4199C39.7151 68.4199 43.4841 65.3589 47.7611 57.3319C50.5401 52.1179 51.8141 50.8849 58.1341 47.2889C65.8431 42.9029 68.6341 39.4949 68.6341 34.4659C68.6341 29.1849 66.2281 26.1259 58.4791 21.5519C51.9381 17.6909 50.6991 16.4519 47.1581 10.2269C42.1781 1.4739 37.4551 -1.3261 30.8471 0.558896ZM41.2421 12.4199C45.1841 19.3819 49.6631 23.8629 56.6341 27.8189C61.6411 30.6609 62.1341 31.2509 62.1341 34.4039C62.1341 37.6079 61.6531 38.1459 55.6941 41.6109C47.6871 46.2669 46.2451 47.7059 41.6841 55.5939C38.3161 61.4189 37.7551 61.9199 34.6011 61.9199C31.8761 61.9199 30.7941 61.3069 29.3111 58.9199C21.8511 46.9169 21.0491 46.0149 14.8281 42.6199C11.3601 40.7279 7.82105 38.1079 6.96305 36.7999C5.56105 34.6599 5.55806 34.1839 6.93406 32.0839C7.77606 30.7989 11.5491 27.9159 15.3181 25.6769C21.4241 22.0489 22.6481 20.7729 26.5451 13.9609C30.8301 6.4719 30.9931 6.3219 34.5231 6.6179C37.7361 6.8869 38.4661 7.5179 41.2421 12.4199ZM22.9431 26.0559C21.4701 29.8949 26.7831 32.7159 28.9671 29.2539C29.7301 28.0449 29.6571 27.1529 28.7041 26.0039C26.9931 23.9429 23.7431 23.9719 22.9431 26.0559ZM40.0181 25.8619C38.9531 28.6369 40.0901 30.9199 42.5391 30.9199C45.6931 30.9199 47.4801 28.1439 45.7041 26.0039C44.0621 24.0259 40.7541 23.9429 40.0181 25.8619ZM40.0651 37.4749C36.5741 39.7759 31.7631 39.9849 29.0751 37.9519C28.0081 37.1439 26.0901 36.4689 24.8141 36.4519C22.9831 36.4269 22.5621 36.8859 22.8141 38.6359C23.3121 42.0869 29.1181 45.4199 34.6341 45.4199C42.3761 45.4199 49.6601 39.1099 44.8751 36.5489C43.4611 35.7919 42.2691 36.0219 40.0651 37.4749Z"
                fill="#F9F9F9"
              />
            </svg>

            {/* NOVA MENSAGEM */}
            <svg
              id={styles.directNewMessageIcon}
              aria-label="Nova mensagem"
              fill="#F9F9F9"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              role="img"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPopup(true)}
            >
              <title>Nova mensagem</title>
              <path
                d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                fill="none"
                stroke="#F9F9F9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                fill="none"
                stroke="#F9F9F9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16.848"
                y1="3.924"
                x2="20.076"
                y2="7.153"
                fill="none"
                stroke="#F9F9F9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para acessar esta funcionalidade"
      />
    </>
  );
}