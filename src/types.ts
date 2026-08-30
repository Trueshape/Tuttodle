export type CategoryId = 'calcio' | 'league-of-legends' | 'automobili' | 'film' | 'anime' | 'videogiochi';

export type GameMode = 'daily' | 'infinite';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  color: string; // Tailwind color name like 'emerald', 'sky', 'amber', 'rose', 'purple', 'indigo'
  watermarkCode?: string;
  bgGradient: string;
  sourceInfo: string;
  miniGames: MiniGameInfo[];
}

export interface MiniGameInfo {
  id: string;
  title: string;
  description: string;
  isAvailable: boolean;
}

// 1. FOOTBALL / CALCIO
export interface FootballTransfer {
  years: string;
  club: string;
  countryFlag: string;
  isLoan?: boolean;
  appsAndGoals?: string;
}

export interface FootballPlayer {
  id: string;
  name: string;
  image?: string;
  nationality: string;
  flag: string;
  position: 'ATT' | 'CEN' | 'DIF' | 'POR'; // Attaccante, Centrocampista, Difensore, Portiere
  currentLeague: string;
  currentClub: string;
  age: number;
  transfers: FootballTransfer[];
  uclWinner: boolean;
  worldCupWinner: boolean;
  hints: {
    nationalTeamApps?: string;
    shirtNumber?: number;
    quoteOrFact?: string;
  };
}

// 2. LEAGUE OF LEGENDS
export interface LolChampion {
  id: string;
  name: string;
  title: string;
  icon: string; // Riot DDragon URL
  gender: 'Maschio' | 'Femmina' | 'Altro';
  positions: ('Top' | 'Jungle' | 'Mid' | 'Bot' | 'Support')[];
  species: string[];
  resource: 'Mana' | 'Energia' | 'Senza Risorsa' | 'Salute' | 'Furia' | 'Flusso' | 'Scudo';
  rangeType: 'Melee' | 'Ranged' | 'Hybrid';
  regions: string[];
  releaseYear: number;
}

// 3. AUTOMOBILI / CARS
export interface CarModel {
  id: string;
  name: string; // e.g., "Ferrari F40"
  brand: string; // e.g., "Ferrari"
  country: string; // e.g., "Italia"
  flag: string;
  bodyType: 'Supercar' | 'Berlina' | 'SUV' | 'Coupé' | 'Hatchback' | 'Cabrio' | 'Hypercar';
  engineType: 'V8' | 'V12' | 'V6' | 'W16' | 'Inline-4' | 'Flat-6' | 'Elettrico' | 'Ibrido' | 'Rotativo Wankel';
  drivetrain: 'RWD' | 'AWD' | 'FWD';
  horsepower: number;
  releaseYear: number;
  imageUrl?: string;
  sloganOrFact: string;
}

// 4. FILM / MOVIES
export interface MovieItem {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genres: string[];
  country: string;
  flag: string;
  leadActors: string[];
  boxOfficeTier: 'Blockbuster (>1B)' | 'Alto (500M-1B)' | 'Medio (100M-500M)' | 'Indie/Basso (<100M)';
  taglineOrQuote: string;
  posterUrl?: string;
}

// 5. ANIME
export interface AnimeItem {
  id: string;
  title: string;
  studio: string;
  releaseYear: number;
  genres: string[];
  episodeCount: number;
  sourceMaterial: 'Manga' | 'Light Novel' | 'Originale' | 'Videogioco';
  mainCharacter: string;
  coverUrl?: string;
}

// 6. VIDEOGIOCHI / VIDEO GAMES
export interface VideoGameItem {
  id: string;
  title: string;
  developer: string;
  releaseYear: number;
  genres: string[];
  perspective: '1a Persona' | '3a Persona' | 'Isometrica' | '2D Side-Scroller';
  mainPlatform: 'PC / Multi' | 'PlayStation' | 'Nintendo' | 'Xbox';
  iconicQuote: string;
  coverUrl?: string;
}

// MATCH TILE STATUS
export type MatchStatus = 'exact' | 'partial' | 'wrong';
export type ArrowDirection = 'up' | 'down' | 'none';

export interface AttributeMatch {
  label: string;
  value: string | number | string[];
  status: MatchStatus;
  arrow?: ArrowDirection;
}

export interface GuessRecord<T> {
  item: T;
  matches: AttributeMatch[];
  isCorrect: boolean;
}

export interface UserStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
  lastPlayedDate?: string;
}
