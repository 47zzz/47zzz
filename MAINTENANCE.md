# Website maintenance

English and Traditional Chinese academic website built with Astro and MDX. Requires Node.js 22.12+ and npm 9.6.5+.

Four commands, run from the repository root:

```sh
npm --prefix site ci
npm --prefix site run dev
npm --prefix site run check && npm --prefix site run build && npm --prefix site run check:built
git push origin main
```

Open the local URL printed by Astro with the `/47zzz/` base path. The fourth command deploys committed changes through GitHub Actions; select **Settings → Pages → Source → GitHub Actions** once if Pages has not been enabled yet.

The site lives in `site/`. Edit personal information in `site/src/data/`, research overviews in `site/src/content/research/`, and design tokens in `site/src/styles/global.css`. See [AGENT.md](AGENT.md) for contributor instructions and validation details.

Routes: `/`, `/about/`, `/publications/`, `/experience/`, and `/research/{slug}/`; mirrored under `/zh-tw/`. All are served below `/47zzz/`. Includes dark mode, RSS, sitemap and a custom 404 page.

Content comes from the supplied CV and author corrections. There are no unfinished personal-content placeholders. Research overviews use two real projects rather than invented examples. The CV PDF and dedicated CV pages are intentionally excluded at the author’s request.
