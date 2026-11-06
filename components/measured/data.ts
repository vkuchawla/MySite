// Single source of truth for the site. Real content — the components present it.
// Music-forward: Vedant Chawla, aka V.C. Beats. Product manager by day,
// producer / DJ the rest of the time.

export const profile = {
  name: "Vedant Chawla",
  alias: "V.C. Beats",
  dayRole: "Product Manager",
  location: "Atlanta, GA",
  // personal inbox for product / work
  email: "vkuchawla@gmail.com",
  // the V.C. Beats booking inbox
  bookingEmail: "vcbeats98@gmail.com",
  github: "https://github.com/vkuchawla",
  resume: "/Vedant_Chawla_Resume.pdf",
  // Hero: clean, honest, first-person. Doesn't name the alias yet — that reveal
  // lands in the Sound section.
  heroLead: "Vedant Chawla",
  heroBody:
    "Product manager by day. I spend most of the rest of my time making music — and building things on the internet that probably didn't need to exist.",
  // Three honest anchors under the hero, no invented spec sheet.
  heroFacts: [
    { k: "Day job", v: "Product Manager" },
    { k: "After hours", v: "Producer · DJ" },
    { k: "Based in", v: "Atlanta" },
  ],
};

// ============================ The Sound ===================================
// The heart of the site. Everything here is verifiable from the V.C. Beats
// profiles. Stats are rounded down so they stay true as they grow.
export const sound = {
  eyebrow: "Production",
  reveal: "Online, I go by V.C. Beats.",
  headline: "Too many genres to pick one.",
  body:
    "So I blend them. Bhangra into hip-hop, Bollywood into house, garba into whatever's knocking that week — fusion mixtapes stitched from every kind of music I love. A lot of it is built for the collegiate South Asian dance circuit (Raas, Garba, Bhangra, India Night), where a set has to move a team and a crowd at once. But really I just like finding the one transition nobody expects and making it land.",
  // His own SoundCloud tagline.
  booking: "Available for competition mixtapes and live DJ sets.",
  // Profile player — shows the real catalog, plays actual tracks.
  soundcloudEmbed:
    "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fv_c_beats&color=%23b4824a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
  soundcloudUrl: "https://soundcloud.com/v_c_beats",
  // Real credits pulled from the catalog.
  credits: [
    "ADZ 2024",
    "BKB 2023",
    "Raas In The 614",
    "AKD / DRD 2021",
    "Midwest Side Story",
    "Raas Royalty XI",
    "DTX Dandiya",
    "UGA India Night",
  ],
};

// ============================ Taal ========================================
// Showcase of real tabla/dhol clips, embedded straight from TikTok. Each clip
// renders as a TikTok player iframe keyed off its `tiktok` post URL.
export const tabla = {
  eyebrow: "Taal",
  headline: "I don't just drop the beat — I play it.",
  body:
    "Producing and DJing is half of it. The other half is live tabla — real hands layered over the tracks I love, from Arijit ballads to AP Dhillon bangers. A few favorites:",
  tiktokUrl: "https://www.tiktok.com/@v.c.beats",
  clips: [
    {
      title: "Apna Bana Le",
      views: "6.9K",
      tiktok: "https://www.tiktok.com/@v.c.beats/video/7231788471843687723",
    },
    {
      title: "Ride with the MOB",
      views: "2.8K",
      tiktok: "https://www.tiktok.com/@v.c.beats/video/7220077309213216046",
    },
    {
      title: "Mera Dhol Na Sun",
      views: "2.6K",
      tiktok: "https://www.tiktok.com/@v.c.beats/video/7445763158070938926",
    },
    {
      title: "AP Dhillon — new album",
      views: "1.7K",
      tiktok: "https://www.tiktok.com/@v.c.beats/video/7410553236752747822",
    },
  ],
};

// ============================ The Feed ====================================
// Social presence. Stats rounded down. These are the real, confirmed links.
export type Social = {
  key: string;
  name: string;
  handle: string;
  url: string;
  stat: string;
  note: string;
  // Optional: featured items (e.g. top videos) with their metrics.
  highlights?: { title: string; metric: string; url: string }[];
};

export const socials: Social[] = [
  {
    key: "tiktok",
    name: "TikTok",
    handle: "@v.c.beats",
    url: "https://www.tiktok.com/@v.c.beats",
    stat: "5.7K followers · 65K+ likes",
    note: "Behind the decks. Best clips pass 270K views.",
  },
  {
    key: "soundcloud",
    name: "SoundCloud",
    handle: "v_c_beats",
    url: "https://soundcloud.com/v_c_beats",
    stat: "2.2K followers · 88 tracks",
    note: "The full catalog — every mixtape and set.",
  },
  {
    key: "instagram",
    name: "Instagram",
    handle: "@vcbeats",
    url: "https://www.instagram.com/vcbeats/",
    stat: "Photos · reels · gigs",
    note: "Where the next set gets announced.",
  },
  {
    key: "youtube",
    name: "YouTube",
    handle: "@vcbeats-cp8pj",
    url: "https://youtube.com/@vcbeats-cp8pj",
    stat: "9K+ subscribers",
    note: "Fusion mashups — the two biggest:",
    highlights: [
      {
        title: "Loyal × Nainowale Ne × Ride It",
        metric: "2.2M views",
        url: "https://youtu.be/Q5azpvidbBA",
      },
      {
        title: "Pyaar Ki Ek Kahani × Brown Munde",
        metric: "1.3M views",
        url: "https://youtu.be/cdqwuoYFh7Q",
      },
    ],
  },
  {
    key: "linktree",
    name: "Everything",
    handle: "linktr.ee/v.c.beats",
    url: "https://linktr.ee/v.c.beats",
    stat: "All links · one place",
    note: "SoundCloud, TikTok, Instagram, YouTube.",
  },
];

// ============================ The Day Job =================================
// Real career history. Kept credible for recruiters.
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

// ============================ After Hours =================================
export const builds = [
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
  { id: "sound", label: "Production" },
  { id: "tabla", label: "Taal" },
  { id: "feed", label: "Feed" },
  { id: "work", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "contact", label: "Contact" },
] as const;
