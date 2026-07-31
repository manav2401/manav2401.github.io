import { getCollection } from 'astro:content';
import { url } from '../config';

/** Escape the five characters that are not legal as raw text in XML. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Every published post, newest first. Shared by the feed, sitemap and llms.txt. */
export async function publishedPosts() {
  return (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

/** Turn an internal path into an absolute URL for feeds and sitemaps. */
export function absolute(path: string, siteUrl: URL | undefined): string {
  return new URL(url(path), siteUrl ?? 'https://example.com').href;
}
