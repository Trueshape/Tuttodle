import { VideoGameItem } from '../types';
import { getRealCoverUrl } from '../data/realGameCovers';

function escapeXml(unsafe: string): string {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBoxArtSvg(params: {
  title: string;
  consoleKey?: string;
  developer?: string;
  year?: number;
  genre?: string;
  pegi?: string;
  themeBg?: string;
  accentColor?: string;
  iconSymbol?: string;
}): string {
  const {
    title,
    consoleKey = 'Multi',
    developer = 'Various',
    year = 2000,
    genre = 'Action',
    pegi = 'PEGI 12',
    themeBg = '#0d1117',
    accentColor = '#6366f1',
    iconSymbol = '🎮'
  } = params;

  const safeTitle = escapeXml(title);
  const safeDev = escapeXml(developer);
  const safePegi = escapeXml(pegi.replace('PEGI ', ''));
  const safeGenre = escapeXml(genre);
  const key = consoleKey.trim();

  let bannerSvg = '';
  if (key === 'PS1' || key.includes('PlayStation 1')) {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="42" fill="#1b1d24"/>
      <rect x="0" y="42" width="360" height="2" fill="#333842"/>
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
  } else if (key === 'PS2' || key.includes('PlayStation 2')) {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#001844"/>
      <rect x="0" y="44" width="360" height="2" fill="#0066ff"/>
      <text x="18" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="0.5">PlayStation 2</text>
      <rect x="296" y="11" width="50" height="22" rx="3" fill="#001a4d" stroke="#0044bb" stroke-width="1"/>
      <text x="321" y="26" fill="#66a3ff" font-family="system-ui, sans-serif" font-weight="800" font-size="9" text-anchor="middle">PAL</text>
    `;
  } else if (key === 'PS3' || key.includes('PlayStation 3')) {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="42" fill="#0a0a0d"/>
      <rect x="0" y="42" width="360" height="2" fill="#e60012"/>
      <circle cx="24" cy="21" r="10" fill="#e60012"/>
      <text x="24" y="25" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="11" text-anchor="middle">3</text>
      <text x="42" y="27" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="14" letter-spacing="2">PLAYSTATION 3</text>
    `;
  } else if (key === 'PS4' || key.includes('PlayStation 4')) {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#003791"/>
      <rect x="0" y="44" width="360" height="2" fill="#3385ff"/>
      <text x="18" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="18" letter-spacing="1">PS4</text>
      <text x="64" y="29" fill="#99ccff" font-family="system-ui, sans-serif" font-weight="700" font-size="11">PlayStation 4</text>
    `;
  } else if (key === 'PS5' || key.includes('PlayStation 5')) {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="48" fill="#ffffff"/>
      <rect x="0" y="48" width="360" height="3" fill="#003791"/>
      <text x="18" y="33" fill="#000000" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="1">PS5</text>
      <text x="68" y="31" fill="#003791" font-family="system-ui, sans-serif" font-weight="800" font-size="11" letter-spacing="1">PLAYSTATION 5</text>
    `;
  } else if (key === 'Xbox' || key === 'Xbox Original') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#051c09"/>
      <rect x="0" y="44" width="360" height="3" fill="#52b848"/>
      <circle cx="22" cy="22" r="10" fill="#52b848"/>
      <text x="22" y="26" fill="#000" font-family="system-ui, sans-serif" font-weight="900" font-size="12" text-anchor="middle">X</text>
      <text x="38" y="29" fill="#66ff66" font-family="system-ui, sans-serif" font-weight="900" font-size="17" letter-spacing="1">XBOX</text>
    `;
  } else if (key === 'Xbox 360' || key === 'X360') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#142616"/>
      <rect x="0" y="44" width="360" height="3" fill="#52b848"/>
      <text x="18" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="17" letter-spacing="0.5">XBOX 360</text>
    `;
  } else if (key === 'Xbox One' || key === 'XOne') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#071b0b"/>
      <rect x="0" y="44" width="360" height="3" fill="#107c10"/>
      <circle cx="22" cy="22" r="10" fill="#107c10"/>
      <text x="22" y="26" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="10" text-anchor="middle">X</text>
      <text x="38" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="1">XBOX ONE</text>
    `;
  } else if (key === 'Xbox Series X/S' || key === 'Xbox Series' || key === 'XSX') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="46" fill="#001405"/>
      <rect x="0" y="46" width="360" height="3" fill="#22cc44"/>
      <text x="18" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="0.5">XBOX</text>
      <rect x="80" y="14" width="76" height="20" rx="3" fill="#107c10"/>
      <text x="118" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="9" text-anchor="middle" letter-spacing="0.5">SERIES X|S</text>
    `;
  } else if (key === 'SNES' || key === 'Super Nintendo') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#1e1b2b"/>
      <rect x="0" y="44" width="360" height="3" fill="#806bcf"/>
      <text x="16" y="28" fill="#d1c4e9" font-family="system-ui, sans-serif" font-weight="900" font-size="14" letter-spacing="1">SUPER NINTENDO</text>
    `;
  } else if (key === 'N64' || key === 'Nintendo 64') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#181528"/>
      <rect x="0" y="44" width="360" height="3" fill="#8555e0"/>
      <text x="16" y="28" fill="#ffd400" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="1">NINTENDO 64</text>
      <rect x="250" y="11" width="96" height="22" rx="3" fill="#e60012"/>
      <text x="298" y="25" fill="#fff" font-family="system-ui, sans-serif" font-weight="800" font-size="8.5" text-anchor="middle" letter-spacing="0.5">ONLY FOR</text>
    `;
  } else if (key === 'GameCube' || key === 'GC') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#180e29"/>
      <rect x="0" y="44" width="360" height="3" fill="#6a0dad"/>
      <g transform="translate(16, 12)">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="#6a0dad"/>
        <text x="10" y="15" fill="#fff" font-family="system-ui, sans-serif" font-weight="900" font-size="12" text-anchor="middle">G</text>
      </g>
      <text x="44" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="1">NINTENDO GAMECUBE</text>
    `;
  } else if (key === 'Wii') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#f0f6fa"/>
      <rect x="0" y="44" width="360" height="3" fill="#00b4d8"/>
      <text x="18" y="31" fill="#0077b6" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="1">Wii</text>
      <text x="68" y="29" fill="#64748b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">Nintendo</text>
    `;
  } else if (key === 'Switch' || key === 'Nintendo Switch') {
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#e60012"/>
      <rect x="0" y="44" width="360" height="2" fill="#ff4d5a"/>
      <rect x="16" y="12" width="8" height="20" rx="3" fill="#fff"/>
      <rect x="27" y="12" width="8" height="20" rx="3" fill="#fff"/>
      <circle cx="20" cy="18" r="1.5" fill="#e60012"/>
      <circle cx="31" cy="26" r="1.5" fill="#e60012"/>
      <text x="44" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="0.5">NINTENDO SWITCH</text>
    `;
  } else {
    // Default Header for PC, Dreamcast, or Multiplatform
    const headerTitle = key === 'Multi' ? 'VIDEO GAME CLASSIC' : key.toUpperCase();
    bannerSvg = `
      <rect x="0" y="0" width="360" height="44" fill="#0f172a"/>
      <rect x="0" y="44" width="360" height="3" fill="#6366f1"/>
      <text x="18" y="29" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="15" letter-spacing="1">${escapeXml(headerTitle)}</text>
    `;
  }

  // PEGI badge colors
  let pegiBg = '#00a651';
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

  <rect width="360" height="480" fill="url(#bgGrad)" />
  <rect x="20" y="80" width="320" height="280" rx="16" fill="url(#cardBezel)" stroke="#ffffff11" stroke-width="1.5"/>

  ${bannerSvg}

  <g transform="translate(180, 200)">
    <circle cx="0" cy="0" r="54" fill="#00000066" stroke="${accentColor}88" stroke-width="3"/>
    <text x="0" y="16" font-size="46" text-anchor="middle" filter="drop-shadow(0 4px 12px ${accentColor}88)">${iconSymbol}</text>
  </g>

  <g transform="translate(180, 310)">
    <text x="0" y="0" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="19" text-anchor="middle" letter-spacing="-0.5" filter="drop-shadow(0 2px 8px #000000)">${safeTitle}</text>
    <text x="0" y="24" fill="${accentColor}" font-family="system-ui, sans-serif" font-weight="800" font-size="12" text-anchor="middle" letter-spacing="1">${safeGenre.toUpperCase()}</text>
    <text x="0" y="44" fill="#9ca3af" font-family="system-ui, sans-serif" font-weight="600" font-size="11" text-anchor="middle">${safeDev} • ${year}</text>
  </g>

  <rect x="0" y="434" width="360" height="46" fill="#050608fa"/>
  <line x1="0" y1="434" x2="360" y2="434" stroke="#ffffff15" stroke-width="1"/>

  <rect x="18" y="443" width="28" height="28" rx="4" fill="${pegiBg}"/>
  <text x="32" y="462" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="13" text-anchor="middle">${safePegi}</text>

  <text x="342" y="461" fill="#6b7280" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="end" letter-spacing="0.5">${safeDev.slice(0, 16).toUpperCase()}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fullSvg)}`;
}

