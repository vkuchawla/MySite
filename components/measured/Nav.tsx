"use client";

import { useEffect, useState } from "react";
import { profile } from "./data";

const LINKS = [
  { id: "percussion", label: "Percussion" },
  { id: "systems", label: "Systems" },
  { id: "fashion", label: "Fashion" },
  { id: "coffee", label: "Coffee" },
  { id: "work", label: "Work" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline-dark bg-graphite/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-bone mix-blend-difference"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-brass transition-transform group-hover:scale-125" />
          VC
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 mix-blend-difference transition-colors hover:text-brass-bright"
            >
              {l.label}
            </button>
          ))}
        </div>

        <a
          href={profile.resume}
          download
          className="rounded-full border border-brass/50 bg-brass/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brass-bright backdrop-blur transition-colors hover:bg-brass hover:text-graphite"
        >
          Résumé
        </a>
      </div>
    </nav>
  );
}
