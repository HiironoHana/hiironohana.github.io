import type { LobbyPlayerState, SessionMode, SessionPhase } from "../game/types";
import { useState } from "react";
import Link from "next/link";

type Props = {
  phase: SessionPhase;
  mode: SessionMode;
  hostCode: string;
  joinCode: string;
  playerName: string;
  connectionStatus: string;
  players: LobbyPlayerState[];
  canReady: boolean;
  isReady: boolean;
  lastError: string | null;
  onJoinCodeChange: (value: string) => void;
  onPlayerNameChange: (value: string) => void;
  onStartSolo: () => void;
  onHost: () => void;
  onJoin: () => void;
  onReadyToggle: () => void;
  onLeave: () => void;
};

function LobbyPlayerRow({ player }: { player: LobbyPlayerState }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        border: "2px solid #fff",
        padding: "10px 12px",
        background: "#000",
      }}
    >
      <span style={{ color: player.connected ? "#fff" : "#777" }}>{player.label}</span>
      <span style={{ color: player.connected ? (player.ready ? "#5af78e" : "#facc15") : "#777" }}>
        {player.connected ? `${player.ready ? "READY" : "WAITING"}${player.id !== "host" ? ` | ${player.ping}MS` : ""}` : "OFFLINE"}
      </span>
    </div>
  );
}

