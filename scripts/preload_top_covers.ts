import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { IGDB_TOP_100_GAMES } from '../src/data/igdbTop100Games';
import { REAL_GAME_COVERS } from '../src/data/realGameCovers';
import { MOVIES } from '../src/data/movies';
import { ANIME_LIST } from '../src/data/anime';

const CACHE_DIR = path.join(process.cwd(), '.cache', 'covers');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getDiskPaths(key: string) {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  return {
    bin: path.join(CACHE_DIR, `${hash}.bin`),
    meta: path.join(CACHE_DIR, `${hash}.json`),
  };
}

async function fetchOne(url: string) {
  let cleanUrl = url
    .replace(/([?&])utm_[^&]+(&|$)/gi, '$1')
    .replace(/[?&]$/, '');

  const { bin, meta } = getDiskPaths(cleanUrl);
  if (fs.existsSync(bin) && fs.existsSync(meta)) {
    return true; // Already cached
  }

  try {
    const res = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 OmniDleBot/2.1',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      fs.writeFileSync(bin, buffer);
      fs.writeFileSync(meta, JSON.stringify({ contentType, timestamp: Date.now() }, null, 2));
      return true;
    }
  } catch (err: any) {
    // transient
  }
  return false;
}

async function main() {
  const urlSet = new Set<string>();

  // Add all top 100 IGDB games
  for (const g of IGDB_TOP_100_GAMES) {
    if (g.coverUrl && g.coverUrl.startsWith('http')) urlSet.add(g.coverUrl);
    const real = REAL_GAME_COVERS[g.id];
    if (real && real.startsWith('http')) urlSet.add(real);
  }

  // Add movies
  for (const m of MOVIES) {
    if (m.posterUrl && m.posterUrl.startsWith('http')) urlSet.add(m.posterUrl);
  }

  // Add anime
  for (const a of ANIME_LIST) {
    if (a.coverUrl && a.coverUrl.startsWith('http')) urlSet.add(a.coverUrl);
  }

  const urls = Array.from(urlSet);
  console.log(`Preloading ${urls.length} essential covers to disk cache...`);

  let loaded = 0;
  for (let i = 0; i < urls.length; i++) {
    const ok = await fetchOne(urls[i]);
    if (ok) loaded++;
    // Polite pacing to stay far below rate limits
    await new Promise((r) => setTimeout(r, 45));
  }

  console.log(`Done preloading: ${loaded}/${urls.length} covers ready in ${CACHE_DIR}`);
}

main().catch(console.error);
