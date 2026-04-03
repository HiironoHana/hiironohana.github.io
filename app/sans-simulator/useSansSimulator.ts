"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ATTACK_INTERVALS,
  BONE_SPEED_BASE,
  CURSOR_SEND_INTERVAL_MS,
  GAME_TICK_RATE,
  IFRAMES_MS,
  INTERPOLATION_DELAY_MS,
  MAX_HP,
  PING_INTERVAL_MS,
  SNAPSHOT_INTERVAL_MS,
  SNAPSHOT_RATE,
} from "./game/constants";
import { aimBone, boneDamage, spawnBossDanmaku, spawnBossScreenAttack, updateBlaster, updateBoneMotion } from "./game/attacks";
import { loadPeerJs } from "./game/peer";
import type {
  Blaster,
  Bone,
  GameDims,
  LobbyPlayerState,
  NetworkMessage,
  PeerConnectionLike,
  PeerLike,
  PlayerCombatState,
  PlayerId,
  PlayerRenderState,
  SansFace,
  SessionMode,
  SessionPhase,
  SnapshotPayload,
  WelcomePayload,
  Vec2,
} from "./game/types";
import { PLAYER_IDS } from "./game/types";
import { useAudio } from "./game/useAudio";
import { clamp, distToLine, hypot, makeSans, pointHitsSans, rand } from "./game/utils";

type MutableState = {
  sans: SansFace[];
  bones: Bone[];
  blasters: Blaster[];
  waveNum: number;
  isBossWave: boolean;
  isPhase2: boolean;
  score: number;
  bossHP: number;
  players: Record<PlayerId, PlayerCombatState>;
  pendingNextWave: boolean;
  screenAttackTimer: number;
  danmakuTimer: number;
  shake: number;
};

const playerLabelMap: Record<PlayerId, string> = {
  host: "HOST",
  peer1: "PLAYER 2",
  peer2: "PLAYER 3",
  peer3: "PLAYER 4",
};

function sanitizeName(value: string, fallback: string) {
  const cleaned = value.trim().replace(/\s+/g, " ").slice(0, 18);
  return cleaned || fallback;
}

function createPlayer(id: PlayerId, label?: string): PlayerCombatState {
  return {
    id,
    label: sanitizeName(label ?? "", playerLabelMap[id]),
    pos: { x: 0, y: 0 },
    hp: id === "host" ? MAX_HP : 0,
    karma: 0,
    alive: id === "host",
    invuln: 0,
    connected: id === "host",
    ready: false,
    ping: 0,
    peerId: null,
  };
}

function createPlayersRecord() {
  return PLAYER_IDS.reduce(
    (acc, id) => {
      acc[id] = createPlayer(id);
      return acc;
    },
    {} as Record<PlayerId, PlayerCombatState>,
  );
}

function createInitialMutableState(): MutableState {
  return {
    sans: [],
    bones: [],
    blasters: [],
    waveNum: 1,
    isBossWave: false,
    isPhase2: false,
    score: 0,
    bossHP: 100,
    players: createPlayersRecord(),
    pendingNextWave: false,
    screenAttackTimer: 2000,
    danmakuTimer: 1000,
    shake: 0,
  };
}

function clonePlayers(players: Record<PlayerId, PlayerCombatState>) {
  return PLAYER_IDS.reduce(
    (acc, id) => {
      acc[id] = { ...players[id], pos: { ...players[id].pos } };
      return acc;
    },
    {} as Record<PlayerId, PlayerCombatState>,
  );
}

function connectedPlayers(players: Record<PlayerId, PlayerCombatState>) {
  return PLAYER_IDS.map((id) => players[id]).filter((player) => player.connected);
}

function alivePlayers(players: Record<PlayerId, PlayerCombatState>) {
  return connectedPlayers(players).filter((player) => player.alive);
}

function firstFreePeerId(players: Record<PlayerId, PlayerCombatState>) {
  return (["peer1", "peer2", "peer3"] as const).find((id) => !players[id].connected) ?? null;
}

function allConnectedPlayersReady(players: Record<PlayerId, PlayerCombatState>) {
  const current = connectedPlayers(players);
  return current.length > 1 && current.every((player) => player.ready);
}

function hostConnectionsToArray(connections: Partial<Record<PlayerId, PeerConnectionLike>>) {
  return (["peer1", "peer2", "peer3"] as const)
    .map((id) => connections[id])
    .filter((connection): connection is PeerConnectionLike => Boolean(connection?.open));
}

