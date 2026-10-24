// Scarica da TheGamesDB la box art fronte per i giochi console ancora senza copertina IGDB.
// Uso: node scripts/fetch-tgdb-covers.mjs   (legge THEGAMESDB_API_KEY da .env.local)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const consolesDir = path.join(root, 'src/data/consoles');
const igdbPath = path.join(root, 'src/data/igdbConsoleCovers.ts');
const outPath = path.join(root, 'src/data/tgdbConsoleCovers.ts');

const env = Object.fromEntries(
  fs.readFileSync(path.join(root, '.env.local'), 'utf-8')
    .split(/\r?\n/)
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const i = line.indexOf('=');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);
const apiKey = env.THEGAMESDB_API_KEY;
if (!apiKey) throw new Error('THEGAMESDB_API_KEY mancante in .env.local');

const PLATFORM_BY_FILE = {
  'gamecubeGames.ts': 2,
  'n64Games.ts': 3,
  'snesGames.ts': 6,
  'wiiGames.ts': 9,
  'ps1Games.ts': 10,
  'ps2Games.ts': 11,
  'ps3Games.ts': 12,
  'ps4Games.ts': 4919,
  'ps5Games.ts': 4980,
  'xboxOriginalGames.ts': 14,
  'xbox360Games.ts': 15,
  'xboxOneGames.ts': 4920,
  'xboxSeriesXGames.ts': 4981,
  'switchGames.ts': 4971,
};

const igdbSource = fs.readFileSync(igdbPath, 'utf-8');
const igdbIds = new Set([...igdbSource.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]));

const games = [];
for (const [file, platformId] of Object.entries(PLATFORM_BY_FILE)) {
  const source = fs.readFileSync(path.join(consolesDir, file), 'utf-8');
  for (const m of source.matchAll(/"id":\s*"([^"]+)",\s*"title":\s*"((?:[^"\\]|\\.)*)"/g)) {
    games.push({ id: m[1], title: JSON.parse(`"${m[2]}"`), platformId });
  }
}
const tgdbPath = path.join(root, 'src/data/tgdbConsoleCovers.ts');
const tgdbSource = fs.existsSync(tgdbPath) ? fs.readFileSync(tgdbPath, 'utf-8') : '';
const covers = Object.fromEntries(
  [...tgdbSource.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
const todo = games.filter((g) => !igdbIds.has(g.id) && !covers[g.id]);

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const stripSuffix = (t) => t.replace(/\s*\([^)]*\)\s*$/, '').trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TheGamesDB HTTP ${res.status}`);
  return res.json();
}

async function findBoxArtUrl(title, platformId) {
  const url = `https://api.thegamesdb.net/v1.1/Games/ByGameName?apikey=${apiKey}&name=${encodeURIComponent(title)}&fields=game_title,platform&include=boxart`;
  const data = await getJson(url);
  const games = data?.data?.games ?? [];
  const match = games.find((g) => g.platform === platformId && norm(g.game_title) === norm(title));
  if (!match) return undefined;
  const boxart = data.include?.boxart;
  const images = boxart?.data?.[String(match.id)] ?? [];
  const front = images.find((i) => i.type === 'boxart' && i.side === 'front') ?? images.find((i) => i.type === 'boxart');
  if (!front) return undefined;
  return `${boxart.base_url.large}${front.filename}`;
}

const missing = [];
for (const game of todo) {
  const cleaned = stripSuffix(game.title);
  let url = await findBoxArtUrl(cleaned, game.platformId);
  if (!url && cleaned !== game.title) url = await findBoxArtUrl(game.title, game.platformId);
  if (url) {
    covers[game.id] = url;
  } else {
    missing.push(game.title);
  }
  await sleep(250);
}

fs.writeFileSync(outPath, `// Generato da scripts/fetch-tgdb-covers.mjs\nexport const TGDB_CONSOLE_COVER_URLS: Record<string, string> = ${JSON.stringify(covers, null, 2)};\n`);
fs.writeFileSync(path.join(root, 'scripts/tgdb-console-missing.txt'), missing.join('\n') + '\n');
console.log(`Copertine TGDB trovate: ${Object.keys(covers).length}/${todo.length}`);
console.log(`Ancora mancanti: ${missing.length}`);
