import fs from 'fs';
import { generateBoxArtSvg } from './generator_helpers.js';

function detectGameType(title, developer) {
  const t = title.toLowerCase();
  // Clear Remakes
  if (
    t.includes('remake') ||
    t.includes('rebirth') ||
    t.includes('reload') ||
    t.includes('retold') ||
    t.includes('twin snakes') ||
    t.includes('n. sane') ||
    t.includes('reignited') ||
    t.includes('all-stars') ||
    t.includes('dead space (2023)') ||
    t.includes('mafia: definitive edition')
  ) {
    return 'Remake';
  }
  // Clear Remasters / Enhanced editions
  if (
    t.includes('remaster') ||
    t.includes('definitive edition') ||
    t.includes('special edition') ||
    t.includes('enhanced') ||
    t.includes('hd') ||
    t.includes('anniversary') ||
    t.includes('collection') ||
    t.includes('ultimate edition') ||
    t.includes('crimewave') ||
    t.includes('director\'s cut') ||
    t.includes('restless dreams') ||
    t.includes('trilogy') ||
    t.includes('persona 4 golden') ||
    t.includes('become as gods edition')
  ) {
    return 'Remaster';
  }
  return 'Normale';
}

// 1. Process igdbTop100Games.ts
const igdbFilePath = 'src/data/igdbTop100Games.ts';
let igdbCode = fs.readFileSync(igdbFilePath, 'utf8');

// Read the array of IGDB_TOP_100_GAMES
const start = igdbCode.indexOf('export const IGDB_TOP_100_GAMES');
const eqIdx = igdbCode.indexOf('= [', start);
const arrayStart = igdbCode.indexOf('[', eqIdx);
const end = igdbCode.indexOf('\n];', arrayStart);
const jsonString = igdbCode.slice(arrayStart, end + 2);

const igdbGames = JSON.parse(jsonString);

let remakeCount = 0;
let remasterCount = 0;
let normalCount = 0;

const enrichedIgdbGames = igdbGames.map(game => {
  const plat = (game.platforms && game.platforms[0]) || game.mainPlatform || 'PC';
  const type = detectGameType(game.title, game.developer);

  if (type === 'Remake') remakeCount++;
  else if (type === 'Remaster') remasterCount++;
  else normalCount++;

  // Replace Wikimedia cover with robust SVG Box Art
  let icon = '🎮';
  let accent = '#6366f1';
  let bg = '#0f172a';
  const t = game.title.toLowerCase();

  if (t.includes('zelda') || t.includes('link')) { icon = '🗡️'; accent = '#00e5ff'; bg = '#002b4d'; }
  else if (t.includes('mario') || t.includes('kart')) { icon = '🍄'; accent = '#ffd700'; bg = '#b71c1c'; }
  else if (t.includes('halo') || t.includes('chief')) { icon = '🪐'; accent = '#52b848'; bg = '#0d1b2a'; }
  else if (t.includes('pokemon')) { icon = '⚡'; accent = '#ffd600'; bg = '#c2185b'; }
  else if (t.includes('souls') || t.includes('elden') || t.includes('bloodborne')) { icon = '🔥'; accent = '#ff5722'; bg = '#1a0005'; }
  else if (t.includes('metal gear') || t.includes('snake')) { icon = '🦊'; accent = '#00e676'; bg = '#1a252f'; }
  else if (t.includes('resident evil') || t.includes('silent hill')) { icon = '🧟'; accent = '#ff1744'; bg = '#1a0000'; }
  else if (t.includes('witcher')) { icon = '🐺'; accent = '#ff9800'; bg = '#1b263b'; }
  else if (t.includes('crash')) { icon = '🦊'; accent = '#ff9100'; bg = '#bf360c'; }
  else if (t.includes('sonic')) { icon = '🦔'; accent = '#00e5ff'; bg = '#0d47a1'; }
  else if (t.includes('portal')) { icon = '🌀'; accent = '#00e5ff'; bg = '#102027'; }
  else if (t.includes('half-life')) { icon = '🪓'; accent = '#ff9800'; bg = '#261c14'; }
  else if (t.includes('god of war')) { icon = '🪓'; accent = '#ff1744'; bg = '#3e0000'; }
  else if (t.includes('red dead') || t.includes('gta') || t.includes('grand theft auto')) { icon = '🤠'; accent = '#ffd54f'; bg = '#3e1b00'; }

  const newCover = generateBoxArtSvg({
    title: game.title,
    consoleKey: plat,
    developer: game.developer,
    year: game.releaseYear,
    genre: game.genres[0],
    pegi: game.pegi || 'PEGI 12',
    themeBg: bg,
    accentColor: accent,
    iconSymbol: icon
  });

  return {
    ...game,
    gameType: type,
    coverUrl: newCover
  };
});

console.log(`IGDB enriched: ${enrichedIgdbGames.length} games (Normale: ${normalCount}, Remake: ${remakeCount}, Remaster: ${remasterCount})`);

// Write back updated IGDB games
const newIgdbCode = igdbCode.slice(0, arrayStart) + JSON.stringify(enrichedIgdbGames, null, 2) + igdbCode.slice(end + 1);
fs.writeFileSync(igdbFilePath, newIgdbCode, 'utf8');
console.log('Saved updated igdbTop100Games.ts');

// 2. Process all console files in src/data/consoles/
const consoleDir = 'src/data/consoles';
const files = fs.readdirSync(consoleDir);
let totalConsoleUpdated = 0;

files.forEach(file => {
  if (!file.endsWith('.ts') || file === 'index.ts') return;
  const p = `${consoleDir}/${file}`;
  const code = fs.readFileSync(p, 'utf8');
  const eqIdx = code.indexOf('= [');
  if (eqIdx === -1) return;
  const arrStart = code.indexOf('[', eqIdx);
  const arrEnd = code.lastIndexOf(']');
  const list = JSON.parse(code.slice(arrStart, arrEnd + 1));

  const updated = list.map(item => ({
    ...item,
    gameType: item.gameType || detectGameType(item.title, item.developer)
  }));

  const varMatch = code.match(/export const ([A-Za-z0-9_]+): VideoGameItem\[\]/);
  const varName = varMatch ? varMatch[1] : 'GAMES';

  const newContent = `import { VideoGameItem } from '../../types';\n\nexport const ${varName}: VideoGameItem[] = ${JSON.stringify(updated, null, 2)};\n`;
  fs.writeFileSync(p, newContent, 'utf8');
  totalConsoleUpdated += updated.length;
  console.log(`Updated ${file} with gameType (${updated.length} games)`);
});

console.log(`Total console games enriched with gameType: ${totalConsoleUpdated}`);
