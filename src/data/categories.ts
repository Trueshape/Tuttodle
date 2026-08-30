import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'calcio',
    title: 'Calcio',
    subtitle: 'Indovina il calciatore dalla sua carriera e trasferimenti',
    iconName: 'Trophy',
    badge: 'Transfermarkt',
    color: 'green',
    watermarkCode: 'FT',
    bgGradient: 'from-green-900/40 via-emerald-950/20 to-zinc-950',
    sourceInfo: 'Fonte: Transfermarkt',
    miniGames: [
      { id: 'carriera', title: 'Carriera & Trasferimenti', description: 'Analizza la cronologia delle squadre e indovina il calciatore', isAvailable: true },
      { id: 'nazionali', title: 'Carriera Nazionale (Prossimamente)', description: 'Indovina il calciatore solo dalle presenze in nazionale', isAvailable: false },
    ]
  },
  {
    id: 'league-of-legends',
    title: 'League of Legends',
    subtitle: 'Citazioni e Abilità dei Campioni',
    iconName: 'Swords',
    badge: 'Data Dragon',
    color: 'amber',
    watermarkCode: 'LOL',
    bgGradient: 'from-amber-900/40 via-yellow-950/20 to-zinc-950',
    sourceInfo: 'Fonte: Riot DataDragon',
    miniGames: [
      { id: 'classico', title: 'Campione Classico', description: 'Indovina il campione con Genere, Posizione, Specie, Risorsa, Anno', isAvailable: true },
      { id: 'abilita', title: 'Icona Abilità (Prossimamente)', description: 'Indovina il campione dall\'icona della spell', isAvailable: false },
    ]
  },
  {
    id: 'automobili',
    title: 'Automobili',
    subtitle: 'Specifiche tecniche e prestazioni',
    iconName: 'Car',
    badge: 'CarAPI',
    color: 'blue',
    watermarkCode: 'CR',
    bgGradient: 'from-blue-900/40 via-sky-950/20 to-zinc-950',
    sourceInfo: 'Fonte: CarAPI & Archivi',
    miniGames: [
      { id: 'specs', title: 'Specifiche & Prestazioni', description: 'Nazione, Cilindrata, Cavalli, Trazione e Anno di lancio', isAvailable: true },
      { id: 'silhouette', title: 'Silhouette & Logo (Prossimamente)', description: 'Indovina il modello dalla sagoma scura dell\'auto', isAvailable: false },
    ]
  },
  {
    id: 'film',
    title: 'Cinema & Film',
    subtitle: 'Cast, Registi e Citazioni',
    iconName: 'Clapperboard',
    badge: 'TMDB',
    color: 'cyan',
    watermarkCode: 'MV',
    bgGradient: 'from-cyan-900/40 via-teal-950/20 to-zinc-950',
    sourceInfo: 'Fonte: TMDB & BoxOffice',
    miniGames: [
      { id: 'film-stats', title: 'Indovina il Film', description: 'Confronta Regista, Anno, Genere, Protagonisti e Incassi', isAvailable: true },
      { id: 'citazioni', title: 'Citazioni Famosi (Prossimamente)', description: 'Indovina la pellicola dalla sua frase celebre', isAvailable: false },
    ]
  },
  {
    id: 'anime',
    title: 'Anime',
    subtitle: 'Silhouettes e OST iconiche',
    iconName: 'Tv',
    badge: 'Jikan API',
    color: 'purple',
    watermarkCode: 'AN',
    bgGradient: 'from-purple-900/40 via-violet-950/20 to-zinc-950',
    sourceInfo: 'Fonte: Jikan API',
    miniGames: [
      { id: 'anime-stats', title: 'Studio & Genere', description: 'Indovina l\'anime confrontando Studio, Anno, Genere e Fonte', isAvailable: true },
      { id: 'opening', title: 'Colonna Sonora (Prossimamente)', description: 'Indovina l\'anime ascoltando l\'OST o Opening', isAvailable: false },
    ]
  },
  {
    id: 'videogiochi',
    title: 'Videogiochi',
    subtitle: 'Indovina il titolo dal frame e dettagli',
    iconName: 'Gamepad2',
    badge: 'RAWG API',
    color: 'rose',
    watermarkCode: 'VG',
    bgGradient: 'from-rose-900/40 via-pink-950/20 to-zinc-950',
    sourceInfo: 'Fonte: RAWG API',
    miniGames: [
      { id: 'game-specs', title: 'Sviluppatore & Dettagli', description: 'Confronta Sviluppatore, Anno, Genere, Prospettiva e Piattaforme', isAvailable: true },
      { id: 'pixel', title: 'Immagine sfuocata (Prossimamente)', description: 'Indovina lo screenshot sfuocato del gioco', isAvailable: false },
    ]
  }
];
