"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================ Drum sequencer ==============================
   A looping 16-step pattern — the signature visual for the Sound section.
   Reads like a producer's grid: kick, snare, hat, tom. */
const ROWS = [
  { name: "KICK", hits: [0, 4, 8, 12] },
  { name: "SNARE", hits: [4, 12] },
  { name: "HAT", hits: [0, 2, 4, 6, 8, 10, 12, 14] },
  { name: "TOM", hits: [2, 6, 9, 13] },
];
const STEPS = 16;

export function PercussionViz() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), 150);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="rounded-2xl border border-hairline-dark bg-graphite-soft/60 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
        <span>Pattern · 16 steps</span>
        <span className="text-brass-bright">{String(step + 1).padStart(2, "0")}/16</span>
      </div>

      {/* playhead tick row — a bright dot sweeps across so the loop is obvious */}
      <div className="mb-2.5 flex items-center gap-3">
        <span className="w-12 shrink-0" aria-hidden />
        <div
          className="grid flex-1 gap-1"
          style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
        >
          {Array.from({ length: STEPS }).map((_, i) => {
            const active = !reduce && i === step;
            return (
              <span key={i} className="flex justify-center">
                <span
                  className={`h-1 w-1 rounded-full transition-all duration-100 ${
                    active ? "scale-150 bg-brass-bright" : "bg-bone/15"
                  }`}
                />
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {ROWS.map((row) => (
          <div key={row.name} className="flex items-center gap-3">
            <span className="w-12 shrink-0 font-mono text-[9px] tracking-[0.15em] text-bone-faint">
              {row.name}
            </span>
            <div
              className="grid flex-1 gap-1"
              style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
            >
              {Array.from({ length: STEPS }).map((_, i) => {
                const hit = row.hits.includes(i);
                const active = !reduce && i === step;
                return (
                  <span
                    key={i}
                    className={`aspect-square rounded-[3px] transition-all duration-100 ${
                      hit
                        ? active
                          ? "scale-110 bg-brass-bright shadow-[0_0_10px_rgba(212,166,110,0.8)] ring-2 ring-brass-bright"
                          : "bg-brass/80"
                        : active
                          ? "bg-bone/40 ring-1 ring-bone/30"
                          : "bg-bone/[0.06]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