function lobbyStateFromPlayers(players: Record<PlayerId, PlayerCombatState>) {
  return PLAYER_IDS.reduce(
    (acc, id) => {
      acc[id] = { ...players[id], pos: { ...players[id].pos } };
      return acc;
    },
    {} as Record<PlayerId, PlayerCombatState>,
  );
}

export function useSansSimulator() {
  const play = useAudio();

  const [dims, setDims] = useState<GameDims>({ width: 0, height: 0 });
  const dimsRef = useRef<GameDims>({ width: 0, height: 0 });

  const [phase, setPhase] = useState<SessionPhase>("menu");
  const phaseRef = useRef<SessionPhase>("menu");
  const [mode, setMode] = useState<SessionMode>("solo");
  const modeRef = useRef<SessionMode>("solo");
  const [localPlayerId, setLocalPlayerId] = useState<PlayerId>("host");
  const localPlayerIdRef = useRef<PlayerId>("host");

  const [renderSans, setRenderSans] = useState<SansFace[]>([]);
  const [renderBones, setRenderBones] = useState<Bone[]>([]);
  const [renderBlasters, setRenderBlasters] = useState<Blaster[]>([]);
  const [renderPlayers, setRenderPlayers] = useState<PlayerRenderState[]>([]);
  const [waveNum, setWaveNum] = useState(1);
  const [isBossWave, setIsBossWave] = useState(false);
  const [isPhase2, setIsPhase2] = useState(false);
  const [score, setScore] = useState(0);
  const [bossHP, setBossHP] = useState(100);
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });
  const [hostCode, setHostCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("Player");
  const [connectionStatus, setConnectionStatus] = useState("Choose a mode.");
  const [lastError, setLastError] = useState<string | null>(null);
  const [localReady, setLocalReady] = useState(false);
  const [localPing, setLocalPing] = useState(0);
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayerState[]>(
    PLAYER_IDS.map((id) => ({ id, label: playerLabelMap[id], connected: id === "host", ready: false, ping: 0 })),
  );

  const stateRef = useRef<MutableState>(createInitialMutableState());
  const pointerRef = useRef<Vec2>({ x: 0, y: 0 });
  const clickLockRef = useRef(false);
  const boneIdRef = useRef(1);
  const blasterIdRef = useRef(1);
  const sansIdRef = useRef(1);
  const peerRef = useRef<PeerLike | null>(null);
  const clientConnRef = useRef<PeerConnectionLike | null>(null);
  const hostConnectionsRef = useRef<Partial<Record<PlayerId, PeerConnectionLike>>>({});
  const connectionOwnersRef = useRef(new Map<PeerConnectionLike, PlayerId>());

  const setLocalIdentity = useCallback((id: PlayerId) => {
    localPlayerIdRef.current = id;
    setLocalPlayerId(id);
  }, []);

  const broadcastToClients = useCallback((message: NetworkMessage) => {
    for (const connection of hostConnectionsToArray(hostConnectionsRef.current)) {
      connection.send(message);
    }
  }, []);

  const commitRender = useCallback(() => {
    const state = stateRef.current;
    const players = connectedPlayers(state.players).map((player) => {
      if (modeRef.current === "client" && phaseRef.current === "battle" && player.id === localPlayerIdRef.current) {
        return { ...player, pos: { ...pointerRef.current } };
      }
      return player;
    });

    setRenderSans([...state.sans]);
    setRenderBones([...state.bones]);
    setRenderBlasters([...state.blasters]);
    setRenderPlayers(players);
    setWaveNum(state.waveNum);
    setIsBossWave(state.isBossWave);
    setIsPhase2(state.isPhase2);
    setScore(state.score);
    setBossHP(state.bossHP);
    setLocalReady(state.players[localPlayerIdRef.current].ready);
    setLocalPing(
      modeRef.current === "host"
        ? Math.round(
            connectedPlayers(state.players)
              .filter((player) => player.id !== "host")
              .reduce((acc, player, _, arr) => acc + player.ping / Math.max(arr.length, 1), 0),
          )
        : state.players[localPlayerIdRef.current].ping,
    );
    setLobbyPlayers(
      PLAYER_IDS.map((id) => ({
        id,
        label: state.players[id].label,
        connected: state.players[id].connected,
        ready: state.players[id].ready,
        ping: state.players[id].ping,
      })),
    );
  }, []);

  const sendLobbyUpdate = useCallback(() => {
    broadcastToClients({ type: "lobby", players: lobbyStateFromPlayers(stateRef.current.players) });
  }, [broadcastToClients]);

  const resetCombatPlayers = useCallback(() => {
    const state = stateRef.current;
    let offsetIndex = 0;
    for (const id of PLAYER_IDS) {
      const player = state.players[id];
      if (!player.connected) {
        state.players[id] = { ...player, hp: 0, karma: 0, alive: false, invuln: 0, ready: false, ping: player.ping };
        continue;
      }
      offsetIndex += 1;
      state.players[id] = {
        ...player,
        hp: MAX_HP,
        karma: 0,
        alive: true,
        invuln: 0,
        pos:
          id === localPlayerIdRef.current && modeRef.current !== "host"
            ? { ...pointerRef.current }
            : { x: dimsRef.current.width / 2 + (offsetIndex - 2) * 76, y: dimsRef.current.height / 2 },
      };
    }
  }, []);

  const spawnWave = useCallback(
    (waveOverride?: number) => {
      const state = stateRef.current;
      const wave = waveOverride ?? state.waveNum;
      const d = dimsRef.current;
      if (!d.width) return;

      state.waveNum = wave;
      state.isBossWave = wave % 5 === 0;
      state.isPhase2 = false;
      state.screenAttackTimer = 2000;
      state.danmakuTimer = 1000;
      state.pendingNextWave = false;
      state.bones = [];
      state.blasters = [];
      resetCombatPlayers();

      if (state.isBossWave) {
        state.bossHP = 100;
        state.sans = [
          {
            ...makeSans(sansIdRef.current++, d),
            pos: { x: d.width / 2, y: 180 },
            vel: { x: 0, y: 0 },
            size: 160,
            cooldown: 999999,
          },
        ];
      } else {
        const count = 3 + Math.floor(wave / 2);
        state.sans = Array.from({ length: count }, () => makeSans(sansIdRef.current++, d));
      }

      commitRender();
    },
    [commitRender, resetCombatPlayers],
  );

  const returnToLobby = useCallback(() => {
    const state = stateRef.current;
    for (const id of PLAYER_IDS) {
      state.players[id].ready = false;
    }
    state.bones = [];
    state.blasters = [];
    state.sans = [];
    state.waveNum = 1;
    state.score = 0;
    state.bossHP = 100;
    state.isBossWave = false;
    state.isPhase2 = false;
    phaseRef.current = "lobby";
    setPhase("lobby");
    sendLobbyUpdate();
    commitRender();
  }, [commitRender, sendLobbyUpdate]);

  const startBattle = useCallback(() => {
    stateRef.current.score = 0;
    stateRef.current.waveNum = 1;
    spawnWave(1);
    phaseRef.current = "battle";
    setPhase("battle");
  }, [spawnWave]);

  const startSolo = useCallback(() => {
    modeRef.current = "solo";
    setMode("solo");
    setLocalIdentity("host");
    setLocalPing(0);
    setLocalReady(false);
    const state = stateRef.current;
    state.players = createPlayersRecord();
    state.players.host.connected = true;
    state.players.host.label = sanitizeName(playerName, playerLabelMap.host);
    state.players.host.ready = false;
    state.score = 0;
    state.waveNum = 1;
    setConnectionStatus("Single-player active.");
    setLastError(null);
    startBattle();
  }, [playerName, setLocalIdentity, startBattle]);

  const applyDamage = useCallback(
    (playerId: PlayerId, direct: number, karma: number, iframes = IFRAMES_MS) => {
      const player = stateRef.current.players[playerId];
      if (!player.alive || player.invuln > 0) return;

      player.hp -= direct;
      player.karma += karma;
      if (player.karma >= player.hp) {
        player.karma = Math.max(0, player.hp - 1);
      }

      if (player.hp <= 0) {
        player.hp = 0;
        player.karma = 0;
        player.alive = false;
      } else if (iframes > 0) {
        player.invuln = iframes;
        stateRef.current.shake = Math.max(stateRef.current.shake, 8);
        play("damage");
      }
    },
    [play],
  );

  const processHitAtPointer = useCallback((pointer: Vec2) => {
    if (clickLockRef.current) return;
    clickLockRef.current = true;
    window.setTimeout(() => {
      clickLockRef.current = false;
    }, 60);

    const state = stateRef.current;
    const hit = state.sans.find((sans) => pointHitsSans(pointer, sans));
    if (!hit) return;

    play("hit");
    if (state.isBossWave) {
      state.bossHP -= 1.5;
      if (state.bossHP <= 50 && !state.isPhase2) {
        state.isPhase2 = true;
      }
      if (state.bossHP <= 0) {
        state.pendingNextWave = true;
      }
    } else {
      state.sans = state.sans.filter((item) => item.id !== hit.id);
      state.score += 1;
      if (!state.sans.length) {
        state.pendingNextWave = true;
      }
    }
  }, [play]);

  const sendSnapshot = useCallback(() => {
    if (modeRef.current !== "host" || phaseRef.current !== "battle") return;
    const state = stateRef.current;
    const payload: SnapshotPayload = {
      sans: state.sans,
      bones: state.bones,
      blasters: state.blasters,
      players: clonePlayers(state.players),
      score: state.score,
      bossHP: state.bossHP,
      waveNum: state.waveNum,
      isPhase2: state.isPhase2,
      isBossWave: state.isBossWave,
      phase: phaseRef.current,
      serverTime: Date.now(),
    };
    broadcastToClients({ type: "snapshot", payload });
  }, [broadcastToClients]);

  const sendReadyToHost = useCallback(() => {
    if (modeRef.current !== "client" || !clientConnRef.current?.open) return;
    const state = stateRef.current.players[localPlayerIdRef.current];
    clientConnRef.current.send({
      type: "ready",
      ready: state.ready,
      name: state.label,
    } satisfies NetworkMessage);
  }, []);

  const applyLobbyPlayers = useCallback((players: Record<PlayerId, PlayerCombatState>) => {
    stateRef.current.players = clonePlayers(players);
    commitRender();
  }, [commitRender]);

  const handleClientMessage = useCallback(
    (message: NetworkMessage) => {
      if (message.type === "welcome") {
        const payload: WelcomePayload = message.payload;
        setHostCode(payload.hostCode);
        setLocalIdentity(payload.playerId);
        setMode("client");
        modeRef.current = "client";
        applyLobbyPlayers(payload.players);
        phaseRef.current = "lobby";
        setPhase("lobby");
        setConnectionStatus("Connected. Waiting in lobby.");
        return;
      }

      if (message.type === "lobby") {
        applyLobbyPlayers(message.players);
        phaseRef.current = "lobby";
        setPhase("lobby");
        return;
      }

      if (message.type === "snapshot") {
        const payload = message.payload;
        stateRef.current.players = clonePlayers(payload.players);
        stateRef.current.sans = payload.sans;
        stateRef.current.bones = payload.bones;
        stateRef.current.blasters = payload.blasters;
        stateRef.current.score = payload.score;
        stateRef.current.bossHP = payload.bossHP;
        stateRef.current.waveNum = payload.waveNum;
        stateRef.current.isPhase2 = payload.isPhase2;
        stateRef.current.isBossWave = payload.isBossWave;
        phaseRef.current = payload.phase;
        setPhase(payload.phase);
        commitRender();
        return;
      }

      if (message.type === "pong") {
        const ping = Math.max(0, Date.now() - message.sentAt);
        stateRef.current.players[localPlayerIdRef.current].ping = ping;
        setLocalPing(ping);
        commitRender();
        return;
      }

      if (message.type === "error") {
        setLastError(message.message);
      }
    },
    [applyLobbyPlayers, commitRender, setLocalIdentity],
  );

  const disconnectOwnedPlayer = useCallback((connection: PeerConnectionLike) => {
    const owner = connectionOwnersRef.current.get(connection);
    if (!owner) return;
    connectionOwnersRef.current.delete(connection);
    delete hostConnectionsRef.current[owner];
    stateRef.current.players[owner] = {
      ...createPlayer(owner, playerLabelMap[owner]),
      connected: false,
      peerId: null,
    };
    if (phaseRef.current !== "menu" && modeRef.current === "host") {
      phaseRef.current = "lobby";
      setPhase("lobby");
      sendLobbyUpdate();
      commitRender();
    }
  }, [commitRender, sendLobbyUpdate]);

  const handleHostConnectionMessage = useCallback(
    (connection: PeerConnectionLike, message: NetworkMessage) => {
      if (message.type === "hello") {
        const freeId = firstFreePeerId(stateRef.current.players);
        if (!freeId) {
          connection.send({ type: "error", message: "Lobby full. Max 4 players." } satisfies NetworkMessage);
          connection.close();
          return;
        }

        connectionOwnersRef.current.set(connection, freeId);
        hostConnectionsRef.current[freeId] = connection;
        stateRef.current.players[freeId] = {
          ...createPlayer(freeId, message.name),
          connected: true,
          ready: false,
          hp: 0,
          alive: false,
          peerId: message.peerId,
        };

        connection.send({
          type: "welcome",
          payload: {
            playerId: freeId,
            hostCode,
            players: clonePlayers(stateRef.current.players),
          },
        } satisfies NetworkMessage);
        setConnectionStatus("Players connected to host.");
        sendLobbyUpdate();
        commitRender();
        return;
      }

      const playerId = connectionOwnersRef.current.get(connection);
      if (!playerId) return;

      if (message.type === "ready") {
        stateRef.current.players[playerId].ready = message.ready;
        stateRef.current.players[playerId].label = sanitizeName(message.name, playerLabelMap[playerId]);
        sendLobbyUpdate();
        if (phaseRef.current === "lobby" && allConnectedPlayersReady(stateRef.current.players)) {
          startBattle();
        }
        commitRender();
        return;
      }

      if (message.type === "cursor") {
        stateRef.current.players[playerId].pos = message.pos;
        stateRef.current.players[playerId].ping = Math.max(0, Date.now() - message.sentAt);
        return;
      }

      if (message.type === "pointer-attack") {
        if (phaseRef.current === "battle") {
          processHitAtPointer(message.pos);
        }
        return;
      }

      if (message.type === "ping") {
        stateRef.current.players[playerId].ping = Math.max(0, Date.now() - message.sentAt);
        connection.send({ type: "pong", sentAt: message.sentAt } satisfies NetworkMessage);
      }
    },
    [commitRender, hostCode, processHitAtPointer, sendLobbyUpdate, startBattle],
  );

  const bindHostConnection = useCallback(
    (connection: PeerConnectionLike) => {
      connection.on("data", (raw) => handleHostConnectionMessage(connection, raw as NetworkMessage));
      connection.on("close", () => disconnectOwnedPlayer(connection));
      connection.on("error", () => disconnectOwnedPlayer(connection));
    },
    [disconnectOwnedPlayer, handleHostConnectionMessage],
  );

  const destroyPeer = useCallback(() => {
    clientConnRef.current?.close();
    clientConnRef.current = null;
    for (const connection of hostConnectionsToArray(hostConnectionsRef.current)) {
      connection.close();
    }
    hostConnectionsRef.current = {};
    connectionOwnersRef.current.clear();
    peerRef.current?.destroy();
    peerRef.current = null;
  }, []);

  const leaveSession = useCallback(() => {
    destroyPeer();
    modeRef.current = "solo";
    setMode("solo");
    setLocalIdentity("host");
    phaseRef.current = "menu";
    setPhase("menu");
    setHostCode("");
    setConnectionStatus("Choose a mode.");
    setLastError(null);
    setLocalReady(false);
    setLocalPing(0);
    stateRef.current = createInitialMutableState();
    stateRef.current.players.host.label = sanitizeName(playerName, playerLabelMap.host);
    commitRender();
  }, [commitRender, destroyPeer, playerName, setLocalIdentity]);

  const startHosting = useCallback(async () => {
    try {
      destroyPeer();
      const Peer = await loadPeerJs();
      const peer = new Peer();
      peerRef.current = peer;
      modeRef.current = "host";
      setMode("host");
      setLocalIdentity("host");
      setConnectionStatus("Starting host...");
      setLastError(null);
      setLocalReady(false);
      setLocalPing(0);
      phaseRef.current = "lobby";
      setPhase("lobby");
      stateRef.current = createInitialMutableState();
      stateRef.current.players.host = {
        ...createPlayer("host", playerName),
        connected: true,
        ready: false,
        hp: MAX_HP,
        alive: true,
      };
      peer.on("open", (...args) => {
        const id = args[0] as string;
        setHostCode(id);
        setConnectionStatus("Share the host code. Up to 4 players can join.");
        commitRender();
      });
      peer.on("connection", (...args) => {
        bindHostConnection(args[0] as PeerConnectionLike);
      });
      peer.on("error", () => {
        setLastError("Unable to host with PeerJS.");
      });
      commitRender();
    } catch (error) {
      setLastError(error instanceof Error ? error.message : "Unable to host.");
    }
  }, [bindHostConnection, commitRender, destroyPeer, playerName, setLocalIdentity]);

  const joinHost = useCallback(async () => {
    const code = joinCode.trim();
    if (!code) {
      setLastError("Enter a host code first.");
      return;
    }

    try {
      destroyPeer();
      const Peer = await loadPeerJs();
      const peer = new Peer();
      peerRef.current = peer;
      modeRef.current = "client";
      setMode("client");
      setConnectionStatus("Connecting to host...");
      setLastError(null);
      setLocalReady(false);
      setLocalPing(0);
      peer.on("open", (...args) => {
        const myPeerId = args[0] as string;
        const connection = peer.connect(code);
        clientConnRef.current = connection;
        connection.on("open", () => {
          setHostCode(code);
          connection.send({
            type: "hello",
            peerId: myPeerId,
            name: sanitizeName(playerName, "PLAYER"),
          } satisfies NetworkMessage);
        });
        connection.on("data", (raw) => handleClientMessage(raw as NetworkMessage));
        connection.on("close", () => {
          setConnectionStatus("Disconnected from host.");
          phaseRef.current = "lobby";
          setPhase("lobby");
        });
        connection.on("error", () => {
          setLastError("Peer connection error.");
        });
      });
      peer.on("error", () => {
        setLastError("Could not connect to that host code.");
      });
    } catch (error) {
      setLastError(error instanceof Error ? error.message : "Unable to join.");
    }
  }, [destroyPeer, handleClientMessage, joinCode, playerName]);

  const toggleReady = useCallback(() => {
    if (modeRef.current === "solo") return;
    const playerId = localPlayerIdRef.current;
    stateRef.current.players[playerId].ready = !stateRef.current.players[playerId].ready;
    setLocalReady(stateRef.current.players[playerId].ready);

    if (modeRef.current === "host") {
      sendLobbyUpdate();
      if (phaseRef.current === "lobby" && allConnectedPlayersReady(stateRef.current.players)) {
        startBattle();
      }
      commitRender();
      return;
    }

    sendReadyToHost();
    commitRender();
  }, [commitRender, sendLobbyUpdate, sendReadyToHost, startBattle]);

  const handlePointerAttack = useCallback(
    (pointer: Vec2) => {
      if (phaseRef.current !== "battle") return;
      if (modeRef.current === "client") {
        clientConnRef.current?.send({ type: "pointer-attack", pos: pointer } satisfies NetworkMessage);
        return;
      }
      processHitAtPointer(pointer);
    },
    [processHitAtPointer],
  );

  const updatePlayerName = useCallback(
    (value: string) => {
      setPlayerName(value);
      const id = localPlayerIdRef.current;
      stateRef.current.players[id].label = sanitizeName(value, playerLabelMap[id]);
      commitRender();
      if (modeRef.current === "client") {
        sendReadyToHost();
      }
      if (modeRef.current === "host") {
        sendLobbyUpdate();
      }
    },
    [commitRender, sendLobbyUpdate, sendReadyToHost],
  );

  const setPointer = useCallback(
    (pos: Vec2) => {
      pointerRef.current = pos;
      stateRef.current.players[localPlayerIdRef.current].pos = pos;
      if (phaseRef.current === "battle") {
        commitRender();
      }
    },
    [commitRender],
  );

  useEffect(() => {
    const onResize = () => {
      const next = { width: window.innerWidth, height: window.innerHeight };
      dimsRef.current = next;
      setDims(next);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!dims.width) return;
    const center = { x: dims.width / 2, y: dims.height / 2 };
    pointerRef.current = center;
    stateRef.current.players[localPlayerIdRef.current].pos = center;
    commitRender();
  }, [commitRender, dims.height, dims.width]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (modeRef.current === "host") {
        sendSnapshot();
      }
    }, SNAPSHOT_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [sendSnapshot]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (modeRef.current === "client" && phaseRef.current === "battle" && clientConnRef.current?.open) {
        clientConnRef.current.send({
          type: "cursor",
          pos: pointerRef.current,
          sentAt: Date.now(),
        } satisfies NetworkMessage);
      }
    }, CURSOR_SEND_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (modeRef.current === "client" && clientConnRef.current?.open) {
        clientConnRef.current.send({ type: "ping", sentAt: Date.now() } satisfies NetworkMessage);
      }
    }, PING_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let raf = 0;
    let timeout = 0;
    let last = performance.now();

    const scheduleNext = () => {
      if (typeof document !== "undefined" && document.hidden && modeRef.current !== "solo") {
        timeout = window.setTimeout(() => loop(performance.now()), 1000 / GAME_TICK_RATE);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const loop = (time: number) => {
      const dt = Math.min(time - last, 50);
      last = time;

      if (phaseRef.current !== "battle") {
        scheduleNext();
        return;
      }

      if (modeRef.current === "client") {
        scheduleNext();
        return;
      }

      const state = stateRef.current;
      const d = dimsRef.current;
      const activePlayers = connectedPlayers(state.players);
      const livingPlayers = alivePlayers(state.players);

      if (!livingPlayers.length) {
        if (modeRef.current === "host") {
          returnToLobby();
        } else {
          phaseRef.current = "soloGameOver";
          setPhase("soloGameOver");
        }
        scheduleNext();
        return;
      }

      if (state.pendingNextWave) {
        state.pendingNextWave = false;
        spawnWave(state.waveNum + 1);
      }

      for (const player of activePlayers) {
        if (player.invuln > 0) {
          player.invuln = Math.max(0, player.invuln - dt);
        }
        if (player.karma > 0 && player.alive) {
          const rate = player.karma > 30 ? 0.4 : player.karma > 15 ? 0.2 : 0.08;
          const drain = rate * (dt / 16);
          player.karma = Math.max(0, player.karma - drain);
          player.hp -= drain;
          if (player.hp <= 0) {
            player.hp = 0;
            player.karma = 0;
            player.alive = false;
          }
        }
      }

      if (state.shake > 0.1) {
        state.shake *= 0.88;
        setShakeOffset({
          x: (Math.random() - 0.5) * state.shake,
          y: (Math.random() - 0.5) * state.shake,
        });
      } else {
        state.shake = 0;
        setShakeOffset({ x: 0, y: 0 });
      }

      const spawnedBones: Bone[] = [];

      state.sans = state.sans.map((sans) => {
        let vx = sans.vel.x;
        let vy = sans.vel.y;

        if (state.isBossWave) {
          const centerTarget = livingPlayers[Math.floor(Math.random() * livingPlayers.length)] ?? livingPlayers[0];
          const dist = hypot(sans.pos, centerTarget.pos);
          if (dist < 350) {
            const angle = Math.atan2(sans.pos.y - centerTarget.pos.y, sans.pos.x - centerTarget.pos.x);
            const force = state.isPhase2 ? 1.1 : 0.6;
            vx += Math.cos(angle) * force;
            vy += Math.sin(angle) * force;
          } else {
            vx += (d.width / 2 - sans.pos.x) * 0.003;
            vy += (180 - sans.pos.y) * 0.003;
          }

          const maxSpeed = state.isPhase2 ? 8 : 5;
          const speed = Math.hypot(vx, vy);
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
          }

          state.screenAttackTimer -= dt;
          if (state.screenAttackTimer <= 0) {
            const pattern = spawnBossScreenAttack({
              dims: d,
              boss: sans,
              players: livingPlayers,
              nextBoneId: () => boneIdRef.current++,
              nextBlasterId: () => blasterIdRef.current++,
            });
            spawnedBones.push(...pattern.bones);
            state.blasters.push(...pattern.blasters);
            if (pattern.charge) {
              play("charge");
            }
            state.screenAttackTimer = state.isPhase2 ? ATTACK_INTERVALS.screen.phase2 : ATTACK_INTERVALS.screen.normal;
          }

          state.danmakuTimer -= dt;
          if (state.danmakuTimer <= 0) {
            const burst = spawnBossDanmaku({
              boss: sans,
              players: livingPlayers,
              nextBoneId: () => boneIdRef.current++,
              nextBlasterId: () => blasterIdRef.current++,
            });
            spawnedBones.push(...burst.bones);
            state.blasters.push(...burst.blasters);
            if (burst.charge) {
              play("charge");
            }
            state.danmakuTimer = state.isPhase2 ? ATTACK_INTERVALS.danmaku.phase2 : ATTACK_INTERVALS.danmaku.normal;
          }
        }

        let nx = sans.pos.x + vx * (dt / 16);
        let ny = sans.pos.y + vy * (dt / 16);
        if (nx <= 50 || nx >= d.width - 100) {
          vx *= -1;
          nx = clamp(nx, 50, d.width - 100);
        }
        if (ny <= 100 || ny >= d.height - 100) {
          vy *= -1;
          ny = clamp(ny, 100, d.height - 100);
        }

        if (!state.isBossWave) {
          const cooldown = sans.cooldown - dt;
          if (cooldown <= 0) {
            const target = livingPlayers[Math.floor(Math.random() * livingPlayers.length)] ?? livingPlayers[0];
            spawnedBones.push(
              aimBone(
                boneIdRef.current++,
                { x: nx, y: ny },
                target.pos,
                BONE_SPEED_BASE + state.waveNum * 0.3,
              ),
            );
            return { ...sans, pos: { x: nx, y: ny }, vel: { x: vx, y: vy }, cooldown: rand(1800, 4000) };
          }
          return {
            ...sans,
            pos: { x: nx, y: ny },
            vel: { x: vx, y: vy },
            cooldown,
            angle: (sans.angle + sans.dAngle) % 360,
          };
        }

        return {
          ...sans,
          pos: { x: nx, y: ny },
          vel: { x: vx, y: vy },
          angle: (sans.angle + sans.dAngle) % 360,
        };
      });

      state.bones = [...state.bones, ...spawnedBones]
        .map((bone) => updateBoneMotion(bone, dt, d))
        .filter((bone) => bone.pos.x > -600 && bone.pos.x < d.width + 600 && bone.pos.y > -600 && bone.pos.y < d.height + 600);

      state.blasters = state.blasters
        .map((blaster) => {
          const result = updateBlaster(blaster, dt);
          if (result.fired) {
            state.shake = Math.max(state.shake, 12);
            play("fire");
          }
          return result.next;
        })
        .filter(Boolean) as Blaster[];

      for (const bone of state.bones) {
        for (const player of livingPlayers) {
          if (hypot(bone.pos, player.pos) < 22) {
            const damage = boneDamage();
            applyDamage(player.id, damage.direct, damage.karma, damage.iframes);
          }
        }
      }

      for (const blaster of state.blasters) {
        if (blaster.state !== "fire") continue;
        for (const player of livingPlayers) {
          const line = distToLine(player.pos, blaster.pos, blaster.angle);
          if (line.dot > 0 && line.dot < 4000 && line.perp < 45 * blaster.scale) {
            applyDamage(player.id, 0, 1.8, 0);
          }
        }
      }

      if (state.isBossWave && state.bossHP <= 50) {
        state.isPhase2 = true;
      }

      if (modeRef.current === "solo" && !state.players.host.alive) {
        phaseRef.current = "soloGameOver";
        setPhase("soloGameOver");
      }

      commitRender();
      scheduleNext();
    };

    scheduleNext();
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [applyDamage, commitRender, play, returnToLobby, spawnWave]);

  useEffect(() => {
    return () => {
      destroyPeer();
    };
  }, [destroyPeer]);

  const localPlayer = useMemo(
    () => renderPlayers.find((player) => player.id === localPlayerId) ?? null,
    [localPlayerId, renderPlayers],
  );
  const remotePlayers = useMemo(
    () => renderPlayers.filter((player) => player.id !== localPlayerId),
    [localPlayerId, renderPlayers],
  );
  const canReady = mode !== "solo" && (mode !== "host" || !!hostCode);

  return {
    dims,
    phase,
    mode,
    renderSans,
    renderBones,
    renderBlasters,
    renderPlayers,
    waveNum,
    isBossWave,
    isPhase2,
    score,
    bossHP,
    hostCode,
    joinCode,
    playerName,
    connectionStatus,
    lobbyPlayers,
    lastError,
    localPlayer,
    remotePlayers,
    localPlayerId,
    localReady,
    localPing,
    canReady,
    gameTickRate: GAME_TICK_RATE,
    snapshotRate: SNAPSHOT_RATE,
    interpolationDelayMs: INTERPOLATION_DELAY_MS,
    shakeX: shakeOffset.x,
    shakeY: shakeOffset.y,
    setPointer,
    setJoinCode,
    setPlayerName: updatePlayerName,
    startSolo,
    startHosting,
    joinHost,
    toggleReady,
    leaveSession,
    handlePointerAttack,
  };
}
