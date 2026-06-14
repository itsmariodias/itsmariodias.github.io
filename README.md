# itsmariodias.github.io

Personal site for Mario Dias: resume + blog. Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages via GitHub Actions.

## Routes

- `/` Home: landing card with a short intro, latest blog posts, and a featured project.
- `/blog`, `/blog/<slug>`: markdown-authored blog.
- `/tags`, `/tags/<tag>`: browse posts by tag.
- `/years`, `/years/<year>`: browse posts by year.
- `/projects`: curated list of projects followed by research publications.
- `/about`: long-form resume (experience, skills, education, awards, certifications, contact) plus a download link to the PDF.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve the production build locally
```

## Authoring blog posts

Each post lives in its own folder under `src/content/blog/`, with an `index.md` file and any images alongside it:

```
src/content/blog/
  my-post-slug/
    index.md
    cover.jpg
    diagram.png
```

Frontmatter:

```yaml
---
title: "Post title"
description: "Optional short description"
pubDate: 2026-06-13
tags: ["deep-learning", "notes"]
draft: false
cover: ./cover.jpg                       # optional, relative to index.md; auto-optimised
coverAlt: "Short alt text for the cover" # optional, recommended when cover is set
canonicalUrl: "https://medium.com/..."   # optional, for cross-posted content
---
```

The body is plain markdown. Reference inline images with relative paths, e.g. `![Alt text](./diagram.png)`, and Astro will resize, convert to WebP/AVIF, lazy-load, and content-hash them automatically. Code blocks are syntax-highlighted (Shiki, light/dark via the site theme toggle). Set `draft: true` to keep a post out of the listing and tag/year pages.

For gifs, prefer converting to MP4/WebM (typically 10x smaller) and embed with `<video autoplay muted loop playsinline><source src="./demo.mp4" type="video/mp4" /></video>` inside the markdown.

Tag and year archives are derived automatically from each post's `tags` and `pubDate` frontmatter.

## Editing content

Data is split by page:

- `src/profile/resume.ts` for everything on `/about` (about, experience, skills, education, awards, certifications, socials) and the identity fields used on `/` (name, tagline, email).
- `src/profile/projects.ts` for `/projects`: exports `projects` and `publications`. The Home page also pulls the featured project from here.

Project entries support: `title`, `description`, `year?`, `tags?`, `links` (with labels `GitHub` / `Demo` / `Article` / `Paper` / `Website`, each auto-iconed), `featured?` (surfaces it on Home), and `cover?` (image path served from `public/`, shown on the left of the card).

Section components live in `src/components/resume/`. The project card lives in `src/components/ProjectCard.astro`.

## Resume PDF

The "Download resume PDF" button on `/about` links to `/resume.pdf`. Drop the latest PDF at `public/resume.pdf` and it gets served as-is. The file at that path is currently a placeholder.

## Open Graph image

Every page references `/og-image.png` in its `<meta property="og:image">` tag (LinkedIn, Twitter, Slack, iMessage all read this when a link is shared). Drop a 1200x630 PNG at `public/og-image.png` and previews will use it. Keep the file under ~300 KB and put the important content well inside the safe area, since some platforms crop the edges.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `withastro/action@v3` and publishes to GitHub Pages. In repo Settings → Pages, the source must be set to **GitHub Actions**.
