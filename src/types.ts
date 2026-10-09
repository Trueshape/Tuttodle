export type CategoryId = 'calcio' | 'league-of-legends' | 'automobili' | 'film' | 'anime' | 'videogiochi' | 'videogiochi-2';

export type GameMode = 'daily' | 'infinite';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  iconName: string;
  badge: string;
  color: string; // Tailwind color name like 'emerald', 'sky', 'amber', 'rose', 'purple', 'indigo'
  watermarkCode?: string;
  bgGradient: string;
  sourceInfo: string;
  sourceInfoEn?: string;
  miniGames: MiniGameInfo[];
}

export interface MiniGameInfo {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
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
export type LolLanguage = 'it' | 'en';

export interface LolChampion {
  id: string;
  name: string;
  title: string;
  titleEn?: string;
  icon: string; // Riot DDragon URL
  splashUrl?: string;
  gender: 'Maschio' | 'Femmina' | 'Altro';
  positions: ('Top' | 'Jungle' | 'Mid' | 'Bot' | 'Support')[];
  species: string[];
  speciesEn?: string[];
  resource: 'Mana' | 'Energia' | 'Senza Risorsa' | 'Salute' | 'Furia' | 'Flusso' | 'Scudo';
  rangeType: 'Melee' | 'Ranged' | 'Hybrid';
  regions: string[];
  regionsEn?: string[];
  releaseYear: number;
}

export interface LolAbility {
  id: string; // e.g. "Ahri-Q"
  championId: string; // e.g. "Ahri"
  championName: string; // e.g. "Ahri"
  championNameEn?: string;
  slot: 'P' | 'Q' | 'W' | 'E' | 'R';
  name: string; // e.g. "Globo dell'inganno"
  nameEn: string; // e.g. "Orb of Deception"
  description: string;
  descriptionEn: string;
  iconUrl: string;
}

export interface LolArtwork {
  id: string; // e.g. "Ahri_14"
  championId: string;
  championName: string;
  skinNum: number;
  artworkName: string; // e.g. "Ahri Guardiana Stellare"
  artworkNameEn: string; // e.g. "Star Guardian Ahri"
  splashUrl: string;
}

export interface LolQuote {
  id: string; // e.g. "Yasuo_01"
  championId: string; // e.g. "Yasuo"
  championName: string; // "Yasuo"
  quoteIt: string;
  quoteEn: string;
  quoteTypeIt: string;
  quoteTypeEn: string;
}

// 3. AUTOMOBILI / CARS
export interface CarModel {
  id: string;
  name: string; // e.g., "Ferrari F40"
  brand: string; // e.g., "Ferrari"
  country: string; // e.g., "Italia"
  flag: string;
  bodyType: 'Supercar' | 'Berlina' | 'SUV' | 'Coupé' | 'Hatchback' | 'Cabrio' | 'Hypercar';
  engineType: 'V8' | 'V12' | 'V10' | 'V6' | 'W16' | 'Inline-6' | 'Inline-5' | 'Inline-4' | 'Flat-6' | 'Elettrico' | 'Ibrido' | 'Rotativo Wankel';
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
  genres: string[]; // Gameplay genres: Avventura, Azione, GDR, Platform, Sparatutto, Picchiaduro, etc.
  themes?: string[]; // Narrative / setting themes: Fantasy, Sci-Fi, Storico, Arti Marziali, Cyberpunk, etc.
  perspective: '1a Persona' | '3a Persona' | 'Isometrica' | '2D Side-Scroller' | 'Top-Down';
  mainPlatform: 'PC / Multi' | 'PlayStation' | 'Nintendo' | 'Xbox';
  platforms?: string[]; // Specific consoles: PS1, PS2, PS3, PS4, PS5, Xbox, Xbox 360, Xbox One, Xbox Series X/S, SNES, N64, GameCube, Wii, Switch, PC, Dreamcast, etc.
  iconicQuote: string;
  coverUrl?: string;
  pegi?: string; // e.g. 'PEGI 3', 'PEGI 7', 'PEGI 12', 'PEGI 16', 'PEGI 18'
  gameModes?: string[]; // e.g. ['Giocatore singolo'], ['Giocatore singolo', 'Multiplayer', 'Co-op online']
  franchise?: string; // e.g. 'Crash Bandicoot', 'The Legend of Zelda', 'Dark Souls', 'Resident Evil'
  gameType?: 'Normale' | 'Remake' | 'Remaster'; // IGDB Category: Gioco Normale, Remake, Remaster
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
  isSameFranchise?: boolean;
}

export interface UserStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
  lastPlayedDate?: string;
  totalScore?: number;
}
