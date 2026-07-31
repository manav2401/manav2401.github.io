import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Zod is imported from 'astro/zod', not from 'astro:content'.
import { z } from 'astro/zod';

/**
 * Anything you drop into src/content/writing/*.md becomes a page at
 * /writing/<filename>. The schema below is enforced at build time, so a typo
 * in frontmatter fails the build with a readable error instead of silently
 * rendering a broken page.
 */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** One line shown under the title on the post itself. Optional. */
    summary: z.string().optional(),
    /** Drafts are excluded from every listing and never get a page. */
    draft: z.boolean().default(false),
  }),
});

/**
 * Standalone pages (About, Projects). Same idea — the body is markdown, so
 * you never edit a template to change words.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** true = keep the file, don't publish a page for it. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, pages };
