// Helper functions for procedural SVG box art and game formatting

export function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBoxArtSvg({
  title,
  consoleKey,
  developer,
  year,
  genre,
  pegi = 'PEGI 12',
  themeBg = '#12131a',
  accentColor = '#e60012',
  iconSymbol = '🎮'
}) {
  const safeTitle = escapeXml(title);
  const safeDev = escapeXml(developer);
  const safePegi = escapeXml(pegi.replace('PEGI ', ''));
  const safeGenre = escapeXml(genre || 'Action');

  // Console-specific banner markup
  let bannerSvg = '';
  if (consoleKey === 'PS1') {
    bannerSvg = `
      <!-- PS1 Left Spine & Top Header -->
      <rect x="0" y="0" width="360" height="42" fill="#1b1d24"/>
      <rect x="0" y="42" width="360" height="2" fill="#333842"/>
      <!-- PS1 Color Logo -->
      <g transform="translate(14, 8) scale(0.85)">
        <path d="M12 4v16l5-2V2l-5 2z" fill="#E62E2D" />
        <path d="M17 18l5-2v-4l-5 2v4z" fill="#003791" />
        <path d="M22 12l6-2v-4l-6 2v4z" fill="#F4AC10" />
        <path d="M6 22c2 1 6 2 10 2s8-1 10-2-3-2-10-2-8 1-10 2z" fill="#00965E" />
      </g>
      <text x="44" y="26" fill="#f0f2f5" font-family="system-ui, sans-serif" font-weight="900" font-size="14" letter-spacing="1">PlayStation</text>
      <rect x="300" y="10" width="46" height="22" rx="3" fill="#2a2e38"/>
      <text x="323" y="25" fill="#a0a8b5" font-family="system-ui, sans-serif" font-weight="700" font-size="9" text-anchor="middle">PAL</text>
    `;
  } else if (consoleKey === 'PS2') {
    bannerSvg = `
      <!-- PS2 Deep Blue Header -->
      <defs>
        <linearGradient id="ps2Grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#001844"/>
          <stop offset="60%" stop-color="#003388"/>
          <stop offset="100%" stop-color="#001033"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="44" fill="url(#ps2Grad)"/>
      <rect x="0" y="44" width="360" height="2" fill="#0066ff"/>
      <text x="18" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="0.5">PlayStation 2</text>
      <rect x="296" y="11" width="50" height="22" rx="3" fill="#001a4d" stroke="#0044bb" stroke-width="1"/>
      <text x="321" y="26" fill="#66a3ff" font-family="system-ui, sans-serif" font-weight="800" font-size="9" text-anchor="middle">PAL</text>
    `;
  } else if (consoleKey === 'PS3') {
    bannerSvg = `
      <!-- PS3 Black Spine Bar -->
      <rect x="0" y="0" width="360" height="42" fill="#0a0a0d"/>
      <rect x="0" y="42" width="360" height="2" fill="#e60012"/>
      <circle cx="24" cy="21" r="10" fill="#e60012"/>
      <text x="24" y="25" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="11" text-anchor="middle">3</text>
      <text x="42" y="27" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="14" letter-spacing="2">PLAYSTATION 3</text>
    `;
  } else if (consoleKey === 'PS4') {
    bannerSvg = `
      <!-- PS4 Electric Blue Banner -->
      <rect x="0" y="0" width="360" height="44" fill="#003791"/>
      <rect x="0" y="44" width="360" height="2" fill="#3385ff"/>
      <text x="18" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="18" letter-spacing="1">PS4</text>
      <text x="64" y="28" fill="#99c2ff" font-family="system-ui, sans-serif" font-weight="600" font-size="12">PlayStation 4</text>
    `;
  } else if (consoleKey === 'PS5') {
    bannerSvg = `
      <!-- PS5 White Modern Header -->
      <rect x="0" y="0" width="360" height="46" fill="#f8f9fc"/>
      <rect x="0" y="46" width="360" height="2" fill="#e2e5ec"/>
      <circle cx="24" cy="23" r="5" fill="#00439c"/>
      <text x="36" y="30" fill="#0a0c10" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="1.5">PS5</text>
      <text x="86" y="29" fill="#667085" font-family="system-ui, sans-serif" font-weight="700" font-size="11">PlayStation 5</text>
    `;
  } else if (consoleKey === 'Xbox') {
    bannerSvg = `
      <!-- Xbox Original Radioactive Green & Black -->
      <rect x="0" y="0" width="360" height="44" fill="#051408"/>
      <rect x="0" y="44" width="360" height="3" fill="#107c10"/>
      <circle cx="24" cy="22" r="12" fill="#107c10"/>
      <text x="24" y="27" fill="#000" font-family="system-ui, sans-serif" font-weight="900" font-size="14" text-anchor="middle">X</text>
      <text x="44" y="29" fill="#52b848" font-family="system-ui, sans-serif" font-weight="900" font-size="18" letter-spacing="3">XBOX</text>
    `;
  } else if (consoleKey === 'Xbox 360') {
    bannerSvg = `
      <!-- Xbox 360 Curved Dome White/Green Header -->
      <rect x="0" y="0" width="360" height="44" fill="#f4f6f8"/>
      <rect x="0" y="44" width="360" height="3" fill="#52b848"/>
      <circle cx="24" cy="22" r="11" fill="#fff" stroke="#52b848" stroke-width="2.5"/>
      <circle cx="24" cy="22" r="4" fill="#52b848"/>
      <text x="44" y="29" fill="#2e3830" font-family="system-ui, sans-serif" font-weight="900" font-size="17" letter-spacing="1">XBOX 360</text>
    `;
  } else if (consoleKey === 'Xbox Series X/S') {
    bannerSvg = `
      <!-- Xbox Series X Dark Obsidian Header -->
      <rect x="0" y="0" width="360" height="46" fill="#0d1117"/>
      <rect x="0" y="46" width="360" height="2" fill="#107c10"/>
      <rect x="14" y="14" width="18" height="18" rx="3" fill="#107c10"/>
      <text x="23" y="28" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="12" text-anchor="middle">X</text>
      <text x="40" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="1">XBOX</text>
      <text x="92" y="29" fill="#52ff77" font-family="system-ui, sans-serif" font-weight="800" font-size="11" letter-spacing="1">SERIES X</text>
    `;
  } else if (consoleKey === 'NES') {
    bannerSvg = `
      <!-- NES Classic 1985 Header -->
      <rect x="0" y="0" width="360" height="42" fill="#202228"/>
      <rect x="0" y="42" width="360" height="3" fill="#d82800"/>
      <text x="16" y="26" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="13" letter-spacing="1">Nintendo</text>
      <text x="86" y="26" fill="#fcb000" font-family="system-ui, sans-serif" font-weight="700" font-size="10" letter-spacing="0.5">ENTERTAINMENT SYSTEM</text>
    `;
  } else if (consoleKey === 'SNES') {
    bannerSvg = `
      <!-- SNES 4-Color Button Super Nintendo Header -->
      <rect x="0" y="0" width="360" height="44" fill="#242132"/>
      <rect x="0" y="44" width="360" height="3" fill="#6b5ca5"/>
      <g transform="translate(16, 12)">
        <circle cx="5" cy="5" r="3.5" fill="#0070d2"/>
        <circle cx="14" cy="5" r="3.5" fill="#ffd400"/>
        <circle cx="5" cy="14" r="3.5" fill="#e60012"/>
        <circle cx="14" cy="14" r="3.5" fill="#00a651"/>
      </g>
      <text x="42" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="14" letter-spacing="1">SUPER NINTENDO</text>
    `;
  } else if (consoleKey === 'N64') {
    bannerSvg = `
      <!-- N64 3D Cube Header -->
      <rect x="0" y="0" width="360" height="44" fill="#181528"/>
      <rect x="0" y="44" width="360" height="3" fill="#8555e0"/>
      <text x="16" y="28" fill="#ffd400" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="1">NINTENDO 64</text>
      <rect x="250" y="11" width="96" height="22" rx="3" fill="#e60012"/>
      <text x="298" y="25" fill="#fff" font-family="system-ui, sans-serif" font-weight="800" font-size="8.5" text-anchor="middle" letter-spacing="0.5">ONLY FOR</text>
    `;
  } else if (consoleKey === 'GameCube') {
    bannerSvg = `
      <!-- GameCube Indigo Header -->
      <rect x="0" y="0" width="360" height="44" fill="#180e29"/>
      <rect x="0" y="44" width="360" height="3" fill="#6a0dad"/>
      <g transform="translate(16, 12)">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="#6a0dad"/>
        <text x="10" y="15" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="12" text-anchor="middle">G</text>
      </g>
      <text x="44" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="1">NINTENDO GAMECUBE</text>
    `;
  } else if (consoleKey === 'Wii') {
    bannerSvg = `
      <!-- Wii Pure Cyan Modern Header -->
      <rect x="0" y="0" width="360" height="44" fill="#f0f6fa"/>
      <rect x="0" y="44" width="360" height="3" fill="#00b4d8"/>
      <text x="18" y="31" fill="#0077b6" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="1">Wii</text>
      <text x="68" y="29" fill="#64748b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">Nintendo</text>
    `;
  } else if (consoleKey === 'Xbox One') {
    bannerSvg = `
      <!-- Xbox One Dark Emerald Header -->
      <rect x="0" y="0" width="360" height="44" fill="#071b0b"/>
      <rect x="0" y="44" width="360" height="3" fill="#107c10"/>
      <circle cx="22" cy="22" r="10" fill="#107c10"/>
      <text x="22" y="26" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="10" text-anchor="middle">X</text>
      <text x="38" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="1">XBOX ONE</text>
    `;
  } else if (consoleKey === 'Wii U') {
    bannerSvg = `
      <!-- Wii U Cyan Blue Curved Header -->
      <rect x="0" y="0" width="360" height="44" fill="#0099ff"/>
      <rect x="0" y="44" width="360" height="2" fill="#66ccff"/>
      <text x="18" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="1">Wii <tspan fill="#ffff00">U</tspan></text>
      <text x="86" y="29" fill="#e6f7ff" font-family="system-ui, sans-serif" font-weight="600" font-size="11">Nintendo</text>
    `;
  } else if (consoleKey === 'Switch') {
    bannerSvg = `
      <!-- Nintendo Switch Crimson Header -->
      <rect x="0" y="0" width="360" height="44" fill="#e60012"/>
      <rect x="0" y="44" width="360" height="2" fill="#ff4d5a"/>
      <!-- Joy-con icon -->
      <rect x="16" y="12" width="8" height="20" rx="3" fill="#fff"/>
      <rect x="27" y="12" width="8" height="20" rx="3" fill="#fff"/>
      <circle cx="20" cy="18" r="1.5" fill="#e60012"/>
      <circle cx="31" cy="26" r="1.5" fill="#e60012"/>
      <text x="44" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="0.5">NINTENDO SWITCH</text>
    `;
  } else if (consoleKey === 'Switch 2') {
    bannerSvg = `
      <!-- Nintendo Switch 2 Crimson & Gold Header -->
      <defs>
        <linearGradient id="sw2Grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b80010"/>
          <stop offset="70%" stop-color="#e60012"/>
          <stop offset="100%" stop-color="#ffb800"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="46" fill="url(#sw2Grad)"/>
      <rect x="0" y="46" width="360" height="2" fill="#ffd400"/>
      <!-- Joy-con 2 icon -->
      <rect x="16" y="13" width="8" height="20" rx="3" fill="#fff"/>
      <rect x="27" y="13" width="8" height="20" rx="3" fill="#fff"/>
      <circle cx="20" cy="19" r="1.5" fill="#b80010"/>
      <circle cx="31" cy="27" r="1.5" fill="#b80010"/>
      <text x="44" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="0.5">SWITCH <tspan fill="#ffd400">2</tspan></text>
      <text x="135" y="30" fill="#fff" font-family="system-ui, sans-serif" font-weight="700" font-size="9" letter-spacing="1">NEXT-GEN</text>
    `;
  }

  // PEGI badge colors
  let pegiBg = '#00a651'; // 3, 7
  if (safePegi === '12' || safePegi === '16') pegiBg = '#f58220';
  if (safePegi === '18') pegiBg = '#ed1c24';

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width="360" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${themeBg}"/>
      <stop offset="40%" stop-color="${accentColor}33"/>
      <stop offset="85%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
    <linearGradient id="cardBezel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff22"/>
      <stop offset="100%" stop-color="#00000088"/>
    </linearGradient>
  </defs>

  <!-- Box Art Background Base -->
  <rect width="360" height="480" fill="url(#bgGrad)"/>

  <!-- Subtle Atmospheric Art Elements -->
  <circle cx="180" cy="230" r="110" fill="${accentColor}" opacity="0.12" filter="blur(30px)"/>
  <rect x="20" y="80" width="320" height="280" rx="16" fill="url(#cardBezel)" stroke="#ffffff11" stroke-width="1.5"/>

  <!-- Console Banner -->
  ${bannerSvg}

  <!-- Hero Art Symbol -->
  <g transform="translate(180, 200)">
    <circle cx="0" cy="0" r="54" fill="#00000066" stroke="${accentColor}88" stroke-width="3"/>
    <text x="0" y="16" font-size="46" text-anchor="middle" filter="drop-shadow(0 4px 12px ${accentColor}88)">${iconSymbol}</text>
  </g>

  <!-- Game Title & Details -->
  <g transform="translate(180, 310)">
    <text x="0" y="0" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="21" text-anchor="middle" letter-spacing="-0.5" filter="drop-shadow(0 2px 8px #000000)">${safeTitle}</text>
    <text x="0" y="24" fill="${accentColor}" font-family="system-ui, sans-serif" font-weight="800" font-size="12" text-anchor="middle" letter-spacing="1">${safeGenre.toUpperCase()}</text>
    <text x="0" y="44" fill="#9ca3af" font-family="system-ui, sans-serif" font-weight="600" font-size="11" text-anchor="middle">${safeDev} • ${year}</text>
  </g>

  <!-- Bottom Bar with PEGI and Seal -->
  <rect x="0" y="434" width="360" height="46" fill="#050608fa"/>
  <line x1="0" y1="434" x2="360" y2="434" stroke="#ffffff15" stroke-width="1"/>

  <!-- PEGI Badge -->
  <rect x="18" y="443" width="28" height="28" rx="4" fill="${pegiBg}"/>
  <text x="32" y="462" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="13" text-anchor="middle">${safePegi}</text>

  <!-- Studio / Quality Seal -->
  <text x="342" y="461" fill="#6b7280" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="end" letter-spacing="0.5">${safeDev.slice(0, 16).toUpperCase()}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}
