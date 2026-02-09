export default function ChatAudioSent({ duration = "0:07" }) {
  return (
    <div className="ig-message ig-message-sent">
      <div className="ig-message-bubble">
        <div className="ig-audio ig-audio-sent">
          <button className="ig-audio-play">
            ▶
          </button>

          <div className="ig-audio-wave">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <span className="ig-audio-time">{duration}</span>
        </div>
      </div>
    </div>
  );
}
