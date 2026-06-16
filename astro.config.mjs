import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkPullquote from './src/plugins/remark-pullquote.mjs';

export default defineConfig({
  site: 'https://itsmariodias.github.io',
  output: 'static',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
    remarkPlugins: [remarkDirective, remarkPullquote],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to this section',
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
    ],
  },
});
