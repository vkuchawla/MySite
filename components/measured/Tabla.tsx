"use client";

import Reveal from "./Reveal";
import { tabla } from "./data";

type Clip = (typeof tabla.clips)[number];

/** Pull the numeric video id out of a TikTok post URL. */
function videoId(url: string) {
  return url.split("/video/")[1]?.split(/[/?]/)[0] ?? "";
}

/** An embedded, playable TikTok video in a portrait card, with a caption row
 *  below linking out to the original post. */
function Tile({ clip }: { clip: Clip }) {
  const id = videoId(clip.tiktok);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline-dark bg-graphite transition-all duration-300 group-hover:border-brass/50 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
        <iframe
          src={`https://www.tiktok.com/player/v1/${id}?music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0`}
          title={clip.title}
          loading="lazy"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* caption */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <a
          href={clip.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-base font-bold leading-tight text-bone transition-colors hover:text-brass-bright"
        >
          {clip.title}
        </a>
        <span className="shrink-0 font-mono text-[11px] tracking-wide text-brass-bright">
          {clip.views}
        </span>
      </div>
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
              Tap play to watch · embedded from TikTok
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
