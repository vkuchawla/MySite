"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/* ======================= 01 · Percussion — sequencer ====================== */
const ROWS = [
  { name: "KICK", hits: [0, 4, 8, 12] },
  { name: "SNARE", hits: [4, 12] },
  { name: "HAT", hits: [0, 2, 4, 6, 8, 10, 12, 14] },
  { name: "TABLA", hits: [2, 6, 9, 13] },
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
                          ? "scale-110 bg-brass-bright ring-2 ring-brass-bright/40"
                          : "bg-brass/80"
                        : active
                          ? "bg-bone/25"
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

/* ========================= 02 · Systems — engine ========================== */
export function SystemsViz() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-2xl border border-hairline bg-white/40 p-6">
      <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        Valuation engine · signal flow
      </div>
      <svg viewBox="0 0 320 120" className="w-full" role="img" aria-label="Pre-computed valuation engine flow">
        <line x1="20" y1="60" x2="300" y2="60" stroke="#16140f22" strokeWidth="1" />
        {/* moving pulse */}
        {!reduce && (
          <motion.circle
            r="4"
            fill="#b4824a"
            initial={{ cx: 20, cy: 60 }}
            animate={{ cx: [20, 300], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {[
          { x: 20, label: "REQUEST" },
          { x: 160, label: "PRE-COMPUTE" },
          { x: 300, label: "QUOTE" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy="60" r="7" fill="#eceae4" stroke="#b4824a" strokeWidth="1.5" />
            <circle cx={n.x} cy="60" r="2.5" fill="#b4824a" />
            <text
              x={n.x}
              y="92"
              textAnchor="middle"
              className="font-mono"
              fontSize="8"
              letterSpacing="1.5"
              fill="#6e675d"
            >
              {n.label}
            </text>
          </g>
        ))}
        {/* engine ring */}
        <circle cx="160" cy="60" r="18" fill="none" stroke="#16140f22" strokeWidth="1" strokeDasharray="3 4" />
      </svg>
      <div className="mt-4 flex justify-between font-mono text-[10px] text-ink-faint">
        <span>latency ↓</span>
        <span className="text-brass-text">&lt; 300ms</span>
      </div>
    </div>
  );
}

/* ========================= 03 · Fashion — proportion ====================== */
export function FashionViz() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const marks = [
    { t: "12%", label: "Collar" },
    { t: "38%", label: "Sleeve" },
    { t: "62%", label: "Waist · 280 GSM" },
    { t: "88%", label: "Break · quarter" },
  ];

  return (
    <div ref={ref} className="relative rounded-2xl border border-hairline-dark bg-graphite-soft/60 p-6 backdrop-blur">
      <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
        Proportion study
      </div>
      <div className="relative flex h-64 items-stretch gap-6">
        {/* ruler */}
        <div className="relative w-16 shrink-0">
          <span className="absolute left-0 top-0 h-full w-px bg-bone/20" />
          {marks.map((m) => (
            <div key={m.label} className="absolute left-0 flex items-center gap-2" style={{ top: m.t }}>
              <span className="h-px w-3 bg-brass" />
              <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.12em] text-bone-faint">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        {/* garment column — fabric weight as a vertical gradient */}
        <motion.div
          style={reduce ? undefined : { y }}
          className="relative flex-1 overflow-hidden rounded-t-[42%] rounded-b-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brass/70 via-brass/30 to-graphite" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
          {/* seam */}
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone/15" />
        </motion.div>
      </div>
    </div>
  );
}

/* =========================== 04 · Coffee — brew =========================== */
export function CoffeeViz() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fill = useTransform(scrollYProgress, [0.1, 0.75], ["8%", "86%"]);

  return (
    <div ref={ref} className="rounded-2xl border border-hairline bg-white/40 p-6">
      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        <span>Pour-over · extraction</span>
        <span className="text-brass-text">93°C</span>
      </div>
      <div className="flex items-end gap-6">
        {/* vessel */}
        <div className="relative h-56 w-36">
          {/* dripper cone */}
          <div
            className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2"
            style={{
              borderLeft: "56px solid transparent",
              borderRight: "56px solid transparent",
              borderTop: "46px solid #16140f14",
            }}
          />
          {/* droplet */}
          {!reduce && (
            <motion.span
              className="absolute left-1/2 top-[44px] h-2 w-2 -translate-x-1/2 rounded-full bg-brass"
              animate={{ y: [0, 70], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
            />
          )}
          {/* carafe */}
          <div className="absolute bottom-0 left-1/2 h-40 w-28 -translate-x-1/2 overflow-hidden rounded-b-[28px] rounded-t-lg border border-hairline bg-porcelain-deep">
            <motion.div
              style={{ height: reduce ? "60%" : fill }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3a2412] via-[#7a4a22] to-brass"
            >
              <span className="absolute inset-x-0 top-0 h-2 bg-brass-bright/70" />
            </motion.div>
          </div>
        </div>
        {/* ratio ladder */}
        <div className="flex-1">
          {[
            { k: "Dose", v: "22 g" },
            { k: "Water", v: "352 g" },
            { k: "Ratio", v: "1:16" },
            { k: "Bloom", v: "30s" },
          ].map((r) => (
            <div key={r.k} className="flex items-center justify-between border-b border-hairline py-2 font-mono text-[11px]">
              <span className="uppercase tracking-[0.15em] text-ink-faint">{r.k}</span>
              <span className="text-ink">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Render the right visual for a craft by key (kept on the client side so the
 *  interactive pieces mount correctly). */
export function CraftVisual({ craftKey }: { craftKey: string }) {
  switch (craftKey) {
    case "percussion":
      return <PercussionViz />;
    case "systems":
      return <SystemsViz />;
    case "fashion":
      return <FashionViz />;
    case "coffee":
      return <CoffeeViz />;
    default:
      return null;
  }
}
