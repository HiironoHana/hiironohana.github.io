import { BLASTER_FIRE_MS, BONE_SPEED_BASE, IFRAMES_MS } from "./constants";
import type { Blaster, Bone, GameDims, PlayerCombatState, SansFace, Vec2 } from "./types";
import { averagePosition, clamp, direction, rand } from "./utils";

type CommonAttackArgs = {
  dims: GameDims;
  boss: SansFace;
  players: PlayerCombatState[];
  nextBoneId: () => number;
  nextBlasterId: () => number;
};

function aimedBlaster(pos: Vec2, target: Vec2, id: number, scale = 1, chargeDuration = 700): Blaster {
  return {
    id,
    pos,
    angle: Math.atan2(target.y - pos.y, target.x - pos.x),
    state: "charge",
    timer: chargeDuration,
    scale,
    chargeDuration,
  };
}

function nearestAlivePlayer(players: PlayerCombatState[], from: Vec2) {
  const alive = players.filter((player) => player.connected && player.alive);
  if (!alive.length) return null;
  return alive.reduce((best, player) => {
    const bestDist = Math.hypot(best.pos.x - from.x, best.pos.y - from.y);
    const dist = Math.hypot(player.pos.x - from.x, player.pos.y - from.y);
    return dist < bestDist ? player : best;
  });
}

export function aimBone(id: number, from: Vec2, to: Vec2, speed = BONE_SPEED_BASE): Bone {
  const dir = direction(from, to);
  return { id, pos: { ...from }, vel: { x: dir.x * speed, y: dir.y * speed }, size: 36 };
}

export function spawnBossScreenAttack({
  dims,
  boss,
  players,
  nextBoneId,
  nextBlasterId,
}: CommonAttackArgs): { bones: Bone[]; blasters: Blaster[]; charge: boolean } {
  const targetPlayers = players.filter((player) => player.connected && player.alive);
  const target = nearestAlivePlayer(players, boss.pos) ?? players[0];
  const centerTarget = averagePosition(targetPlayers.map((player) => player.pos));
  const bones: Bone[] = [];
  const blasters: Blaster[] = [];
  const speedScale = targetPlayers.length > 1 ? 1.08 : 1;
  const choice = Math.floor(Math.random() * 12);

  if (choice === 0) {
    const gapX = rand(100, dims.width - 100);
    for (let x = 0; x < dims.width; x += 45) {
      if (Math.abs(x - gapX) > 120) {
        bones.push({ id: nextBoneId(), pos: { x, y: dims.height + 60 }, vel: { x: 0, y: -8 * speedScale }, size: 36 });
      }
    }
  } else if (choice === 1) {
    const gapY = rand(200, dims.height - 100);
    for (let y = 0; y < dims.height; y += 45) {
      if (Math.abs(y - gapY) > 120) {
        bones.push({ id: nextBoneId(), pos: { x: -60, y }, vel: { x: 9 * speedScale, y: 0 }, size: 36 });
      }
    }
  } else if (choice === 2) {
    const off = 400;
    [
      { x: dims.width / 2, y: -off, angle: Math.PI / 2 },
      { x: dims.width / 2, y: dims.height + off, angle: -Math.PI / 2 },
      { x: -off, y: dims.height / 2, angle: 0 },
      { x: dims.width + off, y: dims.height / 2, angle: Math.PI },
    ].forEach((entry, index) => {
      blasters.push({
        id: nextBlasterId(),
        pos: { x: entry.x, y: entry.y },
        angle: entry.angle,
        state: "charge",
        timer: 900 + index * 150,
        scale: 1,
        chargeDuration: 900 + index * 150,
      });
    });
    return { bones, blasters, charge: true };
  } else if (choice === 3) {
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      bones.push({
        id: nextBoneId(),
        pos: { ...boss.pos },
        vel: { x: Math.cos(angle) * 7, y: Math.sin(angle) * 7 },
        size: 36,
      });
    }
  } else if (choice === 4) {
    for (let x = 0; x < dims.width; x += 90) {
      bones.push({ id: nextBoneId(), pos: { x, y: -50 }, vel: { x: 0, y: 7 }, size: 36 });
      bones.push({ id: nextBoneId(), pos: { x: x + 45, y: dims.height + 50 }, vel: { x: 0, y: -7 }, size: 36 });
    }
  } else if (choice === 5) {
    blasters.push({
      id: nextBlasterId(),
      pos: { x: dims.width / 2, y: -200 },
      angle: Math.PI / 2,
      state: "charge",
      timer: 1200,
      scale: 2.5,
      chargeDuration: 1200,
    });
    return { bones, blasters, charge: true };
  } else if (choice === 6) {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 450;
      const bx = centerTarget.x + Math.cos(angle) * radius;
      const by = centerTarget.y + Math.sin(angle) * radius;
      blasters.push(aimedBlaster({ x: bx, y: by }, centerTarget, nextBlasterId(), 1, 700 + i * 100));
    }
    return { bones, blasters, charge: true };
  } else if (choice === 7) {
    for (let x = -120; x < dims.width + 120; x += 90) {
      bones.push({ id: nextBoneId(), pos: { x, y: -60 }, vel: { x: 4.8, y: 7.2 }, size: 36 });
      bones.push({ id: nextBoneId(), pos: { x, y: dims.height + 60 }, vel: { x: -4.8, y: -7.2 }, size: 36 });
    }
  } else if (choice === 8) {
    const off = 340;
    [
      { x: -off, y: -off },
      { x: dims.width + off, y: -off },
      { x: -off, y: dims.height + off },
      { x: dims.width + off, y: dims.height + off },
    ].forEach((pos, index) => {
      blasters.push(aimedBlaster(pos, centerTarget, nextBlasterId(), 1.05, 850 + index * 120));
    });
    return { bones, blasters, charge: true };
  } else if (choice === 9) {
    for (let i = 0; i < 8; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(6.5, 10.5);
      bones.push({
        id: nextBoneId(),
        pos: { ...boss.pos },
        vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        size: 36,
        bouncesLeft: 2,
      });
    }
  } else if (choice === 10) {
    const angle = Math.atan2(target.pos.y - boss.pos.y, target.pos.x - boss.pos.x);
    for (let i = -2; i <= 2; i++) {
      const offset = i * 0.24;
      bones.push({
        id: nextBoneId(),
        pos: { ...boss.pos },
        vel: { x: Math.cos(angle + offset) * 12, y: Math.sin(angle + offset) * 12 },
        size: 36,
      });
    }
  } else {
    targetPlayers.forEach((player, index) => {
      const ringAngle = (index / Math.max(1, targetPlayers.length)) * Math.PI * 2 + Math.PI * 0.2;
      const pos = {
        x: player.pos.x + Math.cos(ringAngle) * 320,
        y: player.pos.y + Math.sin(ringAngle) * 320,
      };
      blasters.push(aimedBlaster(pos, player.pos, nextBlasterId(), 1, 680 + index * 80));
    });
    if (!blasters.length && target) {
      blasters.push(aimedBlaster({ x: target.pos.x + 320, y: target.pos.y - 220 }, target.pos, nextBlasterId()));
    }
    return { bones, blasters, charge: true };
  }

  return { bones, blasters, charge: false };
}

