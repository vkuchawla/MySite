"use client";

import { useEffect, useState } from "react";

/**
 * Drum-hit ripple: every click sends a concentric ring out from the pointer,
 * like a struck drumhead. Cheap, ambient, on-brand. Disabled for reduced motion.
 */
export default function ClickRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      const r = { id: id++, x: e.clientX, y: e.clientY };
      setRipples((rs) => [...rs, r]);
      window.setTimeout(() => {
        setRipples((rs) => rs.filter((x) => x.id !== r.id));
      }, 650);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-ring absolute rounded-full"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
