"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile, crafts } from "./data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-graphite px-5 pb-10 pt-28 text-bone sm:px-8"
    >
      <div className="measure-grid text-bone" />
      {/* corner registration marks */}
      <RegMark className="left-5 top-20 sm:left-8" />
      <RegMark className="right-5 top-20 sm:right-8" />

      {/* eyebrow */}
      <motion.div
        {...rise(0.05)}
        className="relative z-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint"
      >
        <span className="h-px w-8 bg-brass" />
        Portfolio · {profile.role}
      </motion.div>

      {/* thesis */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-10">
        <motion.h1
          {...rise(0.12)}
          className="font-display display-xl"
        >
          <span className="sheen-text">{profile.thesisLead}</span>
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-soft sm:text-xl"
        >
          {profile.thesisBody}
        </motion.p>

        {/* spec ticker — four crafts, one measurement language */}
        <motion.ul
          {...rise(0.5)}
          className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4"
        >
          {crafts.map((c) => (
            <li key={c.key} className="border-t border-hairline-dark pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                {c.n} · {c.name}
              </div>
              <div className="mt-1 font-display text-2xl text-brass-bright">
                {c.figure}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* scroll cue */}
      <motion.div
        {...rise(0.7)}
        className="relative z-10 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-bone-faint"
      >
        <span>{profile.location}</span>
        <span className="flex items-center gap-3">
          Scroll
          <motion.span
            aria-hidden
            className="block h-8 w-px origin-top bg-brass"
            animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      <style>{`
        .sheen-text {
          background: linear-gradient(100deg, #eceae4 0%, #eceae4 38%, #d0a66e 50%, #eceae4 62%, #eceae4 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: sheen 7s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sheen-text { animation: none; }
        }
      `}</style>
    </header>
  );
}

function RegMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-3 w-3 ${className}`}
    >
      <span className="absolute left-0 top-0 h-full w-px bg-brass opacity-50" />
      <span className="absolute left-0 top-0 h-px w-full bg-brass opacity-50" />
    </span>
  );
}