export function spawnBossDanmaku({
  boss,
  players,
  nextBoneId,
  nextBlasterId,
}: Pick<CommonAttackArgs, "boss" | "players" | "nextBoneId" | "nextBlasterId">) {
  const target = nearestAlivePlayer(players, boss.pos);
  if (!target) {
    return { bones: [] as Bone[], blasters: [] as Blaster[], charge: false };
  }

  if (Math.random() > 0.45) {
    const angle = Math.random() * Math.PI * 2;
    const pos = {
      x: target.pos.x + Math.cos(angle) * 350,
      y: target.pos.y + Math.sin(angle) * 350,
    };
    return {
      bones: [],
      blasters: [aimedBlaster(pos, target.pos, nextBlasterId(), 1, 600)],
      charge: true,
    };
  }

  const angle = Math.atan2(target.pos.y - boss.pos.y, target.pos.x - boss.pos.x);
  const bones: Bone[] = [];
  for (let i = 0; i < 3; i++) {
    const offset = (i - 1) * 0.15;
    bones.push({
      id: nextBoneId(),
      pos: { ...boss.pos },
      vel: { x: Math.cos(angle + offset) * 11, y: Math.sin(angle + offset) * 11 },
      size: 36,
    });
  }
  return { bones, blasters: [], charge: false };
}

export function updateBoneMotion(bone: Bone, dt: number, dims: GameDims) {
  let nextX = bone.pos.x + bone.vel.x * (dt / 16);
  let nextY = bone.pos.y + bone.vel.y * (dt / 16);
  let nextVelX = bone.vel.x;
  let nextVelY = bone.vel.y;
  let bouncesLeft = bone.bouncesLeft ?? 0;

  if (bouncesLeft > 0) {
    if (nextX <= 24 || nextX >= dims.width - 24) {
      nextVelX *= -1;
      nextX = clamp(nextX, 24, dims.width - 24);
      bouncesLeft -= 1;
    }
    if (nextY <= 80 || nextY >= dims.height - 24) {
      nextVelY *= -1;
      nextY = clamp(nextY, 80, dims.height - 24);
      bouncesLeft -= 1;
    }
  }

  return {
    ...bone,
    pos: { x: nextX, y: nextY },
    vel: { x: nextVelX, y: nextVelY },
    bouncesLeft,
  };
}

export function updateBlaster(blaster: Blaster, dt: number) {
  const remaining = blaster.timer - dt;
  if (blaster.state === "charge" && remaining <= 0) {
    return {
      next: {
        ...blaster,
        state: "fire" as const,
        timer: BLASTER_FIRE_MS,
      },
      fired: true,
      expired: false,
    };
  }
  if (remaining <= 0) {
    return { next: null, fired: false, expired: true };
  }
  return { next: { ...blaster, timer: remaining }, fired: false, expired: false };
}

export function boneDamage() {
  return { direct: 1, karma: 9, iframes: IFRAMES_MS };
}
