import sharp from 'sharp';

// Shared building blocks for the generated Open Graph images (1200x630, light
// theme). Used by src/pages/og-image.png.ts (site default) and
// src/pages/og/[...slug].png.ts (per blog post).

export const W = 1200;
export const H = 630;
export const ACCENT = '#e11d2b'; // Mario red
export const INK = '#18181b'; // zinc-900
export const MUTED = '#71717a'; // zinc-500
export const BG = '#fafafa'; // zinc-50
export const FONT = "'Helvetica Neue',Arial,sans-serif";

// MD monogram (matches public/favicon.svg). `x`,`y` place the mark's top-left
// ink corner; `size` is its width/height in px. Drawn as a single stroke so it
// reads at small sizes; defaults to ink on the light OG background.
export const MONOGRAM_PATH =
  'M 12 12 H 110 A 98 98 0 0 1 110 208 H 12 L 12 68 H 24 L 71 136 L 118 68 H 130 L 130 156';
export const MONOGRAM_SIZE = 64; // shared px size so both OG cards match
export const monogram = (x: number, y: number, size: number, color = INK) =>
  `<g transform="translate(${x},${y}) scale(${size / 220})"><path d="${MONOGRAM_PATH}" fill="none" stroke="${color}" stroke-width="24" stroke-linecap="square" stroke-linejoin="miter"/></g>`;

export const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const wrap = (text: string, max: number) => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
};

// Circular-masked avatar from src/assets/profile.png, cached per diameter.
const avatarCache = new Map<number, Promise<Buffer>>();
export const avatar = (d: number) => {
  let cached = avatarCache.get(d);
  if (!cached) {
    const mask = Buffer.from(
      `<svg width="${d}" height="${d}"><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2}" fill="#fff"/></svg>`,
    );
    cached = sharp('src/assets/profile.png')
      .resize(d, d, { fit: 'cover', position: 'attention' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    avatarCache.set(d, cached);
  }
  return cached;
};

export const pngResponse = (png: Buffer) =>
  new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
