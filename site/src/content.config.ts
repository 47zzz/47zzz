import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { researchSchema } from './lib/schema.mjs';
export const collections = {
 research: defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/research',
   generateId: ({ data }) => `${data.lang}/${data.slug}` }),
  schema: researchSchema,
 }),
};
