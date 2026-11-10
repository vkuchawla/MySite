"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "./data";
import { useBpm } from "./tempo";

/** Which sections use the light (porcelain) surface — the rail flips its
 *  colors over these so it stays legible without mix-blend tricks. */
const LIGHT_SECTIONS = new Set(["feed", "builds"]);

/** The signature: a right-edge metronome rail. A tick per section, a brass
 *  playhead that slides to the active one and pulses on the beat, plus a live
 *  tempo + position readout. Ambient and non-interactive — orientation only;
 *  the top nav handles navigation. It literally keeps time as you scroll. */
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

  // Flip colors to stay legible over the light sections instead of relying on
  // mix-blend-difference, which washes out there.
  const onLight = LIGHT_SECTIONS.has(sections[active]?.id ?? "");
  const faint = onLight ? "text-ink-faint" : "text-bone-faint";
  const accentText = onLight ? "text-brass-text" : "text-brass-bright";
  const accentBg = onLight ? "bg-brass-text" : "bg-brass-bright";
  const accentBorder = onLight ? "border-brass-text" : "border-brass-bright";

  return (
    <aside
      aria-hidden
      className={`pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 transition-colors duration-500 md:flex ${
        onLight ? "text-ink" : "text-bone"
      }`}
    >
      {/* readout */}
      <div
        className={`mb-4 text-right font-mono text-[10px] leading-tight transition-colors duration-500 ${faint}`}
      >
        <div className={`tracking-[0.2em] transition-colors duration-500 ${accentText}`}>
          {bpm} BPM
        </div>
        <div className="tabular-nums">{String(Math.round(progress * 100)).padStart(3, "0")}%</div>
      </div>

      {/* rail — ambient scroll-spy, no interaction */}
      <div className="relative flex flex-col items-center gap-5">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current opacity-20" />
        {sections.map((s, i) => (
          <span key={s.id} className="relative flex h-3 items-center">
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === active
                  ? `h-3 w-3 ${accentBg}`
                  : "h-1.5 w-1.5 bg-current opacity-40"
              }`}
            />
            {i === active && (
              <span
                className={`tempo-pulse absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border ${accentBorder}`}
                style={{ animationDuration: `${60000 / bpm}ms` }}
              />
            )}
          </span>
        ))}
      </div>
    </aside>
  );
}
