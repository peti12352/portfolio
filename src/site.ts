import { content } from './content';
import { paragraphs } from './format';
import { Entry, SiteContent } from './types/content';

export function entrySlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface RoutedEntry {
  entry: Entry;
  /** site path from root, e.g. /now/mesh-applied.html */
  href: string;
}

export interface NavSection {
  slug: string;
  label: string;
  items: RoutedEntry[];
}

function route(sectionSlug: string, entry: Entry): RoutedEntry {
  return {
    entry,
    href: `/${sectionSlug}/${entrySlug(entry.title)}.html`,
  };
}

export function navSections(c: SiteContent = content): NavSection[] {
  return [
    {
      slug: 'now',
      label: 'Now',
      items: c.now.map((e) => route('now', e)),
    },
    {
      slug: 'projects',
      label: 'Projects',
      items: c.work.map((e) => route('projects', e)),
    },
    {
      slug: 'research',
      label: 'Research',
      items: c.research.map((e) => route('research', e)),
    },
    {
      slug: 'unsorted',
      label: 'Unsorted',
      items: [...c.writing, ...c.talks, ...c.code].map((e) =>
        route('unsorted', e)
      ),
    },
  ];
}

/** Masthead: four section links only. */
export function renderNav(
  sections: NavSection[],
  opts: { prefix: string; activeSection?: string }
): string {
  const { prefix, activeSection } = opts;
  const items = sections
    .map((sec) => {
      const path = `${prefix}${sec.slug}/index.html`;
      const active =
        activeSection === sec.slug ? ' aria-current="page"' : '';
      return `<li><a href="${path}"${active}>${sec.label}</a></li>`;
    })
    .join('\n');

  return `<nav class="site-nav" aria-label="Sections"><ul class="site-nav-list">${items}</ul></nav>`;
}

/** Section landing: clickable titles only. */
export function renderSectionIndex(sec: NavSection): string {
  const items = sec.items
    .map(({ entry, href }) => {
      const file = href.split('/').pop()!;
      const meta = entry.meta.trim()
        ? `<span class="muted"> (${entry.meta})</span>`
        : '';
      return `<li><a href="${file}">${entry.title}</a>${meta}</li>`;
    })
    .join('\n');

  return `<main class="section-index">
      <h2 class="section-heading">${sec.label}</h2>
      <ul class="section-list">
${items}
      </ul>
    </main>`;
}

/** Same article markup as the old single-page site. */
export function renderEntryArticle(e: Entry): string {
  const head = e.link
    ? `<a href="${e.link}" rel="noopener">${e.title}</a>`
    : e.title;
  const meta = e.meta.trim()
    ? ` <span class="muted">(${e.meta})</span>`
    : '';
  return `<article class="entry">
      <h3 class="entry-title">${head}${meta}</h3>
      <div class="prose">${paragraphs(e.body)}</div>
    </article>`;
}
