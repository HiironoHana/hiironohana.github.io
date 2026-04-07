"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_HP = 92;
const BONE_SPEED_BASE = 6;
const IFRAMES_MS = 800;

const ATTACK_INTERVALS = {
  screen: { normal: 4000, phase2: 2500 },
  danmaku: { normal: 1200, phase2: 600 },
};

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const MIN_GAME_SCALE = 0.55;
const MAX_GAME_SCALE = 1.5;
const MIN_UI_SCALE = 0.72;
const MAX_UI_SCALE = 1.25;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 { x: number; y: number }

interface SansFace {
  id: number;
  pos: Vec2;
  vel: Vec2;
  angle: number;
  dAngle: number;
  size: number;
  cooldown: number;
}

interface Bone {
  id: number;
  pos: Vec2;
  vel: Vec2;
  size: number;
}

interface Blaster {
  id: number;
  pos: Vec2;
  angle: number;
  state: "idle" | "fire";
  timer: number;
  scale: number;
}

interface GameDims { width: number; height: number }

// ─── Utilities ────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const hypot = (a: Vec2, b: Vec2) => Math.hypot(a.x - b.x, a.y - b.y);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function getGameScale(dims: GameDims) {
  if (!dims.width || !dims.height) return 1;
  return clamp(Math.min(dims.width / BASE_WIDTH, dims.height / BASE_HEIGHT), MIN_GAME_SCALE, MAX_GAME_SCALE);
}

function getUiScale(scale: number) {
  return clamp(Math.max(scale, MIN_UI_SCALE), MIN_UI_SCALE, MAX_UI_SCALE);
}

function clampToGame(pos: Vec2, dims: GameDims): Vec2 {
  return {
    x: clamp(pos.x, 0, dims.width),
    y: clamp(pos.y, 0, dims.height),
  };
}

function pointHitsSans(pointer: Vec2, sans: SansFace) {
  const half = sans.size * 0.42;
  return Math.abs(pointer.x - sans.pos.x) <= half && Math.abs(pointer.y - sans.pos.y) <= half;
}

function detectTouchControls() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    (navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches)
  );
}

function makeSans(id: number, dims: GameDims, scale = getGameScale(dims)): SansFace {
  const minX = 100 * scale;
  const maxX = Math.max(minX + 1, dims.width - 150 * scale);
  const minY = 150 * scale;
  const maxY = Math.max(minY + 1, dims.height - 200 * scale);
  return {
    id,
    pos: { x: rand(minX, maxX), y: rand(minY, maxY) },
    vel: { x: rand(-2, 2) * scale, y: rand(-2, 2) * scale },
    angle: rand(0, 360),
    dAngle: rand(-2, 2),
    size: rand(80, 110) * scale,
    cooldown: rand(1800, 4000),
  };
}

function aimBone(id: number, from: Vec2, to: Vec2, speed = BONE_SPEED_BASE, size = 36): Bone {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { id, pos: { ...from }, vel: { x: (dx / len) * speed, y: (dy / len) * speed }, size };
}

// ─── Audio Pool ───────────────────────────────────────────────────────────────
function useAudio() {
  const pool = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    pool.current = {
      hit: new Audio("/Sounds/voice_sans.mp3"),
      charge: new Audio("/Sounds/gaster-blaster-charging.mp3"),
      fire: new Audio("/Sounds/gaster-blaster-firing.mp3"),
      damage: new Audio("/Sounds/undertale-damage-taken.mp3"),
    };
  }, []);

  const play = useCallback((key: string) => {
    const src = pool.current[key];
    if (!src) return;
    const clone = src.cloneNode(true) as HTMLAudioElement;
    clone.play().catch(() => {});
  }, []);

  return play;
}

