"use client";

import { useCallback, useEffect, useRef } from "react";
import { withBasePath } from "./utils";

export function useAudio() {
  const pool = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    pool.current = {
      hit: new Audio(withBasePath("/Sounds/voice_sans.mp3")),
      charge: new Audio(withBasePath("/Sounds/gaster-blaster-charging.mp3")),
      fire: new Audio(withBasePath("/Sounds/gaster-blaster-firing.mp3")),
      damage: new Audio(withBasePath("/Sounds/undertale-damage-taken.mp3")),
    };
  }, []);

  return useCallback((key: string) => {
    const source = pool.current[key];
    if (!source) return;
    const clone = source.cloneNode(true) as HTMLAudioElement;
    clone.play().catch(() => {});
  }, []);
}
