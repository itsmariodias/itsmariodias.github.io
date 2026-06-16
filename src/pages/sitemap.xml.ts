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

  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const entries: { path: string; lastmod?: string }[] = [
    { path: '/' },
    { path: '/blog/' },
    { path: '/projects/' },
    { path: '/about/' },
    { path: '/tags/' },
    { path: '/years/' },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}/`,
      lastmod: iso(p.data.updatedDate ?? p.data.pubDate),
    })),
    ...[...tags].map((t) => ({ path: `/tags/${t}/` })),
    ...[...years].map((y) => ({ path: `/years/${y}/` })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${site}${e.path}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
