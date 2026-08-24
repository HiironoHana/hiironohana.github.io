type Props = {
  score: number;
  onRestart: () => void;
  uiScale?: number;
};

export default function GameOverScreen({ score, onRestart, uiScale = 1 }: Props) {
  const borderWidth = Math.max(3, 4 * uiScale);
  const outlineOffset = Math.max(6, 8 * uiScale);

  return (
    <div
      className="absolute inset-0 z-[220] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-over-title"
      style={{ background: "#000", animation: "utFadeIn 0.5s steps(4) forwards", overflowY:"auto", padding:"max(20px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left))" }}
    >
      <div
        style={{
          border: `${borderWidth}px solid #fff`,
          outline: `${borderWidth}px solid #000`,
          outlineOffset: `-${outlineOffset}px`,
          boxShadow: `0 0 0 ${outlineOffset}px #fff, 0 0 0 ${outlineOffset + borderWidth}px #000`,
          padding: `${48 * uiScale}px ${56 * uiScale}px`,
          textAlign: "center",
          maxWidth: 440 * uiScale,
          width: "90%",
          background: "#000",
          maxHeight: "calc(100svh - 40px)",
          overflowY: "auto",
        }}
      >
        <p
          style={{
            fontSize: Math.max(10, 13 * uiScale),
            color: "#aaa",
            marginBottom: 28 * uiScale,
            letterSpacing: "0.05em",
            lineHeight: 1.7,
          }}
        >
          * you feel your sins crawling on your back.
        </p>
        <div
          id="game-over-title"
          style={{
            fontSize: Math.max(30, 52 * uiScale),
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.08em",
            marginBottom: 4 * uiScale,
            textShadow: `${Math.max(2, 4 * uiScale)}px ${Math.max(2, 4 * uiScale)}px 0 #444`,
            lineHeight: 1,
          }}
        >
          GAME OVER
        </div>
        <div style={{ height: Math.max(2, 3 * uiScale), background: "#fff", margin: `${20 * uiScale}px 0` }} />
        <p
          style={{
            fontSize: Math.max(10, 14 * uiScale),
            color: "#aaa",
            marginBottom: 24 * uiScale,
            fontStyle: "italic",
            letterSpacing: "0.03em",
          }}
        >
          &ldquo;geez, kid. you really let yourself go.&rdquo;
        </p>
        <div
          style={{
            border: `${Math.max(2, 3 * uiScale)}px solid #fff`,
            padding: `${14 * uiScale}px 0`,
            marginBottom: 28 * uiScale,
            background: "#000",
          }}
        >
          <div style={{ fontSize: Math.max(9, 11 * uiScale), color: "#888", letterSpacing: "0.35em", marginBottom: 6 * uiScale }}>
            SCORE
          </div>
          <div
            style={{
              fontSize: Math.max(24, 40 * uiScale),
              fontWeight: 900,
              color: "#fff",
              textShadow: `${Math.max(2, 3 * uiScale)}px ${Math.max(2, 3 * uiScale)}px 0 #555`,
              letterSpacing: "0.1em",
            }}
          >
            {score}
          </div>
        </div>
        <button
          onClick={onRestart}
          style={{
            fontSize: Math.max(11, 16 * uiScale),
            fontWeight: 900,
            color: "#000",
            background: "#fff",
            border: "none",
            padding: `${12 * uiScale}px ${36 * uiScale}px`,
            cursor: "pointer",
            letterSpacing: "0.15em",
            outline: `${Math.max(2, 3 * uiScale)}px solid #fff`,
            outlineOffset: `${Math.max(2, 3 * uiScale)}px`,
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
