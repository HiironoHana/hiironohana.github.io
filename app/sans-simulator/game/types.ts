export interface Vec2 {
  x: number;
  y: number;
}

export interface SansFace {
  id: number;
  pos: Vec2;
  vel: Vec2;
  angle: number;
  dAngle: number;
  size: number;
  cooldown: number;
}

export interface Bone {
  id: number;
  pos: Vec2;
  vel: Vec2;
  size: number;
  bouncesLeft?: number;
}

export interface Blaster {
  id: number;
  pos: Vec2;
  angle: number;
  state: "charge" | "fire";
  timer: number;
  scale: number;
  chargeDuration: number;
}

export interface GameDims {
  width: number;
  height: number;
}

export const PLAYER_IDS = ["host", "peer1", "peer2", "peer3"] as const;
export type PlayerId = (typeof PLAYER_IDS)[number];

export interface PlayerCombatState {
  id: PlayerId;
  label: string;
  pos: Vec2;
  hp: number;
  karma: number;
  alive: boolean;
  invuln: number;
  connected: boolean;
  ready: boolean;
  ping: number;
  peerId: string | null;
}

export type PlayerRenderState = PlayerCombatState;

export interface LobbyPlayerState {
  id: PlayerId;
  label: string;
  connected: boolean;
  ready: boolean;
  ping: number;
}

export type SessionMode = "solo" | "host" | "client";
export type SessionPhase = "menu" | "lobby" | "battle" | "soloGameOver";

export interface WelcomePayload {
  playerId: PlayerId;
  hostCode: string;
  players: Record<PlayerId, PlayerCombatState>;
}

export interface SnapshotPayload {
  sans: SansFace[];
  bones: Bone[];
  blasters: Blaster[];
  players: Record<PlayerId, PlayerCombatState>;
  score: number;
  bossHP: number;
  waveNum: number;
  isPhase2: boolean;
  isBossWave: boolean;
  phase: SessionPhase;
  serverTime: number;
}

export type NetworkMessage =
  | {
      type: "hello";
      peerId: string;
      name: string;
    }
  | {
      type: "welcome";
      payload: WelcomePayload;
    }
  | {
      type: "lobby";
      players: Record<PlayerId, PlayerCombatState>;
    }
  | {
      type: "ready";
      ready: boolean;
      name: string;
    }
  | {
      type: "cursor";
      pos: Vec2;
      sentAt: number;
    }
  | {
      type: "pointer-attack";
      pos: Vec2;
    }
  | {
      type: "snapshot";
      payload: SnapshotPayload;
    }
  | {
      type: "ping";
      sentAt: number;
    }
  | {
      type: "pong";
      sentAt: number;
    }
  | {
      type: "error";
      message: string;
    };

export interface PeerConnectionLike {
  send: (data: unknown) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  close: () => void;
  open: boolean;
}

export interface PeerLike {
  id: string;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  connect: (id: string) => PeerConnectionLike;
  destroy: () => void;
}

export interface PeerConstructor {
  new (id?: string): PeerLike;
}
