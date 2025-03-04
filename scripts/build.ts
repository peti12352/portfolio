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

// Define source and destination paths
const paths = {
  template: path.join(__dirname, '..', 'templates', 'index.html'),
  css: path.join(__dirname, '..', 'css', 'style.css'),
  js: path.join(__dirname, '..', 'js', 'script.js'),
  assets: path.join(__dirname, '..', 'assets'),
  dist: path.join(__dirname, '..', 'dist')
};

// Copy static files with error handling
const copyFile = (src: string, dest: string) => {
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
};

// Copy main files
copyFile(paths.template, path.join(paths.dist, 'index.html'));
copyFile(paths.css, path.join(paths.dist, 'css', 'style.css'));
copyFile(paths.js, path.join(paths.dist, 'js', 'script.js'));

// Copy assets if they exist
if (fs.existsSync(paths.assets)) {
  fs.readdirSync(paths.assets).forEach(file => {
    const src = path.join(paths.assets, file);
    const dest = path.join(paths.dist, 'assets', file);
    copyFile(src, dest);
  });
}

// Read and process template
let template = fs.readFileSync(paths.template, 'utf8');

// Replace content placeholders
Object.entries(content).forEach(([key, value]) => {
  const placeholder = new RegExp(`{{${key}}}`, 'g');
  template = template.replace(placeholder, JSON.stringify(value));
});

// Write final HTML
fs.writeFileSync(path.join(paths.dist, 'index.html'), template);
console.log('Build completed successfully!');