export function getProxiedImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Strip tracking parameters to normalize cache key and avoid CDN misses
    const cleanUrl = url
      .replace(/([?&])utm_[^&]+(&|$)/gi, '$1')
      .replace(/[?&]$/, '');
    if (cleanUrl.includes('wikimedia.org') || cleanUrl.includes('wikipedia.org')) {
      return `/api/cover-proxy?url=${encodeURIComponent(cleanUrl)}`;
    }
    return cleanUrl;
  }
  return url;
}

export function getFallbackSvgCover(game: Partial<VideoGameItem>): string {
  // Derive console key from platforms or mainPlatform
  const platKey = (game.platforms && game.platforms[0]) || game.mainPlatform || 'PC';

  // Detect theme colors and icon symbol
  let icon = '🎮';
  let accent = '#6366f1';
  let bg = '#0f172a';

  const t = (game.title || '').toLowerCase();
  const g = (game.genres?.[0] || '').toLowerCase();

  if (t.includes('zelda') || t.includes('link')) {
    icon = '🗡️'; accent = '#00e5ff'; bg = '#002b4d';
  } else if (t.includes('mario') || t.includes('kart')) {
    icon = '🍄'; accent = '#ffd700'; bg = '#b71c1c';
  } else if (t.includes('halo') || t.includes('chief')) {
    icon = '🪐'; accent = '#52b848'; bg = '#0d1b2a';
  } else if (t.includes('pokemon')) {
    icon = '⚡'; accent = '#ffd600'; bg = '#c2185b';
  } else if (t.includes('souls') || t.includes('elden') || t.includes('bloodborne')) {
    icon = '🔥'; accent = '#ff5722'; bg = '#1a0005';
  } else if (t.includes('metal gear') || t.includes('snake')) {
    icon = '🦊'; accent = '#00e676'; bg = '#1a252f';
  } else if (t.includes('resident evil') || t.includes('silent hill')) {
    icon = '🧟'; accent = '#ff1744'; bg = '#1a0000';
  } else if (t.includes('witcher')) {
    icon = '🐺'; accent = '#ff9800'; bg = '#1b263b';
  } else if (t.includes('crash')) {
    icon = '🦊'; accent = '#ff9100'; bg = '#bf360c';
  } else if (t.includes('sonic')) {
    icon = '🦔'; accent = '#00e5ff'; bg = '#0d47a1';
  } else if (g.includes('sparatutto') || g.includes('fps')) {
    icon = '🎯'; accent = '#ff3d00'; bg = '#212121';
  } else if (g.includes('corse') || g.includes('racing')) {
    icon = '🏎️'; accent = '#ffd600'; bg = '#0d47a1';
  } else if (g.includes('rpg') || g.includes('gdr')) {
    icon = '⚔️'; accent = '#7c4dff'; bg = '#1a0033';
  } else if (g.includes('horror')) {
    icon = '💀'; accent = '#ff1744'; bg = '#140000';
  }

  return generateBoxArtSvg({
    title: game.title || 'Video Game',
    consoleKey: platKey,
    developer: game.developer || 'Developer',
    year: game.releaseYear || 2000,
    genre: game.genres?.[0] || 'Action',
    pegi: game.pegi || 'PEGI 12',
    themeBg: bg,
    accentColor: accent,
    iconSymbol: icon,
  });
}

export function getSafeCoverUrl(game: Partial<VideoGameItem>): string {
  // 1. If game already has a real http/https cover URL, proxy and return it
  if (game.coverUrl && game.coverUrl.startsWith('http')) {
    return getProxiedImageUrl(game.coverUrl);
  }

  // 2. Check if an authentic Wikipedia box art cover exists in REAL_GAME_COVERS
  const realCover = getRealCoverUrl(game);
  if (realCover) {
    return getProxiedImageUrl(realCover);
  }

  // 3. If game already has an inline SVG data URL, standardize charset and return
  if (game.coverUrl && game.coverUrl.startsWith('data:image/')) {
    return game.coverUrl.replace('data:image/svg+xml;utf8,', 'data:image/svg+xml;charset=utf-8,');
  }

  // 4. Procedural fallback SVG cover
  return getFallbackSvgCover(game);
}
