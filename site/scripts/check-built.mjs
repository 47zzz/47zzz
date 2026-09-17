import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve('dist'); const origin='https://47zzz.github.io'; const base='/47zzz/';
async function walk(p) { return (await Promise.all((await readdir(p,{withFileTypes:true})).map(e=>e.isDirectory()?walk(join(p,e.name)):join(p,e.name)))).flat(); }
const files=(await walk(root)).filter(f=>f.endsWith('.html')); const errors=[]; let links=0;
for (const file of files) {
 const html=await readFile(file,'utf8'); const sourcePath=base+file.slice(root.length+1).replace(/index.html$/,'');
 if ((html.match(/<h1(?:\s|>)/g)||[]).length!==1) errors.push(`${file}: expected one H1`);
 for (const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
  const url=new URL(value.replaceAll('&amp;','&'),origin+sourcePath);
  if (url.origin!==origin || (/^https?:/.test(value) && !url.pathname.startsWith(base))) continue;
  if (!url.pathname.startsWith(base)) { errors.push(`${file}: link escapes base: ${value}`); continue; }
  let target=join(root,decodeURIComponent(url.pathname.slice(base.length)));
  try { if ((await stat(target)).isDirectory()) target=join(target,'index.html'); await stat(target); }
  catch { errors.push(`${file}: missing ${value}`); continue; }
  if(url.hash && target.endsWith('.html')) {
   const body=await readFile(target,'utf8'); const id=decodeURIComponent(url.hash.slice(1));
   if (!body.includes(`id="${id}"`)) errors.push(`${file}: missing anchor ${value}`);
  }
  links++;
 }
}
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Built output valid: ${files.length} pages and ${links} local links/assets.`);
