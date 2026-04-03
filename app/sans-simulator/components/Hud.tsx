import { MAX_HP } from "../game/constants";
import type { PlayerRenderState } from "../game/types";

function HpBar({ hp, karma }: { hp: number; karma: number }) {
  const safeHp = Math.max(0, Math.min(MAX_HP, hp - karma));
  const safeKarma = Math.max(0, Math.min(MAX_HP - safeHp, karma));
  const hpPct = (safeHp / MAX_HP) * 100;
  const krPct = (safeKarma / MAX_HP) * 100;
  const critical = safeHp < 20;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-white tracking-[0.1em]">HP</span>
      <div style={{ position: "relative", width: 192, height: 20, border: "3px solid #fff", background: "#000" }}>
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
            left: `${hpPct}%`,
            top: 0,
            height: "100%",
            width: `${krPct}%`,
            background: "#d946ef",
          }}
        />
      </div>
      <span style={{ width: 28, textAlign: "right", fontSize: 14, color: "#fff" }}>
        {Math.max(0, Math.ceil(safeHp))}
      </span>
      {karma > 2 && <span style={{ fontSize: 11, color: "#d946ef", letterSpacing: "0.1em" }}>KR</span>}
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
}: Props) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "3px solid #fff",
          background: "#000",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, color: "#fff", letterSpacing: "0.1em" }}>SANS</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 9, color: "#888" }}>WAVE</span>
            <span style={{ fontSize: 9, color: "#fff" }}>{waveNum}</span>
            {isPhase2 && (
              <span
                style={{
                  fontSize: 8,
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
              <span style={{ fontSize: 8, color: "#5af78e", border: "1px solid #5af78e", padding: "2px 5px" }}>
                CO-OP 4P
              </span>
            )}
          </div>
          <div style={{ fontSize: 8, color: "#7dd3fc", letterSpacing: "0.06em" }}>
            PING {localPing}MS | TICK {gameTickRate} | SNAP {snapshotRate} | PREDICT ON | INTERP {interpolationDelayMs}MS
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {multiplayer && remotePlayers.length > 0 && (
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 420 }}>
              {remotePlayers.map((player) => (
                <div key={player.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                  <span style={{ fontSize: 8, color: "#888" }}>{player.label}</span>
                  <span style={{ fontSize: 10, color: player.alive ? "#5af78e" : "#888" }}>
                    {player.alive ? `${Math.ceil(player.hp)} HP | ${player.ping}MS` : "DOWN"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{ fontSize: 8, color: "#888" }}>SCORE</span>
            <span style={{ fontSize: 14, color: "#fff" }}>{score}</span>
          </div>
          <HpBar hp={playerHP} karma={karma} />
        </div>
      </div>

      {isBossWave && (
        <div className="absolute left-1/2 top-20 z-50 flex -translate-x-1/2 flex-col items-center gap-1">
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "#aaa",
              fontWeight: "bold",
              animation: isPhase2 ? "pixelBlink 0.4s steps(1) infinite" : undefined,
            }}
          >
            {isPhase2 ? "! PHASE 2 !" : "* SANS *"}
          </span>
          <div style={{ width: 320, height: 20, border: "3px solid #fff", background: "#000" }}>
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
