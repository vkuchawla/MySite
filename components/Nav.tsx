"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Music", href: "#music", id: "music" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const playCountIn = () => window.dispatchEvent(new Event("countin:play"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className={`font-display text-xl font-bold tracking-tight ${
            scrolled || menuOpen ? "text-ink" : "text-paper"
          }`}
        >
          VC<span className="text-ember">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            const rest = scrolled ? "text-ink-soft hover:text-ember" : "text-paper/70 hover:text-paper";
            return (
              <a
                key={l.label}
                href={l.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? "text-ember-text" : rest
                }`}
              >
                {l.label}
                <span
                  className={`bg-sunset absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
          <button
            onClick={playCountIn}
            aria-label="Play the drummer's count-in intro"
            className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
              scrolled ? "text-ink-soft hover:text-ember-text" : "text-paper/70 hover:text-paper"
            }`}
          >
            <span aria-hidden>▸</span> count-in
          </button>
          <a
            href="#contact"
            className={`rounded-full px-5 py-2 text-paper transition-colors ${
              scrolled ? "bg-ink hover:bg-ember" : "bg-ember hover:brightness-110"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-1 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 origin-center transition-all duration-300 ${
              scrolled || menuOpen ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              scrolled || menuOpen ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 origin-center transition-all duration-300 ${
              scrolled || menuOpen ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-paper/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`py-1 font-medium transition-colors ${
                  activeSection === l.id ? "text-ember" : "text-ink-soft hover:text-ember"
                }`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                playCountIn();
              }}
              className="flex items-center gap-2 py-1 text-left font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ember-text"
            >
              <span aria-hidden>▸</span> count-in
            </button>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-ink px-5 py-2.5 text-center font-medium text-paper transition-colors hover:bg-ember"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
