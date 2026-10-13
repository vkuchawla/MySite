"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Modular-synth patchbay: jacks along a rack, bezier patch cables that draw
 * themselves on scroll, and signal dots traveling the cables. The tech half
 * of "percussion x tech." Purely decorative; reduced-motion shows it static.
 */
const CABLES = [
  { id: "pc1", d: "M120,44 C160,150 260,150 300,44", color: "#cf5a2c", delay: 0.0 },
  { id: "pc2", d: "M300,44 C340,160 460,160 500,44", color: "#7a3f63", delay: 0.15 },
  { id: "pc3", d: "M500,44 C540,150 660,150 700,44", color: "#e0a13c", delay: 0.3 },
  { id: "pc4", d: "M700,44 C740,160 840,160 880,44", color: "#cf5a2c", delay: 0.45 },
  { id: "pc5", d: "M120,44 C400,4 600,4 880,44", color: "#7a3f63", delay: 0.2 },
];
const JACKS = [120, 300, 500, 700, 880];

export default function Patchbay() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1000 170"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* rack rail */}
      <line x1="60" y1="44" x2="940" y2="44" stroke="#2a1e1618" strokeWidth="2" />

      {/* cables */}
      {CABLES.map((c) => (
        <motion.path
          key={c.id}
          id={c.id}
          d={c.d}
          fill="none"
          stroke={c.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.75}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: c.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* signal dots traveling the cables */}
      {!reduce &&
        CABLES.map((c) => (
          <circle key={`${c.id}-dot`} r="4" fill={c.color}>
            <animateMotion dur="2.6s" begin={`${c.delay + 1}s`} repeatCount="indefinite">
              <mpath href={`#${c.id}`} />
            </animateMotion>
          </circle>
        ))}

      {/* jacks */}
      {JACKS.map((x) => (
        <g key={x}>
          <circle cx={x} cy="44" r="9" fill="#ece0cf" stroke="#2a1e16" strokeWidth="2" />
          <circle cx={x} cy="44" r="3.5" fill="#2a1e16" />
        </g>
      ))}
    </svg>
  );
}
