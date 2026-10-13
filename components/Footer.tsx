export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-ink px-6 py-20 text-paper">
      {/* sunset seam at the very top */}
      <div className="bg-sunset absolute left-0 right-0 top-0 h-[3px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.2em] text-gold">07</span>
              <span className="h-px w-8 bg-gold/40" />
              <span className="font-serif text-lg italic text-paper/70">Last track</span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight">
              Let&apos;s build
              <br />
              <span className="text-sunset">something great.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Open to PM opportunities. Always up for a good conversation about
              product, tech, or music.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:vkuchawla@gmail.com"
              className="rounded-full bg-ember px-7 py-3.5 text-center text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              vkuchawla@gmail.com
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/vedantchawla/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 whitespace-nowrap rounded-full border border-paper/20 px-5 py-2.5 text-center text-sm text-paper/70 transition-colors hover:border-gold hover:text-gold"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/vkuchawla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 whitespace-nowrap rounded-full border border-paper/20 px-5 py-2.5 text-center text-sm text-paper/70 transition-colors hover:border-paper hover:text-paper"
              >
                GitHub ↗
              </a>
              <a
                href="https://soundcloud.com/v_c_beats"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 whitespace-nowrap rounded-full border border-paper/20 px-5 py-2.5 text-center text-sm text-paper/70 transition-colors hover:border-ember hover:text-ember"
              >
                SoundCloud ↗
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 font-mono text-xs text-paper/40 sm:flex-row">
          <p>© {year} Vedant K. Chawla</p>
          <p>Golden hour set · Next.js &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
