// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Opens external links in a new tab, leaving internal ones alone.
 *
 * Written inline rather than adding the `rehype-external-links` package — a
 * rehype plugin is just a function over the HTML tree, and this is a dozen
 * lines against one more dependency to keep current.
 *
 * Internal links deliberately stay in the same tab: forcing your own pages
 * into new tabs breaks the back button and piles up windows.
 */
function rehypeExternalLinksInNewTab() {
  /** @param {any} node */
  const visit = (node) => {
    if (node.tagName === 'a' && node.properties) {
      const href = node.properties.href;
      if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
        node.properties.target = '_blank';
        // noopener stops the opened page reaching back via window.opener.
        node.properties.rel = 'noopener noreferrer';
      }
    }
    for (const child of node.children ?? []) visit(child);
  };
  /** @param {any} tree */
  return (tree) => visit(tree);
}

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
    rehypePlugins: [rehypeExternalLinksInNewTab],
    shikiConfig: {
      // Light theme only — the site has no dark mode.
      theme: 'github-light',
      wrap: true,
    },
  },
});
