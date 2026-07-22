# folio

Adam Tunchay's personal site — case studies for production work that can't be shown as public code.

## Stack

Astro, React islands, MDX content collections, Tailwind CSS v4, TypeScript strict. Static output, deployed on Vercel.

## Commands

| Command               | Action                                      |
| :-------------------- | :------------------------------------------ |
| `npm install`         | Install dependencies                        |
| `npm run dev`         | Start the local dev server (localhost:4321) |
| `npm run build`       | Build the production site to `./dist/`      |
| `npm run preview`     | Preview the production build locally        |
| `npm run astro check` | Type-check the project                      |

## Content

Case studies live in `src/content/case-studies/`, side projects in `src/content/projects/`, both defined in `src/content.config.ts`. Add a new case study by dropping an `.mdx` file with the required frontmatter into the relevant folder — no code changes needed.

## Outstanding before launch

- `public/resume.pdf` — not committed; generated separately, see spec §3.
- `public/og-image.png` and `public/apple-touch-icon.png` — referenced in `Layout.astro` but not yet created.
- Favicon is still the Astro default; swap for a real mark.
- Custom domain not yet wired up.
- `witch-league` and `health` repos need real READMEs before the links reflect well (see spec §6).
