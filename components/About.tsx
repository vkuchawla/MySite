"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const stats = [
  { prefix: "", value: 5, suffix: "+", label: "Years of PM experience" },
  { prefix: "$", value: 3, suffix: "M+", label: "Transformation funding secured" },
  { prefix: "", value: 80, suffix: "K+", label: "Enterprise users impacted" },
  { prefix: "", value: 17, suffix: "K+", label: "Pilots served via Pay360" },
];

const padColors = ["#cf5a2c", "#e0a13c", "#7a3f63", "#2a1e16"];

export default function About() {
  const padsRef = useRef(null);
  const inView = useInView(padsRef, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section id="about" className="bg-paper px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-ember-text">01</span>
            <span className="h-px w-8 bg-ember/40" />
            <span className="font-serif text-lg italic text-ink-soft">About</span>
          </div>

          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">
              I ship products,
              <br />
              read the data,
              <br />
              <span className="text-sunset">and vibe to the music.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 leading-relaxed text-ink-soft">
              Product Manager with 5+ years leading digital platform
              modernization across aviation and enterprise environments. I own
              products end-to-end — from strategy and roadmap through execution
              and launch.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Strong in data-driven decisions, spotting user pain points, and
              stakeholder alignment. I turn complex operational processes into
              scalable internal tools with measurable business impact.
            </p>
          </Reveal>
        </div>

        {/* MPC-style pad grid — pads light in a fill as they enter view */}
        <div ref={padsRef} className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.32, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border p-6"
              style={{ borderColor: `${padColors[i]}55`, backgroundColor: "#ece0cf66" }}
            >
              {/* pad "hit" glow flash */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                className="pointer-events-none absolute inset-0"
                style={{ backgroundColor: padColors[i] }}
              />
              <span
                className="mb-3 block h-1.5 w-8 rounded-full transition-all group-hover:w-12"
                style={{ backgroundColor: padColors[i] }}
              />
              <p className="font-display text-4xl font-bold" style={{ color: padColors[i] }}>
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-soft">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
