/** Public site URL (no trailing slash). Used for canonical / Open Graph only. */
export const SITE_ORIGIN = 'https://peter.tallosy.hu';

/** Root-relative path for in-site links, e.g. `/now/` or `/unsorted/gpu-waterz.html`. */
export function sitePath(pathFromRoot: string): string {
  return pathFromRoot.startsWith('/') ? pathFromRoot : `/${pathFromRoot}`;
}

export function canonicalUrl(pathFromRoot: string): string {
  return `${SITE_ORIGIN}${sitePath(pathFromRoot)}`;
}
