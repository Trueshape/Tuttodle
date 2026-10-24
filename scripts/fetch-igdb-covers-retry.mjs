// Secondo passaggio: per i giochi console senza copertina, riprova su IGDB con il titolo senza suffissi tra parentesi.
// Uso: node scripts/fetch-igdb-covers-retry.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const consolesDir = path.join(root, 'src/data/consoles');
const outPath = path.join(root, 'src/data/igdbConsoleCovers.ts');

const env = Object.fromEntries(
  fs.readFileSync(path.join(root, '.env.local'), 'utf-8')
    .split(/\r?\n/)
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const i = line.indexOf('=');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);
const clientId = env.IGDB_CLIENT_ID;
const clientSecret = env.IGDB_CLIENT_SECRET;

const existing = fs.readFileSync(outPath, 'utf-8');
const covers = Object.fromEntries(
  [...existing.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);

const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
  method: 'POST',
  body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
});
if (!tokenRes.ok) throw new Error(`Token Twitch fallito: HTTP ${tokenRes.status}`);
const { access_token: token } = await tokenRes.json();

const games = [];
for (const file of fs.readdirSync(consolesDir).filter((f) => f.endsWith('Games.ts'))) {
  const source = fs.readFileSync(path.join(consolesDir, file), 'utf-8');
  for (const m of source.matchAll(/"id":\s*"([^"]+)",\s*"title":\s*"((?:[^"\\]|\\.)*)"/g)) {
    games.push({ id: m[1], title: JSON.parse(`"${m[2]}"`) });
  }
}
const todo = games.filter((g) => !covers[g.id]);

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const stripSuffix = (t) => t.replace(/\s*\([^)]*\)\s*$/, '').trim();

async function search(title) {
  const query = `search "${title.replace(/"/g, '\\"')}"; fields name,cover.image_id; limit 5;`;
  const res = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: { 'Client-ID': clientId, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
    body: query,
  });
  if (res.status === 429) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return search(title);
  }
  if (!res.ok) throw new Error(`IGDB HTTP ${res.status} per "${title}"`);
  const hits = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 280));
  return hits.find((h) => h.cover?.image_id && norm(h.name) === norm(title));
}

const missing = [];
for (const game of todo) {
  const cleaned = stripSuffix(game.title);
  const hit = (await search(cleaned)) ?? (cleaned !== game.title ? await search(game.title) : undefined);
  if (hit) {
    covers[game.id] = hit.cover.image_id;
  } else {
    missing.push(game.title);
  }
}

fs.writeFileSync(outPath, `// Generato da scripts/fetch-igdb-covers.mjs e scripts/fetch-igdb-covers-retry.mjs\nexport const IGDB_CONSOLE_COVER_IDS: Record<string, string> = ${JSON.stringify(covers, null, 2)};\n`);
fs.writeFileSync(path.join(root, 'scripts/igdb-console-missing.txt'), missing.join('\n') + '\n');
console.log(`Copertine totali: ${Object.keys(covers).length}/${games.length}`);
console.log(`Ancora mancanti: ${missing.length}`);
