import { z } from 'zod';
// Shared with the standalone validator; invalid content also fails Astro builds.
export const researchSchema = z.object({
 slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
 lang: z.enum(['en', 'zh-tw']), title: z.string().min(1),
 summary: z.string().min(1), label: z.string().min(1),
 year: z.number().int().min(2000), order: z.number().int(),
 links: z.array(z.object({ label: z.string().min(1), href: z.url() })),
});
