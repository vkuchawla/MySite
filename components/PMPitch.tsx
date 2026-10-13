"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const strengths = [
  {
    tag: "a",
    title: "Data-driven by design",
    description:
      "I turn ambiguous problems into clear, measurable roadmaps. From A/B results to 99% UAT pass rates, every decision is rooted in data and validated by real outcomes.",
  },
  {
    tag: "b",
    title: "Cross-functional leader",
    description:
      "I align engineering, design, QA, and business toward a shared vision — translating complex technical requirements into language every team can act on.",
  },
  {
    tag: "c",
    title: "User-first execution",
    description:
      "I don't just design for users — I've demoed to 100+ pilots, run workshops with non-profit partners, and shipped products shaped by real human feedback.",
  },
];

export default function PMPitch() {
  return (
    <section id="why-me" className="bg-paper px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <SectionHeading
            track="03"
            eyebrow="Why me"
            title="What I bring to the table"
            subtitle="Three things that set me apart as a product manager anywhere."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} y={28}>
              <div className="group h-full rounded-2xl border border-line bg-paper-deep/50 p-8 transition-all hover:border-ember/40 hover:bg-paper-deep">
                <span className="font-mono text-sm text-ember-text">{s.tag}.</span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink transition-colors group-hover:text-ember">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="mailto:vkuchawla@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ember"
            >
              Let&apos;s talk ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
