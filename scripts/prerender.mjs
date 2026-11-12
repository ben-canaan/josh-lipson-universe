// Writes a static HTML file per route (with its own title, description and
// social-preview tags), plus 404.html and sitemap.xml, after `vite build`.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { render, routeMeta, notFoundMeta, SITE_URL } = await import(
  pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href
);

const template = readFileSync(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const page = (path, meta, { index = true } = {}) => {
  const url = SITE_URL + (path === "/" ? "/" : path);
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    index ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    index ? `<meta property="og:url" content="${url}" />` : "",
  ].filter(Boolean).join("\n    ");
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  if (html === template || !html.includes(head)) throw new Error(`prerender failed for ${path}`);
  return html;
};

for (const [path, meta] of Object.entries(routeMeta)) {
  // "/speaking" is written as speaking.html so Netlify serves it at /speaking
  // itself, rather than redirecting to /speaking/ (which a folder would do).
  const file = path === "/" ? join(dist, "index.html") : join(dist, `${path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(path, meta));
}
writeFileSync(join(dist, "404.html"), page("/404", notFoundMeta, { index: false }));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    Object.keys(routeMeta)
      .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
      .join("\n") +
    `\n</urlset>\n`
);

rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`Pre-rendered ${Object.keys(routeMeta).length} pages, 404.html and sitemap.xml`);
