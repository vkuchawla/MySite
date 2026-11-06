"use client";

import Reveal from "./Reveal";
import { PercussionViz } from "./CraftVisuals";
import { sound, profile } from "./data";

/** The heart of the site: V.C. Beats. Dark surface, the reveal, the story,
 *  a live SoundCloud player, real mixtape credits, and a booking CTA. */
export default function Sound() {
  return (
    <section
      id="sound"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-graphite px-5 py-24 text-bone sm:px-8"
    >
      <div className="measure-grid text-bone" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* text column */}
        <div>
          <Reveal>
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint">
              <span className="text-brass">01</span>
              <span className="h-px w-10 bg-brass" />
              {sound.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-brass-bright">
              {sound.reveal}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mt-4 max-w-xl font-display display-lg">
              {sound.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-bone-soft sm:text-lg">
              {sound.body}
            </p>
          </Reveal>

          {/* booking line */}
          <Reveal delay={0.24}>
            <p className="mt-5 flex max-w-lg gap-3 text-base leading-relaxed">
              <span className="mt-2 h-4 w-px shrink-0 bg-brass" />
              <span className="italic text-brass-text">{sound.booking}</span>
            </p>
          </Reveal>

          {/* real credits */}
          <Reveal delay={0.3}>
            <div className="mt-9 border-t border-hairline-dark pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                Selected credits
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sound.credits.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-hairline-dark px-3 py-1 font-mono text-[11px] tracking-wide text-bone-soft"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.36}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.bookingEmail}?subject=Booking%20V.C.%20Beats`}
                className="rounded-full bg-brass px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite transition-transform hover:scale-105"
              >
                Book a set →
              </a>
              <a
                href={sound.soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-bone/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-brass hover:text-brass-bright"
              >
                Full catalog ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* visual column — sequencer accent + live player */}
        <div className="relative">
          <Reveal delay={0.12}>
            <PercussionViz />
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-5 overflow-hidden rounded-2xl border border-hairline-dark bg-graphite-soft/60 backdrop-blur">
              <iframe
                title="V.C. Beats on SoundCloud"
                width="100%"
                height="320"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                loading="lazy"
                src={sound.soundcloudEmbed}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
