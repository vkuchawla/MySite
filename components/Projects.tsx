import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Patchbay from "./Patchbay";

/* Curated headliners — the projects I actually want to represent me, in the
   order I want them seen. The live GitHub pull below is the supporting act. */
const FEATURED = [
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
      "Swipe-based travel planner — discover restaurants, events, stays & attractions, then let AI build your itinerary.",
    tags: ["React", "AI / LLM", "Maps"],
    live: "https://wandr-app-mocha.vercel.app",
    repo: "https://github.com/vkuchawla/wandr",
  },
  {
    name: "Workout Tracker",
    blurb:
      "A minimal Push / Legs / Pull tracker — log sets, watch form videos, and browse joint-friendly alternatives.",
    tags: ["React", "Vite", "localStorage"],
    live: "https://workout-tracker-psi.vercel.app",
    repo: "https://github.com/vkuchawla/workout-tracker",
  },
];

// Repos already shown as headliners — hidden from the live GitHub row below.
const FEATURED_SLUGS = ["airline-routes-3d", "wandr", "workout-tracker"];

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/vkuchawla/repos?sort=updated&per_page=12&type=public",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((r) => !r.fork && !FEATURED_SLUGS.includes(r.name))
      .slice(0, 6);
  } catch {
    return [];
  }
}

export default async function Projects() {
  const repos = await getRepos();

  return (
    <section id="projects" className="bg-paper-deep px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <SectionHeading
            track="04"
            eyebrow="B-sides"
            title="What I'm building"
            subtitle="A few things I've shipped — plus the latest, pulled live from GitHub."
          />
        </div>

        {/* modular patchbay — the signal flow between projects */}
        <div className="mb-12">
          <Patchbay />
        </div>

        {/* Headliners — curated, always here */}
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURED.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.1} y={22}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-md">
                {/* patch jack */}
                <span className="absolute -top-1.5 left-6 flex h-3 w-3 items-center justify-center rounded-full border-2 border-ink/30 bg-paper-deep transition-colors group-hover:border-ember">
                  <span className="h-1 w-1 rounded-full bg-ink/40 group-hover:bg-ember" />
                </span>

                <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-ember">
                  {p.name}
                </h3>
                <p className="mb-4 mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-paper-deep px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 border-t border-line pt-4 font-mono text-[11px]">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ember-text transition-opacity hover:opacity-70"
                  >
                    Live ↗
                  </a>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-faint transition-colors hover:text-ink"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The latest, straight from GitHub — supporting act */}
        {repos.length > 0 && (
          <>
            <div className="mb-6 mt-16 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                Latest from GitHub
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, i) => (
                <Reveal key={repo.id} delay={(i % 3) * 0.1} y={22}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="truncate pr-2 font-display text-base font-bold text-ink transition-colors group-hover:text-ember">
                        {repo.name}
                      </h3>
                      <span className="flex-shrink-0 text-ink-faint transition-colors group-hover:text-ember">
                        ↗
                      </span>
                    </div>
                    <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-ink-soft">
                      {repo.description ?? "No description provided."}
                    </p>
                    <div className="flex items-center gap-3 border-t border-line pt-4 font-mono text-[11px] text-ink-faint">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-ink-soft">
                          <span className="h-2 w-2 rounded-full bg-ember" />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                      {repo.homepage && <span className="text-ember-text">Live ↗</span>}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://github.com/vkuchawla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3 font-medium text-ink transition-all hover:border-ember hover:text-ember"
          >
            View all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
