# Authoring blog posts

A complete guide to writing, formatting, and publishing a post on this site. The
schema that enforces all of this lives in [`src/content/config.ts`](../src/content/config.ts);
if this guide and that file ever disagree, the file wins.

## 1. Quick start

```bash
# 1. Create a folder named after the URL slug you want
mkdir -p src/content/blog/my-new-post

# 2. Add the post (and any images) inside it
#    src/content/blog/my-new-post/index.md

# 3. Preview while you write
npm run dev      # http://localhost:4321/blog/my-new-post
```

The folder name **is** the URL slug: `src/content/blog/my-new-post/` → `/blog/my-new-post`.
Use lowercase words separated by hyphens.

## 2. Folder layout

Each post is its own folder with an `index.md` and every image it uses sitting
right next to it:

```text
src/content/blog/
  my-new-post/
    index.md
    cover.webp
    diagram.png
    demo.mp4
```

Keep images local to the post folder. They are imported through Astro's image
pipeline (resized, converted to WebP/AVIF, lazy-loaded, content-hashed) — you do
**not** put blog images in `public/`. (Only project covers, which are plain
`<img>` tags, live in `public/images/`.)

## 3. Frontmatter

Every post starts with a YAML frontmatter block. Full reference:

- **`title`** — string, **required**. Shown as the H1, the page `<title>`, and the OG image.
- **`description`** — string, optional. One-line deck used for `<meta description>`, OG/Twitter, and the listing row. Write one.
- **`pubDate`** — date, **required**. `YYYY-MM-DD`. Drives sort order and the year archive.
- **`updatedDate`** — date, optional. `YYYY-MM-DD`. Shows an "updated" note when newer than `pubDate`.
- **`tags`** — string array, optional (defaults to `[]`). Lowercase, hyphenated. Each becomes a `/tags/<tag>` archive.
- **`draft`** — boolean, optional (defaults to `false`). `true` hides the post everywhere: listing, tags, years, and RSS.
- **`canonicalUrl`** — URL, optional. For cross-posted content; renders `<link rel="canonical">` so search engines credit the original.
- **`cover`** — image, optional. Relative path to a sibling image (e.g. `./cover.webp`). Optimised by Astro and baked into the post's OG image.
- **`coverAlt`** — string, optional. Alt text for the cover. Set this whenever `cover` is set.

Minimal:

```yaml
---
title: "My new post"
description: "A one-line summary that sells the read."
pubDate: 2026-06-16
tags: ["machine-learning", "notes"]
---
```

Full (cross-posted, with cover):

```yaml
---
title: "Understanding Transformers — For Students"
description: "The Transformer architecture, explained student-friendly."
pubDate: 2023-06-11
updatedDate: 2026-06-16
tags: ["transformers", "nlp", "deep-learning"]
draft: false
canonicalUrl: "https://medium.com/@itsmariodias/understanding-transformers-..."
cover: "./cover.webp"
coverAlt: "A blue transformer resembling Optimus Prime."
---
```

## 4. Writing the body

Standard Markdown. A few specifics for this site:

### Headings

Use `##` and `###` (the `#`/H1 comes from `title`, don't add your own). Every
heading automatically gets an `id` and a hover anchor link, so headings are
linkable as `/blog/my-post#my-heading`.

### Text and links

`**bold**`, `*italic*`, `[link text](https://…)`, lists, and inline `` `code` ``
all work as usual. In-prose links are accent-colored and underlined.

### Images and captions

Reference images with a relative path. An **italic line immediately after an
image becomes its caption** (centered, muted) — no blank line between them:

```markdown
![Alt text describing the image](./diagram.png)
*Figure 1. A caption, optionally with a [source link](https://…).*
```

Write alt text that describes the subject directly, don't start with "Image
of…" / "Photo of…" / "Diagram of…" (screen readers already announce it's an
image, so those words are redundant and the a11y audit flags them).

For a **transparent image** (e.g. a diagram with dark lines and no background)
that would be unreadable in dark mode, give it a `"bg"` title to render it on a
padded white card:

```markdown
![A model architecture diagram](./architecture.png "bg")
```

