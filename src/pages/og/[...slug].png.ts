import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { W, H, ACCENT, INK, MUTED, BG, FONT, escapeXml, wrap, monogram, MONOGRAM_SIZE, pngResponse } from '../../utils/og';

// Per-post Open Graph images (1200x630), generated at build. Light theme.
// If the post has a cover image it is used as a faded full-bleed background
// (cover-baked); otherwise a plain light card is drawn.

const BLOG_DIR = 'src/content/blog';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => {
    // `cover` is processed by image() in the schema, so recover the source
    // path from the raw frontmatter to feed it to sharp.
    const file = path.join(BLOG_DIR, post.id);
    let coverPath: string | null = null;
    try {
      const raw = fs.readFileSync(file, 'utf8');
      const m = raw.match(/^cover:\s*["']?([^"'\n]+?)["']?\s*$/m);
      if (m) {
        const resolved = path.join(path.dirname(file), m[1]);
        if (fs.existsSync(resolved)) coverPath = resolved;
      }
    } catch {
      /* no cover */
    }
    return { params: { slug: post.slug }, props: { title: post.data.title, coverPath } };
  });
}

// Brand header, wrapped title, accent bar, domain. Shared by both layouts.
// `textWidth` is the available width for the title so it wraps clear of the
// cover panel in the cover-baked layout.
const foreground = (title: string, textWidth = 1040) => {
  const len = title.length;
  const fontSize = len > 70 ? 52 : len > 38 ? 62 : 74;
  const maxChars = Math.max(10, Math.floor(textWidth / (fontSize * 0.52)));
  const lineHeight = Math.round(fontSize * 1.18);
  const allLines = wrap(title, maxChars);
  const lines = allLines.slice(0, 3);
  if (allLines.length > 3) {
    // Overflow: trim the last visible line so the ellipsis still fits.
    let last = lines[2];
    while (last.length + 1 > maxChars && last.includes(' ')) {
      last = last.slice(0, last.lastIndexOf(' '));
    }
    lines[2] = last.replace(/[\s.,;:]+$/, '') + '…';
  }
  const startY = 360;
  const tspans = lines
    .map((line, i) => `<tspan x="80" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
  return `
    ${monogram(80, 68, MONOGRAM_SIZE)}
    <text x="156" y="98" font-family="${FONT}" font-size="28" font-weight="700" fill="${INK}">Mario Dias</text>
    <text x="156" y="130" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="3" fill="${ACCENT}">BLOG</text>
    <text font-family="${FONT}" font-size="${fontSize}" font-weight="800" letter-spacing="-1" fill="${INK}">${tspans}</text>
    <rect x="82" y="${Math.min(startY + (lines.length - 1) * lineHeight + 26, 520)}" width="76" height="8" rx="4" fill="${ACCENT}"/>
    <text x="80" y="568" font-family="${FONT}" font-size="24" font-weight="500" fill="${MUTED}">itsmariodias.github.io</text>`;
};

export const GET: APIRoute = async ({ props }) => {
  const { title, coverPath } = props as { title: string; coverPath: string | null };
  let png: Buffer;

  if (coverPath) {
    // Cover fills a wide diagonal "swipe" panel on the right; the seam leans so
    // the cover opens up lower-right while the title keeps a clear left column.
    const panelLeft = 480;
    const panelW = W - panelLeft; // 720
    const topX = 20; // seam x (panel-local) at the top edge
    const botX = 420; // seam x (panel-local) at the bottom edge
    const panel = await sharp(coverPath)
      .resize(panelW, H, { fit: 'cover', position: 'center' })
      .ensureAlpha()
      .toBuffer();
    // Fade the cover out along the diagonal: a gradient whose axis is the
    // seam's normal, transparent on the seam and solid `feather`px into the image.
    const mx = (topX + botX) / 2;
    const my = H / 2;
    const segLen = Math.hypot(botX - topX, H);
    const nx = H / segLen; // unit normal pointing into the image (right of seam)
    const ny = -(botX - topX) / segLen;
    const feather = 200;
    const diagMask = Buffer.from(`
<svg width="${panelW}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="m" gradientUnits="userSpaceOnUse" x1="${mx}" y1="${my}" x2="${mx + feather * nx}" y2="${my + feather * ny}">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#fff" stop-opacity="1"/>
  </linearGradient>
  <rect width="${panelW}" height="${H}" fill="url(#m)"/>
</svg>`);
    const cutPanel = await sharp(panel)
      .composite([{ input: diagMask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    const base = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="${BG}"/></svg>`);
    const fg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${foreground(title, panelLeft + 70)}</svg>`);
    png = await sharp(base)
      .composite([
        { input: cutPanel, left: panelLeft, top: 0 },
        { input: fg, left: 0, top: 0 },
      ])
      .png()
      .toBuffer();
  } else {
    const base = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <radialGradient id="g" cx="85%" cy="12%" r="60%">
    <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${foreground(title)}
</svg>`);
    png = await sharp(base).png().toBuffer();
  }

  return pngResponse(png);
};
