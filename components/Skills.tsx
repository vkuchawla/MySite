"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const skillGroups = [
  {
    category: "Product Strategy",
    skills: [
      "Roadmapping",
      "Backlog Prioritization",
      "Journey Mapping",
      "Business Cases",
      "Stakeholder Mgmt",
      "KPI Definition",
    ],
  },
  {
    category: "Data & Technical",
    skills: ["SQL", "A/B Testing", "Data Analysis", "HTML/CSS", "Python", "AWS"],
  },
  {
    category: "Platforms & Tools",
    skills: [
      "Salesforce",
      "Microsoft Azure",
      "OpenShift / K8s",
      "Jira",
      "Confluence",
      "AWS Kiro",
    ],
  },
];

const certifications = [
  { label: "Salesforce Administrator" },
  { label: "Microsoft Azure Fundamentals" },
  { label: "Databricks Generative AI" },
  { label: "UC Berkeley PM Studio" },
  { label: "Anthropic Academy", note: "In Progress" },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-paper px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <SectionHeading track="05" eyebrow="The rig" title="Skills & certifications" />
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1} y={22}>
              <div className="h-full rounded-2xl border border-line bg-paper-deep/50 p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-ember-text">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ember/50 hover:text-ember"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="rounded-2xl border border-line bg-paper-deep/50 p-8">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-ember-text">
              Certifications
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ember" />
                  <span>
                    {cert.label}
                    {cert.note && (
                      <span className="ml-1.5 font-mono text-xs text-ink-faint">
                        ({cert.note})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
