import type { APIRoute } from 'astro';
import sharp from 'sharp';
import fs from 'node:fs';

// Raster 180x180 icon for iOS home screen / link previews, rendered at build
// from the SVG favicon so there's a single source of truth for the mark. The
// favicon itself is full-bleed; here we inset the mark with padding (iOS rounds
// the corners) and sit it on a solid light tile, since Apple icons render
// transparency as black.
const SIZE = 180;
const PAD = 18; // ~10% breathing room so the rounded mask never clips the mark

export const GET: APIRoute = async () => {
  const svg = fs.readFileSync('public/favicon.svg');
  const mark = await sharp(svg, { density: 400 })
    .resize(SIZE - PAD * 2, SIZE - PAD * 2)
    .png()
    .toBuffer();
  const png = await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: '#fafafa' },
  })
    .composite([{ input: mark, left: PAD, top: PAD }])
    .png()
    .toBuffer();
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
