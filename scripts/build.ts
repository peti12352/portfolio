import * as fs from 'fs';
import * as path from 'path';
import { minify } from 'html-minifier';
import { content } from '../src/content';
import { Project, Research, MiscItem } from '../src/types/content';

const OUTPUT_DIR = 'public';
const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'base.html');

function entryHtml(
  title: string,
  org: string,
  when: string,
  body: string,
  link?: string
): string {
  const head = link
    ? `<a href="${link}" rel="noopener">${title}</a>`
    : title;
  return `
    <article class="entry">
      <h3 class="entry-title">${head} <span class="muted">(${org}, ${when})</span></h3>
      <div class="prose">${body}</div>
    </article>`;
}

function projectEntry(p: Project): string {
  let body = p.description;
  if (p.timeline?.length) {
    body += `<ul class="timeline">${p.timeline
      .map((t) => `<li><strong>${t.date}</strong> ${t.description}</li>`)
      .join('')}</ul>`;
  }
  return entryHtml(p.title, p.organization, p.timespan.replace('Present', 'present'), body, p.link);
}

function generateResearch(research: Research[]): string {
  return research
    .map((r) => {
      let body = r.description;
      if (r.highlights?.length) {
        body += `<ul>${r.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`;
      }
      return entryHtml(r.title, r.organization, r.timespan.replace('Present', 'present'), body, r.link);
    })
    .join('\n');
}

function generateMisc(misc: MiscItem[]): string {
  return misc
    .map((m) =>
      entryHtml(
        m.title,
        m.organization || '',
        m.timespan,
        m.description
      )
    )
    .join('\n');
}

async function build() {
  console.log('Building portfolio...');
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  const nowProjects = content.projects.filter((p) =>
    p.title.toLowerCase().includes('inference')
  );
  const workProjects = content.projects.filter((p) => !nowProjects.includes(p));

  const replacements: Record<string, string> = {
    '{{NAME}}': content.personal.name,
    '{{INTRO}}': content.personal.intro,
    '{{BIO}}': content.personal.bio,
    '{{PROJECTS_NOW}}': nowProjects.map(projectEntry).join('\n'),
    '{{PROJECTS_WORK}}': workProjects.map(projectEntry).join('\n'),
    '{{RESEARCH}}': generateResearch(content.research),
    '{{MISC}}': generateMisc(content.misc),
    '{{LINKEDIN}}': content.personal.social.linkedin || '#',
    '{{GITHUB}}': content.personal.social.github || '#',
    '{{EMAIL}}': content.personal.social.email || '',
    '{{GITHUB_USER}}': 'peti12352',
    '{{YEAR}}': new Date().getFullYear().toString(),
  };

  let html = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.split(placeholder).join(value);
  }

  const minifiedHtml = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
  });

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), minifiedHtml);
  fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html);

  const copyDir = (src: string, dest: string) => {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((file) => {
      const s = path.join(src, file);
      const d = path.join(dest, file);
      if (fs.lstatSync(s).isDirectory()) copyDir(s, d);
      else fs.copyFileSync(s, d);
    });
  };

  copyDir('css', `${OUTPUT_DIR}/css`);
  copyDir('js', `${OUTPUT_DIR}/js`);
  copyDir('assets', `${OUTPUT_DIR}/assets`);

  // Replace iframe wrapper on apex domain when deployed to peter.tallosy.hu
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'DEPLOY_APEX.txt'),
    `Serve this public/ directory at https://peter.tallosy.hu/ (no iframe).\n` +
      `Remove the old iframe page that pointed at portfolio-vert-six-70.vercel.app.\n` +
      `Optional: CNAME peter.tallosy.hu to Vercel and set root to public/.\n`
  );

  console.log('Done.');
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
