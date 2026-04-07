import { MAX_HP } from "../game/constants";
import type { PlayerRenderState } from "../game/types";

function HpBar({ hp, karma, scale }: { hp: number; karma: number; scale: number }) {
  const displayHp = Math.max(0, Math.min(MAX_HP, hp));
  const displayKarma = Math.max(0, Math.min(displayHp, karma));
  const hpPct = (displayHp / MAX_HP) * 100;
  const krPct = (displayKarma / MAX_HP) * 100;
  const krStartPct = Math.max(0, hpPct - krPct);
  const critical = displayHp < 20;
  const borderWidth = Math.max(2, 3 * scale);

  return (
    <div className="flex items-center" style={{ gap: 12 * scale }}>
      <span className="text-sm font-bold text-white tracking-[0.1em]" style={{ fontSize: Math.max(10, 14 * scale) }}>
        HP
      </span>
      <div
        style={{
          position: "relative",
          width: 192 * scale,
          height: 20 * scale,
          border: `${borderWidth}px solid #fff`,
          background: "#000",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${hpPct}%`,
            background: critical ? "#ff4444" : "#facc15",
            animation: critical ? "pixelBlink 0.4s steps(1) infinite" : undefined,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${krStartPct}%`,
            top: 0,
            height: "100%",
            width: `${krPct}%`,
            background: "#d946ef",
          }}
        />
      </div>
      <span style={{ width: 28 * scale, textAlign: "right", fontSize: Math.max(10, 14 * scale), color: "#fff" }}>
        {Math.max(0, Math.ceil(displayHp))}
      </span>
      {karma > 2 && (
        <span style={{ fontSize: Math.max(9, 11 * scale), color: "#d946ef", letterSpacing: "0.1em" }}>KR</span>
      )}
    </div>
  );
}

type Props = {
  score: number;
  waveNum: number;
  isPhase2: boolean;
  isBossWave: boolean;
  bossHP: number;
  playerHP: number;
  karma: number;
  multiplayer: boolean;
  remotePlayers: PlayerRenderState[];
  localPing: number;
  gameTickRate: number;
  snapshotRate: number;
  interpolationDelayMs: number;
  uiScale: number;
};

export default function Hud({
  score,
  waveNum,
  isPhase2,
  isBossWave,
  bossHP,
  playerHP,
  karma,
  multiplayer,
  remotePlayers,
  localPing,
  gameTickRate,
  snapshotRate,
  interpolationDelayMs,
  uiScale,
}: Props) {
  const borderWidth = Math.max(2, 3 * uiScale);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: `${borderWidth}px solid #fff`,
          background: "#000",
          padding: `${Math.max(10, 12 * uiScale)}px ${Math.max(14, 24 * uiScale)}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 10 * uiScale,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 * uiScale }}>
          <span style={{ fontSize: Math.max(10, 13 * uiScale), color: "#fff", letterSpacing: "0.1em" }}>SANS</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 * uiScale, flexWrap: "wrap" }}>
            <span style={{ fontSize: Math.max(8, 9 * uiScale), color: "#888" }}>WAVE</span>
            <span style={{ fontSize: Math.max(8, 9 * uiScale), color: "#fff" }}>{waveNum}</span>
            {isPhase2 && (
              <span
                style={{
                  fontSize: Math.max(7, 8 * uiScale),
                  color: "#000",
                  background: "#fff",
                  padding: "2px 5px",
                  animation: "pixelBlink 0.4s steps(1) infinite",
                }}
              >
                !! P2
              </span>
            )}
            {multiplayer && (
              <span
                style={{
                  fontSize: Math.max(7, 8 * uiScale),
                  color: "#5af78e",
                  border: "1px solid #5af78e",
                  padding: "2px 5px",
                }}
              >
                CO-OP 4P
              </span>
            )}
          </div>
          <div style={{ fontSize: Math.max(7, 8 * uiScale), color: "#7dd3fc", letterSpacing: "0.06em" }}>
            PING {localPing}MS | TICK {gameTickRate} | SNAP {snapshotRate} | PREDICT ON | INTERP {interpolationDelayMs}MS
          </div>
        </div>

        <div style={{ display: "flex", gap: 24 * uiScale, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {multiplayer && remotePlayers.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 14 * uiScale,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                maxWidth: 420 * uiScale,
              }}
            >
              {remotePlayers.map((player) => (
                <div key={player.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 * uiScale }}>
                  <span style={{ fontSize: Math.max(7, 8 * uiScale), color: "#888" }}>{player.label}</span>
                  <span style={{ fontSize: Math.max(8, 10 * uiScale), color: player.alive ? "#5af78e" : "#888" }}>
                    {player.alive ? `${Math.ceil(player.hp)} HP | ${player.ping}MS` : "DOWN"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 * uiScale }}>
            <span style={{ fontSize: Math.max(7, 8 * uiScale), color: "#888" }}>SCORE</span>
            <span style={{ fontSize: Math.max(11, 14 * uiScale), color: "#fff" }}>{score}</span>
          </div>
          <HpBar hp={playerHP} karma={karma} scale={uiScale} />
        </div>
      </div>

      {isBossWave && (
        <div
          className="absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center"
          style={{ top: 80 * uiScale, gap: 4 * uiScale }}
        >
          <span
            style={{
              fontSize: Math.max(9, 11 * uiScale),
              letterSpacing: "0.3em",
              color: "#aaa",
              fontWeight: "bold",
              animation: isPhase2 ? "pixelBlink 0.4s steps(1) infinite" : undefined,
            }}
            >
              {isPhase2 ? "! PHASE 2 !" : "* SANS *"}
            </span>
          <div
            style={{
              width: 320 * uiScale,
              height: 20 * uiScale,
              border: `${borderWidth}px solid #fff`,
              background: "#000",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${bossHP}%`,
                background: isPhase2 ? "#ef4444" : "#facc15",
                transition: "width 0.15s steps(4)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
