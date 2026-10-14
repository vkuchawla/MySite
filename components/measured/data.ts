// Single source of truth for "Measured". Real content; themes present it.

export const profile = {
  name: "Vedant Chawla",
  role: "Product Manager",
  thesisLead: "Measured.",
  thesisBody:
    "A product manager who sweats the 2% — on a drum kit, in a codebase, in a wardrobe, and in a cup of coffee.",
  location: "United States",
  email: "vkuchawla@gmail.com",
  github: "https://github.com/vkuchawla",
  resume: "/Vedant_Chawla_Resume.pdf",
};

// The four crafts, each rendered in one measurement language.
export type Craft = {
  n: string;
  key: string;
  name: string;
  tone: "dark" | "light";
  headline: string;
  body: string;
  // Parallel to how he builds product.
  parallel: string;
  specs: { k: string; v: string }[];
  // Headline figure shown large.
  figure: string;
  figureLabel: string;
};

export const crafts: Craft[] = [
  {
    n: "01",
    key: "percussion",
    name: "Percussion",
    tone: "dark",
    headline: "Rhythm is latency you can feel.",
    body:
      "I've played since I was a kid — kit, tabla, pads. Pocket isn't negotiable: a groove and noise are only a few milliseconds apart, held with intent. It taught me that consistency beats intensity.",
    parallel:
      "Same reason my release trains ship on the beat, sprint after sprint.",
    specs: [
      { k: "Tempo", v: "60–180 BPM" },
      { k: "Meter", v: "4/4 · 7/8 · 5/4" },
      { k: "Feel", v: "In the pocket" },
      { k: "First kit", v: "Age 11" },
    ],
    figure: "120",
    figureLabel: "beats per minute",
  },
  {
    n: "02",
    key: "systems",
    name: "Systems",
    tone: "light",
    headline: "I build the engines people never see.",
    body:
      "At Delta I own the valuation engine — the thing that tells every customer what a ticket is really worth, the moment they ask. We moved it from real-time calculation to a pre-computed model: lower latency, higher trust, no operational surprises.",
    parallel:
      "Started in cloud infra before product, so I speak engineering and own the trade-offs.",
    specs: [
      { k: "Scale", v: "$2B+/yr" },
      { k: "Reliability", v: "99% UAT" },
      { k: "Alignment", v: "6+ teams" },
      { k: "Latency", v: "Real-time → pre-computed" },
    ],
    figure: "$2B+",
    figureLabel: "calculations owned, yearly",
  },
  {
    n: "03",
    key: "fashion",
    name: "Fashion",
    tone: "dark",
    headline: "Fit is a form of respect.",
    body:
      "I minored in apparel merchandising, and I read clothes like a system: proportion, fabric weight, restraint. One considered choice beats ten loud ones. The details you notice last are usually the ones doing the work.",
    parallel:
      "It's the same taste I bring to an interface — edit until only what matters is left.",
    specs: [
      { k: "Weight", v: "280–340 GSM" },
      { k: "Denim", v: "14 oz selvedge" },
      { k: "Break", v: "Quarter" },
      { k: "Rule", v: "One statement, max" },
    ],
    figure: "1",
    figureLabel: "statement piece, never two",
  },
  {
    n: "04",
    key: "coffee",
    name: "Coffee",
    tone: "light",
    headline: "Extraction is just iteration.",
    body:
      "Dialing in a pour-over is a tight feedback loop: measure, taste, adjust one variable, repeat. Grind, ratio, temperature, time — change the water by two degrees and the whole cup moves. I chase the same clarity every morning.",
    parallel:
      "It's A/B testing you can drink: isolate the variable, trust the data, keep what's better.",
    specs: [
      { k: "Ratio", v: "1:16" },
      { k: "Water", v: "93°C" },
      { k: "Bloom", v: "30–45s" },
      { k: "Method", v: "V60 · Espresso" },
    ],
    figure: "1:16",
    figureLabel: "coffee to water, dialed in",
  },
];

// Real career history, as an Apple-style spec sheet.
export const work = [
  {
    company: "Delta Air Lines",
    role: "Product Manager, Ticket Servicing & Valuation",
    period: "Jun 2026 — Present",
    logo: "/logos/delta.svg",
    current: true,
    spec: "$2B+/yr · 6+ teams · real-time → pre-computed",
  },
  {
    company: "Delta Air Lines",
    role: "Technical Product Manager, Crew IT",
    period: "Jun 2025 — Jun 2026",
    logo: "/logos/delta.svg",
    current: false,
    spec: "17K+ employees · 99% UAT · beta to 5,000+",
  },
  {
    company: "Southwest Airlines",
    role: "Product Owner, People & Finance",
    period: "Feb 2023 — Jun 2025",
    logo: "/logos/southwest.png",
    current: false,
    spec: "80K+ employees · $3M secured · $150K saved",
  },
  {
    company: "Abercrombie & Fitch Co.",
    role: "Systems Engineer",
    period: "Jun 2021 — Dec 2022",
    logo: "/logos/abercrombie.png",
    current: false,
    spec: "100+ VMs · 50+ apps · WebLogic → OpenShift",
  },
  {
    company: "Indiana University",
    role: "B.S. Informatics",
    period: "2017 — 2021",
    logo: "/logos/iu.png",
    current: false,
    spec: "Business specialization · minor: apparel merchandising",
  },
];

export const builds = [
  {
    name: "Career Remix",
    blurb:
      "A themeable portfolio engine that reskins a résumé as any company's product. First cut: Spotify.",
    tags: ["Next.js", "Tailwind", "Theming"],
    live: "https://vedant-chawla-pm.vercel.app",
    repo: null,
  },
  {
    name: "SkyRoutes",
    blurb:
      "Interactive 3D globe of U.S. airline route networks — spin the earth and trace who flies where.",
    tags: ["Next.js", "Three.js", "react-globe.gl"],
    live: "https://airline-routes-3d.vercel.app",
    repo: "https://github.com/vkuchawla/airline-routes-3d",
  },
  {
    name: "Wandr",
    blurb:
      "Swipe-based travel planner — discover places, then let AI assemble the itinerary.",
    tags: ["React", "AI / LLM", "Maps"],
    live: "https://wandr-app-mocha.vercel.app",
    repo: "https://github.com/vkuchawla/wandr",
  },
  {
    name: "Workout Tracker",
    blurb:
      "A minimal Push / Legs / Pull tracker — log sets, watch form, browse joint-friendly swaps.",
    tags: ["React", "Vite", "localStorage"],
    live: "https://workout-tracker-psi.vercel.app",
    repo: "https://github.com/vkuchawla/workout-tracker",
  },
];

// Drives nav + tempo rail. Order is the scroll order.
export const sections = [
  { id: "top", label: "Top" },
  { id: "percussion", label: "Percussion" },
  { id: "systems", label: "Systems" },
  { id: "fashion", label: "Fashion" },
  { id: "coffee", label: "Coffee" },
  { id: "work", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "contact", label: "Contact" },
] as const;
