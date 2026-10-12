/** Body text → paragraphs; numbered runs get light indent only (no bullet lists). */

function isTop(s: string): boolean {
  return /^\d+\.\s/.test(s);
}

function isSub(s: string): boolean {
  return /^\([a-z]\)\s/i.test(s);
}

/** Plain paragraph that starts a new thought, not a continuation under "2." */
function isStandalone(s: string): boolean {
  return /^(Additionally|We took|Lilith has|At BadCompany|mesh\.)/i.test(s);
}

export function paragraphs(body: string): string {
  if (!body.trim()) return '';
  const chunks = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  let i = 0;

  while (i < chunks.length) {
    if (!isTop(chunks[i]) && !isSub(chunks[i])) {
      out.push(`<p>${chunks[i]}</p>`);
      i++;
      continue;
    }

    const parts: string[] = [];
    while (i < chunks.length && (isTop(chunks[i]) || isSub(chunks[i]))) {
      if (isTop(chunks[i])) {
        parts.push(`<p class="ol-top">${chunks[i]}</p>`);
        i++;
        while (
          i < chunks.length &&
          !isTop(chunks[i]) &&
          !isSub(chunks[i]) &&
          !isStandalone(chunks[i])
        ) {
          parts.push(`<p class="ol-detail">${chunks[i]}</p>`);
          i++;
        }
      } else {
        parts.push(`<p class="ol-sub">${chunks[i]}</p>`);
        i++;
      }
    }
    out.push(`<div class="ol-group">${parts.join('\n')}</div>`);
  }

  return out.join('\n');
}