// ─── HP Bar Component ─────────────────────────────────────────────────────────
function HpBar({ hp, karma, max, scale }: { hp: number; karma: number; max: number; scale: number }) {
  const safeHp = clamp(hp - karma, 0, max);
  const safeKarma = clamp(karma, 0, max - safeHp);
  const hpPct = (safeHp / max) * 100;
  const krPct = (safeKarma / max) * 100;
  const critical = safeHp < 20;
  const borderWidth = Math.max(2, 3 * scale);
  const barWidth = 192 * scale;
  const barHeight = 20 * scale;
  const labelSize = Math.max(10, 14 * scale);
  const valueSize = Math.max(10, 14 * scale);
  const krSize = Math.max(9, 11 * scale);
  const gridStep = Math.max(5, 8 * scale);

  return (
    <div className="flex items-center" style={{ gap: 12 * scale, imageRendering: "pixelated" }}>
      <span
        className="font-bold text-white"
        style={{ fontFamily: "'Press Start 2P', 'Courier New', monospace", letterSpacing: "0.1em", fontSize: labelSize }}
      >
        HP
      </span>
      {/* Pixel HP bar — outer border rendered as nested divs for chunky pixel look */}
      <div
        style={{
          position: "relative",
          width: barWidth,
          height: barHeight,
          border: `${borderWidth}px solid #fff`,
          background: "#000",
          imageRendering: "pixelated",
        }}
      >
        {/* HP fill — yellow, red when critical */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            width: `${hpPct}%`,
            background: critical ? "#ff4444" : "#facc15",
            animation: critical ? "pixelBlink 0.4s steps(1) infinite" : undefined,
          }}
        />
        {/* KR fill — purple */}
        <div
          style={{
            position: "absolute", top: 0, height: "100%",
            left: `${hpPct}%`,
            width: `${krPct}%`,
            background: "#d946ef",
          }}
        />
        {/* Pixel grid overlay for chunky feel */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.15,
          backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent ${gridStep}px)`,
          pointerEvents: "none",
        }} />
      </div>
      <span style={{
        width: 28 * scale, textAlign: "right", fontSize: valueSize, fontWeight: "bold",
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        color: critical ? "#fff" : "#fff",
        animation: critical ? "pixelBlink 0.4s steps(1) infinite" : undefined,
      }}>
        {Math.max(0, Math.ceil(safeHp))}
      </span>
      {karma > 2 && (
        <span style={{
          fontSize: krSize, fontWeight: "bold", color: "#d946ef",
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          animation: "pixelBlink 0.5s steps(1) infinite",
          letterSpacing: "0.1em",
        }}>KR</span>
      )}
    </div>
  );
}

// ─── Boss HP Bar ──────────────────────────────────────────────────────────────
function BossHpBar({ hp, phase2, scale }: { hp: number; phase2: boolean; scale: number }) {
  const borderWidth = Math.max(2, 3 * scale);
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      style={{ top: 80 * scale, gap: 4 * scale }}
    >
      <span style={{
        fontSize: Math.max(9, 11 * scale), letterSpacing: "0.3em", color: "#aaa", fontWeight: "bold",
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        animation: phase2 ? "pixelBlink 0.4s steps(1) infinite" : undefined,
      }}>
        {phase2 ? "! PHASE 2 !" : "* SANS *"}
      </span>
      <div
        style={{
          width: 320 * scale,
          height: 20 * scale,
          border: `${borderWidth}px solid #fff`,
          background: "#000",
          imageRendering: "pixelated",
        }}
      >
        <div style={{
          height: "100%", width: `${hp}%`,
          background: phase2 ? "#ef4444" : "#facc15",
          transition: "width 0.15s steps(4)",
        }} />
      </div>
    </div>
  );
}

