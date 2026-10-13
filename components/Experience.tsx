"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  { company: "Delta Air Lines", role: "Product Manager", period: "Jun 2026 — Present", logo: "/logos/delta.svg", fallbackLetter: "D", isCurrent: true },
  { company: "Delta Air Lines", role: "Technical Product Engineer", period: "Jun 2025 — Jun 2026", logo: "/logos/delta.svg", fallbackLetter: "D", isCurrent: false },
  { company: "Southwest Airlines", role: "Product Owner", period: "Feb 2023 — Jun 2025", logo: "/logos/southwest.png", fallbackLetter: "S", isCurrent: false },
  { company: "Abercrombie & Fitch Co.", role: "Systems Engineer", period: "Jun 2021 — Dec 2022", logo: "/logos/abercrombie.png", fallbackLetter: "A", isCurrent: false },
  { company: "Indiana University, Bloomington", role: "B.S. Informatics", period: "Aug 2017 — May 2021", logo: "/logos/iu.png", fallbackLetter: "IU", isCurrent: false },
];

function CompanyLogo({ logo, fallbackLetter, company, isCurrent }: { logo: string; fallbackLetter: string; company: string; isCurrent: boolean }) {
  const [failed, setFailed] = useState(false);
  const ring = isCurrent ? "ring-ember" : "ring-line";
  const cls = `relative w-14 h-14 rounded-2xl bg-paper shadow-sm overflow-hidden flex-shrink-0 ring-1 ${ring}`;
  return failed ? (
    <div className={`${cls} flex items-center justify-center bg-ink text-sm font-bold text-paper`}>{fallbackLetter}</div>
  ) : (
    <div className={cls}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt={company} onError={() => setFailed(true)} className="h-full w-full object-cover" />
    </div>
  );
}

type Exp = (typeof experiences)[number];

/** Apple-style scroll focus: the card sharpens + eases forward while centered,
 *  and gently recedes as it leaves — the eye is guided to one role at a time. */
function FocusCard({ e, index }: { e: Exp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.45, 1, 1, 0.45]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.975, 1, 1, 0.975]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity, scale }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
    >
      {/* sunset hairline on the current role */}
      {e.isCurrent && <span className="bg-sunset absolute left-0 right-0 top-0 h-[3px]" />}

      <div className="flex items-center gap-6">
        <span className="hidden font-mono text-xs text-ink-faint sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <CompanyLogo logo={e.logo} fallbackLetter={e.fallbackLetter} company={e.company} isCurrent={e.isCurrent} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {e.company}
            </h3>
            {e.isCurrent && (
              <span className="flex items-center gap-1 rounded-full border border-ember/30 bg-ember/10 px-2 py-0.5 text-[10px] font-semibold text-ember-text">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                Now
              </span>
            )}
          </div>
          <p className="mt-1 text-ink-soft">{e.role}</p>
        </div>

        <span className="hidden whitespace-nowrap font-mono text-xs text-ink-faint md:block">
          {e.period}
        </span>
      </div>

      {/* period on mobile (where the right column is hidden) */}
      <p className="mt-3 font-mono text-xs text-ink-faint md:hidden">{e.period}</p>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="bg-paper-deep px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <SectionHeading track="02" eyebrow="Track record" title="Where I've built" />
        </div>

        <div className="space-y-4">
          {experiences.map((e, i) => (
            <FocusCard key={`${e.company}-${e.role}`} e={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
