"use client";

import { useEffect, useRef, useState } from "react";
import { strikeTabla, loadTabla } from "./audio";

/* ---------------------------------------------------------------------------
   Step sequencer — a 16-step drum machine with synthesized percussion.
   Percussion x tech: program a beat, hit play, a playhead sweeps the grid.
   Audio uses the "two clocks" pattern (lookahead scheduler + rAF playhead)
   so timing stays tight regardless of frame rate. Silent until you press play.
--------------------------------------------------------------------------- */

const STEPS = 16;

const LANES = [
  { id: "kick", label: "Kick", color: "#2a1e16" },
  { id: "snare", label: "Snare", color: "#cf5a2c" },
  { id: "hat", label: "Hat", color: "#e0a13c" },
  { id: "tabla", label: "Tabla", color: "#7a3f63" },
] as const;

// A groove to start on so the grid looks alive (plays only on user gesture).
const DEFAULT: Record<string, number[]> = {
  kick: [0, 4, 8, 12],
  snare: [4, 12],
  hat: [0, 2, 4, 6, 8, 10, 12, 14],
  tabla: [2, 7, 10, 15],
};

function makeGrid(): boolean[][] {
  return LANES.map((l) =>
    Array.from({ length: STEPS }, (_, i) => DEFAULT[l.id].includes(i))
  );
}

// ---- synth voices -------------------------------------------------------
function voice(
  ctx: AudioContext,
  master: GainNode,
  lane: string,
  t: number
) {
  if (lane === "kick") {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.11);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.42);
    return;
  }
  if (lane === "snare") {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf(ctx, 0.2);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1500;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.6, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    noise.connect(hp).connect(ng).connect(master);
    noise.start(t);
    noise.stop(t + 0.2);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 180;
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.12);
    return;
  }
  if (lane === "hat") {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf(ctx, 0.05);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 8000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    noise.connect(hp).connect(g).connect(master);
    noise.start(t);
    noise.stop(t + 0.06);
    return;
  }
  // tabla — real sample if present, else additive synth fallback
  strikeTabla(ctx, master, t, { freq: 247, vel: 1 });
}

function noiseBuf(ctx: AudioContext, dur: number) {
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

export default function Sequencer() {
  const [grid, setGrid] = useState<boolean[][]>(makeGrid);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [step, setStep] = useState(-1);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const gridRef = useRef(grid);
  const bpmRef = useRef(bpm);
  const nextTimeRef = useRef(0);
  const noteRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const queueRef = useRef<{ note: number; time: number }[]>([]);

  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  function toggle(lane: number, i: number) {
    setGrid((g) => {
      const next = g.map((row) => row.slice());
      next[lane][i] = !next[lane][i];
      return next;
    });
  }

  function schedule() {
    const ctx = ctxRef.current!;
    const master = masterRef.current!;
    while (nextTimeRef.current < ctx.currentTime + 0.1) {
      const n = noteRef.current;
      const t = nextTimeRef.current;
      LANES.forEach((lane, li) => {
        if (gridRef.current[li][n]) voice(ctx, master, lane.id, t);
      });
      queueRef.current.push({ note: n, time: t });
      nextTimeRef.current += (60 / bpmRef.current) / 4; // 16th notes
      noteRef.current = (n + 1) % STEPS;
    }
    timerRef.current = window.setTimeout(schedule, 25);
  }

  function draw() {
    const ctx = ctxRef.current;
    if (ctx) {
      const now = ctx.currentTime;
      let cur = -1;
      while (queueRef.current.length && queueRef.current[0].time < now) {
        cur = queueRef.current[0].note;
        queueRef.current.shift();
      }
      if (cur !== -1) setStep(cur);
    }
    rafRef.current = requestAnimationFrame(draw);
  }

  async function start() {
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.value = 0.85;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    await ctxRef.current.resume();
    noteRef.current = 0;
    nextTimeRef.current = ctxRef.current.currentTime + 0.06;
    queueRef.current = [];
    schedule();
    rafRef.current = requestAnimationFrame(draw);
    setPlaying(true);
  }

  function stop() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setStep(-1);
  }

  useEffect(() => () => stop(), []);

  return (
    <div className="rounded-3xl border border-line bg-paper-deep/50 p-5 sm:p-7">
      {/* transport */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <button
          onClick={playing ? stop : start}
          className="flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-medium text-paper transition-all hover:bg-ember"
          aria-label={playing ? "Stop" : "Play"}
        >
          {playing ? "■ Stop" : "▶ Play"}
        </button>
        <button
          onClick={() => setGrid(LANES.map(() => Array(STEPS).fill(false)))}
          className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-ember hover:text-ember"
        >
          Clear
        </button>
        <button
          onClick={() => setGrid(makeGrid())}
          className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-ember hover:text-ember"
        >
          Reset
        </button>
        <label className="ml-auto flex items-center gap-3 font-mono text-xs text-ink-soft">
          <span className="tabular-nums">{bpm} BPM</span>
          <input
            type="range"
            min={70}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="accent-ember"
          />
        </label>
      </div>

      {/* grid */}
      <div className="space-y-2 overflow-x-auto">
        {LANES.map((lane, li) => (
          <div key={lane.id} className="flex items-center gap-3">
            <span className="w-12 flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              {lane.label}
            </span>
            <div className="flex gap-1.5">
              {grid[li].map((on, i) => {
                const isBeat = i % 4 === 0;
                const isHead = step === i;
                return (
                  <button
                    key={i}
                    onClick={() => toggle(li, i)}
                    aria-label={`${lane.label} step ${i + 1}`}
                    aria-pressed={on}
                    className={`h-7 w-7 flex-shrink-0 rounded-md border transition-all duration-75 sm:h-8 sm:w-8 ${
                      i % 4 === 0 ? "ml-1.5 first:ml-0" : ""
                    } ${
                      isHead ? "ring-2 ring-ink/40 ring-offset-1 ring-offset-paper-deep" : ""
                    }`}
                    style={{
                      backgroundColor: on ? lane.color : isBeat ? "#e6d9c6" : "#efe4d3",
                      borderColor: on ? lane.color : "#2a1e1618",
                      transform: isHead && on ? "scale(1.12)" : undefined,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 font-mono text-[11px] text-ink-faint">
        Click cells to build a pattern · tap Play · adjust tempo. Sound is
        synthesized live in your browser.
      </p>
    </div>
  );
}
