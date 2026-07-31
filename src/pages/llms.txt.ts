import type { APIRoute } from 'astro';
import { site } from '../config';
import { absolute, publishedPosts } from '../lib/feed';

// llms.txt — a plain-text index for language models and other machine readers.
// Points at the raw markdown of every post, so nothing has to be scraped out
// of HTML. See https://llmstxt.org
export const GET: APIRoute = async ({ site: siteUrl }) => {
  const posts = await publishedPosts();

  const body = `# ${site.name}

> ${site.description}

The raw markdown source of every post is served at the .md URL listed below.
No JavaScript is required to read anything on this site.

## Writing

${posts
  .map((post) => {
    const md = absolute(`/writing/${post.id}`, siteUrl).replace(/\/$/, '') + '.md';
    const summary = post.data.summary ? `: ${post.data.summary}` : '';
    return `- [${post.data.title}](${md})${summary}`;
  })
  .join('\n')}

## Other

- [Feed](${absolute('/rss.xml', siteUrl)})
- [Sitemap](${absolute('/sitemap.xml', siteUrl)})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
