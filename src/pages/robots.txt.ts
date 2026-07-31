import type { APIRoute } from 'astro';
import { absolute } from '../lib/feed';

// Everything on this site is meant to be read. Nothing is disallowed.
export const GET: APIRoute = ({ site: siteUrl }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${absolute('/sitemap.xml', siteUrl)}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
