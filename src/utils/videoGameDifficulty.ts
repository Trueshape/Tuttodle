import { VideoGameItem } from '../types';

export type VideoGameDifficulty = 'all' | 'easy' | 'medium' | 'hard';

// Recognizable global franchises & mainstream titans for Easy
const EASY_FRANCHISE_KEYWORDS = [
  'mario',
  'zelda',
  'pokemon',
  'pokémon',
  'grand theft auto',
  'gta',
  'minecraft',
  'witcher',
  'god of war',
  'red dead',
  'elden ring',
  'the last of us',
  'last of us',
  'crash bandicoot',
  'skyrim',
  'elder scrolls',
  'halo',
  'resident evil',
  'call of duty',
  'dark souls',
  'final fantasy',
  'assassin',
  'metal gear',
  'uncharted',
  'sonic',
  'spider-man',
  'batman',
  'horizon',
  'cyberpunk',
  'fortnite',
  'tomb raider',
  'doom',
  'gran turismo',
  'tekken',
  'street fighter',
  'need for speed',
  'fifa',
  'kingdom hearts',
  'spyro',
  'super smash',
  'donkey kong',
  'mortal kombat',
];

// Medium criteria keywords
const MEDIUM_FRANCHISE_KEYWORDS = [
  'bioshock',
  'mass effect',
  'persona',
  'portal',
  'half-life',
  'bloodborne',
  'sekiro',
  'hollow knight',
  'shadow of the colossus',
  'silent hill',
  'fallout',
  'chrono trigger',
  'monster hunter',
  'castlevania',
  'metroid',
  'devil may cry',
  'rayman',
  'jak and daxter',
  'ratchet',
  'banjo',
  'tony hawk',
  'dead space',
  'alan wake',
  'dishonored',
  'borderlands',
  'overwatch',
  'deus ex',
  'hitman',
  'far cry',
  'diablo',
  'star wars',
  'yakuza',
  'dragon quest',
  'xenoblade',
  'fire emblem',
  'bayonetta',
  'celeste',
  'hades',
  'cuphead',
  'ico',
  'nier',
];

export function getGameDifficulty(game: VideoGameItem): 'easy' | 'medium' | 'hard' {
  const titleLower = game.title.toLowerCase();
  const franchiseLower = (game.franchise || '').toLowerCase();
  const rating = (game as { igdbRating?: number }).igdbRating || 0;

  // 1. EASY: Universal cultural icons & mainstream giants
  const isEasyFranchise = EASY_FRANCHISE_KEYWORDS.some(
    (kw) => titleLower.includes(kw) || franchiseLower.includes(kw)
  );

  if (isEasyFranchise) {
    return 'easy';
  }

  // Also if rating is exceptionally high (>= 93) and released >= 2000
  if (rating >= 93 && game.releaseYear >= 2000) {
    return 'easy';
  }

  // 2. MEDIUM: Acclaimed classics and high-rated community favorites
  const isMediumFranchise = MEDIUM_FRANCHISE_KEYWORDS.some(
    (kw) => titleLower.includes(kw) || franchiseLower.includes(kw)
  );

  if (isMediumFranchise || rating >= 83) {
    return 'medium';
  }

  // 3. HARD: Deep library, obscure/retro gems, niche console exclusives
  return 'hard';
}

export function gameMatchesDifficulty(
  game: VideoGameItem,
  selectedDifficulty: VideoGameDifficulty
): boolean {
  if (selectedDifficulty === 'all') return true;
  return getGameDifficulty(game) === selectedDifficulty;
}

export interface DifficultyOption {
  key: VideoGameDifficulty;
  labelIt: string;
  labelEn: string;
  descIt: string;
  descEn: string;
  icon: string;
  badgeClass: string;
  activeBtnClass: string;
}

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    key: 'easy',
    labelIt: 'Facile',
    labelEn: 'Easy',
    descIt: 'Icone Globali & Saghe Famose (es. Mario, Zelda, GTA, Pokemon, Witcher)',
    descEn: 'Global Icons & Famous Sagas (e.g. Mario, Zelda, GTA, Pokemon, Witcher)',
    icon: '🟢',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    activeBtnClass: 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/40',
  },
  {
    key: 'medium',
    labelIt: 'Medio',
    labelEn: 'Medium',
    descIt: 'Grandi Classici & Voto Alto (es. BioShock, Persona, Dark Souls, Half-Life)',
    descEn: 'Great Classics & High Ratings (e.g. BioShock, Persona, Dark Souls, Half-Life)',
    icon: '🟡',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    activeBtnClass: 'bg-amber-600 text-white border-amber-500 shadow-amber-900/40',
  },
  {
    key: 'hard',
    labelIt: 'Difficile',
    labelEn: 'Hard',
    descIt: 'Catalogo Completo, Retrogaming & Perle Console (1000+ giochi)',
    descEn: 'Complete Library, Retrogaming & Console Gems (1000+ games)',
    icon: '🔴',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    activeBtnClass: 'bg-rose-600 text-white border-rose-500 shadow-rose-900/40',
  },
  {
    key: 'all',
    labelIt: 'Tutte',
    labelEn: 'All',
    descIt: 'Qualsiasi videogioco senza restrizione di difficoltà',
    descEn: 'Any videogame without difficulty restriction',
    icon: '🌐',
    badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    activeBtnClass: 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-900/40',
  },
];
