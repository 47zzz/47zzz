import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '../data/profile';
import { route } from '../lib/url';
export async function GET(context) {
 const research = await getCollection('research', entry => entry.data.lang === 'en');
 return rss({ title: `${profile.name} — Research`, description: profile.intro.en, site: context.site,
  items: research.map(({ data }) => ({ title: data.title, description: data.summary, link: route('en', `research/${data.slug}`) })),
 });
}
