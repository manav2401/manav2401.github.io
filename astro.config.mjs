// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Your final public URL. Update this when you pick a domain — it's used for
  // canonical URLs and any absolute links.
  site: 'https://manav2401.github.io',

  // Base path. Keep '/' for a custom domain or a <username>.github.io user site.
  //
  // If you instead deploy to a PROJECT repo (github.com/<you>/personal-website),
  // the site is served from a subfolder and you need to change this to:
  //   base: '/personal-website',
  //
  // Every internal link goes through the url() helper in src/config.ts, so
  // changing this one line is enough — nothing else needs editing.
  base: '/',

  build: {
    // Emit /writing/my-post/index.html rather than /writing/my-post.html,
    // so URLs have no file extension on any host.
    format: 'directory',
  },

  // Paired with build.format: 'directory' — the combination Astro recommends,
  // so links and generated files agree on trailing slashes.
  trailingSlash: 'always',

  markdown: {
    // GitHub-flavoured markdown: tables, strikethrough, footnotes, autolinks.
    // On by default, set explicitly so an upgrade can't silently change it.
    gfm: true,
    shikiConfig: {
      // Light theme only — the site has no dark mode.
      theme: 'github-light',
      wrap: true,
    },
  },
});
