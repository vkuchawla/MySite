"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================ Drum sequencer ==============================
   A looping 16-step pattern — the signature visual for the Sound section.
   Reads like a producer's grid: kick, snare, hat, tom. An opt-in Web Audio
   synth plays the hits in time with the playhead. */
const ROWS = [
  { name: "KICK", hits: [0, 4, 8, 12] },
  { name: "SNARE", hits: [4, 12] },
  { name: "HAT", hits: [0, 2, 4, 6, 8, 10, 12, 14] },
  { name: "TOM", hits: [2, 6, 9, 13] },
];
const STEPS = 16;

/* ---- tiny Web Audio drum synth, built lazily on first user gesture ---- */
type Engine = { ctx: AudioContext; master: GainNode; noise: AudioBuffer };

function makeEngine(): Engine {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.3;
  master.connect(ctx.destination);
  // 1s of white noise, reused by snare + hat
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return { ctx, master, noise };
}

function kick({ ctx, master }: Engine, t: number) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
  g.gain.setValueAtTime(1, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.3);
}

function snare({ ctx, master, noise }: Engine, t: number) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1200;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.7, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  src.connect(hp).connect(g).connect(master);
  src.start(t);
  src.stop(t + 0.2);
  // tonal body
  const o = ctx.createOscillator();
  const og = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(180, t);
  og.gain.setValueAtTime(0.4, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  o.connect(og).connect(master);
  o.start(t);
  o.stop(t + 0.16);
}

function hat({ ctx, master, noise }: Engine, t: number) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 7000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  src.connect(hp).connect(g).connect(master);
  src.start(t);
  src.stop(t + 0.06);
}

function tom({ ctx, master }: Engine, t: number) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(220, t);
  o.frequency.exponentialRampToValueAtTime(90, t + 0.2);
  g.gain.setValueAtTime(0.7, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.32);
}

const VOICES: Record<string, (e: Engine, t: number) => void> = {
  KICK: kick,
  SNARE: snare,
  HAT: hat,
  TOM: tom,
};

export function PercussionViz() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const engineRef = useRef<Engine | null>(null);

  // the editable grid — a boolean per row per step, seeded from the defaults
  const defaultPattern = useMemo(
    () =>
      ROWS.map((r) => Array.from({ length: STEPS }, (_, i) => r.hits.includes(i))),
    [],
  );
  const [pattern, setPattern] = useState(defaultPattern);
  // mirror in a ref so the audio loop reads the latest grid without re-firing
  // the effect (and replaying a step) every time a cell is toggled
  const patternRef = useRef(pattern);
  patternRef.current = pattern;

  const toggleCell = (row: number, col: number) =>
    setPattern((p) =>
      p.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? !c : c)) : r,
      ),
    );
  const reset = () => setPattern(defaultPattern);

  // advance the loop
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), 150);
    return () => clearInterval(id);
  }, [reduce]);

  // play the current step's hits when sound is enabled
  useEffect(() => {
    if (!soundOn || reduce) return;
    const e = engineRef.current;
    if (!e) return;
    const t = e.ctx.currentTime;
    ROWS.forEach((row, ri) => {
      if (patternRef.current[ri][step]) VOICES[row.name]?.(e, t);
    });
  }, [step, soundOn, reduce]);

  // release the audio context on unmount
  useEffect(() => () => void engineRef.current?.ctx.close(), []);

  const toggleSound = async () => {
    if (!engineRef.current) engineRef.current = makeEngine();
    const { ctx } = engineRef.current;
    if (soundOn) {
      setSoundOn(false);
      await ctx.suspend();
    } else {
      await ctx.resume();
      setSoundOn(true);
    }
  };

  return (
    <div className="rounded-2xl border border-hairline-dark bg-graphite-soft/60 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
        <span>Pattern · 16 steps</span>
        <div className="flex items-center gap-3">
          {!reduce && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
                soundOn
                  ? "border-brass bg-brass/10 text-brass-bright"
                  : "border-hairline-dark text-bone-faint hover:border-brass/50 hover:text-brass-bright"
              }`}
            >
              {soundOn ? "♪ Sound on" : "▶ Hear it"}
            </button>
          )}
          <span className="text-brass-bright">
            {String(step + 1).padStart(2, "0")}/16
          </span>
        </div>
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
        {ROWS.map((row, ri) => (
          <div key={row.name} className="flex items-center gap-3">
            <span className="w-12 shrink-0 font-mono text-[9px] tracking-[0.15em] text-bone-faint">
              {row.name}
            </span>
            <div
              className="grid flex-1 gap-1"
              style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
            >
              {Array.from({ length: STEPS }).map((_, i) => {
                const hit = pattern[ri][i];
                const active = !reduce && i === step;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleCell(ri, i)}
                    aria-label={`${row.name} step ${i + 1}, ${hit ? "on" : "off"}`}
                    aria-pressed={hit}
                    className={`aspect-square cursor-pointer rounded-[3px] transition-all duration-100 ${
                      hit
                        ? active
                          ? "scale-110 bg-brass-bright shadow-[0_0_10px_rgba(212,166,110,0.8)] ring-2 ring-brass-bright"
                          : "bg-brass/80 hover:bg-brass"
                        : active
                          ? "bg-bone/40 ring-1 ring-bone/30"
                          : "bg-bone/[0.06] hover:bg-bone/20"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* edit affordance */}
      <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-bone-faint">
        <span>Tap cells to build your own</span>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-hairline-dark px-2.5 py-0.5 tracking-[0.15em] transition-colors hover:border-brass/50 hover:text-brass-bright"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
