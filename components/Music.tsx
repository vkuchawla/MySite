"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Sequencer from "./Sequencer";

const interests = [
  "Drumming",
  "Electronic Music",
  "DJ Sets & Mixing",
  "NBA",
  "Morning Brew Daily",
  "Emerging Fashion",
];

const socials = [
  { label: "TikTok", href: "https://www.tiktok.com/@v.c.beats", hover: "hover:border-ink hover:text-ink" },
  { label: "YouTube", href: "https://www.youtube.com/@VCBeats-cp8pj", hover: "hover:border-ember hover:text-ember" },
  { label: "Instagram", href: "https://www.instagram.com/vcbeats/", hover: "hover:border-dusk hover:text-dusk" },
];

export default function Music() {
  return (
    <section id="music" className="bg-paper-deep px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading
            track="06"
            eyebrow="After hours"
            title="The other side of me"
            subtitle="When I'm not shipping features, I'm behind the decks. Electronic music, drumming, and curating sets keep me creative."
          />
        </div>

        {/* Program a beat — interactive step sequencer */}
        <Reveal>
          <div className="mb-16">
            <p className="eyebrow mb-3 text-center">Program a beat</p>
            <Sequencer />
          </div>
        </Reveal>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line shadow-md">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="0"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/v_c_beats&color=%23cf5a2c&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
                className="block"
                title="SoundCloud player"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://soundcloud.com/v_c_beats"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-faint transition-colors hover:text-ember"
              >
                Follow @v_c_beats on SoundCloud ↗
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="font-display text-2xl font-bold text-ink">
              Beyond the product brief
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              I&apos;ve been a drummer since high school and found my way into
              DJing and electronic production. My SoundCloud mixes are how I
              share that side — blending genres, testing transitions, and
              building sets that take you somewhere.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Creativity fuels better product thinking. The same feel for flow
              I bring to a mix lives in every roadmap and sprint I run.
            </p>

            <div className="mt-8">
              <p className="eyebrow mb-3">What I&apos;m into</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-ember/20 bg-ember/5 px-4 py-2 text-xs font-medium text-ember-text"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="eyebrow mb-3">Find me on</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-all ${s.hover}`}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
