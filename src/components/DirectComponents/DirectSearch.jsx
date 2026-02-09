import styles from "./DirectSearch.module.css";

export default function DirectSearch() {
  return (
    <div className={styles.directSearchWrapper}>
      <div className={styles.directSearch}>
        <span className={styles.directSearchIcon}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 500 500" 
            width="20" 
            height="20" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="metaAiClip">
                <rect width="500" height="500" x="0" y="0"/>
              </clipPath>
              
              <g id="metaAiCircle">
                <g transform="matrix(1,0,0,1,217,229)" opacity="1">
                  <g opacity="1" transform="matrix(1,0,0,1,33,21)">
                    <path 
                      strokeLinecap="butt" 
                      strokeLinejoin="miter" 
                      fillOpacity="0" 
                      strokeMiterlimit="4" 
                      stroke="rgb(101,101,101)" 
                      strokeOpacity="1" 
                      strokeWidth="80" 
                      d="M107.437,-123.744 C137.552,-89.059 165.670,-50.757 168.594,2.023 C170.965,46.056 157.400,90.088 123.744,123.744 C89.573,157.915 44.786,175 0,175 C-44.786,175 -89.573,157.915 -123.744,123.744 C-157.409,90.079 -169.732,46.093 -168.594,1.989 C-167.378,-44.776 -146.092,-85.590 -107.436,-123.744 C-74.980,-155.790 -38.305,-175.253 0.868,-174.997 C39.463,-174.745 77.990,-157.661 107.437,-123.744z"
                    />
                  </g>
                </g>
              </g>
              
              <linearGradient 
                id="metaAiGradient" 
                spreadMethod="pad" 
                gradientUnits="userSpaceOnUse" 
                x1="-179.993" 
                y1="-7.325" 
                x2="200.808" 
                y2="8.270"
              >
                <stop offset="1%" stopColor="rgb(250,17,247)"/>
                <stop offset="18%" stopColor="rgb(135,30,234)"/>
                <stop offset="52%" stopColor="rgb(19,43,221)"/>
                <stop offset="85%" stopColor="rgb(15,124,238)"/>
                <stop offset="99%" stopColor="rgb(11,206,255)"/>
              </linearGradient>
              
              <mask id="metaAiMask" maskType="alpha">
                <use xlinkHref="#metaAiCircle"/>
              </mask>
            </defs>
            
            <g clipPath="url(#metaAiClip)">
              <g mask="url(#metaAiMask)">
                <g transform="matrix(0.289,0.957,-0.957,0.289,260.577,212.342)" opacity="1">
                  <g opacity="1" transform="matrix(1,0,0,1,33,21)">
                    <path 
                      fill="url(#metaAiGradient)" 
                      fillOpacity="1" 
                      d="M155.360,-155.329 C198.908,-111.781 220.355,-54.501 219.699,2.572 C219.063,57.952 197.616,113.138 155.360,155.394 C112.458,198.296 56.229,219.747 -0.001,219.747 C-56.231,219.747 -112.461,198.296 -155.363,155.394 C-197.630,113.127 -219.075,57.924 -219.701,2.529 C-220.345,-54.530 -198.900,-111.792 -155.363,-155.329 C-112.142,-198.550 -55.394,-220 1.254,-219.678 C57.065,-219.361 112.777,-197.912 155.360,-155.329z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>

        <input
          type="text"
          className={styles.directSearchInput}
          placeholder="Interaja com a Meta AI ou pesquise"
        />
      </div>
    </div>
  );
}