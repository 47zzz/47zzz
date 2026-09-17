export type Lang = 'en' | 'zh-tw';
// Route and asset URLs share this helper so project-site deployment stays safe.
export function withBase(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function route(lang: Lang, page = ''): string {
  return withBase(`${lang === 'en' ? '' : 'zh-tw/'}${page ? page.replace(/\/$/, '') + '/' : ''}`);
}
