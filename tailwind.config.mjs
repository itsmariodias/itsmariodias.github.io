import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#e11d2b',
          soft: '#f0727b',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.900'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-code': theme('colors.zinc.900'),
            '--tw-prose-invert-body': theme('colors.zinc.300'),
            '--tw-prose-invert-headings': theme('colors.zinc.50'),
            '--tw-prose-invert-links': theme('colors.accent.soft'),
            '--tw-prose-invert-bold': theme('colors.zinc.50'),
            '--tw-prose-invert-code': theme('colors.zinc.50'),
            'a:hover': { textDecoration: 'underline' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
