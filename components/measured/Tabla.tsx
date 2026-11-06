"use client";

import Reveal from "./Reveal";
import { tabla } from "./data";

type Clip = (typeof tabla.clips)[number];

/** A portrait tile showing the real clip: it autoplays muted and loops inline
 *  (self-hosted, so nothing can block it), with the poster shown until it
 *  decodes. Tapping opens the original post on TikTok. */
function Tile({ clip }: { clip: Clip }) {
  return (
    <a
      href={clip.tiktok}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-hairline-dark bg-graphite transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]"
    >
      <video
        src={clip.src}
        poster={clip.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite via-graphite/5 to-graphite/30" />

      {/* source tag */}
      <span className="absolute left-3 top-3 rounded-full border border-bone/20 bg-graphite/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-soft backdrop-blur">
        TikTok ↗
      </span>

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="font-display text-base font-bold leading-tight text-bone">
          {clip.title}
        </div>
        <div className="mt-1 font-mono text-[11px] tracking-wide text-brass-bright">
          {clip.views} views
        </div>
      </div>
    </a>
  );
}

export default function Tabla() {
  return (
    <section
      id="tabla"
      className="relative overflow-hidden bg-graphite-soft px-5 py-28 text-bone sm:px-8"
    >
      <div className="measure-grid text-bone" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint">
            <span className="text-brass">02</span>
            <span className="h-px w-10 bg-brass" />
            {tabla.eyebrow}
          </div>
          <h2 className="mt-6 max-w-2xl font-display display-lg">
            {tabla.headline}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-soft sm:text-lg">
            {tabla.body}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tabla.clips.map((c, i) => (
            <Reveal key={c.tiktok} delay={(i % 4) * 0.06}>
              <Tile clip={c} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
              Playing live · tap to open on TikTok
            </span>
            <a
              href={tabla.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bone/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-brass hover:text-brass-bright"
            >
              More on TikTok ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
