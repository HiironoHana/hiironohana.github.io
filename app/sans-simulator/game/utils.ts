import type { GameDims, SansFace, Vec2 } from "./types";

export const BASE_WIDTH = 1920;
export const BASE_HEIGHT = 1080;
export const MIN_GAME_SCALE = 0.55;
export const MAX_GAME_SCALE = 1.5;
export const MIN_UI_SCALE = 0.72;
export const MAX_UI_SCALE = 1.25;

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const hypot = (a: Vec2, b: Vec2) => Math.hypot(a.x - b.x, a.y - b.y);

export function getGameScale(dims: GameDims) {
  if (!dims.width || !dims.height) return 1;
  return clamp(Math.min(dims.width / BASE_WIDTH, dims.height / BASE_HEIGHT), MIN_GAME_SCALE, MAX_GAME_SCALE);
}

export function getUiScale(scale: number) {
  return clamp(Math.max(scale, MIN_UI_SCALE), MIN_UI_SCALE, MAX_UI_SCALE);
}

export function clampToGame(pos: Vec2, dims: GameDims) {
  return {
    x: clamp(pos.x, 0, dims.width),
    y: clamp(pos.y, 0, dims.height),
  };
}

export function detectTouchControls() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    (navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches)
  );
}

export const distToLine = (point: Vec2, origin: Vec2, angle: number) => {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const px = point.x - origin.x;
  const py = point.y - origin.y;
  const dot = px * dx + py * dy;
  const perp = Math.abs(px * dy - py * dx);
  return { dot, perp };
};

export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export function makeSans(id: number, dims: GameDims): SansFace {
  return {
    id,
    pos: { x: rand(100, dims.width - 150), y: rand(150, dims.height - 200) },
    vel: { x: rand(-2, 2), y: rand(-2, 2) },
    angle: rand(0, 360),
    dAngle: rand(-2, 2),
    size: rand(80, 110),
    cooldown: rand(1800, 4000),
  };
}

export function direction(from: Vec2, to: Vec2) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

export function averagePosition(points: Vec2[]) {
  if (!points.length) {
    return { x: 0, y: 0 };
  }
  const total = points.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 });
  return { x: total.x / points.length, y: total.y / points.length };
}

export function pointHitsSans(pointer: Vec2, sans: SansFace, scale = 1) {
  const half = sans.size * 0.42 * scale;
  return Math.abs(pointer.x - sans.pos.x) <= half && Math.abs(pointer.y - sans.pos.y) <= half;
}
