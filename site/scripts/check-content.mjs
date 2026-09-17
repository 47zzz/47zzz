import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';
import { researchSchema } from '../src/lib/schema.mjs';
const failures = [];
async function walk(path) { return (await Promise.all((await readdir(path, { withFileTypes: true })).map(e => e.isDirectory() ? walk(join(path, e.name)) : join(path, e.name)))).flat(); }
const files = (await walk('src/content')).filter(f => /\.mdx?$/.test(f));
const ids = new Set(); const entries = [];
for (const file of files) {
 const text = await readFile(file, 'utf8');
 const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
 if (!match) { failures.push(`${file}: missing frontmatter`); continue; }
 try {
  const data = researchSchema.parse(parse(match[1]));
  const id = `${data.lang}/${data.slug}`;
  if (ids.has(id)) failures.push(`Duplicate collection id: ${id}`);
  ids.add(id); entries.push({file, id, data, body: match[2]});
 } catch(e) { failures.push(`${file}: ${e.message}`); }
}
const paths = new Set(['', 'about', 'publications', 'experience', '404', 'rss.xml', ...entries.filter(e=>e.data.lang==='en').map(e=>`research/${e.data.slug}`)].flatMap(p=>[p, `zh-tw/${p}`]));
for (const e of entries) {
 const other = entries.find(o=>o.data.slug===e.data.slug && o.data.lang!==e.data.lang);
 if (!other) failures.push(`${e.file}: missing language pair`);
 else {
  const count = body => (body.match(/^#{1,6} /gm) || []).length;
  if (count(e.body)!==count(other.body)) failures.push(`${e.id}: heading-count drift`);
 }
 if (/^# /m.test(e.body)) failures.push(`${e.file}: layout owns H1; use H2`);
 for (const [,href] of e.body.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
  if (/^(https?:|mailto:|#)/.test(href)) continue;
  const clean = href.replace(/^\/47zzz\/?/, '').replace(/^\//,'').replace(/[#?].*$/, '').replace(/\/$/, '');
  if (!paths.has(clean)) {
   try { await access(join('public',clean)); } catch { failures.push(`${e.file}: missing internal target ${href}`); }
  }
 }
}
for (const path of ['favicon.svg']) {
 try { await access(join('public',path)); } catch { failures.push(`Missing asset: ${path}`); }
}
// Reject root-relative component attributes that bypass project-base handling.
for (const file of (await walk('src')).filter(f=>/\.(astro|mdx)$/.test(f))) {
 const source=await readFile(file,'utf8');
 if (/(?:href|src)=["']\/(?!\/)/.test(source)) failures.push(`${file}: use withBase() or route() for internal links`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Content valid: ${entries.length} research entries, paired languages, unique IDs, headings, and local targets.`);
