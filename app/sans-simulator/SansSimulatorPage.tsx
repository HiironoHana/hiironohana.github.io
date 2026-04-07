"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GameOverScreen from "./components/GameOverScreen";
import Hud from "./components/Hud";
import MultiplayerLobby from "./components/MultiplayerLobby";
import { MAX_HP, pixelFont } from "./game/constants";
import { clampToGame, detectTouchControls, getGameScale, getUiScale, pointHitsSans, withBasePath } from "./game/utils";
import { useSansSimulator } from "./useSansSimulator";

export default function SansSimulatorPage() {
  const simulator = useSansSimulator();
  const { dims, setPointer } = simulator;
  const [showTouchControls, setShowTouchControls] = useState(false);
  const touchPointerIdRef = useRef<number | null>(null);
  const gameScale = useMemo(() => getGameScale(dims), [dims]);
  const uiScale = useMemo(() => getUiScale(gameScale), [gameScale]);
  const beamLength = Math.max(dims.width || 1920, dims.height || 1080) * 3;
  const cursorSize = Math.max(24, 28 * gameScale);
  const touchButtonSize = Math.max(88, 120 * uiScale);
  const touchInset = Math.max(16, 18 * uiScale);
  const setClampedPointer = useCallback(
    (pos: { x: number; y: number }) => {
      setPointer(clampToGame(pos, dims));
    },
    [dims, setPointer],
  );

  useEffect(() => {
    const pos = {
      x: dims.width / 2 || 0,
      y: dims.height / 2 || 0,
    };
    setClampedPointer(pos);
  }, [dims.height, dims.width, setClampedPointer]);

  useEffect(() => {
    const media = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => {
      setShowTouchControls(detectTouchControls());
    };

    update();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const localPlayer = simulator.localPlayer;
  const remotePlayers = simulator.remotePlayers;
  const showBattle = simulator.phase === "battle";
  const localDead = showBattle && localPlayer ? !localPlayer.alive : false;
  const localPointer = localPlayer?.pos ?? { x: dims.width / 2 || 0, y: dims.height / 2 || 0 };
  const canTouchAttack =
    showBattle &&
    !!localPlayer?.alive &&
    simulator.renderSans.some((sans) => pointHitsSans(localPointer, sans, gameScale));

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes utFadeIn {
          0% { opacity: 0; }
          66% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes pixelBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes pixelPing {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
          100% { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
        }

        @keyframes beamPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }

        * { box-sizing: border-box; image-rendering: pixelated; }
        html, body { background: #000; }
      `}</style>

      <main
        className={`fixed inset-0 overflow-hidden ${showBattle ? "select-none" : ""}`}
        style={{
          background: "#000",
          cursor: showBattle && !showTouchControls ? "none" : "default",
          transform: `translate(${simulator.shakeX}px, ${simulator.shakeY}px)`,
          fontFamily: pixelFont,
          userSelect: showBattle ? "none" : "auto",
          WebkitUserSelect: showBattle ? "none" : "auto",
          overscrollBehavior: "none",
          touchAction: showBattle ? "none" : "auto",
        }}
        onMouseMove={(event) => {
          if (!showBattle || showTouchControls) return;
          setClampedPointer({ x: event.clientX, y: event.clientY });
        }}
        onPointerDown={(event) => {
          if (!showBattle) return;
          if (showTouchControls && event.pointerType !== "mouse") {
            event.preventDefault();
            if (touchPointerIdRef.current !== null && touchPointerIdRef.current !== event.pointerId) {
              return;
            }
            touchPointerIdRef.current = event.pointerId;
            event.currentTarget.setPointerCapture(event.pointerId);
            setClampedPointer({ x: event.clientX, y: event.clientY });
            return;
          }
          event.preventDefault();
          simulator.handlePointerAttack({ x: event.clientX, y: event.clientY });
        }}
        onPointerMove={(event) => {
          if (!showBattle || !showTouchControls || event.pointerType === "mouse") return;
          if (touchPointerIdRef.current !== event.pointerId) return;
          setClampedPointer({ x: event.clientX, y: event.clientY });
        }}
        onPointerUp={(event) => {
          if (touchPointerIdRef.current !== event.pointerId) return;
          touchPointerIdRef.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={(event) => {
          if (touchPointerIdRef.current !== event.pointerId) return;
          touchPointerIdRef.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
      >
        {showBattle && (
          <Hud
            score={simulator.score}
            waveNum={simulator.waveNum}
            isPhase2={simulator.isPhase2}
            isBossWave={simulator.isBossWave}
            bossHP={simulator.bossHP}
            playerHP={Math.ceil(localPlayer?.hp ?? MAX_HP)}
            karma={Math.ceil(localPlayer?.karma ?? 0)}
            multiplayer={simulator.mode !== "solo"}
            remotePlayers={remotePlayers}
            localPing={simulator.localPing}
            gameTickRate={simulator.gameTickRate}
            snapshotRate={simulator.snapshotRate}
            interpolationDelayMs={simulator.interpolationDelayMs}
            uiScale={uiScale}
          />
        )}

        <div className="relative h-full w-full">
          {showBattle &&
            simulator.renderBlasters.map((blaster) => {
              if (blaster.state !== "charge") return null;
              const progress =
                blaster.chargeDuration <= 0
                  ? 1
                  : 1 - blaster.timer / blaster.chargeDuration;
              const beamHeight = (3 + progress * 18) * blaster.scale;
              return (
                <div
                  key={`indicator-${blaster.id}`}
                  style={{
                    position: "absolute",
                    left: blaster.pos.x,
                    top: blaster.pos.y,
                    width: beamLength,
                    height: beamHeight * gameScale,
                    background: "rgba(110, 210, 255, 0.9)",
                    boxShadow: `0 0 0 ${(1 + progress * 3) * gameScale}px rgba(130, 220, 255, ${0.35 + progress * 0.25})`,
                    transform: `translate(0, -50%) rotate(${blaster.angle}rad)`,
                    transformOrigin: "left center",
                    opacity: 0.18 + progress * 0.5,
                    animation: "beamPulse 0.22s steps(2) infinite",
                    pointerEvents: "none",
                    zIndex: 8,
                  }}
                />
              );
            })}

          {showBattle &&
            simulator.renderBlasters.map((blaster) =>
              blaster.state === "fire" ? (
                <div
                  key={`beam-${blaster.id}`}
                  style={{
                    position: "absolute",
                    left: blaster.pos.x,
                    top: blaster.pos.y,
                    width: beamLength,
                    height: 90 * blaster.scale * gameScale,
                    background: "#fff",
                    boxShadow: `
                      0 ${8 * blaster.scale * gameScale}px 0 0 rgba(255,255,255,0.6),
                      0 -${8 * blaster.scale * gameScale}px 0 0 rgba(255,255,255,0.6),
                      0 ${16 * blaster.scale * gameScale}px 0 0 rgba(180,230,255,0.35),
                      0 -${16 * blaster.scale * gameScale}px 0 0 rgba(180,230,255,0.35),
                      0 ${28 * blaster.scale * gameScale}px 0 0 rgba(100,200,255,0.15),
                      0 -${28 * blaster.scale * gameScale}px 0 0 rgba(100,200,255,0.15)
                    `,
                    transform: `translate(0, -50%) rotate(${blaster.angle}rad)`,
                    transformOrigin: "left center",
                    zIndex: 10,
                    opacity: blaster.timer / 500,
                    pointerEvents: "none",
                  }}
                />
              ) : null,
            )}

          {showBattle &&
            simulator.renderBones.map((bone) => (
              <img
                key={bone.id}
                src={withBasePath("/Images/sans_bone_attack.png")}
                alt=""
                style={{
                  position: "absolute",
                  left: bone.pos.x,
                  top: bone.pos.y,
                  width: bone.size * (4 / 3) * gameScale,
                  pointerEvents: "none",
                  transform: `translate(-50%, -50%) rotate(${
                    (Math.atan2(bone.vel.y, bone.vel.x) * 180) / Math.PI + 90
                  }deg)`,
                }}
              />
            ))}

          {showBattle &&
            simulator.renderBlasters.map((blaster) => (
              <img
                key={blaster.id}
                src={withBasePath(
                  blaster.state === "charge"
                    ? "/Images/idle_gaster-blaster.png"
                    : "/Images/shooting_gaster-blaster.png",
                )}
                alt=""
                style={{
                  position: "absolute",
                  left: blaster.pos.x,
                  top: blaster.pos.y,
                  width: 140 * blaster.scale * gameScale,
                  zIndex: 20,
                  pointerEvents: "none",
                  filter:
                    blaster.state === "charge"
                      ? "grayscale(1) contrast(1.2) brightness(1.1)"
                      : "grayscale(1) contrast(1.25)",
                  transform: `translate(-50%, -50%) rotate(${blaster.angle - Math.PI / 2}rad)`,
                }}
              />
            ))}

          {showBattle &&
            simulator.renderSans.map((sans) => (
              <div
                key={sans.id}
                style={{
                  position: "absolute",
                  left: sans.pos.x,
                  top: sans.pos.y,
                  width: sans.size * gameScale,
                  height: sans.size * gameScale,
                  transform: "translate(-50%, -50%)",
                  zIndex: 30,
                }}
              >
                {(sans.cooldown < 600 || (simulator.isBossWave && simulator.isPhase2)) && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "130%",
                      height: "130%",
                      border: `${Math.max(1, 2 * gameScale)}px solid #fff`,
                      pointerEvents: "none",
                      animation: "pixelPing 0.5s steps(3) infinite",
                    }}
                  />
                )}
                <img
                  src={withBasePath("/Images/sans_face_high_res.png")}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    filter: "grayscale(1) contrast(1.15)",
                    transform: `rotate(${sans.angle}deg)`,
                  }}
                />
              </div>
            ))}
        </div>

        {showBattle &&
          simulator.renderPlayers.map((player) => {
            const isLocal = player.id === simulator.localPlayerId;
            const isGuestRemoteTint = simulator.mode === "client" && !isLocal;
            const isDead = !player.alive;
            return (
              <img
                key={player.id}
                src={withBasePath("/Images/soul_cursor_sanssimulator.png")}
                alt=""
                style={{
                  position: "fixed",
                  left: player.pos.x,
                  top: player.pos.y,
                  width: cursorSize,
                  pointerEvents: "none",
                  zIndex: isLocal ? 110 : 100,
                  transform: `translate(-50%, -50%)${isDead ? ` scale(${Math.max(1.4, 1.7 * gameScale)}) rotate(45deg)` : ""}`,
                  opacity: isDead ? 0.35 : player.invuln > 0 ? 0.25 : 1,
                  filter: isDead
                    ? "grayscale(1) brightness(0.4)"
                    : isGuestRemoteTint
                      ? "hue-rotate(85deg) saturate(1.8) brightness(1.05)"
                      : !isLocal
                        ? "hue-rotate(35deg) saturate(1.35)"
                        : undefined,
                }}
              />
            );
          })}

        {showBattle && localDead && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 150, pointerEvents: "none" }}
          >
            <div
              style={{
                border: `${Math.max(2, 3 * uiScale)}px solid #fff`,
                background: "rgba(0, 0, 0, 0.88)",
                padding: `${Math.max(14, 18 * uiScale)}px ${Math.max(18, 24 * uiScale)}px`,
                color: "#fff",
                fontSize: Math.max(10, 12 * uiScale),
                letterSpacing: "0.12em",
                textAlign: "center",
              }}
            >
              * you are down.
              <br />
              * spectating until everyone falls.
            </div>
          </div>
        )}

        {showBattle && showTouchControls && localPlayer?.alive && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 180,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: touchInset,
                bottom: touchInset,
                border: `${Math.max(2, 3 * uiScale)}px solid rgba(255,255,255,0.78)`,
                background: "rgba(0, 0, 0, 0.72)",
                color: "#fff",
                padding: `${Math.max(10, 12 * uiScale)}px ${Math.max(12, 14 * uiScale)}px`,
                fontSize: Math.max(9, 11 * uiScale),
                letterSpacing: "0.12em",
                lineHeight: 1.7,
              }}
            >
              DRAG ANYWHERE
              <br />
              TO MOVE
            </div>

            <button
              type="button"
              style={{
                position: "absolute",
                right: touchInset,
                bottom: touchInset,
                width: touchButtonSize,
                height: touchButtonSize,
                borderRadius: "50%",
                border: `${Math.max(3, 4 * uiScale)}px solid ${canTouchAttack ? "#facc15" : "#fff"}`,
                background: canTouchAttack ? "rgba(250, 204, 21, 0.18)" : "rgba(255, 255, 255, 0.12)",
                color: canTouchAttack ? "#facc15" : "#fff",
                fontSize: Math.max(11, 14 * uiScale),
                letterSpacing: "0.14em",
                fontWeight: 700,
                boxShadow: canTouchAttack
                  ? `0 0 ${Math.max(18, 24 * uiScale)}px rgba(250, 204, 21, 0.3)`
                  : "none",
                pointerEvents: "auto",
                touchAction: "manipulation",
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
                simulator.handlePointerAttack(localPointer);
              }}
              onPointerUp={(event) => {
                event.stopPropagation();
              }}
            >
              ATTACK
            </button>
          </div>
        )}

        {(simulator.phase === "menu" || simulator.phase === "lobby") && (
          <MultiplayerLobby
            phase={simulator.phase}
            mode={simulator.mode}
            hostCode={simulator.hostCode}
            joinCode={simulator.joinCode}
            playerName={simulator.playerName}
            connectionStatus={simulator.connectionStatus}
            players={simulator.lobbyPlayers}
            canReady={simulator.canReady}
            isReady={simulator.localReady}
            onJoinCodeChange={simulator.setJoinCode}
            onPlayerNameChange={simulator.setPlayerName}
            onStartSolo={simulator.startSolo}
            onHost={simulator.startHosting}
            onJoin={simulator.joinHost}
            onReadyToggle={simulator.toggleReady}
            onLeave={simulator.leaveSession}
            lastError={simulator.lastError}
          />
        )}

        {simulator.phase === "soloGameOver" && (
          <GameOverScreen score={simulator.score} onRestart={simulator.startSolo} uiScale={uiScale} />
        )}
      </main>
    </>
  );
}
