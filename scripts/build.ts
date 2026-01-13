import * as fs from 'fs';
import * as path from 'path';
import { minify } from 'html-minifier';
import { content } from '../src/content';
import { Project, Education, Skill, ResearchInterest } from '../src/types/content';

const OUTPUT_DIR = 'public';
const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'base.html');

function generateProjects(projects: Project[]): string {
  return projects.map(p => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title">${p.title} <span class="entry-org">@ ${p.organization}</span></div>
        <div class="entry-date">${p.timespan.replace('Present', 'to date')}</div>
      </div>
      <div class="entry-desc">
        ${p.description || ''}
        ${p.timeline ? `
          <div class="timeline-list">
            ${p.timeline.map(t => `
              <div class="timeline-item">
                <span class="timeline-date">${t.date.replace('Present', 'to date')}</span>
                ${t.description}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function generateEducation(education: Education[]): string {
  return education.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-title">${e.degree}</div>
        <div class="entry-date">${e.timespan}</div>
      </div>
      <div class="entry-desc">
        ${e.institution}. ${e.description || ''}
      </div>
    </div>
  `).join('');
}

function generateSkills(skills: Record<string, Skill>): string {
  return Object.values(skills).map(s => `
    <div class="skill-cat">
      <h3>${s.title}</h3>
      <div class="skill-list">
        ${s.content ? s.content.replace(/\n/g, '<br>') : ''}
        ${s.items ? s.items.map(i => `${i.language} (${i.level})`).join(', ') : ''}
      </div>
    </div>
  `).join('');
}

async function build() {
  console.log('Building portfolio...');
  try {
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    const replacements: Record<string, string> = {
      '{{NAME}}': content.personal.name,
      '{{INTRO}}': content.personal.intro,
      '{{PROJECTS}}': generateProjects(content.projects),
      '{{EDUCATION}}': generateEducation(content.education),
      '{{SKILLS}}': generateSkills(content.skills),
      '{{ABOUT_PERSONAL}}': content.about.personal,
      '{{RESEARCH_INTERESTS_LIST}}': content.about.research_interests.map(i => typeof i === 'string' ? i : i.title).join(', '),
      '{{LINKEDIN}}': content.personal.social.linkedin || '#',
      '{{GITHUB}}': content.personal.social.github || '#',
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
      fs.readdirSync(src).forEach(file => {
        const s = path.join(src, file);
        const d = path.join(dest, file);
        if (fs.lstatSync(s).isDirectory()) copyDir(s, d);
        else fs.copyFileSync(s, d);
      });
    };

    copyDir('css', `${OUTPUT_DIR}/css`);
    copyDir('js', `${OUTPUT_DIR}/js`);
    copyDir('assets', `${OUTPUT_DIR}/assets`);

    console.log('Done.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

build();