"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "./data";
import { useBpm } from "./tempo";

/** The signature: a right-edge metronome rail. A tick per section, a brass
 *  playhead that slides to the active one and pulses on the beat, plus a live
 *  "position" readout. It literally keeps time as you scroll. */
export default function TempoRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const beat = useRef(0);
  const [, force] = useState(0);
  const bpm = useBpm();

  // Track which section is centered + overall scroll progress.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);

      const mid = window.innerHeight / 2;
      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // A quiet metronome tick, matched to the sequencer's tempo (one beat =
  // 60000/bpm ms).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      beat.current = (beat.current % 4) + 1;
      force((n) => n + 1);
    }, 60000 / bpm);
    return () => clearInterval(id);
  }, [bpm]);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex"
    >
      {/* readout */}
      <div className="pointer-events-none mb-4 text-right font-mono text-[10px] leading-tight text-bone-faint mix-blend-difference">
        <div className="tracking-[0.2em] text-brass-bright">{bpm} BPM</div>
        <div className="tabular-nums">{String(Math.round(progress * 100)).padStart(3, "0")}%</div>
      </div>

      {/* rail */}
      <div className="relative flex flex-col items-center gap-5">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current opacity-20 mix-blend-difference" />
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            className="pointer-events-auto group relative flex h-3 items-center"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`block rounded-full transition-all duration-500 mix-blend-difference ${
                i === active
                  ? "h-3 w-3 bg-brass-bright"
                  : "h-1.5 w-1.5 bg-current opacity-40 group-hover:opacity-80"
              }`}
            />
            {i === active && (
              <span
                className="tempo-pulse absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass-bright"
                style={{ animationDuration: `${60000 / bpm}ms` }}
              />
            )}
            <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint opacity-0 mix-blend-difference transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