export default function MultiplayerLobby({
  phase,
  mode,
  hostCode,
  joinCode,
  playerName,
  connectionStatus,
  players,
  canReady,
  isReady,
  lastError,
  onJoinCodeChange,
  onPlayerNameChange,
  onStartSolo,
  onHost,
  onJoin,
  onReadyToggle,
  onLeave,
}: Props) {
  const inLobby = phase === "lobby";
  const [copied, setCopied] = useState(false);
  const [nameDraft, setNameDraft] = useState(() => playerName ?? "");

  const applyName = () => {
    onPlayerNameChange(nameDraft);
  };

  const handleCopyCode = async () => {
    if (!hostCode) return;
    try {
      await navigator.clipboard.writeText(hostCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const handleHost = () => {
    applyName();
    onHost();
  };

  const handleJoin = () => {
    applyName();
    onJoin();
  };

  const handleReadyToggle = () => {
    applyName();
    onReadyToggle();
  };

  return (
    <div
      className="absolute inset-0 z-[210] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sans-lobby-title"
      style={{
        background:
          "radial-gradient(circle at top, rgba(42,76,130,0.35), rgba(0,0,0,0.98) 46%), #000",
        overflowY: "auto",
        padding: "max(20px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left))",
      }}
    >
      <div
        style={{
          width: "min(92vw, 780px)",
          border: "4px solid #fff",
          background: "#000",
          padding: 28,
          boxShadow: "0 0 0 6px #000, 0 0 0 10px #fff",
          maxHeight: "calc(100svh - 40px)",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 22 }}>
          <div>
            <div style={{ color: "#7dd3fc", fontSize: 12, letterSpacing: "0.28em", marginBottom: 8 }}>
              SANS SIMULATOR
            </div>
            <h1 id="sans-lobby-title" style={{ color: "#fff", fontSize: 28, margin: 0 }}>{inLobby ? "MULTIPLAYER LOBBY" : "MODE SELECT"}</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"flex-start"}}><Link href="/" style={{border:"2px solid #fff",background:"#000",color:"#fff",padding:"10px 14px",textDecoration:"none"}}>PATCHIES</Link>{mode !== "solo" && <button onClick={onLeave} style={{border:"2px solid #fff",background:"#000",color:"#fff",padding:"10px 14px",cursor:"pointer"}}>LEAVE</button>}</div>
        </div>

        {!inLobby && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ border: "3px solid #fff", padding: 16 }}>
              <label htmlFor="solo-player-name" style={{ display:"block", color: "#aaa", fontSize: 11, marginBottom: 10 }}>YOUR NAME</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input
                  id="solo-player-name"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  maxLength={18}
                  placeholder="Pick a name"
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    border: "2px solid #fff",
                    background: "#000",
                    color: "#fff",
                    padding: "12px 14px",
                  }}
                />
                <button
                  onClick={applyName}
                  style={{ border: "2px solid #fff", background: "#000", color: "#fff", padding: "12px 16px", cursor: "pointer" }}
                >
                  APPLY
                </button>
              </div>
            </div>
            <button
              onClick={onStartSolo}
              style={{ border: "3px solid #fff", background: "#fff", color: "#000", padding: "14px 16px", cursor: "pointer" }}
            >
              SINGLE PLAYER
            </button>
            <button
              onClick={handleHost}
              style={{ border: "3px solid #fff", background: "#000", color: "#fff", padding: "14px 16px", cursor: "pointer" }}
            >
              HOST CO-OP
            </button>
            <div style={{ border: "3px solid #fff", padding: 16 }}>
              <label htmlFor="join-host-code" style={{ display:"block", color: "#aaa", fontSize: 11, marginBottom: 10 }}>JOIN HOST</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input
                  id="join-host-code"
                  value={joinCode ?? ""}
                  onChange={(event) => onJoinCodeChange(event.target.value)}
                  placeholder="Enter host code"
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    border: "2px solid #fff",
                    background: "#000",
                    color: "#fff",
                    padding: "12px 14px",
                  }}
                />
                <button
                  onClick={handleJoin}
                  style={{ border: "2px solid #fff", background: "#000", color: "#fff", padding: "12px 16px", cursor: "pointer" }}
                >
                  CONNECT
                </button>
              </div>
            </div>
          </div>
        )}

        {inLobby && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ border: "3px solid #fff", padding: 16 }}>
              <label htmlFor="lobby-player-name" style={{ display:"block", color: "#aaa", fontSize: 11, marginBottom: 10 }}>YOUR NAME</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input
                  id="lobby-player-name"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  maxLength={18}
                  placeholder="Pick a name"
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    border: "2px solid #fff",
                    background: "#000",
                    color: "#fff",
                    padding: "12px 14px",
                  }}
                />
                <button
                  onClick={applyName}
                  style={{ border: "2px solid #fff", background: "#000", color: "#fff", padding: "12px 16px", cursor: "pointer" }}
                >
                  APPLY
                </button>
              </div>
            </div>

            <div style={{ border: "3px solid #fff", padding: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ color: "#aaa", fontSize: 11 }}>HOST CODE</div>
                <button
                  onClick={handleCopyCode}
                  disabled={!hostCode}
                  style={{
                    border: "2px solid #fff",
                    background: copied ? "#5af78e" : "#000",
                    color: copied ? "#000" : "#fff",
                    padding: "8px 10px",
                    cursor: hostCode ? "pointer" : "not-allowed",
                    opacity: hostCode ? 1 : 0.5,
                    fontSize: 10,
                  }}
                >
                  {copied ? "COPIED" : "COPY"}
                </button>
              </div>
              <div style={{ color: "#fff", fontSize: 24, letterSpacing: "0.16em", wordBreak: "break-all" }}>
                {hostCode || "LOADING..."}
              </div>
              <div aria-live="polite" style={{ color: "#7dd3fc", fontSize: 10, marginTop: 8 }}>{connectionStatus}</div>
              <div style={{ color: "#888", fontSize: 10, marginTop: 6 }}>
                * authoritative host at 60 tick / 20 snapshot, with local prediction enabled.
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {players.map((player) => (
                <LobbyPlayerRow key={player.id} player={player} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={handleReadyToggle}
                disabled={!canReady}
                style={{
                  border: "3px solid #fff",
                  background: canReady && isReady ? "#5af78e" : "#fff",
                  color: "#000",
                  padding: "14px 18px",
                  cursor: canReady ? "pointer" : "not-allowed",
                  opacity: canReady ? 1 : 0.5,
                }}
              >
                {isReady ? "UNREADY" : "READY UP"}
              </button>
              <div style={{ alignSelf: "center", color: "#aaa", fontSize: 10, lineHeight: 1.7 }}>
                * both players must be ready to begin.
                <br />
                * if everyone dies, both return here automatically.
              </div>
            </div>
          </div>
        )}

        {lastError && <div role="alert" style={{ color: "#f87171", marginTop: 16, fontSize: 10 }}>{lastError}</div>}
      </div>
    </div>
  );
}
