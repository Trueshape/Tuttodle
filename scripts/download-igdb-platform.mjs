// Scarica tutti i giochi IGDB di una piattaforma in data/raw/<nome>.json (grezzo, da filtrare dopo).
// Uso: node scripts/download-igdb-platform.mjs <igdb_platform_id> <nome_file>
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [platformId, name, ratedFlag] = process.argv.slice(2);
if (!platformId || !name) throw new Error('Uso: node scripts/download-igdb-platform.mjs <igdb_platform_id> <nome_file> [rated]');
const FILTERS = {
  rated: 'aggregated_rating != null',
  rated_or_5reviews: '(aggregated_rating != null | rating_count >= 5)',
};
const extraFilter = ratedFlag ? FILTERS[ratedFlag] : undefined;
if (ratedFlag && !extraFilter) throw new Error(`Filtro sconosciuto: ${ratedFlag}`);

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

const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
  method: 'POST',
  body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
});
if (!tokenRes.ok) throw new Error(`Token Twitch fallito: HTTP ${tokenRes.status}`);
const { access_token: token } = await tokenRes.json();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const games = [];
const PAGE = 500;

for (let offset = 0; ; offset += PAGE) {
  const query = `fields name,cover.image_id,first_release_date,franchise.name,collection.name,aggregated_rating,rating_count,category,version_parent,genres.name,themes.name,game_modes.name,involved_companies.company.name,involved_companies.developer,platforms;`
    + ` where platforms = (${platformId}) & version_parent = null${extraFilter ? ` & ${extraFilter}` : ''};`
    + ` sort rating_count desc; limit ${PAGE}; offset ${offset};`;
  const res = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: { 'Client-ID': clientId, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
    body: query,
  });
  if (res.status === 429) {
    await sleep(2000);
    offset -= PAGE;
    continue;
  }
  if (!res.ok) throw new Error(`IGDB HTTP ${res.status} a offset ${offset}`);
  const page = await res.json();
  games.push(...page);
  console.log(`offset ${offset}: +${page.length} (totale ${games.length})`);
  if (page.length < PAGE) break;
  await sleep(300);
}

const outDir = path.join(root, 'data/raw');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(games, null, 2));
console.log(`Salvati ${games.length} giochi in data/raw/${name}.json`);
