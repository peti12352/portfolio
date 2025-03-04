import { content } from '../src/content';
import { SiteContent, Skill } from '../src/types/content';
import * as fs from 'fs';
import * as path from 'path';
import { minify } from 'html-minifier';

// Read the HTML template
const template = fs.readFileSync(path.join(__dirname, '../templates/index.html'), 'utf-8');

// Function to replace template variables with content
function generateHtml(template: string, content: SiteContent): string {
  let html = template;

  // Replace personal information
  html = html.replace(/{{ personal.name }}/g, content.personal.name);
  html = html.replace(/{{ personal.intro }}/g, content.personal.intro);
  html = html.replace(/{{ personal.location }}/g, content.personal.location);

  // Generate projects HTML
  const projectsHtml = content.projects.map(project => `
    <div class="entry">
      <div class="timespan">${project.timespan}</div>
      <div class="ico">
        <a href="${project.link || '#'}" class="icon-link">
          <img src="${project.icon}" alt="${project.organization}"
               width="36" height="36" loading="lazy" decoding="async">
        </a>
      </div>
      <div class="desc">
        <strong>${project.title}</strong>${project.organization ? ` at <a href="${project.link || '#'}" class="subtle-link">${project.organization}</a>` : ''}<br>
        ${project.description ? `${project.description}<br>` : ''}
        ${project.technologies ? `<em>Technologies:</em> ${project.technologies}` : ''}
        ${project.timeline ? `
          <div class="desc-timeline">
            ${project.timeline.map(item => `
              <div class="timeline-item">
                <span class="date">${item.date}:</span>
                ${item.description}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  html = html.replace('<!-- PROJECTS -->', projectsHtml);

  // Generate education HTML
  const educationHtml = content.education.map(edu => `
    <div class="entry">
      <div class="timespan">${edu.timespan}</div>
      <div class="ico">
        <a href="#" class="icon-link">
          <img src="${edu.icon}" alt="${edu.institution}"
               width="36" height="36" loading="lazy" decoding="async">
        </a>
      </div>
      <div class="desc">
        <strong>${edu.degree}</strong><br>
        ${edu.institution}<br>
        ${edu.description ? `${edu.description}<br>` : ''}
        ${edu.projects ? `<em>Projects:</em> ${edu.projects}` : ''}
      </div>
    </div>
  `).join('');

  html = html.replace('<!-- EDUCATION -->', educationHtml);

  // Generate skills HTML
  const skillsHtml = Object.entries(content.skills).map(([key, skill]: [string, Skill]) => `
    <div class="skill-category">
      <div class="skill-header">${skill.title}</div>
      <div class="skill-content">
        ${skill.items ? 
          skill.items.map(item => `
            <div class="language-item">${item.language} <span class="lang-level">(${item.level})</span></div>
          `).join('') : 
          skill.content
        }
      </div>
    </div>
  `).join('');

  html = html.replace('<!-- SKILLS -->', skillsHtml);

  // Generate about section
  html = html.replace('{{ about.intro }}', content.about.intro);
  html = html.replace('{{ about.personal }}', content.about.personal);

  const interestsHtml = content.about.research_interests.map(interest => `
    <li>
      ${typeof interest === 'string' ? 
        interest : 
        `<a href="${interest.link}" target="_blank" class="interest-link">${interest.title}</a>`
      }
    </li>
  `).join('');

  html = html.replace('<!-- INTERESTS -->', interestsHtml);

  // Add build timestamp
  const timestamp = new Date().toISOString();
  html = html.replace('<!-- BUILD_TIMESTAMP -->', `<!-- Built: ${timestamp} -->`);

  return html;
}

// Generate and minify HTML
const generatedHtml = generateHtml(template, content);
const minifiedHtml = minify(generatedHtml, {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true
});

// Write the output
fs.writeFileSync(path.join(__dirname, '../index.html'), minifiedHtml);
console.log('✓ Successfully generated index.html'); 