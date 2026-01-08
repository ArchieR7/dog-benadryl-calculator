const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#0d9488"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGradient)"/>

  <!-- Dot pattern -->
  <g fill="rgba(255,255,255,0.05)">
    ${Array.from({length: 30}, (_, i) =>
      Array.from({length: 16}, (_, j) =>
        `<circle cx="${i * 40 + 20}" cy="${j * 40 + 15}" r="2"/>`
      ).join('')
    ).join('')}
  </g>

  <!-- Main card -->
  <rect x="50" y="50" width="${WIDTH - 100}" height="${HEIGHT - 100}" rx="24" fill="white" filter="url(#shadow)"/>

  <!-- Pill icon -->
  <g transform="translate(100, 250)">
    <!-- Pink half -->
    <ellipse cx="0" cy="25" rx="25" ry="25" fill="#ec4899"/>
    <rect x="0" y="0" width="50" height="50" fill="#ec4899"/>
    <!-- White half -->
    <rect x="50" y="0" width="50" height="50" fill="#fce7f3"/>
    <ellipse cx="100" cy="25" rx="25" ry="25" fill="#fce7f3"/>
    <!-- Shine -->
    <ellipse cx="20" cy="15" rx="12" ry="6" fill="rgba(255,255,255,0.5)" transform="rotate(-15, 20, 15)"/>
  </g>

  <!-- Dog paw icon -->
  <g transform="translate(115, 360)" fill="#374151">
    <!-- Main pad -->
    <ellipse cx="35" cy="45" rx="22" ry="18"/>
    <!-- Toe pads -->
    <ellipse cx="12" cy="18" rx="11" ry="13"/>
    <ellipse cx="32" cy="8" rx="11" ry="13"/>
    <ellipse cx="52" cy="10" rx="11" ry="13"/>
    <ellipse cx="68" cy="22" rx="11" ry="13"/>
  </g>

  <!-- Title -->
  <text x="250" y="200" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="58" font-weight="bold" fill="#1f2937">Dog Benadryl</text>
  <text x="250" y="275" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="58" font-weight="bold" fill="#0d9488">Calculator</text>

  <!-- Subtitle -->
  <text x="250" y="340" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" fill="#6b7280">Safe Dosage Guide for Your Dog</text>

  <!-- Features -->
  <g font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" fill="#059669">
    <text x="250" y="410">✓ Calculate by Weight</text>
    <text x="250" y="445">✓ Multiple Formats (Tablets, Liquid, Chewables)</text>
    <text x="250" y="480">✓ Vet-Approved Safety Guidelines</text>
  </g>

  <!-- FREE badge -->
  <rect x="${WIDTH - 200}" y="90" width="100" height="40" rx="20" fill="#10b981"/>
  <text x="${WIDTH - 150}" y="117" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">FREE</text>

  <!-- Website URL -->
  <text x="${WIDTH - 90}" y="${HEIGHT - 90}" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#9ca3af" text-anchor="end">dogbenadrylcalculator.com</text>

  <!-- Calculator icon -->
  <g transform="translate(${WIDTH - 280}, 200)">
    <rect x="0" y="0" width="100" height="130" rx="8" fill="#f3f4f6" stroke="#e5e7eb" stroke-width="2"/>
    <rect x="10" y="10" width="80" height="30" rx="4" fill="#dbeafe"/>
    <g fill="#6b7280">
      <rect x="15" y="50" width="18" height="18" rx="3"/>
      <rect x="41" y="50" width="18" height="18" rx="3"/>
      <rect x="67" y="50" width="18" height="18" rx="3"/>
      <rect x="15" y="76" width="18" height="18" rx="3"/>
      <rect x="41" y="76" width="18" height="18" rx="3"/>
      <rect x="67" y="76" width="18" height="18" rx="3"/>
      <rect x="15" y="102" width="44" height="18" rx="3"/>
      <rect x="67" y="102" width="18" height="18" rx="3" fill="#10b981"/>
    </g>
  </g>
</svg>
`;

async function generateOgImage() {
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ OG Image saved to: ${outputPath}`);
  console.log(`📐 Dimensions: ${WIDTH}x${HEIGHT}`);
}

generateOgImage().catch(console.error);
