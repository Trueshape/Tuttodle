/// <reference types="vite/client" />
import { VideoGameItem } from '../../types';
import { PS1_GAMES } from './ps1Games';
import { PS1_IGDB_TEST_GAMES } from './ps1IgdbTest';
import { IGDB_TOP200_GAMES } from './igdbTop200';
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
  ...IGDB_TOP200_GAMES,
  ...(import.meta.env.VITE_PS1_POOL === 'igdb' ? PS1_IGDB_TEST_GAMES : PS1_GAMES),
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

const countForPlatform = (platform: string): number =>
  ALL_CONSOLE_GAMES.filter((g) => g.platforms?.includes(platform)).length;

export const CONSOLE_DATABASE_STATS: ConsoleDatabaseStat[] = [
  { key: 'PS1', name: 'PlayStation 1', brand: 'Sony', count: countForPlatform('PS1'), icon: '🎮', badge: 'PS1' },
  { key: 'PS2', name: 'PlayStation 2', brand: 'Sony', count: countForPlatform('PS2'), icon: '🎮', badge: 'PS2' },
  { key: 'PS3', name: 'PlayStation 3', brand: 'Sony', count: countForPlatform('PS3'), icon: '🎮', badge: 'PS3' },
  { key: 'PS4', name: 'PlayStation 4', brand: 'Sony', count: countForPlatform('PS4'), icon: '🎮', badge: 'PS4' },
  { key: 'PS5', name: 'PlayStation 5', brand: 'Sony', count: countForPlatform('PS5'), icon: '🎮', badge: 'PS5' },

  { key: 'SNES', name: 'Super Nintendo', brand: 'Nintendo', count: countForPlatform('SNES'), icon: '🍄', badge: 'SNES' },
  { key: 'N64', name: 'Nintendo 64', brand: 'Nintendo', count: countForPlatform('N64'), icon: '🍄', badge: 'N64' },
  { key: 'GameCube', name: 'Nintendo GameCube', brand: 'Nintendo', count: countForPlatform('GameCube'), icon: '🍄', badge: 'GameCube' },
  { key: 'Wii', name: 'Nintendo Wii', brand: 'Nintendo', count: countForPlatform('Wii'), icon: '🍄', badge: 'Wii' },
  { key: 'Switch', name: 'Nintendo Switch', brand: 'Nintendo', count: countForPlatform('Switch'), icon: '🍄', badge: 'Switch' },

  { key: 'Xbox', name: 'Xbox Original', brand: 'Microsoft', count: countForPlatform('Xbox'), icon: '🟩', badge: 'Xbox' },
  { key: 'Xbox 360', name: 'Xbox 360', brand: 'Microsoft', count: countForPlatform('Xbox 360'), icon: '🟩', badge: 'Xbox 360' },
  { key: 'Xbox One', name: 'Xbox One', brand: 'Microsoft', count: countForPlatform('Xbox One'), icon: '🟩', badge: 'Xbox One' },
  { key: 'Xbox Series X/S', name: 'Xbox Series X/S', brand: 'Microsoft', count: countForPlatform('Xbox Series X/S'), icon: '🟩', badge: 'Series X|S' },
];

export const CONSOLE_GAME_COUNTS: Record<string, number> = CONSOLE_DATABASE_STATS.reduce(
  (acc, item) => ({ ...acc, [item.key]: item.count }),
  {}
);

const brandTotal = (brand: string): number =>
  CONSOLE_DATABASE_STATS.filter((s) => s.brand === brand).reduce((sum, s) => sum + s.count, 0);

export const BRAND_SUMMARY_STATS = {
  Sony: brandTotal('Sony'),
  Nintendo: brandTotal('Nintendo'),
  Microsoft: brandTotal('Microsoft'),
  Total: ALL_CONSOLE_GAMES.length
};