// ─── Game Over Screen ─────────────────────────────────────────────────────────
function GameOverScreen({ score, onRestart, scale }: { score: number; onRestart: () => void; scale: number }) {
  const borderWidth = Math.max(3, 4 * scale);
  const outlineOffset = Math.max(6, 8 * scale);
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-[200]"
      style={{ background: "#000", animation: "utFadeIn 0.5s steps(4) forwards", imageRendering: "pixelated" }}
    >
      {/* Outer pixel border box */}
      <div style={{
        border: `${borderWidth}px solid #fff`,
        outline: `${borderWidth}px solid #000`,
        outlineOffset: `-${outlineOffset}px`,
        boxShadow: `0 0 0 ${outlineOffset}px #fff, 0 0 0 ${outlineOffset + borderWidth}px #000`,
        padding: `${48 * scale}px ${56 * scale}px`,
        textAlign: "center",
        maxWidth: 440 * scale,
        width: "90%",
        background: "#000",
        imageRendering: "pixelated",
      }}>
        {/* Flavor text — Undertale uses * prefix */}
        <p style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: Math.max(10, 13 * scale),
          color: "#aaa",
          marginBottom: 28 * scale,
          letterSpacing: "0.05em",
          lineHeight: 1.7,
        }}>
          * you feel your sins crawling on your back.
        </p>

        {/* GAME OVER — pixelated, white, big */}
        <div style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: Math.max(30, 52 * scale),
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "0.08em",
          marginBottom: 4 * scale,
          textShadow: `${Math.max(2, 4 * scale)}px ${Math.max(2, 4 * scale)}px 0 #444`,
          lineHeight: 1,
          imageRendering: "pixelated",
          filter: "contrast(1)",
        }}>
          GAME OVER
        </div>

        {/* Divider — pixel style */}
        <div style={{ height: Math.max(2, 3 * scale), background: "#fff", margin: `${20 * scale}px 0`, imageRendering: "pixelated" }} />

        {/* Sans quote */}
        <p style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: Math.max(10, 14 * scale),
          color: "#aaa",
          marginBottom: 24 * scale,
          fontStyle: "italic",
          letterSpacing: "0.03em",
        }}>
          &ldquo;geez, kid. you really let yourself go.&rdquo;
        </p>

        {/* Score box */}
        <div style={{
          border: `${Math.max(2, 3 * scale)}px solid #fff`,
          padding: `${14 * scale}px 0`,
          marginBottom: 28 * scale,
          background: "#000",
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: Math.max(9, 11 * scale), color: "#888", letterSpacing: "0.35em", marginBottom: 6 * scale,
          }}>
            SCORE
          </div>
          <div style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: Math.max(24, 40 * scale), fontWeight: 900, color: "#fff",
            textShadow: `${Math.max(2, 3 * scale)}px ${Math.max(2, 3 * scale)}px 0 #555`,
            letterSpacing: "0.1em",
          }}>
            {score}
          </div>
        </div>

        {/* Button — pixel Undertale menu style */}
        <button
          onClick={onRestart}
          style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: Math.max(11, 16 * scale),
            fontWeight: 900,
            color: "#000",
            background: "#fff",
            border: "none",
            padding: `${12 * scale}px ${36 * scale}px`,
            cursor: "pointer",
            letterSpacing: "0.15em",
            imageRendering: "pixelated",
            transition: "background 0s, color 0s",
            outline: `${Math.max(2, 3 * scale)}px solid #fff`,
            outlineOffset: `${Math.max(2, 3 * scale)}px`,
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#000"; (e.target as HTMLButtonElement).style.color = "#fff"; (e.target as HTMLButtonElement).style.outline = "3px solid #fff"; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#fff"; (e.target as HTMLButtonElement).style.color = "#000"; }}
        >
          STAY DETERMINED
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function App() {
  // Render state (UI only)
  const [renderSans, setRenderSans] = useState<SansFace[]>([]);
  const [renderBones, setRenderBones] = useState<Bone[]>([]);
  const [renderBlasters, setRenderBlasters] = useState<Blaster[]>([]);
  const [score, setScore] = useState(0);
  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [karma, setKarma] = useState(0);
  const [bossHP, setBossHP] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [cursor, setCursor] = useState<Vec2>({ x: 0, y: 0 });
  const [isInvulnerable, setIsInvulnerable] = useState(false);
  const [shakeOffset, setShakeOffset] = useState<Vec2>({ x: 0, y: 0 });
  const [blinkTick, setBlinkTick] = useState(0);
  const [dims, setDims] = useState<GameDims>({ width: 0, height: 0 });
  const [waveNum, setWaveNum] = useState(1);
  const [isPhase2, setIsPhase2] = useState(false);
  const [isBossWave, setIsBossWave] = useState(false);
  const [showTouchControls, setShowTouchControls] = useState(false);

  // Mutable game state refs (never trigger re-renders on their own)
  const sansRef = useRef<SansFace[]>([]);
  const bonesRef = useRef<Bone[]>([]);
  const blastersRef = useRef<Blaster[]>([]);

  const cursorRef = useRef<Vec2>({ x: 0, y: 0 });
  const dimsRef = useRef<GameDims>({ width: 0, height: 0 });
  const touchPointerIdRef = useRef<number | null>(null);

  const sansIdRef = useRef(1);
  const boneIdRef = useRef(1);
  const blasterIdRef = useRef(1);

  const wave = useRef(1);
  const isBoss = useRef(false);
  const phase2 = useRef(false);

  const hpRef = useRef(MAX_HP);
  const karmaRef = useRef(0);
  const bossHpRef = useRef(100);
  const scoreRef = useRef(0);

  const invuln = useRef(0);
  const clickLock = useRef(false);
  const pendingNextWave = useRef(false);
  const gameOverRef = useRef(false);

  const screenAttackT = useRef(2000);
  const danmakuT = useRef(1000);
  const shakeRef = useRef(0);

  const play = useAudio();

  const updateCursor = useCallback((pos: Vec2) => {
    const next = clampToGame(pos, dimsRef.current);
    setCursor(next);
    cursorRef.current = next;
  }, []);

  // ─── Dimensions ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const d = { width: window.innerWidth, height: window.innerHeight };
      setDims(d);
      dimsRef.current = d;
      setShowTouchControls(detectTouchControls());
      const current = cursorRef.current;
      const hasCursor = current.x !== 0 || current.y !== 0;
      const nextCursor = hasCursor ? clampToGame(current, d) : { x: d.width / 2, y: d.height / 2 };
      setCursor(nextCursor);
      cursorRef.current = nextCursor;
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlinkTick((tick) => (tick + 1) % 2);
    }, 80);
    return () => window.clearInterval(interval);
  }, []);

  // ─── Spawn Wave ──────────────────────────────────────────────────────────────
  const spawnWave = useCallback(() => {
    const d = dimsRef.current;
    if (!d.width) return;
    const scale = getGameScale(d);

    const waveN = wave.current;
    const boss = waveN % 5 === 0;
    isBoss.current = boss;
    phase2.current = false;

    hpRef.current = MAX_HP;
    karmaRef.current = 0;
    setPlayerHP(MAX_HP);
    setKarma(0);
    setWaveNum(waveN);
    setIsBossWave(boss);
    setIsPhase2(false);

    screenAttackT.current = 2000;
    danmakuT.current = 1000;

    if (boss) {
      bossHpRef.current = 100;
      setBossHP(100);
      sansRef.current = [{
        ...makeSans(sansIdRef.current++, d, scale),
        pos: { x: d.width / 2, y: 180 * scale },
        vel: { x: 0, y: 0 },
        size: 160 * scale,
        cooldown: 999999,
      }];
    } else {
      const count = 3 + Math.floor(waveN / 2);
      sansRef.current = Array.from({ length: count }, () => makeSans(sansIdRef.current++, d, scale));
    }

    bonesRef.current = [];
    blastersRef.current = [];
    setRenderSans([...sansRef.current]);
    setRenderBones([]);
    setRenderBlasters([]);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dims.width) spawnWave();
  }, [dims.width]); // eslint-disable-line

  // ─── Damage ──────────────────────────────────────────────────────────────────
  const takeDamage = useCallback((direct: number, kr: number, iframes = IFRAMES_MS) => {
    if (invuln.current > 0 || gameOverRef.current) return;

    hpRef.current -= direct;
    karmaRef.current += kr;
    if (karmaRef.current >= hpRef.current) {
      karmaRef.current = Math.max(0, hpRef.current - 1);
    }

    if (hpRef.current <= 0) {
      hpRef.current = 0;
      gameOverRef.current = true;
      setGameOver(true);
      return;
    }

    if (iframes > 0) {
      play("damage");
      shakeRef.current = 8;
      invuln.current = iframes;
      setIsInvulnerable(true);
    }
  }, [play]);

  // ─── Click Sans ──────────────────────────────────────────────────────────────
  const hitSans = useCallback((s: SansFace) => {
    if (clickLock.current) return;
    clickLock.current = true;
    setTimeout(() => { clickLock.current = false; }, 60);
    play("hit");

    if (isBoss.current) {
      bossHpRef.current -= 1.5;
      const next = bossHpRef.current;
      setBossHP(next);
      if (next <= 50 && !phase2.current) {
        phase2.current = true;
        setIsPhase2(true);
      }
      if (next <= 0) pendingNextWave.current = true;
    } else {
      sansRef.current = sansRef.current.filter(item => item.id !== s.id);
      scoreRef.current += 1;
      setScore(scoreRef.current);
      if (sansRef.current.length === 0) pendingNextWave.current = true;
    }
  }, [play]);

  const attackAtCursor = useCallback(() => {
    const target = sansRef.current.find((sans) => pointHitsSans(cursorRef.current, sans));
    if (target) {
      hitSans(target);
    }
  }, [hitSans]);

  // ─── Main Loop ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!dims.width || gameOver) return;

    let raf: number;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(t - last, 50); // cap dt to avoid spiral of death
      last = t;

      const d = dimsRef.current;
      const cur = cursorRef.current;
      const scale = getGameScale(d);
      const beamRange = Math.max(d.width, d.height) * 3;
      const cleanupPad = 600 * scale;

      // ── Wave transition ─────────────────────────────────────────────────────
      if (pendingNextWave.current) {
        pendingNextWave.current = false;
        wave.current++;
        spawnWave();
        raf = requestAnimationFrame(loop);
        return;
      }

      // ── Timers ──────────────────────────────────────────────────────────────
      if (invuln.current > 0) invuln.current -= dt;
      setIsInvulnerable(invuln.current > 0);

      // Karma poison drain
      if (karmaRef.current > 0) {
        const rate = karmaRef.current > 30 ? 0.4 : karmaRef.current > 15 ? 0.2 : 0.08;
        const drain = rate * (dt / 16);
        karmaRef.current = Math.max(0, karmaRef.current - drain);
        hpRef.current -= drain;
        if (hpRef.current <= 0 && !gameOverRef.current) {
          gameOverRef.current = true;
          hpRef.current = 0;
          setGameOver(true);
        }
      }

      setPlayerHP(Math.ceil(hpRef.current));
      setKarma(Math.ceil(karmaRef.current));

      // Shake decay
      if (shakeRef.current > 0.1) {
        shakeRef.current *= 0.88;
        setShakeOffset({
          x: (Math.random() - 0.5) * shakeRef.current,
          y: (Math.random() - 0.5) * shakeRef.current,
        });
      } else if (shakeRef.current > 0) {
        shakeRef.current = 0;
        setShakeOffset({ x: 0, y: 0 });
      }

      // ── Accumulators ────────────────────────────────────────────────────────
      const newBones: Bone[] = [];

      // ── Update Sans ──────────────────────────────────────────────────────────
      sansRef.current = sansRef.current.map((s) => {
        let { x: vx, y: vy } = s.vel;

        if (isBoss.current) {
          // Active evasion
          const dist = hypot(s.pos, cur);
          if (dist < 350 * scale) {
            const ang = Math.atan2(s.pos.y - cur.y, s.pos.x - cur.x);
            const force = (phase2.current ? 1.1 : 0.6) * scale;
            vx += Math.cos(ang) * force;
            vy += Math.sin(ang) * force;
          } else {
            vx += (d.width / 2 - s.pos.x) * 0.003;
            vy += (180 * scale - s.pos.y) * 0.003;
          }
          const maxSpd = (phase2.current ? 8 : 5) * scale;
          const spd = Math.hypot(vx, vy);
          if (spd > maxSpd) { vx = (vx / spd) * maxSpd; vy = (vy / spd) * maxSpd; }

          // ── Screen attack track ─────────────────────────────────────────────
          screenAttackT.current -= dt;
          if (screenAttackT.current <= 0) {
            const choice = Math.floor(Math.random() * 7);
            if (choice === 0) { // Bottom wall sweep
              const gapX = rand(100 * scale, Math.max(100 * scale + 1, d.width - 100 * scale));
              for (let i = 0; i < d.width; i += 45 * scale) {
                if (Math.abs(i - gapX) > 120 * scale) {
                  newBones.push({
                    id: boneIdRef.current++,
                    pos: { x: i, y: d.height + 60 * scale },
                    vel: { x: 0, y: (phase2.current ? -11 : -8) * scale },
                    size: 36 * scale,
                  });
                }
              }
            } else if (choice === 1) { // Left wall sweep
              const gapY = rand(200 * scale, Math.max(200 * scale + 1, d.height - 100 * scale));
              for (let i = 0; i < d.height; i += 45 * scale) {
                if (Math.abs(i - gapY) > 120 * scale) {
                  newBones.push({
                    id: boneIdRef.current++,
                    pos: { x: -60 * scale, y: i },
                    vel: { x: (phase2.current ? 13 : 9) * scale, y: 0 },
                    size: 36 * scale,
                  });
                }
              }
            } else if (choice === 2) { // Cross blasters
              const off = 400 * scale;
              [
                { x: d.width / 2, y: -off, a: Math.PI / 2 },
                { x: d.width / 2, y: d.height + off, a: -Math.PI / 2 },
                { x: -off, y: d.height / 2, a: 0 },
                { x: d.width + off, y: d.height / 2, a: Math.PI },
              ].forEach(({ x, y, a }, i) => {
                blastersRef.current.push({ id: blasterIdRef.current++, pos: { x, y }, angle: a, state: "idle", timer: 900 + i * 150, scale: 1 });
              });
              play("charge");
            } else if (choice === 3) { // Spiral burst
              for (let i = 0; i < 24; i++) {
                const ang = (i / 24) * Math.PI * 2;
                newBones.push({
                  id: boneIdRef.current++,
                  pos: { ...s.pos },
                  vel: { x: Math.cos(ang) * 7 * scale, y: Math.sin(ang) * 7 * scale },
                  size: 36 * scale,
                });
              }
            } else if (choice === 4) { // Gravity rain
              for (let i = 0; i < d.width; i += 90 * scale) {
                newBones.push({
                  id: boneIdRef.current++,
                  pos: { x: i, y: -50 * scale },
                  vel: { x: 0, y: 7 * scale },
                  size: 36 * scale,
                });
                newBones.push({
                  id: boneIdRef.current++,
                  pos: { x: i + 45 * scale, y: d.height + 50 * scale },
                  vel: { x: 0, y: -7 * scale },
                  size: 36 * scale,
                });
              }
            } else if (choice === 5) { // Mega blaster
              blastersRef.current.push({
                id: blasterIdRef.current++,
                pos: { x: d.width / 2, y: -200 * scale },
                angle: Math.PI / 2,
                state: "idle",
                timer: 1200,
                scale: 2.5,
              });
              play("charge");
            } else { // Ring of blasters aimed at cursor
              for (let i = 0; i < 6; i++) {
                const ang = (i / 6) * Math.PI * 2;
                const r = 450 * scale;
                const bx = cur.x + Math.cos(ang) * r;
                const by = cur.y + Math.sin(ang) * r;
                const aimAng = Math.atan2(cur.y - by, cur.x - bx);
                blastersRef.current.push({ id: blasterIdRef.current++, pos: { x: bx, y: by }, angle: aimAng, state: "idle", timer: 700 + i * 100, scale: 1 });
              }
              play("charge");
            }
            screenAttackT.current = phase2.current
              ? ATTACK_INTERVALS.screen.phase2
              : ATTACK_INTERVALS.screen.normal;
          }

          // ── Danmaku track ───────────────────────────────────────────────────
          danmakuT.current -= dt;
          if (danmakuT.current <= 0) {
            if (Math.random() > 0.45) { // Aimed blaster
              const ang = Math.random() * Math.PI * 2;
              const bx = cur.x + Math.cos(ang) * 350 * scale;
              const by = cur.y + Math.sin(ang) * 350 * scale;
              blastersRef.current.push({
                id: blasterIdRef.current++,
                pos: { x: bx, y: by },
                angle: Math.atan2(cur.y - by, cur.x - bx),
                state: "idle",
                timer: 600,
                scale: 1,
              });
              play("charge");
            } else { // Focused bone stream (3-way)
              const ang = Math.atan2(cur.y - s.pos.y, cur.x - s.pos.x);
              for (let i = 0; i < 3; i++) {
                const off = (i - 1) * 0.15;
                newBones.push({
                  id: boneIdRef.current++,
                  pos: { ...s.pos },
                  vel: { x: Math.cos(ang + off) * 11 * scale, y: Math.sin(ang + off) * 11 * scale },
                  size: 36 * scale,
                });
              }
            }
            danmakuT.current = phase2.current
              ? ATTACK_INTERVALS.danmaku.phase2
              : ATTACK_INTERVALS.danmaku.normal;
          }
        }

        // Movement
        let nx = s.pos.x + vx * (dt / 16);
        let ny = s.pos.y + vy * (dt / 16);
        if (nx <= 50 * scale || nx >= d.width - 100 * scale) {
          vx *= -1;
          nx = clamp(nx, 50 * scale, d.width - 100 * scale);
        }
        if (ny <= 100 * scale || ny >= d.height - 100 * scale) {
          vy *= -1;
          ny = clamp(ny, 100 * scale, d.height - 100 * scale);
        }

        // Normal wave shooting
        if (!isBoss.current) {
          const cd = s.cooldown - dt;
          if (cd <= 0) {
            newBones.push(
              aimBone(
                boneIdRef.current++,
                { x: nx, y: ny },
                cur,
                (BONE_SPEED_BASE + wave.current * 0.3) * scale,
                36 * scale,
              ),
            );
            return { ...s, pos: { x: nx, y: ny }, vel: { x: vx, y: vy }, cooldown: rand(1800, 4000) };
          }
          return { ...s, pos: { x: nx, y: ny }, vel: { x: vx, y: vy }, cooldown: cd, angle: (s.angle + s.dAngle) % 360 };
        }

        return { ...s, pos: { x: nx, y: ny }, vel: { x: vx, y: vy }, angle: (s.angle + s.dAngle) % 360 };
      });

      // ── Update bones ─────────────────────────────────────────────────────────
      bonesRef.current = [...bonesRef.current, ...newBones]
        .map(b => ({ ...b, pos: { x: b.pos.x + b.vel.x * (dt / 16), y: b.pos.y + b.vel.y * (dt / 16) } }))
        .filter(
          (b) =>
            b.pos.x > -cleanupPad &&
            b.pos.x < d.width + cleanupPad &&
            b.pos.y > -cleanupPad &&
            b.pos.y < d.height + cleanupPad,
        );

      // ── Update blasters ──────────────────────────────────────────────────────
      blastersRef.current = blastersRef.current.map(b => {
        const rem = b.timer - dt;
        if (b.state === "idle" && rem <= 0) {
          shakeRef.current = Math.max(shakeRef.current, 12);
          play("fire");
          return { ...b, state: "fire" as const, timer: 500 };
        }
        if (rem <= 0) return null;
        return { ...b, timer: rem };
      }).filter(Boolean) as Blaster[];

      // ── Bone collision ───────────────────────────────────────────────────────
      for (const b of bonesRef.current) {
        if (hypot(b.pos, cur) < 22 * scale) {
          takeDamage(1, 9, IFRAMES_MS);
          break;
        }
      }

      // ── Blaster collision ────────────────────────────────────────────────────
      for (const b of blastersRef.current) {
        if (b.state !== "fire") continue;
        const bDx = Math.cos(b.angle);
        const bDy = Math.sin(b.angle);
        const pX = cur.x - b.pos.x;
        const pY = cur.y - b.pos.y;
        const dot = pX * bDx + pY * bDy;
        if (dot > 0 && dot < beamRange) {
          const perp = Math.abs(pX * bDy - pY * bDx);
          if (perp < 45 * b.scale * scale) {
            takeDamage(0, 1.8, 0);
          }
        }
      }

      // ── Commit render ────────────────────────────────────────────────────────
      setRenderSans([...sansRef.current]);
      setRenderBones([...bonesRef.current]);
      setRenderBlasters([...blastersRef.current]);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dims.width, gameOver, spawnWave, takeDamage, play]);

  const shakeX = shakeOffset.x;
  const shakeY = shakeOffset.y;

  const pixelFont = "'Press Start 2P', 'Courier New', monospace";
  const gameScale = getGameScale(dims);
  const uiScale = getUiScale(gameScale);
  const beamLength = Math.max(dims.width || BASE_WIDTH, dims.height || BASE_HEIGHT) * 3;
  const cursorSize = Math.max(24, 28 * gameScale);
  const touchButtonSize = Math.max(88, 120 * uiScale);
  const touchInset = Math.max(16, 18 * uiScale);
  const canTouchAttack = renderSans.some((sans) => pointHitsSans(cursor, sans));

  return (
    <>
      {/* Google Fonts — Press Start 2P (pixel/arcade font) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes utFadeIn {
          0%   { opacity: 0 }
          33%  { opacity: 0 }
          66%  { opacity: 0.6 }
          100% { opacity: 1 }
        }
        @keyframes pixelBlink {
          0%, 49% { opacity: 1 }
          50%, 100% { opacity: 0 }
        }
        @keyframes pixelPing {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(1.6); opacity: 0; }
        }

        * { image-rendering: pixelated; box-sizing: border-box; }
        body { background: #000; }
      `}</style>

      <main
        className="fixed inset-0 overflow-hidden select-none"
        style={{
          background: "#000",
          cursor: "none",
          transform: `translate(${shakeX}px, ${shakeY}px)`,
          fontFamily: pixelFont,
          touchAction: "none",
          overscrollBehavior: "none",
          WebkitUserSelect: "none",
        }}
        onMouseMove={(e) => {
          if (showTouchControls) return;
          updateCursor({ x: e.clientX, y: e.clientY });
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") {
            e.preventDefault();
            return;
          }
          if (!showTouchControls) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          touchPointerIdRef.current = e.pointerId;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateCursor({ x: e.clientX, y: e.clientY });
        }}
        onPointerMove={(e) => {
          if (!showTouchControls || touchPointerIdRef.current !== e.pointerId) return;
          updateCursor({ x: e.clientX, y: e.clientY });
        }}
        onPointerUp={(e) => {
          if (touchPointerIdRef.current !== e.pointerId) return;
          touchPointerIdRef.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        onPointerCancel={(e) => {
          if (touchPointerIdRef.current !== e.pointerId) return;
          touchPointerIdRef.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
      >
        {/* ── HUD ─────────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          borderBottom: `${Math.max(2, 3 * uiScale)}px solid #fff`,
          background: "#000",
          padding: `${Math.max(10, 12 * uiScale)}px ${Math.max(14, 24 * uiScale)}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 10 * uiScale,
        }}>
          {/* Left: title + wave */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 * uiScale }}>
            <span style={{ fontFamily: pixelFont, fontSize: Math.max(10, 13 * uiScale), color: "#fff", letterSpacing: "0.1em" }}>
              SANS
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 * uiScale }}>
              <span style={{ fontFamily: pixelFont, fontSize: Math.max(8, 9 * uiScale), color: "#888" }}>WAVE</span>
              <span style={{ fontFamily: pixelFont, fontSize: Math.max(8, 9 * uiScale), color: "#fff" }}>{waveNum}</span>
              {isPhase2 && (
                <span style={{
                  fontFamily: pixelFont, fontSize: Math.max(7, 8 * uiScale), color: "#000",
                  background: "#fff", padding: "2px 5px",
                  animation: "pixelBlink 0.4s steps(1) infinite",
                }}>
                  !! P2
                </span>
              )}
            </div>
          </div>

          {/* Right: score + HP */}
          <div style={{ display: "flex", gap: 32 * uiScale, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 * uiScale }}>
              <span style={{ fontFamily: pixelFont, fontSize: Math.max(7, 8 * uiScale), color: "#888" }}>SCORE</span>
              <span style={{ fontFamily: pixelFont, fontSize: Math.max(11, 14 * uiScale), color: "#fff" }}>{score}</span>
            </div>
            <HpBar hp={playerHP} karma={karma} max={MAX_HP} scale={uiScale} />
          </div>
        </div>

        {/* ── Boss HP Bar ──────────────────────────────────────────────────── */}
        {isBossWave && <BossHpBar hp={bossHP} phase2={isPhase2} scale={uiScale} />}

        {/* ── Arena ───────────────────────────────────────────────────────── */}
        <div className="relative w-full h-full">

          {/* Blaster beams — white core + pixelated stepped glow */}
          {renderBlasters.map((b) =>
            b.state === "fire" ? (
              <div
                key={`beam-${b.id}`}
                style={{
                  position: "absolute",
                  left: b.pos.x,
                  top: b.pos.y,
                  width: beamLength,
                  height: 90 * b.scale * gameScale,
                  background: "#fff",
                  /* Stepped box-shadows simulate pixelated glow — hard stops, no blur */
                  boxShadow: `
                    0 ${8 * b.scale * gameScale}px 0 0 rgba(255,255,255,0.6),
                    0 -${8 * b.scale * gameScale}px 0 0 rgba(255,255,255,0.6),
                    0 ${16 * b.scale * gameScale}px 0 0 rgba(180,230,255,0.35),
                    0 -${16 * b.scale * gameScale}px 0 0 rgba(180,230,255,0.35),
                    0 ${28 * b.scale * gameScale}px 0 0 rgba(100,200,255,0.15),
                    0 -${28 * b.scale * gameScale}px 0 0 rgba(100,200,255,0.15)
                  `,
                  transform: `translate(0, -50%) rotate(${b.angle}rad)`,
                  transformOrigin: "left center",
                  zIndex: 10,
                  opacity: b.timer / 500,
                  pointerEvents: "none",
                  imageRendering: "pixelated",
                }}
              />
            ) : null
          )}

          {/* Bones */}
          {renderBones.map((b) => (
            <img
              key={b.id}
              src="/Images/sans_bone_attack.png"
              alt=""
              style={{
                position: "absolute",
                left: b.pos.x,
                top: b.pos.y,
                width: b.size * (4 / 3),
                pointerEvents: "none",
                imageRendering: "pixelated",
                transform: `translate(-50%, -50%) rotate(${Math.atan2(b.vel.y, b.vel.x) * (180 / Math.PI) + 90}deg)`,
              }}
            />
          ))}

          {/* Blaster bodies — grayscale */}
          {renderBlasters.map((b) => (
            <img
              key={b.id}
              src={b.state === "idle" ? "/Images/idle_gaster-blaster.png" : "/Images/shooting_gaster-blaster.png"}
              alt=""
              style={{
                position: "absolute",
                left: b.pos.x,
                top: b.pos.y,
                width: 140 * b.scale * gameScale,
                zIndex: 20,
                pointerEvents: "none",
                imageRendering: "pixelated",
                filter: "grayscale(1) contrast(1.2)",
                transform: `translate(-50%, -50%) rotate(${b.angle - Math.PI / 2}rad)`,
              }}
            />
          ))}

          {/* Sans entities */}
          {renderSans.map((s) => (
            <div
              key={s.id}
              style={{
                position: "absolute",
                left: s.pos.x,
                top: s.pos.y,
                width: s.size,
                height: s.size,
                transform: "translate(-50%, -50%)",
                zIndex: 30,
              }}
            >
              <div
                style={{ position: "absolute", inset: "-20%", cursor: "crosshair", zIndex: 40 }}
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") return;
                  e.preventDefault();
                  hitSans(s);
                }}
              />
              {/* Warning flash box */}
              {(s.cooldown < 600 || (isBossWave && isPhase2)) && (
                <div style={{
                  position: "absolute",
                  left: "50%", top: "50%",
                  width: "130%", height: "130%",
                  border: `${Math.max(1, 2 * gameScale)}px solid #fff`,
                  pointerEvents: "none",
                  animation: "pixelPing 0.5s steps(3) infinite",
                }} />
              )}
              <img
                src="/Images/sans_face_high_res.png"
                alt=""
                draggable={false}
                style={{
                  width: "100%", height: "100%",
                  pointerEvents: "none",
                  imageRendering: "pixelated",
                  filter: "grayscale(1) contrast(1.15)",
                  transform: `rotate(${s.angle}deg)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Soul cursor ─────────────────────────────────────────────────── */}
        <img
          src="/Images/soul_cursor_sanssimulator.png"
          alt=""
          style={{
            position: "fixed",
            left: cursor.x,
            top: cursor.y,
            width: cursorSize,
            pointerEvents: "none",
            zIndex: 100,
            imageRendering: "pixelated",
            transform: `translate(-50%, -50%)${gameOver ? ` scale(${Math.max(1.6, 2 * gameScale)}) rotate(45deg)` : ""}`,
            opacity: isInvulnerable && blinkTick === 0 ? 0.25 : 1,
            filter: gameOver ? "grayscale(1) brightness(0.4)" : undefined,
            transition: gameOver ? "transform 0.2s steps(4)" : undefined,
          }}
        />

        {/* ── Game Over ───────────────────────────────────────────────────── */}
        {showTouchControls && !gameOver && (
          <div style={{ position: "fixed", inset: 0, zIndex: 130, pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: touchInset,
                bottom: touchInset,
                maxWidth: Math.min(220, dims.width * 0.4),
                border: `${Math.max(2, 3 * uiScale)}px solid rgba(255,255,255,0.7)`,
                background: "rgba(0, 0, 0, 0.72)",
                color: "#fff",
                padding: `${10 * uiScale}px ${12 * uiScale}px`,
                fontSize: Math.max(8, 10 * uiScale),
                lineHeight: 1.6,
                letterSpacing: "0.08em",
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
                borderRadius: "999px",
                border: `${Math.max(3, 4 * uiScale)}px solid #fff`,
                background: canTouchAttack ? "rgba(250, 204, 21, 0.9)" : "rgba(255, 255, 255, 0.1)",
                color: canTouchAttack ? "#000" : "#fff",
                fontFamily: pixelFont,
                fontSize: Math.max(11, 14 * uiScale),
                letterSpacing: "0.1em",
                pointerEvents: "auto",
                touchAction: "none",
                boxShadow: canTouchAttack ? "0 0 0 4px rgba(250, 204, 21, 0.25)" : "0 0 0 4px rgba(255, 255, 255, 0.08)",
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                attackAtCursor();
              }}
            >
              ATTACK
            </button>
          </div>
        )}
        {gameOver && (
          <GameOverScreen score={score} onRestart={() => window.location.reload()} scale={uiScale} />
        )}
      </main>
    </>
  );
}
