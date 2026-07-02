import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { resume } from '../profile/resume';
import { W, H, ACCENT, INK, MUTED, BG, FONT, escapeXml, avatar, pngResponse } from '../utils/og';

// Site-default Open Graph image at /og-image.png (referenced by BaseLayout).
// Light theme: name + tagline on the left, circular photo on the right.

export const GET: APIRoute = async () => {
  const r = 170;
  const cx = 930;
  const cy = 315;
  const photo = await avatar(r * 2);

  const base = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <radialGradient id="g" cx="78%" cy="50%" r="55%">
    <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="80" y="252" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="4" fill="${ACCENT}">${escapeXml(resume.tagline.toUpperCase())}</text>
  <text x="76" y="350" font-family="${FONT}" font-size="92" font-weight="800" letter-spacing="-2" fill="${INK}">${escapeXml(resume.name)}</text>
  <rect x="82" y="392" width="76" height="8" rx="4" fill="${ACCENT}"/>
  <text x="80" y="566" font-family="${FONT}" font-size="28" font-weight="500" fill="${MUTED}">itsmariodias.github.io</text>
</svg>`);

  const png = await sharp(base)
    .composite([{ input: photo, left: cx - r, top: cy - r }])
    .png()
    .toBuffer();

  return pngResponse(png);
};
