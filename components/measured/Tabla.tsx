"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { tabla } from "./data";

type Clip = (typeof tabla.clips)[number];

/** Pull the numeric video id out of a TikTok post URL. */
function videoId(url: string) {
  return url.split("/video/")[1]?.split(/[/?]/)[0] ?? "";
}

/** A portrait card that stays a lightweight facade until clicked — only then
 *  does the (heavy) TikTok player iframe mount, and it autoplays. Keeps the
 *  page from loading four third-party players up front. */
function Tile({ clip }: { clip: Clip }) {
  const [playing, setPlaying] = useState(false);
  const id = videoId(clip.tiktok);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline-dark bg-graphite transition-all duration-300 group-hover:border-brass/50 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
        {playing ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0`}
            title={clip.title}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${clip.title} on TikTok`}
            className="absolute inset-0 flex flex-col"
          >
            {/* surface */}
            <span className="absolute inset-0 bg-gradient-to-br from-graphite-soft/50 via-graphite to-graphite" />

            {/* source tag */}
            <span className="relative z-10 m-3 w-fit rounded-full border border-bone/20 bg-graphite/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint backdrop-blur">
              TikTok
            </span>

            {/* play affordance */}
            <span className="relative z-10 flex flex-1 items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/30 bg-graphite/50 text-bone backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-brass group-hover:text-brass-bright">
                <span className="ml-1 text-xl">▶</span>
              </span>
            </span>

            {/* caption */}
            <span className="relative z-10 p-4 text-left">
              <span className="block font-display text-base font-bold leading-tight text-bone">
                {clip.title}
              </span>
              <span className="mt-1 block font-mono text-[11px] tracking-wide text-brass-bright">
                {clip.views} views
              </span>
            </span>
          </button>
        )}
      </div>

      {/* external link stays reachable even after the iframe mounts */}
      <a
        href={clip.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 w-fit font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-brass-bright"
      >
        Open on TikTok ↗
      </a>
    </div>
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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tabla.clips.map((c, i) => (
            <Reveal key={c.tiktok} delay={(i % 4) * 0.06}>
              <Tile clip={c} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
              Tap a tile to play · loads from TikTok
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
