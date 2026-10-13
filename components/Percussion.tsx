/**
 * A small kit of stylized percussion instruments in the warm palette, used as
 * fan-out accents around the hero. Pure SVG so they animate inside motion.
 * Kept lighter than the tabla since they read at smaller, peripheral sizes.
 */

const SKIN = "#e9d8b6";
const SKIN_HL = "#f4e9d3";

export function Cymbal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 210" className={className} aria-hidden role="img">
      <defs>
        <radialGradient id="cym" cx="0.42" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#f0c977" />
          <stop offset="0.6" stopColor="#e0a13c" />
          <stop offset="1" stopColor="#b47a24" />
        </radialGradient>
      </defs>
      {/* stand */}
      <line x1="120" y1="66" x2="120" y2="196" stroke="#6b5847" strokeWidth="5" strokeLinecap="round" />
      <line x1="96" y1="196" x2="144" y2="196" stroke="#6b5847" strokeWidth="5" strokeLinecap="round" />
      <g transform="rotate(-7 120 66)">
        {/* disc */}
        <ellipse cx="120" cy="66" rx="112" ry="30" fill="url(#cym)" />
        {/* concentric grooves */}
        <g fill="none" stroke="#a56c1e" strokeWidth="1.5" opacity="0.55">
          <ellipse cx="120" cy="66" rx="92" ry="24" />
          <ellipse cx="120" cy="66" rx="70" ry="18" />
          <ellipse cx="120" cy="66" rx="48" ry="12" />
        </g>
        {/* bell */}
        <ellipse cx="120" cy="65" rx="18" ry="6" fill="#f2d493" />
      </g>
    </svg>
  );
}

export function Cajon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 210 220" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="cajf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b98246" />
          <stop offset="0.5" stopColor="#cf9c5c" />
          <stop offset="1" stopColor="#a06e38" />
        </linearGradient>
      </defs>
      {/* right side (depth) */}
      <polygon points="150,64 186,42 186,168 150,196" fill="#8a5c2e" />
      {/* top */}
      <polygon points="40,64 76,42 186,42 150,64" fill="#c99a5c" />
      {/* front tapa */}
      <rect x="40" y="64" width="110" height="132" rx="4" fill="url(#cajf)" />
      {/* grain */}
      <g stroke="#8a5c2e" strokeWidth="1.2" opacity="0.3">
        <line x1="62" y1="70" x2="62" y2="190" />
        <line x1="95" y1="70" x2="95" y2="190" />
        <line x1="128" y1="70" x2="128" y2="190" />
      </g>
      {/* sound hole */}
      <ellipse cx="168" cy="108" rx="9" ry="13" fill="#3a2717" />
    </svg>
  );
}

export function Djembe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 264" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="djb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d4c26" />
          <stop offset="0.5" stopColor="#b07a3c" />
          <stop offset="1" stopColor="#6e4220" />
        </linearGradient>
      </defs>
      {/* goblet body: bowl -> waist -> flared base */}
      <path
        d="M40,46 C24,96 40,150 74,178 C82,196 78,224 60,244 L140,244 C122,224 118,196 126,178 C160,150 176,96 160,46 Z"
        fill="url(#djb)"
      />
      {/* rope tuning */}
      <g stroke="#d9c090" strokeWidth="2.4" opacity="0.85">
        {Array.from({ length: 11 }, (_, i) => {
          const x = 46 + i * 11;
          return <line key={i} x1={x} y1="52" x2={x} y2="150" />;
        })}
      </g>
      <path d="M44,150 L156,150" stroke="#b89258" strokeWidth="5" />
      {/* head */}
      <ellipse cx="100" cy="46" rx="60" ry="16" fill="#6e4622" />
      <ellipse cx="100" cy="46" rx="50" ry="12.5" fill={SKIN} />
    </svg>
  );
}

export function Snare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="snr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a3e" />
          <stop offset="0.5" stopColor="#d9b06a" />
          <stop offset="1" stopColor="#7d5a2e" />
        </linearGradient>
      </defs>
      {/* shell */}
      <path d="M28,40 L28,104 A82,22 0 0 0 192,104 L192,40 Z" fill="url(#snr)" />
      {/* tension rods */}
      <g stroke="#5c4a34" strokeWidth="4" opacity="0.6">
        {Array.from({ length: 7 }, (_, i) => {
          const x = 40 + i * 23;
          return <line key={i} x1={x} y1="44" x2={x} y2="100" />;
        })}
      </g>
      {/* hoops + head */}
      <ellipse cx="110" cy="104" rx="82" ry="22" fill="none" stroke="#4a3a28" strokeWidth="4" />
      <ellipse cx="110" cy="40" rx="86" ry="24" fill="#b9b3a4" />
      <ellipse cx="110" cy="40" rx="78" ry="20" fill={SKIN_HL} />
    </svg>
  );
}
