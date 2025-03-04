import * as fs from 'fs';
import * as path from 'path';
import { content } from '../src/content';

// Ensure required directories exist
const dirs = ['public', 'public/css', 'public/js', 'public/assets'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Define source and destination paths
const paths = {
  html: path.join(__dirname, '..', 'index.html'),
  css: path.join(__dirname, '..', 'css', 'style.css'),
  js: path.join(__dirname, '..', 'js', 'script.js'),
  assets: path.join(__dirname, '..', 'assets'),
  public: path.join(__dirname, '..', 'public')
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
copyFile(paths.html, path.join(paths.public, 'index.html'));
copyFile(paths.css, path.join(paths.public, 'css', 'style.css'));
copyFile(paths.js, path.join(paths.public, 'js', 'script.js'));

// Copy assets if they exist
if (fs.existsSync(paths.assets)) {
  fs.readdirSync(paths.assets).forEach(file => {
    const src = path.join(paths.assets, file);
    const dest = path.join(paths.public, 'assets', file);
    copyFile(src, dest);
  });
}

console.log('Build completed successfully!');