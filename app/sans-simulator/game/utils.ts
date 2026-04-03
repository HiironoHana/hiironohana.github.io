import type { GameDims, SansFace, Vec2 } from "./types";

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const hypot = (a: Vec2, b: Vec2) => Math.hypot(a.x - b.x, a.y - b.y);

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

export function pointHitsSans(pointer: Vec2, sans: SansFace) {
  const half = sans.size * 0.42;
  return Math.abs(pointer.x - sans.pos.x) <= half && Math.abs(pointer.y - sans.pos.y) <= half;
}
