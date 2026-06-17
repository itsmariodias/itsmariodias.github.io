import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import remarkPullquote from './src/plugins/remark-pullquote.mjs';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';
import rehypeImageBg from './src/plugins/rehype-image-bg.mjs';

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
      wrap: false,
      // Astro adds tabindex="0" to <pre> for keyboard scroll; the a11y audit
      // flags it on a non-interactive element, so strip it.
      transformers: [
        {
          pre(node) {
            delete node.properties.tabindex;
          },
        },
      ],
    },
    remarkPlugins: [remarkDirective, remarkPullquote, remarkMermaid, remarkMath],
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
      rehypeKatex,
      rehypeImageBg,
    ],
  },
});
