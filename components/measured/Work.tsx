"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { work } from "./data";

function Logo({ src, company, current }: { src: string; company: string; current: boolean }) {
  const [failed, setFailed] = useState(false);
  const base =
    "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-porcelain ring-1";
  const ring = current ? "ring-brass/50" : "ring-hairline-dark";
  if (failed)
    return (
      <div className={`${base} ${ring} bg-graphite-soft text-sm font-bold text-bone`}>
        {company[0]}
      </div>
    );
  return (
    <div className={`${base} ${ring}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={company}
        onError={() => setFailed(true)}
        className="h-8 w-8 object-contain"
      />
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-graphite px-5 py-28 text-bone sm:px-8">
      <div className="measure-grid text-bone" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint">
            <span className="text-brass">04</span>
            <span className="h-px w-10 bg-brass" />
            The day job
          </div>
          <h2 className="mt-6 max-w-2xl font-display display-lg">
            The other half ships product.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-soft sm:text-lg">
            When I&apos;m not behind the decks, I build products at scale — most
            recently the engine that prices every ticket at Delta.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-hairline-dark">
          {work.map((w, i) => (
            <Reveal key={`${w.company}-${w.role}`} delay={(i % 2) * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-hairline-dark py-6 transition-colors hover:bg-bone/[0.03] md:grid-cols-[auto_1.4fr_1fr_auto]">
                <Logo src={w.logo} company={w.company} current={w.current} />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                      {w.company}
                    </h3>
                    {w.current && (
                      <span className="flex items-center gap-1 rounded-full border border-brass/40 bg-brass/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-brass-bright">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass" />
                        Now
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-bone-soft">{w.role}</p>
                </div>

                <p className="hidden font-mono text-[11px] leading-relaxed tracking-wide text-brass-bright md:block">
                  {w.spec}
                </p>

                <p className="hidden whitespace-nowrap font-mono text-[11px] text-bone-faint md:block">
                  {w.period}
                </p>

                {/* mobile meta */}
                <p className="col-span-2 -mt-2 font-mono text-[10px] text-bone-faint md:hidden">
                  {w.period} · <span className="text-brass-bright">{w.spec}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
