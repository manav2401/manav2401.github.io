import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absolute, publishedPosts, xmlEscape } from '../lib/feed';

// Hand-rolled so the site needs no sitemap integration. Builds to /sitemap.xml.
export const GET: APIRoute = async ({ site: siteUrl }) => {
  const posts = await publishedPosts();
  const pages = await getCollection(
    'pages',
    ({ id, data }) => id !== 'home' && !data.draft
  );

  const entries: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/writing' },
    ...pages.map((page) => ({ path: `/${page.id}` })),
    ...posts.map((post) => ({ path: `/writing/${post.id}`, lastmod: post.data.date })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(absolute(entry.path, siteUrl))}</loc>${
      entry.lastmod
        ? `\n    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
