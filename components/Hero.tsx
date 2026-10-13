"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { strikeTabla, loadTabla } from "./audio";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
   "Visible sound" hero — a living drumhead.
   Thousands of grains obey a Chladni standing-wave field and self-organize
   into shifting nodal patterns (cymatics). Strike anywhere: the pattern bursts
   and reforms, a ripple radiates, and a tabla hits. Grounded in percussion,
   driven by real wave math. Silent until you tap (a user gesture).
--------------------------------------------------------------------------- */

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const P = reduce ? 1600 : 2600;
    const xs = new Float32Array(P);
    const ys = new Float32Array(P);
    for (let i = 0; i < P; i++) { xs[i] = Math.random(); ys[i] = Math.random(); }

    let m = 3, n = 2, tm = 3, tn = 2;
    const pick = () => {
      tm = 2 + Math.floor(Math.random() * 5);
      tn = 2 + Math.floor(Math.random() * 5);
      if (tn === tm) tn = tm === 6 ? 3 : tm + 1;
    };
    let nextPick = performance.now() + 3600;
    const ripples: { x: number; y: number; t: number }[] = [];

    const chladni = (x: number, y: number) =>
      Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y) -
      Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y);

    const update = () => {
      for (let i = 0; i < P; i++) {
        const v = chladni(xs[i], ys[i]);
        const amp = Math.min(1, Math.abs(v));
        const move = 0.026 * amp + 0.0016;
        let x = xs[i] + (Math.random() - 0.5) * move;
        let y = ys[i] + (Math.random() - 0.5) * move;
        if (x < 0) x = 0; else if (x > 1) x = 1;
        if (y < 0) y = 0; else if (y > 1) y = 1;
        xs[i] = x; ys[i] = y;
      }
    };

    const draw = () => {
      // short trails
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(19,12,8,0.30)";
      ctx.fillRect(0, 0, W, H);
      // glowing grains
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < P; i++) {
        const amp = Math.min(1, Math.abs(chladni(xs[i], ys[i])));
        const b = 1 - amp; // settled grains (on nodal lines) glow brightest
        ctx.fillStyle = `rgba(226,168,74,${0.12 + 0.55 * b})`;
        ctx.fillRect(xs[i] * W, ys[i] * H, 1.7, 1.7);
      }
      // strike ripples
      const now = performance.now();
      for (let k = ripples.length - 1; k >= 0; k--) {
        const age = (now - ripples[k].t) / 1000;
        if (age > 1.3) { ripples.splice(k, 1); continue; }
        const rad = age * Math.max(W, H) * 0.55;
        ctx.strokeStyle = `rgba(207,90,44,${(1 - age / 1.3) * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripples[k].x * W, ripples[k].y * H, rad, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let running = true;
    const frame = (now: number) => {
      m += (tm - m) * 0.045;
      n += (tn - n) * 0.045;
      if (now > nextPick) { pick(); nextPick = now + 3600; }
      update();
      draw();
      if (running) raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      m = 3; n = 4; tm = 3; tn = 4;
      for (let i = 0; i < 220; i++) update();
      draw();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // pause when off-screen
    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduce) raf = requestAnimationFrame(frame);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // a small set of pleasant pitches so each strike feels like playing
    const scale = [196, 220, 247, 262, 294, 330];
    const getCtx = () => {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        loadTabla(audioRef.current); // preload real sample if present
      }
      return audioRef.current;
    };
    const playHit = () => {
      try {
        const ac = getCtx();
        if (ac.state === "suspended") ac.resume();
        strikeTabla(ac, ac.destination, ac.currentTime, {
          freq: scale[Math.floor(Math.random() * scale.length)],
          vel: 0.95,
        });
      } catch { /* ignore */ }
    };
    // warm the sample loader early (context stays suspended until a tap)
    if (!reduce) getCtx();

    const strike = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      for (let i = 0; i < P; i++) {
        const dx = xs[i] - x, dy = ys[i] - y;
        if (dx * dx + dy * dy < 0.02) {
          xs[i] = Math.max(0, Math.min(1, xs[i] + dx * 1.7));
          ys[i] = Math.max(0, Math.min(1, ys[i] + dy * 1.7));
        }
      }
      ripples.push({ x, y, t: performance.now() });
      pick();
      nextPick = performance.now() + 3600;
      playHit();
    };
    const onDown = (e: PointerEvent) => strike(e.clientX, e.clientY);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      io.disconnect();
    };
  }, [reduce]);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(120% 95% at 50% 38%, #241812 0%, #170f0a 58%, #120b07 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />

      {/* warm ambient glow + legibility vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 45% at 50% 44%, rgba(19,12,8,0.55) 0%, transparent 72%)" }}
      />
      {/* fade into the light page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{ background: "linear-gradient(to bottom, transparent, #f5ece0)" }}
      />

      {/* content — pointer-events pass through to the drumhead, except buttons */}
      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50"
        >
          <span>Atlanta, GA</span>
          <span className="h-1 w-1 rounded-full bg-ember" />
          <span>Visible sound</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="font-display text-6xl font-bold leading-[0.88] tracking-tight text-paper sm:text-7xl md:text-[8.5rem]"
        >
          Vedant
          <br />
          <span className="text-sunset">Chawla</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 font-serif text-xl italic text-paper/75 md:text-2xl"
        >
          I ship products by day and curate sets by night.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="pointer-events-auto mt-9 flex flex-wrap justify-center gap-3"
        >
          <a href="#experience" className="rounded-full bg-ember px-7 py-3 font-medium text-paper transition-all hover:-translate-y-0.5 hover:brightness-110">
            View my work
          </a>
          <a href="#music" className="rounded-full border border-paper/25 px-7 py-3 font-medium text-paper transition-all hover:-translate-y-0.5 hover:border-paper">
            Listen to mixes
          </a>
          <a href="https://github.com/vkuchawla" target="_blank" rel="noopener noreferrer" className="rounded-full border border-paper/25 px-7 py-3 font-medium text-paper transition-all hover:-translate-y-0.5 hover:border-paper">
            GitHub ↗
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="absolute bottom-10 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60"
        >
          Tap anywhere — you&apos;re striking a drumhead
        </motion.p>
      </div>
    </section>
  );
}
