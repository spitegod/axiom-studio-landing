import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const templatePath = path.join(dist, 'index.html');
const serverEntry = path.join(dist, 'server', 'entry-server.js');

const template = fs.readFileSync(templatePath, 'utf8');
const seoStart = '<!--seo-->';
const seoEnd = '<!--/seo-->';
const rootMarker = '<div id="root"></div>';

if (!template.includes(seoStart) || !template.includes(seoEnd)) {
  throw new Error('В dist/index.html нет маркеров <!--seo-->');
}
if (!template.includes(rootMarker)) {
  throw new Error('В dist/index.html нет <div id="root"></div>');
}

const { render, PRERENDER_ROUTES } = await import(pathToFileURL(serverEntry).href);

function applyRoute(html, head) {
  const start = template.indexOf(seoStart);
  const end = template.indexOf(seoEnd);
  const next =
    template.slice(0, start + seoStart.length) +
    '\n' +
    head +
    '\n    ' +
    template.slice(end);
  return next.replace(rootMarker, () => `<div id="root">${html}</div>`);
}

for (const route of PRERENDER_ROUTES) {
  const { html, head } = render(route.path);
  if (!html || html.length < 200) {
    throw new Error(`Пустой HTML для ${route.path}`);
  }
  const page = applyRoute(html, head);
  const directory = route.path === '/' ? dist : path.join(dist, route.path.replace(/^\//, ''));
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, 'index.html');
  fs.writeFileSync(file, page);
  console.log(`prerender ${route.path} → ${path.relative(root, file)} (${html.length} chars)`);
}

const urls = PRERENDER_ROUTES.map(
  (route) => `  <url>\n    <loc>${route.loc}</loc>\n  </url>`,
).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true });
