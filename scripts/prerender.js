import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioData } from '../src/data/portfolioData.js';
import {
  getPageMetadata,
  getStaticRoutes,
  getStructuredData,
  siteUrl,
} from '../src/lib/siteMetadata.js';

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = join(projectDirectory, 'dist');
const metadataSource = 'src/data/portfolioData.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function serializeJson(value) {
  return JSON.stringify(value, null, 2)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026');
}

function replaceMetaTag(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagPattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${escapedName}")[^>]*>`, 'i');
  const tag = html.match(tagPattern)?.[0];
  const replacement = `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;

  return tag ? html.replace(tag, replacement) : html.replace('</head>', `  ${replacement}\n</head>`);
}

function replaceCanonical(html, canonicalUrl) {
  const replacement = `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  const pattern = /<link\b(?=[^>]*\brel="canonical")[^>]*>/i;
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace('</head>', `  ${replacement}\n</head>`);
}

function replaceScript(html, id, type, content) {
  const pattern = new RegExp(`<script\\b(?=[^>]*\\bid="${id}")[^>]*>[\\s\\S]*?<\\/script>`, 'i');
  const replacement = `<script id="${id}" type="${type}">\n${content}\n  </script>`;
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace('</head>', `  ${replacement}\n</head>`);
}

function applyMetadata(html, metadata, routeLastModified) {
  let result = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  const metaTags = [
    ['name', 'description', metadata.description],
    ['name', 'robots', metadata.knownRoute ? 'index, follow' : 'noindex, follow'],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:url', metadata.canonicalUrl],
    ['property', 'og:image', metadata.image],
    ['property', 'og:image:alt', metadata.imageAlt],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
    ['name', 'twitter:image', metadata.image],
    ['name', 'twitter:image:alt', metadata.imageAlt],
  ];

  for (const [attribute, name, content] of metaTags) {
    result = replaceMetaTag(result, attribute, name, content);
  }

  result = replaceCanonical(result, metadata.canonicalUrl);
  return replaceScript(
    result,
    'structured-data',
    'application/ld+json',
    serializeJson(getStructuredData(metadata, portfolioData, { dateModified: routeLastModified })),
  );
}

function getLastModified() {
  try {
    const result = execFileSync('git', ['log', '-1', '--format=%cs', '--', metadataSource], {
      cwd: projectDirectory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(result) ? result : null;
  } catch {
    return null;
  }
}

function createSitemap(routes, lastModified) {
  const urls = routes.map((route) => {
    const location = new URL(route, siteUrl).toString();
    const lastmod = lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : '';
    return `  <url>\n    <loc>${location}</loc>${lastmod}\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function outputPathForRoute(route) {
  if (route === '/') return join(distDirectory, 'index.html');
  return join(distDirectory, `${route.slice(1)}.html`);
}

async function prerender() {
  const template = await readFile(join(distDirectory, 'index.html'), 'utf8');
  const routes = getStaticRoutes(portfolioData);
  const lastModified = getLastModified();
  const routeLastModified = lastModified
    ? Object.fromEntries(routes.map((route) => [route, lastModified]))
    : {};
  const htmlWithRouteDates = replaceScript(
    template,
    'route-last-modified',
    'application/json',
    serializeJson(routeLastModified),
  );

  await Promise.all(routes.map(async (route) => {
    const metadata = getPageMetadata(route, portfolioData);
    const destination = outputPathForRoute(route);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, applyMetadata(htmlWithRouteDates, metadata, routeLastModified[route]), 'utf8');
  }));

  await writeFile(join(distDirectory, 'sitemap.xml'), createSitemap(routes, lastModified), 'utf8');
}

prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
