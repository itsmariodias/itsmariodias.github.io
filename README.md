# itsmariodias.github.io

Personal site for Mario Dias: resume + blog. Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages via GitHub Actions.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve the production build locally
```

## Authoring blog posts

Posts are markdown files under `src/content/blog/`. Each file needs frontmatter:

```yaml
---
title: "Post title"
description: "Optional short description"
pubDate: 2026-06-13
tags: ["deep-learning", "notes"]
draft: false
---
```

The body is plain markdown. Code blocks are syntax-highlighted (Shiki, light/dark via the site theme toggle). Set `draft: true` to keep a post out of the listing and tag pages.

## Editing the resume

The resume is data-driven. Edit `src/data/resume.ts` (about, experience, publications, skills, education, awards, certifications, socials) and the homepage updates automatically. Section components live in `src/components/resume/`.

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds with `withastro/action@v3` and publishes to GitHub Pages. In repo Settings → Pages, the source must be set to **GitHub Actions**.
