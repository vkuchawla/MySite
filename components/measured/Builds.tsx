"use client";

import Reveal from "./Reveal";
import { builds, profile } from "./data";

export default function Builds() {
  return (
    <section id="builds" className="relative overflow-hidden bg-porcelain px-5 py-28 text-ink sm:px-8">
      <div className="measure-grid text-ink" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            <span className="text-brass">05</span>
            <span className="h-px w-10 bg-brass" />
            Side projects
          </div>
          <h2 className="mt-6 max-w-2xl font-display display-lg">
            Things I build after hours.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {builds.map((b, i) => (
            <Reveal key={b.name} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_20px_40px_-24px_rgba(22,20,15,0.5)]">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-brass-text">
                    {b.name}
                  </h3>
                  <span className="font-mono text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-text">
                    ↗
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {b.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 border-t border-hairline pt-4 font-mono text-[11px]">
                  <a href={b.live} target="_blank" rel="noopener noreferrer" className="link-brass font-medium">
                    Live ↗
                  </a>
                  {b.repo && (
                    <a
                      href={b.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-faint transition-colors hover:text-ink"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-all hover:border-brass hover:text-brass-text"
            >
              View all on GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
