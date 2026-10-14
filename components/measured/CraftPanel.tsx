"use client";

import Reveal from "./Reveal";
import { CraftVisual } from "./CraftVisuals";
import type { Craft } from "./data";

/** One full-viewport chapter. Tone flips the whole surface light/dark so the
 *  scroll reads like an Apple product page moving between stages. */
export default function CraftPanel({ craft }: { craft: Craft }) {
  const dark = craft.tone === "dark";
  const surface = dark ? "bg-graphite text-bone" : "bg-porcelain text-ink";
  const muted = dark ? "text-bone-soft" : "text-ink-soft";
  const faint = dark ? "text-bone-faint" : "text-ink-faint";
  const hair = dark ? "border-hairline-dark" : "border-hairline";
  const gridTone = dark ? "text-bone" : "text-ink";

  return (
    <section
      id={craft.key}
      className={`relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 sm:px-8 ${surface}`}
    >
      <div className={`measure-grid ${gridTone}`} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* text column */}
        <div>
          <Reveal>
            <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] ${faint}`}>
              <span className="text-brass">{craft.n}</span>
              <span className="h-px w-10 bg-brass" />
              {craft.name}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-xl font-display display-lg">
              {craft.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className={`mt-7 max-w-lg text-base leading-relaxed sm:text-lg ${muted}`}>
              {craft.body}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 flex max-w-lg gap-3 text-base leading-relaxed">
              <span className="mt-2 h-4 w-px shrink-0 bg-brass" />
              <span className="italic text-brass-text">{craft.parallel}</span>
            </p>
          </Reveal>

          {/* spec block */}
          <Reveal delay={0.3}>
            <dl className={`mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 ${hair}`}>
              {craft.specs.map((s) => (
                <div key={s.k} className="flex flex-col gap-1">
                  <dt className={`font-mono text-[10px] uppercase tracking-[0.2em] ${faint}`}>
                    {s.k}
                  </dt>
                  <dd className="font-mono text-sm tracking-wide">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* visual column */}
        <div className="relative">
          <Reveal delay={0.12}>
            <CraftVisual craftKey={craft.key} />
          </Reveal>
          <Reveal delay={0.24}>
            <div className={`mt-6 flex items-baseline gap-4 border-t pt-5 ${hair}`}>
              <span className="font-display text-5xl text-brass sm:text-6xl">
                {craft.figure}
              </span>
              <span className={`font-mono text-[11px] uppercase leading-tight tracking-[0.18em] ${faint}`}>
                {craft.figureLabel}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
