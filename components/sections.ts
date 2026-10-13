// Shared "tracklist" — the page reads like a DJ set, each section is a track.
// Order here drives both the top nav and the side scroll rail.
export const SECTIONS = [
  { id: "about", label: "About", track: "01" },
  { id: "experience", label: "Experience", track: "02" },
  { id: "why-me", label: "Why Me", track: "03" },
  { id: "projects", label: "Projects", track: "04" },
  { id: "skills", label: "Skills", track: "05" },
  { id: "music", label: "Music", track: "06" },
  { id: "contact", label: "Contact", track: "07" },
] as const;

export type Section = (typeof SECTIONS)[number];
