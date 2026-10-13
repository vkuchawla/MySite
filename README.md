# Vedant Chawla — Personal Website

Personal portfolio site for Vedant K. Chawla — Product Manager, builder, and music curator.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion v12
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, tagline, and primary CTAs |
| **About** | Bio and key stats ($3M+ funding, 80K+ users, etc.) |
| **Experience** | Work history — Delta Air Lines, Southwest Airlines, Abercrombie & Fitch |
| **Why Me** | PM pitch — three core strengths as a product manager |
| **Projects** | Live GitHub repos fetched from the GitHub API |
| **Music** | SoundCloud embed + interests |
| **Skills** | Skill tags grouped by category + certifications |
| **Contact / Footer** | Email, GitHub, and SoundCloud links |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

- **Content**: All copy lives in the component files under `components/`
- **Colors**: Primary accent is `blue-600` (Tailwind) — swap in any component to change the palette
- **GitHub projects**: Fetched live from the GitHub API and cached for 1 hour via `next: { revalidate: 3600 }`
- **SoundCloud**: Embedded via iframe in `components/Music.tsx`

## Deployment

```bash
# Preview deployment
vercel

# Production
vercel --prod
```
