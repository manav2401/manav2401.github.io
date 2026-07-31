/**
 * Site-wide settings. Everything you'd want to change in the first five
 * minutes lives here rather than being scattered through templates.
 */
export const site = {
  name: 'Manav Darji',
  /** Used for the meta description and social previews, not shown on the page. */
  description: 'Personal site of Manav Darji.',
  email: 'manav.d.2401@gmail.com',
};


/**
 * Footer links. Delete any you don't want — the footer renders whatever is
 * left, so there are no empty slots to clean up.
 */
export const links = [
  { label: 'Email', href: `mailto:${site.email}` },
  { label: 'GitHub', href: 'https://github.com/manav2401' },
  { label: 'X/Twitter', href: 'https://x.com/manav24_' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manav-darji/' },
  { label: 'Telegram', href: 'https://t.me/Manav2401' },
  // Lives at public/Manav_Darji_Resume_2026.pdf.
  { label: 'Resume', href: '/Manav_Darji_Resume_2026.pdf' },
];

/**
 * Build an internal URL that respects the `base` set in astro.config.mjs.
 *
 * Always use this for internal links instead of writing "/writing" by hand.
 * If you later deploy to a GitHub project repo and set base: '/personal-website',
 * every link keeps working with no further edits.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean) return `${base}/`;

  // Pages get a trailing slash (matching build.format: 'directory');
  // files like favicon.svg or rss.xml must not.
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return `${base}/${clean}${isFile ? '' : '/'}`;
}

/** "2 May 2026" — used on post pages. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "2 May" — used in the date column of the writing index. */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}
