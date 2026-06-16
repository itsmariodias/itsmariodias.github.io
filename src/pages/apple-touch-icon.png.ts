import type { APIRoute } from 'astro';
import sharp from 'sharp';
import fs from 'node:fs';

// Raster 180x180 icon for iOS home screen / link previews, rendered at build
// from the SVG favicon so there's a single source of truth for the mark.
export const GET: APIRoute = async () => {
  const svg = fs.readFileSync('public/favicon.svg');
  const png = await sharp(svg, { density: 400 }).resize(180, 180).png().toBuffer();
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
