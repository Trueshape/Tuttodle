import { VideoGameItem } from '../../types';
import { PS1_GAMES } from './ps1Games';
import { PS2_GAMES } from './ps2Games';
import { PS3_GAMES } from './ps3Games';
import { PS4_GAMES } from './ps4Games';
import { PS5_GAMES } from './ps5Games';
import { XBOX_ORIGINAL_GAMES } from './xboxOriginalGames';
import { XBOX_360_GAMES } from './xbox360Games';
import { XBOX_ONE_GAMES } from './xboxOneGames';
import { XBOX_SERIES_X_GAMES } from './xboxSeriesXGames';
import { SNES_GAMES } from './snesGames';
import { N64_GAMES } from './n64Games';
import { GAMECUBE_GAMES } from './gamecubeGames';
import { WII_GAMES } from './wiiGames';
import { SWITCH_GAMES } from './switchGames';

export {
  PS1_GAMES,
  PS2_GAMES,
  PS3_GAMES,
  PS4_GAMES,
  PS5_GAMES,
  XBOX_ORIGINAL_GAMES,
  XBOX_360_GAMES,
  XBOX_ONE_GAMES,
  XBOX_SERIES_X_GAMES,
  SNES_GAMES,
  N64_GAMES,
  GAMECUBE_GAMES,
  WII_GAMES,
  SWITCH_GAMES
};

export const ALL_CONSOLE_GAMES: VideoGameItem[] = [
  ...PS1_GAMES,
  ...PS2_GAMES,
  ...PS3_GAMES,
  ...PS4_GAMES,
  ...PS5_GAMES,
  ...XBOX_ORIGINAL_GAMES,
  ...XBOX_360_GAMES,
  ...XBOX_ONE_GAMES,
  ...XBOX_SERIES_X_GAMES,
  ...SNES_GAMES,
  ...N64_GAMES,
  ...GAMECUBE_GAMES,
  ...WII_GAMES,
  ...SWITCH_GAMES,
];

export interface ConsoleDatabaseStat {
  key: string;
  name: string;
  brand: 'Sony' | 'Nintendo' | 'Microsoft';
  count: number;
  icon: string;
  badge: string;
}

export const CONSOLE_DATABASE_STATS: ConsoleDatabaseStat[] = [
  // Sony PlayStation
  { key: 'PS1', name: 'PlayStation 1', brand: 'Sony', count: PS1_GAMES.length, icon: '🎮', badge: 'PS1' },
  { key: 'PS2', name: 'PlayStation 2', brand: 'Sony', count: PS2_GAMES.length, icon: '🎮', badge: 'PS2' },
  { key: 'PS3', name: 'PlayStation 3', brand: 'Sony', count: PS3_GAMES.length, icon: '🎮', badge: 'PS3' },
  { key: 'PS4', name: 'PlayStation 4', brand: 'Sony', count: PS4_GAMES.length, icon: '🎮', badge: 'PS4' },
  { key: 'PS5', name: 'PlayStation 5', brand: 'Sony', count: PS5_GAMES.length, icon: '🎮', badge: 'PS5' },

  // Nintendo
  { key: 'SNES', name: 'Super Nintendo', brand: 'Nintendo', count: SNES_GAMES.length, icon: '🍄', badge: 'SNES' },
  { key: 'N64', name: 'Nintendo 64', brand: 'Nintendo', count: N64_GAMES.length, icon: '🍄', badge: 'N64' },
  { key: 'GameCube', name: 'Nintendo GameCube', brand: 'Nintendo', count: GAMECUBE_GAMES.length, icon: '🍄', badge: 'GameCube' },
  { key: 'Wii', name: 'Nintendo Wii', brand: 'Nintendo', count: WII_GAMES.length, icon: '🍄', badge: 'Wii' },
  { key: 'Switch', name: 'Nintendo Switch', brand: 'Nintendo', count: SWITCH_GAMES.length, icon: '🍄', badge: 'Switch' },

  // Microsoft Xbox
  { key: 'Xbox', name: 'Xbox Original', brand: 'Microsoft', count: XBOX_ORIGINAL_GAMES.length, icon: '🟩', badge: 'Xbox' },
  { key: 'Xbox 360', name: 'Xbox 360', brand: 'Microsoft', count: XBOX_360_GAMES.length, icon: '🟩', badge: 'Xbox 360' },
  { key: 'Xbox One', name: 'Xbox One', brand: 'Microsoft', count: XBOX_ONE_GAMES.length, icon: '🟩', badge: 'Xbox One' },
  { key: 'Xbox Series X/S', name: 'Xbox Series X/S', brand: 'Microsoft', count: XBOX_SERIES_X_GAMES.length, icon: '🟩', badge: 'Series X|S' },
];

export const CONSOLE_GAME_COUNTS: Record<string, number> = CONSOLE_DATABASE_STATS.reduce(
  (acc, item) => ({ ...acc, [item.key]: item.count }),
  {}
);

export const BRAND_SUMMARY_STATS = {
  Sony: PS1_GAMES.length + PS2_GAMES.length + PS3_GAMES.length + PS4_GAMES.length + PS5_GAMES.length,
  Nintendo: SNES_GAMES.length + N64_GAMES.length + GAMECUBE_GAMES.length + WII_GAMES.length + SWITCH_GAMES.length,
  Microsoft: XBOX_ORIGINAL_GAMES.length + XBOX_360_GAMES.length + XBOX_ONE_GAMES.length + XBOX_SERIES_X_GAMES.length,
  Total: ALL_CONSOLE_GAMES.length
};
