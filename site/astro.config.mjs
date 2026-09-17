import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// A project site is served below /47zzz/, including local preview.
export default defineConfig({
  site: 'https://47zzz.github.io', base: '/47zzz', trailingSlash: 'always',
  output: 'static', integrations: [mdx(), sitemap()],
});
