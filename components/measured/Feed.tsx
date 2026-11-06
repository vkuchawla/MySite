"use client";

import Reveal from "./Reveal";
import { socials } from "./data";

/** The Feed: where to find V.C. Beats online. Cards link out; the real
 *  follower/like counts do the talking. Serves the "grow my socials" goal. */
export default function Feed() {
  return (
    <section
      id="feed"
      className="relative overflow-hidden bg-porcelain px-5 py-28 text-ink sm:px-8"
    >
      <div className="measure-grid text-ink" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            <span className="text-brass">03</span>
            <span className="h-px w-10 bg-brass" />
            The feed
          </div>
          <h2 className="mt-6 max-w-2xl font-display display-lg">
            Find me loud online.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Sets, clips, and the occasional unhinged edit. Follow along —
            that&apos;s where the next drop lands first.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {socials.map((s, i) => {
            const cardClass =
              "group flex h-full flex-col rounded-2xl border border-hairline bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_20px_40px_-24px_rgba(22,20,15,0.5)]";

            const header = (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-brass-text">
                    {s.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] tracking-wide text-ink-faint">
                    {s.handle}
                  </p>
                </div>
                <span className="font-mono text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-text">
                  ↗
                </span>
              </div>
            );

            // Cards with featured items use a div wrapper so the inner video
            // links stay valid (no anchor nested inside an anchor).
            if (s.highlights) {
              return (
                <Reveal key={s.key} delay={(i % 2) * 0.08}>
                  <div className={cardClass}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {header}
                    </a>
                    <p className="mt-5 font-mono text-sm tracking-wide text-brass-text">
                      {s.stat}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.note}
                    </p>
                    <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
                      {s.highlights.map((h) => (
                        <a
                          key={h.url}
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-white/40 px-3 py-2.5 transition-colors hover:border-brass/50 hover:bg-white/80"
                        >
                          <span className="truncate text-sm text-ink">
                            {h.title}
                          </span>
                          <span className="shrink-0 font-mono text-sm font-semibold text-brass-text">
                            {h.metric}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={s.key} delay={(i % 2) * 0.08}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {header}
                  <p className="mt-5 font-mono text-sm tracking-wide text-brass-text">
                    {s.stat}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.note}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
