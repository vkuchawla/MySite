"use client";

import { useSyncExternalStore } from "react";

/* A tiny shared tempo store so the Production sequencer (which owns the BPM
   slider) and the TempoRail on the page edge stay in sync without threading
   state through the server-component page tree. */

let bpm = 100;
const listeners = new Set<() => void>();

export function getBpm() {
  return bpm;
}

export function setBpm(next: number) {
  bpm = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Subscribe to the shared BPM. SSR snapshot is the default tempo. */
export function useBpm() {
  return useSyncExternalStore(subscribe, getBpm, () => 100);
}
