"use client";

import Reveal from "./Reveal";
import { profile } from "./data";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative flex min-h-[90svh] flex-col justify-between overflow-hidden bg-graphite px-5 pb-10 pt-28 text-bone sm:px-8"
    >
      <div className="measure-grid text-bone" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint">
            <span className="text-brass">06</span>
            <span className="h-px w-10 bg-brass" />
            Contact
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-4xl font-display display-lg">
            Book a set, or{" "}
            <span className="text-brass-bright">talk product</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <a
              href={`mailto:${profile.bookingEmail}?subject=Booking%20V.C.%20Beats`}
              className="group flex flex-col gap-2 border-t border-hairline-dark pt-5 transition-colors hover:border-brass"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                For V.C. Beats — bookings
              </span>
              <span className="inline-flex items-center gap-3 font-display text-2xl tracking-tight text-bone transition-colors group-hover:text-brass-bright sm:text-3xl">
                {profile.bookingEmail}
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group flex flex-col gap-2 border-t border-hairline-dark pt-5 transition-colors hover:border-brass"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                For product &amp; work
              </span>
              <span className="inline-flex items-center gap-3 font-display text-2xl tracking-tight text-bone transition-colors group-hover:text-brass-bright sm:text-3xl">
                {profile.email}
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="rounded-full bg-brass px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite transition-transform hover:scale-105"
            >
              Download résumé ↓
            </a>
            <a
              href="https://linktr.ee/v.c.beats"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bone/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-brass hover:text-brass-bright"
            >
              All links ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bone/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-brass hover:text-brass-bright"
            >
              GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hairline-dark pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
        <span>{profile.name} · {profile.alias}</span>
        <span>{profile.location} · 120 BPM</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
