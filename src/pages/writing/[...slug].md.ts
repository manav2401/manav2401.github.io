import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// Serves the raw markdown of each post at /writing/<slug>.md, alongside the
// HTML page at /writing/<slug>/. Anything reading the site — a scraper, a
// language model, curl — can take the source instead of parsing HTML.
export const getStaticPaths = (async () => {
  const posts = await getCollection('writing', ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const post = props.post as CollectionEntry<'writing'>;

  const header = [
    `# ${post.data.title}`,
    '',
    `Date: ${post.data.date.toISOString().slice(0, 10)}`,
    post.data.summary ? `Summary: ${post.data.summary}` : null,
    '',
    '---',
    '',
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  return new Response(header + (post.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
