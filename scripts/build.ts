import * as fs from 'fs';
import * as path from 'path';
import { minify } from 'html-minifier';
import { content } from '../src/content';
import { paragraphs } from '../src/format';
import { canonicalUrl } from '../src/origin';
import {
  navSections,
  renderEntryArticle,
  renderNav,
  renderSectionIndex,
} from '../src/site';

const OUTPUT_DIR = 'public';
const ROOT = path.join(__dirname, '..');

function fill(template: string, vars: Record<string, string>): string {
  let html = template;
  for (const [key, value] of Object.entries(vars)) {
    html = html.split(`{{${key}}}`).join(value);
  }
  return html;
}

function writeHtml(filePath: string, html: string, minifyOut = true) {
  const out = minifyOut
    ? minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      })
    : html;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, out);
}

function shellVars() {
  const photo = content.photo.startsWith('/')
    ? content.photo
    : `/${content.photo}`;
  return {
    NAME: content.name,
    INTRO: content.intro,
    PHOTO: photo,
    LINKEDIN: content.social.linkedin,
    GITHUB: content.social.github,
    EMAIL: content.social.email,
    GITHUB_USER: content.githubUser,
    YEAR: new Date().getFullYear().toString(),
    HOME: '/',
  };
}

async function build() {
  console.log('Building portfolio...');
  const sections = navSections();
  const homeTpl = fs.readFileSync(
    path.join(ROOT, 'templates', 'home.html'),
    'utf-8'
  );
  const entryTpl = fs.readFileSync(
    path.join(ROOT, 'templates', 'entry.html'),
    'utf-8'
  );
  const sectionTpl = fs.readFileSync(
    path.join(ROOT, 'templates', 'section.html'),
    'utf-8'
  );

  const homeHtml = fill(homeTpl, {
    ...shellVars(),
    BIO: paragraphs(content.bio),
    NAV: renderNav(sections, {}),
  });

  writeHtml(path.join(OUTPUT_DIR, 'index.html'), homeHtml);
  fs.writeFileSync(path.join(ROOT, 'index.html'), homeHtml);

  for (const sec of sections) {
    const sectionHtml = fill(sectionTpl, {
      ...shellVars(),
      NAV: renderNav(sections, { activeSection: sec.slug }),
      SECTION: renderSectionIndex(sec),
      PAGE_TITLE: `${sec.label}, ${content.name}`,
      PAGE_DESC: `${sec.label}, ${content.name}`,
      CANONICAL: canonicalUrl(`/${sec.slug}/`),
    });
    writeHtml(
      path.join(OUTPUT_DIR, sec.slug, 'index.html'),
      sectionHtml
    );

    for (const { entry, href } of sec.items) {
      const rel = href.slice(1);
      const pageTitle = `${entry.title}, ${content.name}`;
      const pageDesc =
        entry.meta.trim() ||
        entry.body.replace(/<[^>]+>/g, '').slice(0, 160).trim();

      const entryHtml = fill(entryTpl, {
        ...shellVars(),
        NAV: renderNav(sections, { activeSection: sec.slug }),
        ENTRY: renderEntryArticle(entry),
        PAGE_TITLE: pageTitle,
        PAGE_DESC: pageDesc,
        CANONICAL: canonicalUrl(href),
      });

      writeHtml(path.join(OUTPUT_DIR, rel), entryHtml);
    }
  }

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

  copyDir(path.join(ROOT, 'css'), path.join(OUTPUT_DIR, 'css'));
  copyDir(path.join(ROOT, 'js'), path.join(OUTPUT_DIR, 'js'));
  fs.rmSync(path.join(OUTPUT_DIR, 'assets'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUTPUT_DIR, 'assets'), { recursive: true });
  fs.copyFileSync(
    path.join(ROOT, content.photo),
    path.join(OUTPUT_DIR, content.photo)
  );

  fs.copyFileSync(
    path.join(ROOT, 'hosting', 'iis-web.config'),
    path.join(OUTPUT_DIR, 'web.config')
  );

  console.log('Done.');
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
