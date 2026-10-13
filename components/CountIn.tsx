"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Drummer's count-in: "1 · 2 · 3 · 4" ticks, then lifts. Now opt-in — it no
 * longer plays on load. The nav's "count-in" button dispatches a `countin:play`
 * event to trigger (and replay) it. Skippable by click.
 */
export default function CountIn() {
  const [count, setCount] = useState(0); // 0 = idle, 1..4 ticks
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timers: number[] = [];
    const play = () => {
      timers.forEach(clearTimeout); // restart cleanly if replayed mid-run
      setShow(true);
      setCount(1);
      timers = [
        window.setTimeout(() => setCount(2), 380),
        window.setTimeout(() => setCount(3), 760),
        window.setTimeout(() => setCount(4), 1140),
        window.setTimeout(() => setShow(false), 1620),
      ];
    };
    window.addEventListener("countin:play", play);
    return () => {
      window.removeEventListener("countin:play", play);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={() => setShow(false)}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-paper"
        >
          <div className="flex items-center gap-5">
            {[1, 2, 3, 4].map((n) => (
              <motion.span
                key={n}
                initial={{ opacity: 0.15, scale: 0.9 }}
                animate={count >= n ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className={`font-display text-5xl font-bold sm:text-7xl ${
                  count === n ? "text-sunset" : "text-ink/25"
                }`}
              >
                {n}
              </motion.span>
            ))}
          </div>
          <span className="eyebrow absolute bottom-10">Count-in · tap to skip</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
