// Riprova a cercare una copertina per i giochi segnalati come rotti (data/flagged-covers.json).
// Cerca su IGDB una copertina diversa da quella segnalata, poi su TheGamesDB. Se trovata, aggiorna la mappa
// e rimuove il gioco dalla lista segnalati, così torna nel pool.
// Uso: node scripts/retry-flagged-covers.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const flaggedPath = path.join(root, 'data/flagged-covers.json');
const igdbPath = path.join(root, 'src/data/igdbConsoleCovers.ts');
const tgdbPath = path.join(root, 'src/data/tgdbConsoleCovers.ts');

const env = Object.fromEntries(
  fs.readFileSync(path.join(root, '.env.local'), 'utf-8')
    .split(/\r?\n/)
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const i = line.indexOf('=');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);

const flagged = fs.existsSync(flaggedPath) ? JSON.parse(fs.readFileSync(flaggedPath, 'utf-8')) : [];
if (flagged.length === 0) {
  console.log('Nessun gioco segnalato.');
  process.exit(0);
}

const readMap = (file) => {
  const src = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '';
  return Object.fromEntries([...src.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
};
const writeMap = (file, map, exportName, header, typeAnnotation) => {
  fs.writeFileSync(file, `// ${header}\nexport const ${exportName}: ${typeAnnotation} = ${JSON.stringify(map, null, 2)};\n`);
};

const igdbMap = readMap(igdbPath);
const tgdbMap = readMap(tgdbPath);

const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
  method: 'POST',
  body: new URLSearchParams({
    client_id: env.IGDB_CLIENT_ID,
    client_secret: env.IGDB_CLIENT_SECRET,
    grant_type: 'client_credentials',
  }),
});
if (!tokenRes.ok) throw new Error(`Token Twitch fallito: HTTP ${tokenRes.status}`);
const { access_token: token } = await tokenRes.json();

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function igdbCover(title, avoidImageId) {
  const query = `search "${title.replace(/"/g, '\\"')}"; fields name,cover.image_id; limit 10;`;
  const res = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: { 'Client-ID': env.IGDB_CLIENT_ID, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
    body: query,
  });
  if (!res.ok) throw new Error(`IGDB HTTP ${res.status}`);
  const hits = await res.json();
  await sleep(280);
  const hit = hits.find((h) => h.cover?.image_id && h.cover.image_id !== avoidImageId && norm(h.name) === norm(title));
  return hit?.cover.image_id;
}

async function tgdbCover(title, platformHint, avoidUrl) {
  const url = `https://api.thegamesdb.net/v1.1/Games/ByGameName?apikey=${env.THEGAMESDB_API_KEY}&name=${encodeURIComponent(title)}&fields=game_title,platform&include=boxart`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TheGamesDB HTTP ${res.status}`);
  const data = await res.json();
  await sleep(250);
  const games = (data?.data?.games ?? []).filter((g) => norm(g.game_title) === norm(title));
  const boxart = data.include?.boxart;
  for (const g of games) {
    const images = boxart?.data?.[String(g.id)] ?? [];
    const front = images.find((i) => i.type === 'boxart' && i.side === 'front') ?? images.find((i) => i.type === 'boxart');
    if (!front) continue;
    const candidate = `${boxart.base_url.large}${front.filename}`;
    if (candidate !== avoidUrl) return candidate;
  }
  return undefined;
}

const remaining = [];
let recovered = 0;
for (const item of flagged) {
  const title = item.title;
  const badCover = item.coverUrl || '';
  const oldIgdbId = igdbMap[item.id];
  const igdbHit = await igdbCover(title, oldIgdbId);
  if (igdbHit) {
    igdbMap[item.id] = igdbHit;
    delete tgdbMap[item.id];
    recovered++;
    continue;
  }
  const tgdbHit = await tgdbCover(title, undefined, badCover);
  if (tgdbHit) {
    tgdbMap[item.id] = tgdbHit;
    delete igdbMap[item.id];
    recovered++;
    continue;
  }
  remaining.push(item);
}

writeMap(igdbPath, igdbMap, 'IGDB_CONSOLE_COVER_IDS', 'Generato da scripts/fetch-igdb-covers.mjs e scripts/retry-flagged-covers.mjs', 'Record<string, string>');
writeMap(tgdbPath, tgdbMap, 'TGDB_CONSOLE_COVER_URLS', 'Generato da scripts/fetch-tgdb-covers.mjs e scripts/retry-flagged-covers.mjs', 'Record<string, string>');
fs.writeFileSync(flaggedPath, JSON.stringify(remaining, null, 2));
console.log(`Segnalati: ${flagged.length}. Recuperati: ${recovered}. Ancora esclusi: ${remaining.length}.`);
