import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://itsmariodias.github.io')).origin;
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const tags = new Set<string>();
  const years = new Set<number>();
  for (const p of posts) {
    p.data.tags.forEach((t) => tags.add(t));
    years.add(p.data.pubDate.getFullYear());
  }

  const paths = [
    '/',
    '/blog/',
    '/projects/',
    '/about/',
    '/tags/',
    '/years/',
    ...posts.map((p) => `/blog/${p.slug}/`),
    ...[...tags].map((t) => `/tags/${t}/`),
    ...[...years].map((y) => `/years/${y}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
