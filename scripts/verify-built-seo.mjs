import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const appOutput = path.join(root, ".next", "server", "app");
const sitemapPath = path.join(appOutput, "sitemap.xml.body");
const siteOrigin = "https://tokprofile.com";
const forbiddenUnicode = /[�脳Ã]/u;

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function matchAll(html, expression) {
  return [...html.matchAll(expression)].map((match) => decodeHtml(match[1].trim()));
}

function htmlPathForUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/") return path.join(appOutput, "index.html");
  return path.join(appOutput, `${pathname.slice(1)}.html`);
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const sitemap = await fs.readFile(sitemapPath, "utf8");
const urls = matchAll(sitemap, /<loc>(.*?)<\/loc>/g);
const failures = [];
const titles = new Map();
const descriptions = new Map();

assert(urls.length > 0, "Sitemap contains no URLs.", failures);
assert(new Set(urls).size === urls.length, "Sitemap contains duplicate URLs.", failures);

for (const url of urls) {
  assert(
    url.startsWith(siteOrigin),
    `${url}: URL is outside the production origin.`,
    failures,
  );

  const filePath = htmlPathForUrl(url);
  let html;
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch {
    failures.push(`${url}: no generated HTML at ${path.relative(root, filePath)}.`);
    continue;
  }

  const pageLabel = new URL(url).pathname || "/";
  const pageTitles = matchAll(html, /<title>(.*?)<\/title>/gis);
  const pageDescriptions = matchAll(
    html,
    /<meta\s+name="description"\s+content="(.*?)"\s*\/?>/gis,
  );
  const canonicals = matchAll(html, /<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/gis);
  const h1s = [...html.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/gi)];
  const robots = matchAll(html, /<meta\s+name="robots"\s+content="(.*?)"\s*\/?>/gis);
  const jsonLdBlocks = matchAll(
    html,
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gis,
  );

  assert(pageTitles.length === 1, `${pageLabel}: expected exactly one title.`, failures);
  assert(
    pageDescriptions.length === 1,
    `${pageLabel}: expected exactly one meta description.`,
    failures,
  );
  assert(h1s.length === 1, `${pageLabel}: expected exactly one H1.`, failures);
  assert(
    canonicals.length === 1 && canonicals[0] === url,
    `${pageLabel}: canonical must equal ${url}.`,
    failures,
  );
  assert(
    !robots.some((value) => value.toLowerCase().includes("noindex")),
    `${pageLabel}: sitemap page unexpectedly contains noindex.`,
    failures,
  );
  assert(jsonLdBlocks.length > 0, `${pageLabel}: JSON-LD is missing.`, failures);
  assert(
    !forbiddenUnicode.test(html),
    `${pageLabel}: forbidden Unicode detected.`,
    failures,
  );

  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      failures.push(`${pageLabel}: invalid JSON-LD (${error.message}).`);
    }
  }

  if (pageTitles[0]) {
    const owner = titles.get(pageTitles[0]);
    if (owner) failures.push(`${pageLabel}: title duplicates ${owner}.`);
    titles.set(pageTitles[0], pageLabel);
  }

  if (pageDescriptions[0]) {
    const owner = descriptions.get(pageDescriptions[0]);
    if (owner) failures.push(`${pageLabel}: description duplicates ${owner}.`);
    descriptions.set(pageDescriptions[0], pageLabel);
  }
}

if (failures.length) {
  console.error(`Built SEO verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.warn(`Built SEO verification passed for ${urls.length} sitemap URLs.`);
