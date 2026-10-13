"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section header in the "tracklist" language: a mono track number + serif
 * italic eyebrow, then the big display title. Words rise in a small stagger
 * so each heading "drops in" as you scroll to it.
 */
export default function SectionHeading({
  track,
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  track: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignCls}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-3"
      >
        <span className={`font-mono text-xs tracking-[0.2em] ${dark ? "text-gold" : "text-ember-text"}`}>
          {track}
        </span>
        <span className={`h-px w-8 ${dark ? "bg-gold/40" : "bg-ember/40"}`} />
        <span
          className={`font-serif italic text-lg ${dark ? "text-paper/70" : "text-ink-soft"}`}
        >
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`font-display text-4xl sm:text-5xl font-bold leading-[0.95] tracking-tight ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className={`mt-5 max-w-md text-sm leading-relaxed ${
            dark ? "text-paper/60" : "text-ink-soft"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
