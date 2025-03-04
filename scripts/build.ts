import * as fs from 'fs';
import * as path from 'path';
import { content } from '../src/content';

// Ensure required directories exist
const dirs = ['dist', 'dist/css', 'dist/js', 'dist/assets'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy static files
const staticFiles = [
  { src: 'templates/index.html.j2', dest: 'dist/index.html' },
  { src: 'css/style.css', dest: 'dist/css/style.css' },
  { src: 'js/script.js', dest: 'dist/js/script.js' }
];

// Copy assets
const assetsDir = 'assets';
if (fs.existsSync(assetsDir)) {
  fs.readdirSync(assetsDir).forEach(file => {
    staticFiles.push({
      src: path.join(assetsDir, file),
      dest: path.join('dist/assets', file)
    });
  });
}

// Copy files with error handling
staticFiles.forEach(({ src, dest }) => {
  try {
    if (!fs.existsSync(src)) {
      console.error(`Error: Source file ${src} not found`);
      process.exit(1);
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
    process.exit(1);
  }
});

// Read template
let template = fs.readFileSync('templates/index.html.j2', 'utf8');

// Replace content placeholders
Object.entries(content).forEach(([key, value]) => {
  const placeholder = new RegExp(`{{${key}}}`, 'g');
  template = template.replace(placeholder, JSON.stringify(value));
});

// Write final HTML
fs.writeFileSync('dist/index.html', template);
console.log('Build completed successfully!');