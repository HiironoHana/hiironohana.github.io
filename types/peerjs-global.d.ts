declare global {
  interface Window {
    Peer?: import("../app/sans-simulator/game/types").PeerConstructor;
  }
}

export {};
