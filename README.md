## [manav2401.github.io](https://manav2401.github.io/)

A minimal personal website built using Astro. To run locally,

```bash
bun install
bun run dev      # http://localhost:4321
```

Other commands: `bun run build` (output to `dist/`), `bun run preview` (serve
the production build), `bun run check` (typecheck the templates).

### How to make changes

Everything in this website relies on simple markdown files. All the content lies at `src/content` in their respective sections. For e.g. the home page content is at `src/content/pages/home.md` and contains links to other pages like 
writing or bookmarks.

**To create a new article/post:** Create a markdown file in `src/content/writing/`. The filename becomes the URL, and it appears in the writing index, the RSS feed, the sitemap and llms.txt automatically. Drop the image in the same folder for easy referene.

**Updating footer links**: The footer contains links to social profiles. Update them if needed at `src/config.ts`.

For a downloadable file (a PDF, a slide deck), put it in `public/` instead and
link to `/whatever.pdf` - files in `public/` are copied through untouched.

## Provenance

The design was built from scratch for this repo using Claude code without any template
but the design motivation, layout and typography was inspired by [leerob.com](https://leerob.com).
