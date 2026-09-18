# Academic website

This repository hosts Szu-Chi Chen (Jayce)'s bilingual academic website at https://47zzz.github.io/47zzz/. Astro creates static HTML; no UI framework or server is required.

## Content
- `site/src/data/profile.ts`: identity, current lab, contact and introductory copy.
- `site/src/data/publications.ts`: publications and verified resource links.
- `site/src/data/experience.ts`: education, research, teaching, awards and skills.
- `site/src/data/ui.ts`: translated interface text.
- `site/src/content/research/{en,zh-tw}/*.mdx`: research overviews, two genuine CV-derived entries per language.

## Rules
Personal facts must come from the author or their CV. Do not invent publications, dates, affiliations, translations of personal names, collaborators, photos, or metrics. The current primary identity is Research Assistant at NTU Speech Processing Laboratory. Psychology is described as B.S. with expected 2027 completion, not as a current job title. Preserve the distinction between accepted papers and work under review. The speaker-embedding paper is under review at ICASSP 2027, not accepted.

Presentation changes are fine. Do not change factual claims, publish a new review status, add analytics/comments, or change domains without a user request. Do not add a CV page, CV download, or PDF file: the author explicitly requested their removal. CV-derived research and experience text may remain.

## Adding content
Add matching English and Traditional Chinese MDX files with the same frontmatter `slug`. Required fields are defined by the shared Zod schema in `site/src/lib/schema.mjs`. Collection IDs come from `lang/slug`, independently of filenames. MDX body headings start at H2; the layout owns H1. Research routes are generated automatically.

For a new standalone page, add mirrored wrappers under `site/src/pages/` and `site/src/pages/zh-tw/`, translate labels, update navigation, and add its path to `scripts/check-content.mjs`. All internal URLs and assets must use `route()` or `withBase()` from `site/src/lib/url.ts`. Do not hardcode `/about/`: this project is served at `/47zzz/`. Keep personal data outside components. Design colors, fonts, spacing, and radii belong in global CSS tokens. Research illustrations are decorative, not empirical charts.

## Verification and deployment
From `site/`, run `npm run check`, `npm run build`, and `npm run check:built`. The first runs without a build and checks required frontmatter, duplicate IDs, bilingual heading parity, links in content, and required assets. The final check traverses every generated HTML page's local links, anchors, and assets. Inspect home and an inner page at desktop/mobile widths in both themes, including Chinese wrapping. Verify language switching preserves the current route and theme persists.

Pushes to `main` trigger `.github/workflows/deploy.yml`. GitHub Pages must use GitHub Actions as its source. Deploy only built `site/dist`, never source files. The same-name repository README appears on the GitHub profile, so keep it limited to the personal introduction and public links. Put maintenance instructions in MAINTENANCE.md, never in the profile README.

## Open content gaps
None required for launch. No fabricated placeholders are displayed. Photos, new posts, and additional links should only be added when the author supplies them.
