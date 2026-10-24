// Crea src/data/consoles/igdbTop200.ts: per ogni console del catalogo, i primi 200 giochi IGDB
// per numero di recensioni che hanno una copertina. Legge data/raw/igdb-<console>.json.
// Uso: node scripts/build-igdb-top200.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'src/data/consoles/igdbTop200.ts');
const LIMIT = 200;

const CONSOLES = [
  ['igdb-ps1', 'PS1', 'PlayStation'],
  ['igdb-ps2', 'PS2', 'PlayStation'],
  ['igdb-ps3', 'PS3', 'PlayStation'],
  ['igdb-ps4', 'PS4', 'PlayStation'],
  ['igdb-ps5', 'PS5', 'PlayStation'],
  ['igdb-xbox', 'Xbox', 'Xbox'],
  ['igdb-xbox360', 'Xbox 360', 'Xbox'],
  ['igdb-xboxone', 'Xbox One', 'Xbox'],
  ['igdb-xbox-series', 'Xbox Series X/S', 'Xbox'],
  ['igdb-snes', 'SNES', 'Nintendo'],
  ['igdb-n64', 'N64', 'Nintendo'],
  ['igdb-gamecube', 'GameCube', 'Nintendo'],
  ['igdb-wii', 'Wii', 'Nintendo'],
  ['igdb-switch', 'Switch', 'Nintendo'],
  ['igdb-nds', 'Nintendo DS', 'Nintendo'],
  ['igdb-wiiu', 'Wii U', 'Nintendo'],
  ['igdb-nes', 'NES', 'Nintendo'],
  ['igdb-gameboy', 'Game Boy', 'Nintendo'],
  ['igdb-gbc', 'GBC', 'Nintendo'],
  ['igdb-psp', 'PSP', 'PlayStation'],
  ['igdb-3ds', 'Nintendo 3DS', 'Nintendo'],
  ['igdb-megadrive', 'Mega Drive', 'Sega'],
  ['igdb-gba', 'Game Boy Advance', 'Nintendo'],
  ['igdb-saturn', 'Sega Saturn', 'Sega'],
  ['igdb-dreamcast', 'Dreamcast', 'Sega'],
  ['igdb-vita', 'PS Vita', 'PlayStation'],
  ['igdb-mastersystem', 'Master System', 'Sega'],
];

const PERSPECTIVES = ['3a Persona'];

const items = [];
for (const [file, label, brand] of CONSOLES) {
  const games = JSON.parse(fs.readFileSync(path.join(root, 'data/raw', `${file}.json`), 'utf8'));
  const withCover = games
    .filter((g) => g.name && g.cover?.image_id && g.aggregated_rating != null)
    .sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
  const topN = withCover.slice(0, LIMIT);
  const minReviews = label === 'Switch' ? 50 : ['SNES', 'NES', 'N64', 'GBC', 'Game Boy'].includes(label) ? 4 : 10;
  const top = [...topN, ...withCover.slice(LIMIT).filter((g) => g.aggregated_rating > 90 || g.rating_count > minReviews)];
  for (const g of top) {
    const developer = (g.involved_companies || []).find((c) => c.developer)?.company?.name || 'Sconosciuto';
    const releaseYear = g.first_release_date ? new Date(g.first_release_date * 1000).getUTCFullYear() : 0;
    const genres = (g.genres || []).map((x) => x.name);
    const themes = (g.themes || []).map((x) => x.name);
    const modes = (g.game_modes || []).map((x) => x.name);
    items.push({
      id: `igdb-${file.replace('igdb-', '')}-${g.id}`,
      title: g.name,
      developer,
      releaseYear,
      genres: genres.length ? genres : ['Generico'],
      themes: themes.length ? themes : undefined,
      franchise: g.franchise?.name || g.collection?.name || undefined,
      perspective: PERSPECTIVES[0],
      mainPlatform: brand,
      platforms: [label],
      iconicQuote: '',
      coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg`,
      gameModes: modes.length ? modes : undefined,
      igdbRating: g.aggregated_rating ? Math.round(g.aggregated_rating) : undefined,
      igdbReviews: g.rating_count || 0,
    });
  }
  console.log(`${label}: ${top.length}`);
}

const body = items.map((i) => '  ' + JSON.stringify(i)).join(',\n');
fs.writeFileSync(
  outPath,
  `// Generato da scripts/build-igdb-top200.mjs\nimport { VideoGameItem } from '../../types';\n\nconst RAW_TOP200: unknown[] = [\n${body}\n];\n\nexport const IGDB_TOP200_GAMES = RAW_TOP200 as (VideoGameItem & { igdbRating?: number; igdbReviews?: number })[];\n`,
);
console.log(`Totale: ${items.length}`);
