import type { APIRoute } from 'astro';
import { site } from '../config';
import { absolute, publishedPosts, xmlEscape } from '../lib/feed';

// Hand-rolled so the site needs no feed dependency. Builds to /rss.xml.
export const GET: APIRoute = async ({ site: siteUrl }) => {
  const posts = await publishedPosts();

  const items = posts
    .map((post) => {
      const link = absolute(`/writing/${post.id}`, siteUrl);
      return `    <item>
      <title>${xmlEscape(post.data.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      ${post.data.summary ? `<description>${xmlEscape(post.data.summary)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.name)}</title>
    <link>${xmlEscape(absolute('/', siteUrl))}</link>
    <description>${xmlEscape(site.description)}</description>
    <language>en</language>
    <atom:link href="${xmlEscape(absolute('/rss.xml', siteUrl))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
