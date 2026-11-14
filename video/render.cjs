// Renders the site videos frame by frame: scene.html + Playwright + ffmpeg.
// Usage:
//   node render.cjs tour                 -> ../public/videos/desquerteur-tour.mp4 (1920x1080)
//   node render.cjs short <slug>         -> ../public/videos/<slug>-short.mp4   (1080x1920)
//   node render.cjs all                  -> tour + every featured short
//   add --frames=N to render only the first N frames (quick check)
// Needs captures/ from `node shots.cjs` (site running on a local preview server).
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const ffmpeg = require('ffmpeg-static');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = path.join(__dirname, '..', 'public', 'videos');
const FPS = 30;
const SHORTS = ['coscaros', 'servesync', 'warden-plus', 'packmerger', 'pwnagotchi-server', 'multitool'];
const TOUR = ['coscaros', 'servesync', 'warden-plus', 'packmerger', 'pwnagotchi-server', 'multitool'];
const statusColor = { active: '#2ee6d6', released: '#22c55e', 'in-progress': '#f59e0b', experiment: '#d946ef', archived: '#6f6893' };

const fileUrl = (p) => pathToFileURL(p).href;
const cap = (name) => fileUrl(path.join(__dirname, 'captures', `${name}.png`));

async function load() {
  const mod = await import(pathToFileURL(path.join(__dirname, '..', 'src', 'data', 'projects.ts')).href);
  return mod;
}

async function render(browser, scene, outFile, maxFrames) {
  const frames = Math.min(Math.round(scene.duration * FPS), maxFrames || Infinity);
  const page = await browser.newPage({ viewport: { width: scene.width, height: scene.height } });
  const capNames = scene.caps;
  await page.addInitScript(`window.SCENE = ${JSON.stringify(scene)}; window.SCENE.cap = (n) => (${JSON.stringify(Object.fromEntries(capNames.map((c) => [c, cap(c)])))})[n];`);
  await page.goto(fileUrl(path.join(__dirname, 'scene.html')));
  await page.evaluate(() => window.ready);
  const stills = (process.argv.find((a) => a.startsWith('--stills=')) || '').split('=')[1];
  if (stills) {
    const dir = process.env.STILLS_DIR || path.join(__dirname, 'stills');
    fs.mkdirSync(dir, { recursive: true });
    for (const s of stills.split(',')) {
      await page.evaluate((t) => window.seek(t), Number(s));
      await page.screenshot({ path: path.join(dir, path.basename(outFile, '.mp4') + '-' + s + '.png') });
    }
    await page.close();
    return console.log('stills', dir);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const ff = spawn(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.seek(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f === Math.round(frames * 0.12)) await page.screenshot({ path: outFile.replace(/\.mp4$/, '-poster.jpg'), type: 'jpeg', quality: 88 });
  }
  ff.stdin.end();
  await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error('ffmpeg exit ' + c)))));
  await page.close();
  console.log(`${path.basename(outFile)}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

function slim(p, statusLabel) {
  return { slug: p.slug, name: p.name, mark: p.mark, color: p.color, tagline: p.tagline, features: p.features,
    statusLabel: statusLabel[p.status], statusColor: statusColor[p.status] };
}

(async () => {
  const [what, slug] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const maxFrames = Number((process.argv.find((a) => a.startsWith('--frames=')) || '').split('=')[1]) || 0;
  const { projects, statusLabel } = await load();
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const logo = fileUrl(path.join(__dirname, 'logo.svg'));
  const jobs = [];
  if (what === 'tour' || what === 'all') {
    const per = 3.4;
    jobs.push([{ mode: 'tour', width: 1920, height: 1080, fps: FPS, perProject: per, duration: 11 + per * TOUR.length + 6 + 5,
      total: projects.length, logo, projects: TOUR.map((s) => slim(bySlug[s], statusLabel)),
      caps: ['home-desktop-full', 'project-file-desktop-full', ...TOUR.map((s) => `${s}-desktop-full`)] }, path.join(OUT, 'desquerteur-tour.mp4')]);
  }
  const shorts = what === 'short' ? slug.split(',') : what === 'all' ? SHORTS : [];
  for (const s of shorts) {
    jobs.push([{ mode: 'short', width: 1080, height: 1920, fps: FPS, duration: 18, logo, project: slim(bySlug[s], statusLabel),
      caps: [`${s}-phone-full`] }, path.join(OUT, `${s}-short.mp4`)]);
  }
  if (!jobs.length) throw new Error('usage: node render.cjs tour | short <slug> | all [--frames=N]');
  for (const [scene, out] of jobs) await render(browser, scene, out, maxFrames);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
