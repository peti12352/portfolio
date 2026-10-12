import * as fs from 'fs';
import * as path from 'path';
import { minify } from 'html-minifier';
import { content } from '../src/content';
import { paragraphs } from '../src/format';
import { Entry } from '../src/types/content';

const OUTPUT_DIR = 'public';
const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'base.html');

function entries(list: Entry[]): string {
  return list
    .map((e) => {
      const head = e.link ? `<a href="${e.link}" rel="noopener">${e.title}</a>` : e.title;
      const meta = e.meta.trim() ? ` <span class="muted">(${e.meta})</span>` : '';
      return `
    <article class="entry">
      <h3 class="entry-title">${head}${meta}</h3>
      <div class="prose">${paragraphs(e.body)}</div>
    </article>`;
    })
    .join('\n');
}

async function build() {
  console.log('Building portfolio...');
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  const replacements: Record<string, string> = {
    '{{NAME}}': content.name,
    '{{INTRO}}': content.intro,
    '{{PHOTO}}': content.photo,
    '{{BIO}}': paragraphs(content.bio),
    '{{NOW}}': entries(content.now),
    '{{RESEARCH}}': entries(content.research),
    '{{WORK}}': entries(content.work),
    '{{WRITING}}': entries(content.writing),
    '{{TALKS}}': entries(content.talks),
    '{{CODE}}': entries(content.code),
    '{{LINKEDIN}}': content.social.linkedin,
    '{{GITHUB}}': content.social.github,
    '{{EMAIL}}': content.social.email,
    '{{GITHUB_USER}}': content.githubUser,
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
  fs.rmSync(`${OUTPUT_DIR}/assets`, { recursive: true, force: true });
  fs.mkdirSync(`${OUTPUT_DIR}/assets`, { recursive: true });
  fs.copyFileSync(content.photo, path.join(OUTPUT_DIR, content.photo));

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
