/**
 * Stylized-but-authentic tabla. Two variants:
 *  - "dayan": smaller wooden treble drum (right hand), centered syahi, gatta dowels
 *  - "bayan": larger metallic bass drum (left hand), bulbous body, off-centre syahi
 * Pure SVG (no hooks) so it can animate inside motion wrappers.
 */
export default function Tabla({
  variant = "dayan",
  className,
}: {
  variant?: "dayan" | "bayan";
  className?: string;
}) {
  const bass = variant === "bayan";

  // ---- palette ----------------------------------------------------------
  const gajra = bass ? "#3b3020" : "#6e4622"; // braided rim
  const braid = bass ? "#2c2416" : "#523419";
  const strap = "#c9a468"; // natural leather lacing (tasma)
  const strapDark = "#a17c44";
  const gatta = "#8a5a2e";
  const bottomRing = bass ? "#5a4a34" : "#8a6a3e";
  const cushion = "#9a3b2c"; // traditional red gaddi
  const cushionDark = "#6e2820";
  const syahiEdge = "#33251a";
  const syahiCore = "#1b130c";

  // ---- geometry ---------------------------------------------------------
  const cx = 120;
  const headCy = 80;
  const headRx = 72;
  const headRy = 20;
  const topY = 92;
  const midY = bass ? 176 : 168;
  const baseY = 250;
  const topHalf = 66;
  const midHalf = bass ? 84 : 73;
  const baseHalf = bass ? 50 : 56;

  const N = 16;
  const straps = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    return {
      x1: cx - topHalf + t * 2 * topHalf,
      xm: cx - midHalf + t * 2 * midHalf,
      x2: cx - baseHalf + t * 2 * baseHalf,
    };
  });

  // braided rim ticks
  const ticks = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * Math.PI * 2;
    const rx = 66,
      ry = 17.5;
    return {
      x1: cx + rx * 0.9 * Math.cos(a),
      y1: headCy + ry * 0.9 * Math.sin(a),
      x2: cx + rx * 1.1 * Math.cos(a),
      y2: headCy + ry * 1.1 * Math.sin(a),
    };
  });

  // gatta dowels (wood dayan only), nestled between straps on the upper body
  const gattaXAt = (topX: number, midX: number, y: number) => {
    const f = (y - topY) / (midY - topY);
    return topX + f * (midX - topX);
  };
  const gattas = bass
    ? []
    : [2, 4, 6, 8, 10, 12].map((i) => {
        const a = straps[i],
          b = straps[i + 1];
        const y = 118;
        const x = (gattaXAt(a.x1, a.xm, y) + gattaXAt(b.x1, b.xm, y)) / 2;
        return { x, y };
      });

  const bodyPath = `M ${cx - topHalf},${topY} C ${cx - midHalf},${
    (topY + midY) / 2
  } ${cx - midHalf},${(midY + baseY) / 2} ${cx - baseHalf},${baseY} A ${baseHalf},14 0 0 0 ${
    cx + baseHalf
  },${baseY} C ${cx + midHalf},${(midY + baseY) / 2} ${cx + midHalf},${
    (topY + midY) / 2
  } ${cx + topHalf},${topY} Z`;

  const syahiCx = cx + (bass ? -15 : 0);
  const syahiRx = bass ? 25 : 27;
  const syahiRy = bass ? 7.5 : 8;

  return (
    <svg viewBox="0 0 240 320" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id={`shell-${variant}`} x1="0" y1="0" x2="1" y2="0">
          {bass ? (
            <>
              <stop offset="0" stopColor="#4a3826" />
              <stop offset="0.22" stopColor="#7e6038" />
              <stop offset="0.46" stopColor="#cfa76c" />
              <stop offset="0.55" stopColor="#efd6a4" />
              <stop offset="0.66" stopColor="#a9803f" />
              <stop offset="1" stopColor="#463523" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#7d4c26" />
              <stop offset="0.24" stopColor="#a86e38" />
              <stop offset="0.5" stopColor="#c89354" />
              <stop offset="0.78" stopColor="#94592a" />
              <stop offset="1" stopColor="#6e4220" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`skin-${variant}`} cx="0.42" cy="0.34" r="0.9">
          <stop offset="0" stopColor="#f4e9d3" />
          <stop offset="0.7" stopColor="#e2d0ab" />
          <stop offset="1" stopColor="#cdb98d" />
        </radialGradient>
      </defs>

      {/* contact shadow + red ring cushion (gaddi) */}
      <ellipse cx={cx} cy="300" rx="92" ry="13" fill="#2a1e16" opacity="0.16" />
      <ellipse cx={cx} cy="284" rx="90" ry="22" fill={cushionDark} />
      <ellipse cx={cx} cy="278" rx="90" ry="22" fill={cushion} />
      <ellipse cx={cx} cy="276" rx="52" ry="12" fill={cushionDark} />
      {/* cushion wrap segments */}
      <g stroke={cushionDark} strokeWidth="1.5" opacity="0.5">
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i / 20) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={cx + 70 * Math.cos(a)}
              y1={278 + 17 * Math.sin(a)}
              x2={cx + 88 * Math.cos(a)}
              y2={278 + 21 * Math.sin(a)}
            />
          );
        })}
      </g>

      {/* shell */}
      <path d={bodyPath} fill={`url(#shell-${variant})`} />

      {/* metallic sheen (bayan) or wood grain (dayan) */}
      {bass ? (
        <ellipse cx={cx - 26} cy={midY - 6} rx="16" ry="62" fill="#fff" opacity="0.1" />
      ) : (
        <g stroke="#5f3a1c" strokeWidth="1.5" opacity="0.25" fill="none">
          <path d={`M ${cx - 30},110 Q ${cx - 34},${midY} ${cx - 26},238`} />
          <path d={`M ${cx + 22},112 Q ${cx + 30},${midY} ${cx + 20},238`} />
        </g>
      )}

      {/* bottom braided ring where lacing terminates */}
      <ellipse cx={cx} cy={baseY - 2} rx={baseHalf + 3} ry="15" fill="none" stroke={bottomRing} strokeWidth="7" />

      {/* lacing straps (tasma) */}
      <g fill="none" strokeLinecap="round">
        {straps.map((s, i) => (
          <path
            key={i}
            d={`M ${s.x1},94 Q ${s.xm},${midY} ${s.x2},${baseY - 4}`}
            stroke={i % 2 === 0 ? strap : strapDark}
            strokeWidth="3.4"
          />
        ))}
      </g>

      {/* gatta tuning dowels */}
      {gattas.map((g, i) => (
        <rect key={i} x={g.x - 4} y={g.y} width="8" height="30" rx="4" fill={gatta} />
      ))}

      {/* drumhead: braided gajra rim, skin (maidan), syahi */}
      <ellipse cx={cx} cy={headCy} rx={headRx} ry={headRy} fill={gajra} />
      <ellipse cx={cx} cy={headCy} rx="61" ry="16.5" fill={`url(#skin-${variant})`} />
      <ellipse cx={cx} cy={headCy} rx="61" ry="16.5" fill="none" stroke="#f0e4cb" strokeWidth="1.5" opacity="0.6" />
      <g stroke={braid} strokeWidth="2" strokeLinecap="round">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
      </g>

      {/* syahi — the black tuning circle (off-centre on bayan) */}
      <ellipse cx={syahiCx} cy={headCy + 1} rx={syahiRx} ry={syahiRy} fill={syahiEdge} />
      <ellipse cx={syahiCx} cy={headCy} rx={syahiRx - 3} ry={syahiRy - 1.5} fill={syahiCore} />
      <ellipse cx={syahiCx - 7} cy={headCy - 2} rx="7" ry="2" fill="#4a3627" opacity="0.5" />
    </svg>
  );
}