The `"bg"` marker is consumed (it won't show as a tooltip); styling lives in
`.prose img.img-bg` via `src/plugins/rehype-image-bg.mjs`.

The cover (from frontmatter) is shown automatically at the top of the listing
and in the OG image; if you also want it inline at the top of the article, add
an explicit `![...](./cover.webp)` like the existing post does.

### Code blocks

Fenced blocks are syntax-highlighted with Shiki (light/dark, follows the site
theme) and get a copy button on hover. Always tag the language:

````markdown
```python
def attention(q, k, v):
    return softmax(q @ k.T / d**0.5) @ v
```
````

### Blockquotes (two styles)

1. A plain blockquote — thin left rule, muted. Two conventions on top of it:

   - A **direct quotation** (something you're citing from a source, marked with
     `"…"`) is italicised by wrapping the quoted text in `*…*`. Keep any
     attribution (`— Author`, `Source — …`) outside the italics.
   - A **note or aside in your own words** stays plain (no italics).

   ```markdown
   > A normal aside or pulled-in note.

   > *"A direct quotation from a source."* — Author
   ```

2. A **pull quote** — large, centered display text — via the `:::pullquote`
   directive (powered by `remark-directive` + `src/plugins/remark-pullquote.mjs`):

   ```markdown
   :::pullquote
   Attention is all you need.
   :::
   ```

> Gotcha: because `remark-directive` is enabled, a colon directly followed by a
> word/number in prose (e.g. `80:10:10`, `note:something`) is parsed as an inline
> directive and can break the text. Escape the colons (`80\:10\:10`) or wrap the
> value in inline code (`` `80:10:10` ``).

### Math

LaTeX math is rendered at build with KaTeX (`remark-math` + `rehype-katex`) — no
images. Use `$…$` for inline and `$$…$$` for display equations:

```markdown
Inline: the scaling factor is $\sqrt{d_k}$.

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$
```

Invalid LaTeX fails the build, so a green `npm run build` means every equation parsed.

### Diagrams (Mermaid)

Use a ` ```mermaid ` fenced block to author flowcharts, sequence diagrams, etc.
in [Mermaid](https://mermaid.js.org/) syntax:

````markdown
```mermaid
graph TD
  A[Start] --> B{Works?}
  B -->|yes| C[Ship]
  B -->|no| D[Fix]
```
````

Diagrams render in the browser (Mermaid is lazy-loaded only on posts that
contain one) and re-render on the light/dark toggle so they always match the
theme. The block is hidden until it has rendered, so the raw source never
flashes. An invalid diagram won't break the build (it's client-side) — check the
browser console if one doesn't appear.

### Video / animation

Prefer MP4/WebM over GIF (typically ~10× smaller). Drop the file in the post
folder and embed with raw HTML in the Markdown:

```html
<video autoplay muted loop playsinline>
  <source src="./demo.mp4" type="video/mp4" />
</video>
```

### Cross-posting note

When `canonicalUrl` points at a Medium original, the convention is to also open
the body with a short pointer:

```markdown
> Originally published on [Medium](https://medium.com/@itsmariodias/…).
```

## 5. What happens automatically

You don't need to wire any of these up:

- **Listing** at `/blog` (sorted by `pubDate` desc), plus **tag** archives
  (`/tags`, `/tags/<tag>`) and **year** archives (`/years`, `/years/<year>`),
  all derived from frontmatter.
- **Reading time** estimate on the post.
- **RSS** entry at `/rss.xml` and inclusion in the sitemap.
- **OG / social preview image** at `/og/<slug>.png`, generated at build — if the
  post has a `cover` it's baked into a diagonal "swipe" layout, otherwise a plain
  card with the title. See [Open Graph images](../README.md#open-graph-images).
- **Canonical URL**: own page URL by default, or `canonicalUrl` when set.

## 6. Publish checklist

- [ ] Folder slug is lowercase-hyphenated and reads well as a URL.
- [ ] `title`, `pubDate`, and a real `description` are set.
- [ ] `tags` are lowercase and reuse existing tags where sensible.
- [ ] Images are in the post folder, referenced with `./…`, and have alt text.
- [ ] `cover` + `coverAlt` set if you want a social/listing image.
- [ ] `canonicalUrl` set if cross-posted.
- [ ] `draft: false` (or remove it) when ready to go live.
- [ ] `npm run build` passes, and the post looks right at `/blog/<slug>` in both
      light and dark mode.

## 7. Publishing

Commit and push to `main`. GitHub Actions builds and deploys to Pages
automatically — there's no manual build step to commit. To stage a post without
publishing, keep `draft: true`; it stays out of every listing, archive, and the
RSS feed until you flip it.
