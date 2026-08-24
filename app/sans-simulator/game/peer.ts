"use client";

import type { PeerConstructor } from "./types";

declare global {
  interface Window {
    Peer?: PeerConstructor;
  }
}

let loader: Promise<PeerConstructor> | null = null;

export function loadPeerJs() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("PeerJS only loads in the browser."));
  }

  if (window.Peer) {
    return Promise.resolve(window.Peer);
  }

  if (!loader) {
    let script: HTMLScriptElement;
    const pending = new Promise<PeerConstructor>((resolve, reject) => {
      script = document.createElement("script");
      script.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Peer) {
          resolve(window.Peer);
          return;
        }
        reject(new Error("PeerJS loaded without a Peer constructor."));
      };
      script.onerror = () => reject(new Error("Failed to load PeerJS."));
      document.head.appendChild(script);
    });
    loader = pending.catch((error) => {
      loader = null;
      script.remove();
      throw error;
    });
  }

  return loader;
}
