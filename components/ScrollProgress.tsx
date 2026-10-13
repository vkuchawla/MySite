"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { SECTIONS } from "./sections";

/**
 * SIGNATURE ELEMENT — the "set scrubber."
 * The page is a DJ set; this rail is the tracklist you scrub through.
 * Left rail (desktop): a gradient line that fills with scroll, with a cue
 * marker per track that lights up when active. Top bar (mobile): a thin
 * sunset progress bar. Doubles as secondary navigation.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(s.id),
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Mobile: thin sunset progress bar under the nav */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="bg-sunset fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left lg:hidden"
      />

      {/* Desktop: the tracklist scrubber */}
      <div className="fixed left-6 top-0 bottom-0 z-40 hidden items-center lg:flex">
        <div className="relative flex flex-col gap-6 py-2">
          {/* faint base line + gradient fill that grows with scroll */}
          <span className="absolute left-[3px] top-1 bottom-1 w-px bg-line" />
          <motion.span
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="bg-sunset-v absolute left-[3px] top-1 bottom-1 w-px"
          />

          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group relative flex items-center gap-3"
                aria-label={s.label}
              >
                {/* cue dot */}
                <span
                  className={`relative z-10 block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-[7px] w-[7px] bg-ember"
                      : "h-[7px] w-[7px] bg-ink/20 group-hover:bg-ember/60"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-ember/50" />
                  )}
                </span>

                {/* track number + label, revealed on active/hover */}
                <span
                  className={`flex items-baseline gap-2 transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.15em] text-ember-text">
                    {s.track}
                  </span>
                  <span className="font-serif text-sm italic text-ink-soft">
                    {s.label}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
