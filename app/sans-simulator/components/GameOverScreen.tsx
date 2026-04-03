type Props = {
  score: number;
  onRestart: () => void;
};

export default function GameOverScreen({ score, onRestart }: Props) {
  return (
    <div
      className="absolute inset-0 z-[220] flex items-center justify-center"
      style={{ background: "#000", animation: "utFadeIn 0.5s steps(4) forwards" }}
    >
      <div
        style={{
          border: "4px solid #fff",
          outline: "4px solid #000",
          outlineOffset: "-8px",
          boxShadow: "0 0 0 8px #fff, 0 0 0 12px #000",
          padding: "48px 56px",
          textAlign: "center",
          maxWidth: 440,
          width: "90%",
          background: "#000",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "#aaa",
            marginBottom: 28,
            letterSpacing: "0.05em",
            lineHeight: 1.7,
          }}
        >
          * you feel your sins crawling on your back.
        </p>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.08em",
            marginBottom: 4,
            textShadow: "4px 4px 0 #444",
            lineHeight: 1,
          }}
        >
          GAME OVER
        </div>
        <div style={{ height: 3, background: "#fff", margin: "20px 0" }} />
        <p
          style={{
            fontSize: 14,
            color: "#aaa",
            marginBottom: 24,
            fontStyle: "italic",
            letterSpacing: "0.03em",
          }}
        >
          &ldquo;geez, kid. you really let yourself go.&rdquo;
        </p>
        <div
          style={{
            border: "3px solid #fff",
            padding: "14px 0",
            marginBottom: 28,
            background: "#000",
          }}
        >
          <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.35em", marginBottom: 6 }}>
            SCORE
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: "#fff",
              textShadow: "3px 3px 0 #555",
              letterSpacing: "0.1em",
            }}
          >
            {score}
          </div>
        </div>
        <button
          onClick={onRestart}
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#000",
            background: "#fff",
            border: "none",
            padding: "12px 36px",
            cursor: "pointer",
            letterSpacing: "0.15em",
            outline: "3px solid #fff",
            outlineOffset: "3px",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "#000";
            event.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "#fff";
            event.currentTarget.style.color = "#000";
          }}
        >
          STAY DETERMINED
        </button>
      </div>
    </div>
  );
}
