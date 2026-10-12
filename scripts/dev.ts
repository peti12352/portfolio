import { spawn } from 'child_process';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const PORT = Number(process.env.PORT ?? 4321);

let timer: ReturnType<typeof setTimeout> | null = null;
let building = false;

function runBuild(): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('bun', ['scripts/build.ts'], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`build failed (${code})`));
    });
  });
}

async function rebuild(label: string) {
  if (building) return;
  building = true;
  try {
    await runBuild();
    console.log(`[dev] rebuilt (${label})`);
  } catch (e) {
    console.error('[dev] build error', e);
  } finally {
    building = false;
  }
}

function scheduleRebuild(label: string) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => rebuild(label), 80);
}

const WATCH_DIRS = ['src', 'templates', 'css'].map((d) => path.join(ROOT, d));

for (const dir of WATCH_DIRS) {
  if (!fs.existsSync(dir)) continue;
  fs.watch(dir, { recursive: true }, (_event, file) => {
    if (file && file.endsWith('.swp')) return;
    scheduleRebuild(file ?? dir);
  });
}

const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`).pathname);
  const rel = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      'Content-Type': mime[ext] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

await rebuild('initial');
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[dev] http://127.0.0.1:${PORT}/ (watching src, templates, css)`);
});
