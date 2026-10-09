import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VideoGameItem, GameMode, CategoryId, LolLanguage, UserStats } from '../../types';
import { IGDB_TOP_100_GAMES, ALL_SEARCHABLE_GAMES } from '../../data/igdbTop100Games';
import { CONSOLE_DATABASE_STATS, BRAND_SUMMARY_STATS } from '../../data/consoles';
import { ConsoleBadge } from './PlatformIcons';
import { getDailyIndex, getTimeUntilNextDaily } from '../../utils/dailySeed';
import { getStats, saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { PixelatedCoverCanvas } from './PixelatedCoverCanvas';
import { VideoGameFilters, VideoGameFiltersState, DEFAULT_FILTERS, gameMatchesFilters } from './VideoGameFilters';
import { localizeSpecValue } from '../../utils/vgLocalization';
import { getSafeCoverUrl, getFallbackSvgCover } from '../../utils/boxArtGenerator';
import { getRealCoverUrl, getAlternativeCover } from '../../data/realGameCovers';
import { getDailySession, saveDailySession, getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import {
  Trophy,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flame,
  Calendar,
  Infinity as InfinityIcon,
  Play,
  SkipForward,
  Award,
  Grid,
  AlertTriangle,
  X,
} from 'lucide-react';

export type PixelGridSize = '5x6' | '6x8';

interface VideoGamePixelGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  onOpenHelp: () => void;
  gameList?: VideoGameItem[];
  categoryKey?: CategoryId;
  badgeTitle?: string;
  lang?: LolLanguage;
}

const DEFAULT_COLS = 6;
const DEFAULT_ROWS = 8;
const MAX_ATTEMPTS = 5;

// Rileva se un videogioco ha una copertina orizzontale (es. Nintendo 64, SNES o aspect ratio naturale > 1.05)
export const isLandscapeGame = (
  game?: VideoGameItem | null,
  detectedAspect?: number | null
): boolean => {
  if (detectedAspect !== undefined && detectedAspect !== null && detectedAspect > 0) {
    return detectedAspect > 1.05;
  }
  if (!game) return false;
  const plats = (game.platforms || []).map((p) => p.toLowerCase());
  const mainPlat = (game.mainPlatform || '').toLowerCase();
  const id = (game.id || '').toLowerCase();

  return (
    id.startsWith('n64-') ||
    id.startsWith('snes-') ||
    id.includes('nintendo-64') ||
    id.includes('super-nintendo') ||
    plats.includes('n64') ||
    plats.includes('snes') ||
    plats.includes('super nintendo') ||
    plats.includes('nintendo 64') ||
    mainPlat.includes('n64') ||
    mainPlat.includes('snes') ||
    mainPlat.includes('nintendo 64') ||
    mainPlat.includes('super nintendo')
  );
};

export const VideoGamePixelGame: React.FC<VideoGamePixelGameProps> = ({
  mode,
  onModeChange,
  onOpenHelp,
  gameList = IGDB_TOP_100_GAMES,
  categoryKey = 'videogiochi' as CategoryId,
  badgeTitle,
  lang = 'it',
}) => {
  // Modalità locale sincronizzata con la prop
  const [activeMode, setActiveMode] = useState<GameMode>(mode);
  const [gridSize, setGridSize] = useState<PixelGridSize>('5x6');
  const [naturalAspect, setNaturalAspect] = useState<number | null>(null);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  const handleSwitchMode = (newMode: GameMode) => {
    setActiveMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  // Copertine precedentemente flaggate fino ad ora: rimosse definitivamente dal pool su richiesta dell'utente
  const previouslyFlaggedGameIds = useMemo(() => {
    try {
      const stored = localStorage.getItem('omni_flagged_broken_covers');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => (typeof item === 'string' ? item : item.id)).filter(Boolean);
        }
      }
    } catch {}
    return [];
  }, []);

  // Mappa delle copertine sostituite per i giochi flaggati (il gioco rimane nel pool con la nuova cover assegnata)
  const [coverReplacements, setCoverReplacements] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('omni_cover_replacements');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Catalogo unificato di giochi con copertina autentica (Wikipedia box art / HTTP reale).
  // Esclude i giochi flaggati fino ad ora; per quelli futuri viene invece sostituita la cover senza rimuovere il gioco.
  const playableGames = useMemo(() => {
    return gameList
      .filter((g) => !previouslyFlaggedGameIds.includes(g.id))
      .map((g) => {
        const replacedCover = coverReplacements[g.id];
        const real = replacedCover || getRealCoverUrl(g) || (g.coverUrl && g.coverUrl.startsWith('http') ? g.coverUrl : undefined);
        if (real) {
          return { ...g, coverUrl: real };
        }
        return null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null) as VideoGameItem[];
  }, [gameList, previouslyFlaggedGameIds, coverReplacements]);

  // Filtri per la modalità Endless / Infinita
  const [filters, setFilters] = useState<VideoGameFiltersState>(DEFAULT_FILTERS);

  const availablePlatforms = useMemo(() => {
    const plats = new Set<string>();
    playableGames.forEach((g) => {
      if (g.platforms && g.platforms.length > 0) {
        g.platforms.forEach((p) => plats.add(p));
      } else if (g.mainPlatform) {
        plats.add(g.mainPlatform);
      }
    });
    return Array.from(plats).sort();
  }, [playableGames]);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    playableGames.forEach((g) => {
      (g.genres || []).forEach((gen) => genres.add(gen));
    });
    return Array.from(genres).sort();
  }, [playableGames]);

  const filteredPlayableGames = useMemo(() => {
    return playableGames.filter((g) => gameMatchesFilters(g, filters));
  }, [playableGames, filters]);

  const [targetGame, setTargetGame] = useState<VideoGameItem>(playableGames[0]);

  // Rilevamento orientamento naturale copertina (orizzontale come Nintendo 64 / SNES o verticale come PlayStation / Xbox)
  const isLandscape = useMemo(() => {
    return isLandscapeGame(targetGame, naturalAspect);
  }, [targetGame, naturalAspect]);

  // Se orizzontale (Nintendo 64, SNES, etc.):
  //   - 48 tessere (standard / daily): 8x6 (8 colonne, 6 righe)
  //   - 30 tessere (modalità 5x6 scelta): 6x5 (6 colonne, 5 righe)
  // Se verticale (PlayStation, Xbox, Switch, etc.):
  //   - 48 tessere: 6x8 (6 colonne, 8 righe)
  //   - 30 tessere: 5x6 (5 colonne, 6 righe)
  const currentCols = isLandscape
    ? (activeMode === 'infinite' && gridSize === '5x6' ? 6 : 8)
    : (activeMode === 'infinite' && gridSize === '5x6' ? 5 : DEFAULT_COLS);

  const currentRows = isLandscape
    ? (activeMode === 'infinite' && gridSize === '5x6' ? 5 : 6)
    : (activeMode === 'infinite' && gridSize === '5x6' ? 6 : DEFAULT_ROWS);

  const currentTotalTiles = currentCols * currentRows;

  // Aspect ratio effettivo derivato dalle dimensioni originali della cover per evitare qualsiasi taglio dei bordi
  const effectiveAspect = useMemo(() => {
    if (naturalAspect && naturalAspect > 0) {
      return Math.max(0.60, Math.min(1.65, naturalAspect));
    }
    return currentCols / currentRows;
  }, [naturalAspect, currentCols, currentRows]);

  // Larghezza reattiva proporzionata alla forma della copertina
  const containerWidthClass = useMemo(() => {
    if (effectiveAspect >= 1.15) {
      return 'max-w-[420px] sm:max-w-[480px]';
    }
    if (effectiveAspect >= 0.92) {
      // Quadrato (es. PS1 CD jewel case, Game Boy)
      return 'max-w-[340px] sm:max-w-[380px]';
    }
    // Verticale (es. PS2, PS3, PS4, Xbox, Switch)
    return 'max-w-[300px] sm:max-w-[340px]';
  }, [effectiveAspect]);

  // Rileva in background l'aspect ratio reale dell'immagine per mostrare proporzioni perfette senza stretch
  useEffect(() => {
    setNaturalAspect(null);
    const cover = getSafeCoverUrl(targetGame);
    if (!cover) return;

    let isMounted = true;
    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';
    testImg.referrerPolicy = 'no-referrer';
    testImg.onload = () => {
      if (isMounted && testImg.naturalWidth && testImg.naturalHeight) {
        setNaturalAspect(testImg.naturalWidth / testImg.naturalHeight);
      }
    };
    testImg.src = cover;
    if (testImg.complete && testImg.naturalWidth > 0) {
      setNaturalAspect(testImg.naturalWidth / testImg.naturalHeight);
    }
    return () => {
      isMounted = false;
    };
  }, [targetGame]);

  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [guessHistory, setGuessHistory] = useState<VideoGameItem[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [earnedScore, setEarnedScore] = useState<number>(0);
  const [lastRevealedIndex, setLastRevealedIndex] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(getTimeUntilNextDaily());
  const [roundKey, setRoundKey] = useState<number>(1);
  const [isCoverObscured, setIsCoverObscured] = useState<boolean>(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Statistiche per la modalità Endless / Infinita
  const [endlessStreak, setEndlessStreak] = useState<number>(0);
  const [endlessBestStreak, setEndlessBestStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vg_pixel_endless_best_streak');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [endlessTotalScore, setEndlessTotalScore] = useState<number>(0);
  const [endlessGamesPlayed, setEndlessGamesPlayed] = useState<number>(0);
  const [playedGameIdsInSession, setPlayedGameIdsInSession] = useState<string[]>([]);

  // Statistiche per la modalità Daily (Streak corrente, Streak record, Totale punti del giocatore da sempre)
  const [dailyStats, setDailyStats] = useState<UserStats>(() => getStats(categoryKey, 'pixel'));

  useEffect(() => {
    setDailyStats(getStats(categoryKey, 'pixel'));
  }, [categoryKey, activeMode]);

  // Segnalazione copertine rotte o distorte (tasto X)
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportToast, setReportToast] = useState<string | null>(null);

  // Scorciatoia da tastiera 'X' per segnalare cover rotte (disponibile in ogni stato, anche a fine partita)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        setShowReportModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup del timer alla distruzione del componente
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Countdown timer per daily
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Inizializza partita
  const initGame = (
    customMode?: GameMode,
    customFilters?: VideoGameFiltersState,
    customGridSize?: PixelGridSize,
    forceNew: boolean = false
  ) => {
    if (playableGames.length === 0) return;

    // Oscura istantaneamente la cover per impedire qualsiasi glitch o anteprima nitida non autorizzata
    setIsCoverObscured(true);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    const currentModeToUse = customMode || activeMode;
    const currentFiltersToUse = customFilters || filters;
    const currentGridToUse = customGridSize || gridSize;

    // Totale tessere: 30 in modalità ridotta o 48 in modalità standard (invariato tra landscape e portrait)
    const activeTotalTiles = currentModeToUse === 'infinite' && currentGridToUse === '5x6' ? 30 : 48;

    // 1. Se non è richiesta esplicitamente una nuova partita, controlla se esiste una sessione salvata
    if (!forceNew) {
      const savedSession = getGameSession<VideoGameItem, VideoGameItem>(
        categoryKey,
        'pixel-cover',
        currentModeToUse
      );

      if (savedSession) {
        let restoredTarget: VideoGameItem | undefined = savedSession.targetItem;
        if (!restoredTarget && savedSession.targetId) {
          restoredTarget =
            playableGames.find((g) => g.id === savedSession.targetId) ||
            ALL_SEARCHABLE_GAMES.find((g) => g.id === savedSession.targetId) ||
            gameList.find((g) => g.id === savedSession.targetId);
        }

        if (restoredTarget) {
          setRoundKey((prev) => prev + 1);
          setTargetGame(restoredTarget);
          setNaturalAspect(null);

          const savedGuesses = savedSession.guesses || [];
          setGuessHistory(savedGuesses);

          const isOver = Boolean(savedSession.isGameOver);
          const isWon = Boolean(savedSession.isWon);
          setGameState(isWon ? 'won' : isOver ? 'lost' : 'playing');

          const finalEarned =
            savedSession.extra?.earnedScore ??
            (isWon ? Math.max(100, 500 - (savedGuesses.length - 1) * 100) : 0);
          setEarnedScore(finalEarned);

          const savedGrid = (savedSession.extra?.gridSize as PixelGridSize) || currentGridToUse;
          setGridSize(savedGrid);

          const effectiveTotal = currentModeToUse === 'infinite' && savedGrid === '5x6' ? 30 : 48;

          if (isOver) {
            setRevealedIndices(Array.from({ length: effectiveTotal }, (_, i) => i));
            setLastRevealedIndex(null);
          } else {
            const restoredTiles = (savedSession.extra?.revealedIndices as number[]) || [0];
            setRevealedIndices(restoredTiles);
            setLastRevealedIndex(restoredTiles[restoredTiles.length - 1] ?? null);
          }

          setFranchiseHint(savedSession.extra?.franchiseHint || null);

          transitionTimerRef.current = setTimeout(() => {
            setIsCoverObscured(false);
          }, 80);
          return;
        }
      }
    }

    // 2. Altrimenti, genera una nuova partita (Daily deterministica del giorno o nuova Endless)
    let chosen: VideoGameItem;
    let initialTileIndex: number;

    if (currentModeToUse === 'daily') {
      const gameIdx = getDailyIndex(categoryKey, 'pixel-cover', playableGames.length);
      chosen = playableGames[gameIdx];
      // Seed deterministico per la prima casella del giorno
      initialTileIndex = getDailyIndex(categoryKey, 'pixel-tile', activeTotalTiles);
    } else {
      // In modalità Endless: applica i filtri di piattaforma, anni ed esclusione generi
      const currentFiltered = playableGames.filter((g) => gameMatchesFilters(g, currentFiltersToUse));
      const activePool = currentFiltered.length > 0 ? currentFiltered : playableGames;
      const unplayed = activePool.filter((g) => !playedGameIdsInSession.includes(g.id));
      const finalPool = unplayed.length > 0 ? unplayed : activePool;
      const randIdx = Math.floor(Math.random() * finalPool.length);
      chosen = finalPool[randIdx];
      initialTileIndex = Math.floor(Math.random() * activeTotalTiles);

      setPlayedGameIdsInSession((prev) =>
        unplayed.length > 0 ? [...prev, chosen.id] : [chosen.id]
      );
    }

    setRoundKey((prev) => prev + 1);
    setTargetGame(chosen);
    setNaturalAspect(null);
    setRevealedIndices([initialTileIndex]);
    setLastRevealedIndex(initialTileIndex);
    setGuessHistory([]);
    setGameState('playing');
    setEarnedScore(0);
    setFranchiseHint(null);

    // Salva immediatamente lo stato della nuova partita attiva
    saveGameSession(categoryKey, 'pixel-cover', currentModeToUse, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosen,
      targetId: chosen.id,
      extra: {
        earnedScore: 0,
        revealedIndices: [initialTileIndex],
        gridSize: currentGridToUse,
        franchiseHint: null,
      },
    });

    // Rimuove il velo non appena il nuovo DOM con la cover pixellata è attivo
    transitionTimerRef.current = setTimeout(() => {
      setIsCoverObscured(false);
    }, 80);
  };

  const handleConfirmReportCover = () => {
    const gameToFlag = targetGame;
    setShowReportModal(false);

    // Controlla se c'è una copertina alternativa per rimpiazzare questa dalla prossima volta
    const currentCover = coverReplacements[gameToFlag.id] || targetGame.coverUrl;
    const alternateCover = getAlternativeCover(gameToFlag, currentCover);

    if (alternateCover) {
      const updatedReplacements = {
        ...coverReplacements,
        [gameToFlag.id]: alternateCover,
      };
      setCoverReplacements(updatedReplacements);
      try {
        localStorage.setItem('omni_cover_replacements', JSON.stringify(updatedReplacements));
      } catch {}

      setReportToast(
        lang === 'en'
          ? `Cover flagged for "${gameToFlag.title}". Alternate cover found and set for next time!`
          : `Cover di "${gameToFlag.title}" segnalata. Trovata e impostata copertina alternativa per la prossima volta!`
      );
    } else {
      setReportToast(
        lang === 'en'
          ? `Cover flagged for "${gameToFlag.title}". Loading next game...`
          : `Cover di "${gameToFlag.title}" segnalata. Nuova cover in caricamento...`
      );
    }

    setTimeout(() => {
      setReportToast(null);
    }, 3500);

    // NON rimuove il gioco dal pool: passa forzatamente alla prossima partita
    initGame('infinite', undefined, undefined, true);
  };

  useEffect(() => {
    initGame(activeMode);
  }, [activeMode]);

  const [franchiseHint, setFranchiseHint] = useState<string | null>(null);

  // Lista di ricerca per l'autocomplete (rispetta i filtri attivi in Endless)
  const searchOptions: SearchOption[] = useMemo(() => {
    const list = activeMode === 'infinite' ? filteredPlayableGames : playableGames;
    const uniqueMap = new Map<string, VideoGameItem>();

    list.forEach((g) => {
      const cleanT = g.title.replace(/\s*\((Xbox|Xbox\s*360|Xbox\s*One|Xbox\s*Series\s*X|PS1|PS2|PS3|PS4|PS5|Switch|GameCube|N64|SNES)\)$/i, '').trim();
      const normKey = (cleanT.toLowerCase().replace(/[^a-z0-9]/g, '') + '__' + (g.gameType || 'Normale')).toLowerCase();
      if (!uniqueMap.has(normKey)) {
        uniqueMap.set(normKey, { ...g, title: cleanT });
      } else {
        const existing = uniqueMap.get(normKey)!;
        const plats = new Set([...(existing.platforms || []), ...(g.platforms || [g.mainPlatform])]);
        existing.platforms = Array.from(plats);
      }
    });

    return Array.from(uniqueMap.values()).map((g) => {
      const lowerTitle = g.title.toLowerCase();
      const isRemaster =
        g.gameType === 'Remaster' ||
        lowerTitle.includes('remaster') ||
        lowerTitle.includes('anniversary') ||
        lowerTitle.includes('scholar of the first sin');
      const isRemake =
        g.gameType === 'Remake' ||
        lowerTitle.includes('remake') ||
        lowerTitle.includes('reload') ||
        lowerTitle.includes('rebirth');
      const isExpansion =
        lowerTitle.includes('expansion') ||
        lowerTitle.includes('espansione') ||
        lowerTitle.includes('dlc') ||
        lowerTitle.includes('definitive edition');

      let badge = lang === 'en' ? `ORIGINAL (${g.releaseYear})` : `ORIGINALE (${g.releaseYear})`;
      let badgeColor: 'cyan' | 'purple' | 'amber' | 'zinc' = 'zinc';
      let editionLabel = lang === 'en' ? 'Original Version' : 'Versione Originale';

      if (isRemake) {
        badge = lang === 'en' ? `REMAKE (${g.releaseYear})` : `REMAKE (${g.releaseYear})`;
        badgeColor = 'purple';
        editionLabel = 'Remake';
      } else if (isRemaster) {
        badge = lang === 'en' ? `REMASTER (${g.releaseYear})` : `REMASTER (${g.releaseYear})`;
        badgeColor = 'cyan';
        editionLabel = 'Remaster';
      } else if (isExpansion) {
        badge = lang === 'en' ? `EXPANSION (${g.releaseYear})` : `ESPANSIONE (${g.releaseYear})`;
        badgeColor = 'amber';
        editionLabel = lang === 'en' ? 'Expansion / Definitive' : 'Espansione / Definitiva';
      }

      const platformInfo = g.platforms && g.platforms.length > 0
        ? g.platforms.slice(0, 4).join('/') + (g.platforms.length > 4 ? '...' : '')
        : g.mainPlatform;

      return {
        id: g.id,
        name: g.title,
        subtitle: `${g.developer} • ${g.releaseYear} • [${editionLabel}] • ${platformInfo} • ${localizeSpecValue('Genere', g.genres.join(', '), lang)}`,
        iconUrl: activeMode === 'infinite' ? undefined : getSafeCoverUrl(g),
        badge,
        badgeColor,
      };
    }).sort((a, b) =>
      a.name.localeCompare(b.name, lang === 'en' ? 'en' : 'it', { sensitivity: 'base', numeric: true })
    );
  }, [activeMode, filteredPlayableGames, playableGames, lang]);

  // Sblocca una nuova casella casuale tra quelle non ancora rivelate
  const unlockRandomTile = (currentRevealed: number[]) => {
    const unrevealed: number[] = [];
    for (let i = 0; i < currentTotalTiles; i++) {
      if (!currentRevealed.includes(i)) {
        unrevealed.push(i);
      }
    }
    if (unrevealed.length === 0) return currentRevealed;

    const randomPick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    setLastRevealedIndex(randomPick);
    return [...currentRevealed, randomPick];
  };

  // Cambia dimensione griglia (5x6/6x5 o 6x8/8x6) SENZA cambiare il gioco corrente
  const handleGridSizeChange = (newSize: PixelGridSize) => {
    if (gridSize === newSize) return;
    setGridSize(newSize);

    const newTotal = newSize === '5x6' ? 30 : 48;

    if (gameState !== 'playing') {
      setRevealedIndices(Array.from({ length: newTotal }, (_, i) => i));
    } else {
      // Mantiene lo stesso numero di tessere sbloccate sul gioco corrente
      const targetCount = Math.min(newTotal, Math.max(1, guessHistory.length + 1));
      const newRevealed: number[] = [];
      while (newRevealed.length < targetCount) {
        const rand = Math.floor(Math.random() * newTotal);
        if (!newRevealed.includes(rand)) {
          newRevealed.push(rand);
        }
      }
      setRevealedIndices(newRevealed);
      setLastRevealedIndex(newRevealed[newRevealed.length - 1]);

      saveGameSession(categoryKey, 'pixel-cover', activeMode, {
        isWon: false,
        isGameOver: false,
        guesses: guessHistory,
        targetItem: targetGame,
        targetId: targetGame.id,
        extra: {
          earnedScore: 0,
          revealedIndices: newRevealed,
          gridSize: newSize,
          franchiseHint,
        },
      });
    }
  };

  // Gestione tentativo
  const handleMakeGuess = (option: SearchOption) => {
    if (gameState !== 'playing') return;

    // Controllo se già provato
    if (guessHistory.some((g) => g.id === option.id)) return;

    const guessedGame =
      playableGames.find((g) => g.id === option.id) ||
      ALL_SEARCHABLE_GAMES.find((g) => g.id === option.id) ||
      gameList.find((g) => g.id === option.id);
    if (!guessedGame) return;

    const isMatch = guessedGame.id === targetGame.id;
    const newHistory = [guessedGame, ...guessHistory];
    setGuessHistory(newHistory);

    // Se non è il gioco esatto ma appartiene allo stesso franchise/saga
    let currentHint = franchiseHint;
    if (!isMatch && guessedGame.franchise && targetGame.franchise) {
      if (guessedGame.franchise.toLowerCase().trim() === targetGame.franchise.toLowerCase().trim()) {
        currentHint = targetGame.franchise;
        setFranchiseHint(targetGame.franchise);
      }
    }

    if (isMatch) {
      // Vittoria!
      const finalScore = Math.max(100, 500 - guessHistory.length * 100);
      setEarnedScore(finalScore);
      setGameState('won');

      // Svela tutte le caselle
      const allIndices = Array.from({ length: currentTotalTiles }, (_, i) => i);
      setRevealedIndices(allIndices);

      if (activeMode === 'infinite') {
        const newStreak = endlessStreak + 1;
        setEndlessStreak(newStreak);
        if (newStreak > endlessBestStreak) {
          setEndlessBestStreak(newStreak);
          try {
            localStorage.setItem('vg_pixel_endless_best_streak', newStreak.toString());
          } catch {
            // ignore
          }
        }
        setEndlessTotalScore((prev) => prev + finalScore);
        setEndlessGamesPlayed((prev) => prev + 1);
      } else {
        const updatedStats = saveGameResult(categoryKey, 'pixel', true, newHistory.length, finalScore);
        setDailyStats(updatedStats);
      }

      saveGameSession(categoryKey, 'pixel-cover', activeMode, {
        isWon: true,
        isGameOver: true,
        guesses: newHistory,
        targetItem: targetGame,
        targetId: targetGame.id,
        extra: {
          earnedScore: finalScore,
          revealedIndices: allIndices,
          gridSize,
          franchiseHint: currentHint,
        },
      });
    } else {
      // Errore
      if (newHistory.length >= MAX_ATTEMPTS) {
        // Sconfitta (esauriti i 5 tentativi)
        setEarnedScore(0);
        setGameState('lost');
        const allIndices = Array.from({ length: currentTotalTiles }, (_, i) => i);
        setRevealedIndices(allIndices);

        if (activeMode === 'infinite') {
          setEndlessStreak(0);
          setEndlessGamesPlayed((prev) => prev + 1);
        } else {
          const updatedStats = saveGameResult(categoryKey, 'pixel', false, newHistory.length, 0);
          setDailyStats(updatedStats);
        }

        saveGameSession(categoryKey, 'pixel-cover', activeMode, {
          isWon: false,
          isGameOver: true,
          guesses: newHistory,
          targetItem: targetGame,
          targetId: targetGame.id,
          extra: {
            earnedScore: 0,
            revealedIndices: allIndices,
            gridSize,
            franchiseHint: currentHint,
          },
        });
      } else {
        // Sblocca un nuovo quadrato casuale
        const updatedTiles = unlockRandomTile(revealedIndices);
        setRevealedIndices(updatedTiles);

        // Salva lo stato in corso così se il giocatore cambia gioco o modalità e torna, ritrova la partita
        saveGameSession(categoryKey, 'pixel-cover', activeMode, {
          isWon: false,
          isGameOver: false,
          guesses: newHistory,
          targetItem: targetGame,
          targetId: targetGame.id,
          extra: {
            earnedScore: 0,
            revealedIndices: updatedTiles,
            gridSize,
            franchiseHint: currentHint,
          },
        });
      }
    }
  };

  // Salta gioco in modalità Endless
  const handleSkipEndless = () => {
    if (activeMode !== 'infinite') return;
    setGameState('lost');
    setEarnedScore(0);
    setEndlessStreak(0);
    setEndlessGamesPlayed((prev) => prev + 1);
    const allIndices = Array.from({ length: currentTotalTiles }, (_, i) => i);
    setRevealedIndices(allIndices);

    saveGameSession(categoryKey, 'pixel-cover', 'infinite', {
      isWon: false,
      isGameOver: true,
      guesses: guessHistory,
      targetItem: targetGame,
      targetId: targetGame.id,
      extra: {
        earnedScore: 0,
        revealedIndices: allIndices,
        gridSize,
        franchiseHint,
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
      {/* Header Info & Punteggio */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-white truncate">
            {lang === 'en' ? 'Pixel Cover' : 'Copertina Pixellata'}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {lang === 'en'
              ? 'Uncover the game tile by tile!'
              : 'Scopri il videogioco tessera dopo tessera!'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Serie Record in Endless o Statistiche Complete in Daily */}
          {activeMode === 'infinite' ? (
            <div
              className="flex flex-col items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 px-4 h-[50px] min-w-[76px] shadow-inner"
              title={lang === 'en' ? 'Best Streak Ever' : 'Miglior Serie di Sempre'}
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">
                <Award className={`h-3 w-3 ${endlessBestStreak > 0 ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span>RECORD</span>
              </div>
              <div className="text-base font-black text-indigo-300 leading-tight text-center mt-1">
                {endlessBestStreak}
              </div>
            </div>
          ) : (
            <>
              {/* Streak Corrente */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 px-3 sm:px-3.5 h-[50px] min-w-[68px] sm:min-w-[76px] shadow-inner">
                <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">
                  <Flame className={`h-3 w-3 ${dailyStats.currentStreak > 0 ? 'text-amber-400 animate-pulse' : 'text-zinc-500'}`} />
                  <span>STREAK</span>
                </div>
                <div className="text-base font-black text-amber-300 leading-tight text-center mt-1">
                  {dailyStats.currentStreak}
                </div>
              </div>

              {/* Streak Più Lunga */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 px-3 sm:px-3.5 h-[50px] min-w-[68px] sm:min-w-[76px] shadow-inner">
                <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">
                  <Award className="h-3 w-3 text-indigo-400" />
                  <span>{lang === 'en' ? 'RECORD' : 'RECORD'}</span>
                </div>
                <div className="text-base font-black text-indigo-300 leading-tight text-center mt-1">
                  {dailyStats.maxStreak}
                </div>
              </div>

              {/* Totale Punti da Sempre */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 px-3 sm:px-3.5 h-[50px] min-w-[76px] sm:min-w-[84px] shadow-inner">
                <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">
                  <Trophy className="h-3 w-3 text-amber-400" />
                  <span>{lang === 'en' ? 'TOTAL' : 'PUNTI'}</span>
                </div>
                <div className="text-base font-black text-amber-300 leading-tight text-center mt-1">
                  {(dailyStats.totalScore || 0).toLocaleString()}
                </div>
              </div>
            </>
          )}

          {/* Pulsante How to play con tooltip console database: identica dimensione del riquadro a fianco */}
          <div className="relative group">
            <button
              onClick={onOpenHelp}
              className="h-[50px] w-[50px] flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-indigo-500 hover:text-white transition shadow-sm cursor-pointer"
              title={
                lang === 'en'
                  ? `How to Play & Database Info - ${playableGames.length} Console Games (${BRAND_SUMMARY_STATS.Sony} PlayStation, ${BRAND_SUMMARY_STATS.Nintendo} Nintendo, ${BRAND_SUMMARY_STATS.Microsoft} Xbox)`
                  : `Come Giocare e Info Database - ${playableGames.length} Giochi Console (${BRAND_SUMMARY_STATS.Sony} PlayStation, ${BRAND_SUMMARY_STATS.Nintendo} Nintendo, ${BRAND_SUMMARY_STATS.Microsoft} Xbox)`
              }
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Hover Tooltip Popup con dettaglio giochi per ciascuna console */}
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 p-3.5 bg-zinc-950/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl shadow-2xl text-left pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2.5">
                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                  <span className="text-sm">🎮</span>
                  <span>{lang === 'en' ? 'Console Games Database' : 'Database Giochi per Console'}</span>
                </div>
                <span className="text-[10px] font-mono font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  {playableGames.length} {lang === 'en' ? 'games' : 'giochi'}
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                {/* Sony */}
                <div>
                  <div className="flex items-center justify-between text-blue-300 font-bold mb-1">
                    <span>🔷 Sony PlayStation ({BRAND_SUMMARY_STATS.Sony})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Sony').map((item) => (
                      <span
                        key={item.key}
                        className="inline-flex items-center gap-1 bg-zinc-900 border border-blue-900/40 px-1.5 py-0.5 rounded text-[10px]"
                      >
                        <span className="font-semibold text-zinc-300">{item.key}:</span>
                        <strong className="text-blue-300 font-mono">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nintendo */}
                <div>
                  <div className="flex items-center justify-between text-rose-300 font-bold mb-1">
                    <span>🍄 Nintendo ({BRAND_SUMMARY_STATS.Nintendo})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Nintendo').map((item) => (
                      <span
                        key={item.key}
                        className="inline-flex items-center gap-1 bg-zinc-900 border border-rose-900/40 px-1.5 py-0.5 rounded text-[10px]"
                      >
                        <span className="font-semibold text-zinc-300">{item.key}:</span>
                        <strong className="text-rose-300 font-mono">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Microsoft */}
                <div>
                  <div className="flex items-center justify-between text-emerald-300 font-bold mb-1">
                    <span>🟩 Microsoft Xbox ({BRAND_SUMMARY_STATS.Microsoft})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Microsoft').map((item) => (
                      <span
                        key={item.key}
                        className="inline-flex items-center gap-1 bg-zinc-900 border border-emerald-900/40 px-1.5 py-0.5 rounded text-[10px]"
                      >
                        <span className="font-semibold text-zinc-300">{item.key}:</span>
                        <strong className="text-emerald-300 font-mono">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 text-center">
                {lang === 'en'
                  ? 'Click for complete rules & full specifications'
                  : 'Clicca per regole complete e visualizzazione dettagliata'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtri per la Sfida Infinita */}
      {activeMode === 'infinite' && (
        <VideoGameFilters
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters);
          }}
          availablePlatforms={availablePlatforms}
          availableGenres={availableGenres}
          matchingCount={filteredPlayableGames.length}
          totalCount={playableGames.length}
          onApplyAndNewGame={() => initGame('infinite', filters, undefined, true)}
          lang={lang}
        />
      )}

      {/* Banner Risultato Daily Già Completata */}
      {activeMode === 'daily' && gameState === 'won' && (
        <DailyCompletedBanner
          attemptsCount={guessHistory.length}
          targetName={targetGame.title}
          targetSubtitle={`${targetGame.developer} • ${targetGame.releaseYear}`}
          targetImageUrl={getSafeCoverUrl(targetGame)}
          onPlayInfinite={() => handleSwitchMode('infinite')}
          lang={lang}
        />
      )}

      {/* Area di Gioco: Copertina Pixellata & Indicatori Tentativi */}
      <div className="flex flex-col items-center mb-6">
        {/* Barra Tentativi Rimasti (5 Slot) & eventuale pulsante Salta in Endless */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => {
              const isUsed = i < guessHistory.length;
              const isCurrent = i === guessHistory.length && gameState === 'playing';
              const wasCorrect = isUsed && i === guessHistory.length - 1 && gameState === 'won';

              return (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black transition-all ${
                    wasCorrect
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                      : isUsed
                      ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400'
                      : isCurrent
                      ? 'bg-zinc-800 border-2 border-rose-500 text-white animate-pulse'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-600'
                  }`}
                >
                  {wasCorrect ? '✓' : isUsed ? '✕' : i + 1}
                </div>
              );
            })}
          </div>

          <div className="ml-2 flex items-center gap-1.5 relative z-30">
            {/* Pulsante 'X': Segnala cover rovinata o distorta (cliccabile sempre, sia durante il gioco che dopo che la cover è stata mostrata) */}
            <button
              type="button"
              id="btn-report-broken-cover"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowReportModal(true);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/70 bg-amber-500/25 hover:bg-amber-500/40 hover:border-amber-400 px-3 py-1.5 text-xs font-bold text-amber-200 hover:text-white transition shadow-sm cursor-pointer active:scale-95 pointer-events-auto select-none"
              title={
                lang === 'en'
                  ? 'Flag broken or distorted cover (X)'
                  : 'Segnala cover rovinata o distorta (X)'
              }
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-amber-500/50 text-[11px] font-black text-amber-100 border border-amber-400/80 leading-none">
                X
              </span>
              <span>
                {lang === 'en' ? 'Flag Cover' : 'Cover Rovinata'}
              </span>
            </button>

            {activeMode === 'infinite' && (
              gameState === 'playing' ? (
                <button
                  type="button"
                  onClick={handleSkipEndless}
                  id="btn-skip-cover"
                  className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1.5 text-xs font-bold text-zinc-400 hover:text-rose-400 hover:border-zinc-700 transition cursor-pointer active:scale-95 pointer-events-auto"
                  title={lang === 'en' ? 'Give up and reveal game' : 'Arrenditi e scopri il videogioco'}
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  <span>{lang === 'en' ? 'Skip Cover' : 'Salta Cover'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => initGame('infinite', undefined, undefined, true)}
                  id="btn-next-cover-bar"
                  className="flex items-center gap-1.5 rounded-lg border border-rose-500/50 bg-rose-600 hover:bg-rose-500 px-3 py-1.5 text-xs font-bold text-white transition shadow-md shadow-rose-600/30 cursor-pointer active:scale-95 pointer-events-auto"
                  title={lang === 'en' ? 'Play next cover' : 'Passa alla prossima cover'}
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Next Cover</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Selettore Dimensione Cover in Modalità Endless: 5x6 / 6x5 (30) o 6x8 / 8x6 (48) */}
        {activeMode === 'infinite' && (
          <div className="mb-2.5 flex items-center justify-center gap-2">
            <div className="inline-flex rounded-xl bg-zinc-900 border border-zinc-800 p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleGridSizeChange('5x6')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  gridSize === '5x6'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isLandscape ? '6x5' : '5x6'} ({lang === 'en' ? '30 tiles' : '30 tessere'})
              </button>
              <button
                type="button"
                onClick={() => handleGridSizeChange('6x8')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  gridSize === '6x8'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isLandscape ? '8x6' : '6x8'} ({lang === 'en' ? '48 tiles' : '48 tessere'})
              </button>
            </div>
          </div>
        )}

        {/* Cornice della Copertina (Proporzione originale naturale dell'immagine senza alcun ritaglio) */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 shadow-2xl group select-none transition-[max-width,aspect-ratio] duration-300 ${containerWidthClass}`}
          style={{
            aspectRatio: `${effectiveAspect}`,
          }}
        >
          {/* Strato 1 (Fondo): Copertina autenticamente PIXELLATA su Canvas (senza blur e senza stretch) */}
          <div className="absolute inset-0 overflow-hidden">
            <PixelatedCoverCanvas
              key={`pixel-canvas-${targetGame.id}-${roundKey}-${gridSize}-${isLandscape ? 'land' : 'port'}`}
              src={getSafeCoverUrl(targetGame)}
              fallbackSrc={getFallbackSvgCover(targetGame)}
              isGameOver={gameState !== 'playing'}
              pixelCols={currentCols * 4}
              pixelRows={currentRows * 4}
              onNaturalAspectDetected={(aspect) => {
                if (naturalAspect === null) {
                  setNaturalAspect(aspect);
                }
              }}
            />
          </div>

          {/* Strato 2: Griglia dinamica (attiva e visibile durante il gioco, scompare a fine partita per mostrare la copertina pulita) */}
          <div
            key={`grid-${targetGame.id}-${roundKey}-${gridSize}-${isLandscape ? 'land' : 'port'}`}
            className={`absolute inset-0 grid pointer-events-none transition-opacity duration-500 ${
              gameState === 'playing' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${currentRows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: currentTotalTiles }).map((_, index) => {
              const colIndex = index % currentCols;
              const rowIndex = Math.floor(index / currentCols);
              const isRevealed = revealedIndices.includes(index);
              const isJustRevealed = lastRevealedIndex === index && gameState === 'playing';

              return (
                <div
                  key={`tile-${index}`}
                  className={`relative overflow-hidden ${
                    gameState === 'playing' ? 'border border-black/25' : 'transition-all duration-300'
                  }`}
                >
                  {isRevealed ? (
                    /* Cella Sbloccata: Porzione nitida in alta definizione */
                    <div
                      className={`relative w-full h-full overflow-hidden ${
                        isJustRevealed ? 'animate-in zoom-in-75 duration-300' : ''
                      }`}
                    >
                      <img
                        key={`tile-img-${targetGame.id}-${index}-${roundKey}-${gridSize}-${isLandscape ? 'h' : 'v'}`}
                        src={getSafeCoverUrl(targetGame)}
                        alt=""
                        className="absolute max-w-none select-none pointer-events-none"
                        style={{
                          width: `${currentCols * 100}%`,
                          height: `${currentRows * 100}%`,
                          left: `-${colIndex * 100}%`,
                          top: `-${rowIndex * 100}%`,
                        }}
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackSvgCover(targetGame);
                        }}
                        referrerPolicy="no-referrer"
                      />
                      {gameState === 'playing' && (
                        <div className="absolute inset-0 border-2 border-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      )}
                    </div>
                  ) : (
                    /* Cella Coperta: Lascia trasparire i pixel autentici della copertina sottostante */
                    <div className="w-full h-full bg-black/5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Velo protettivo anti-spoiler per il cambio round in Endless/Daily */}
          <div
            className={`absolute inset-0 bg-zinc-950 pointer-events-none transition-opacity duration-150 z-20 flex items-center justify-center ${
              isCoverObscured ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider animate-pulse">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span>Nuova Cover...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pannello Esito Partita (Vinto / Perso) */}
      {gameState !== 'playing' ? (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 text-center shadow-xl">
          {/* Nome del videogioco rivelato e dettagli in alto nel container */}
          <div className="mb-3.5 pb-3 border-b border-zinc-800/80">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
              {targetGame.title}
            </h2>
            <div className="mt-0.5 text-xs sm:text-sm font-semibold text-rose-400">
              {targetGame.developer} • {targetGame.releaseYear}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Badge Streak Corrente (a sinistra del badge punti) */}
            <div
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2.5 font-black text-lg sm:text-xl shadow-sm shrink-0 ${
                (activeMode === 'infinite' ? endlessStreak : dailyStats.currentStreak) > 0
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-800/80 border-zinc-700/60 text-zinc-400'
              }`}
              title={lang === 'en' ? 'Current Streak' : 'Serie Corrente'}
            >
              <Flame
                className={`h-5 w-5 ${
                  (activeMode === 'infinite' ? endlessStreak : dailyStats.currentStreak) > 0
                    ? 'text-amber-400 animate-pulse'
                    : 'text-zinc-500'
                }`}
              />
              <span>{activeMode === 'infinite' ? endlessStreak : dailyStats.currentStreak}</span>
            </div>

            {/* Badge Punti (senza la dicitura 'punti guadagnati', solo il numero es. +500 o +0) */}
            <div
              className={`flex items-center justify-center rounded-xl border px-4 py-2.5 font-black text-lg sm:text-xl shadow-sm shrink-0 ${
                gameState === 'won'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-800/80 border-zinc-700/60 text-zinc-400'
              }`}
            >
              <span>{gameState === 'won' ? `+${earnedScore}` : '+0'}</span>
            </div>

            {/* Badge con Checkmark o Croce */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm shrink-0 ${
                gameState === 'won'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              }`}
            >
              {gameState === 'won' ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <XCircle className="h-7 w-7" />
              )}
            </div>

            {/* Pulsante 'Next' posizionato subito in alto accanto ai badge in modalità Endless */}
            {activeMode === 'infinite' && (
              <button
                onClick={() => initGame('infinite', undefined, undefined, true)}
                id="btn-next-endless-game"
                className="flex h-[50px] items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 px-6 py-2.5 text-sm font-black uppercase tracking-wider text-white transition shadow-lg shadow-rose-600/30 cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Next</span>
              </button>
            )}
          </div>

          {/* Dettagli opzionali discreti (tentativi & generi) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
            {gameState === 'won' ? (
              <span>
                Indovinato in {guessHistory.length} {guessHistory.length === 1 ? 'tentativo' : 'tentativi'}
              </span>
            ) : (
              <span className="text-zinc-500">
                {targetGame.genres.join(', ')}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Barra di Ricerca durante la partita */
        <div className="mb-8">
          {franchiseHint && (
            <div className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/40 p-2.5 text-center text-xs font-bold text-amber-300 shadow-md animate-pulse">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>
                {lang === 'en'
                  ? `🎯 Great intuition! You found the right franchise (${franchiseHint}), but search for a different chapter!`
                  : `🎯 Ottima intuizione! Hai individuato la saga (${franchiseHint}), ma il gioco da indovinare è un altro capitolo!`}
              </span>
            </div>
          )}
          <div className="mb-2 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Inserisci il titolo del videogioco per indovinare:
          </div>
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guessHistory.map((g) => g.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca videogioco... (es. The Witcher, Elden Ring, Mario)"
            disabled={gameState !== 'playing'}
          />
        </div>
      )}

      {/* Storico dei Tentativi Effettuati */}
      {guessHistory.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            Tentativi Effettuati ({guessHistory.length}/{MAX_ATTEMPTS})
          </h3>

          <div className="space-y-2">
            {guessHistory.map((item, idx) => {
              const isCorrect = item.id === targetGame.id;
              const isSameFranchise =
                !isCorrect &&
                Boolean(item.franchise && targetGame.franchise) &&
                item.franchise?.toLowerCase().trim() === targetGame.franchise?.toLowerCase().trim();
              // Calcolo del numero di tentativo originario
              const attemptNumber = guessHistory.length - idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-xl p-3.5 border transition ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                      : isSameFranchise
                      ? 'bg-amber-950/30 border-amber-500/40 text-zinc-200'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                        isCorrect
                          ? 'bg-emerald-500 text-black'
                          : isSameFranchise
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isCorrect ? '✓' : `#${attemptNumber}`}
                    </div>

                    {/* Miniatura cover se disponibile e non in modalità endless */}
                    {activeMode !== 'infinite' && (
                      <img
                        src={getSafeCoverUrl(item)}
                        alt=""
                        className="h-10 w-8 rounded object-cover border border-zinc-700 shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackSvgCover(item);
                        }}
                      />
                    )}

                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        {isSameFranchise && (
                          <span className="rounded-md bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 text-[10px] font-black text-amber-300">
                            SAGA {item.franchise?.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {item.developer} • {item.releaseYear} • {item.genres.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-black text-emerald-400 border border-emerald-500/30">
                        CORRETTO!
                      </span>
                    ) : isSameFranchise ? (
                      <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-black text-amber-300 border border-amber-500/40">
                        STESSA SAGA!
                      </span>
                    ) : (
                      <span className="rounded-md bg-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
                        SBAGLIATO
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Toast notifica per segnalazione cover */}
      {reportToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border border-amber-500/60 bg-zinc-950/95 px-4 py-2.5 text-xs font-bold text-amber-300 shadow-2xl backdrop-blur-md animate-in slide-in-from-top duration-200">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{reportToast}</span>
        </div>
      )}

      {/* Modale Conferma Segnalazione Cover Rovinata */}
      {showReportModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-150 pointer-events-auto"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-amber-500/50 bg-zinc-950 p-6 shadow-2xl text-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition p-1 rounded-lg cursor-pointer"
              title={lang === 'en' ? 'Close' : 'Chiudi'}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <span className="text-xl font-black">X</span>
            </div>
            <h3 className="text-lg font-black text-white">
              {lang === 'en' ? 'Report Distorted / Broken Cover' : 'Segnala Copertina Rovinata o Distorta'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {lang === 'en'
                ? `Is the cover for "${targetGame.title}" stretched, damaged, broken, or not displaying official box art properly?`
                : `La copertina di "${targetGame.title}" è tagliata male, allungata, sgranata o non è la box art corretta?`}
            </p>
            <p className="mt-2 text-xs text-amber-300/90 font-medium">
              {lang === 'en'
                ? 'Flagging this cover will load a new game immediately without resetting your win streak!'
                : 'Segnalandola caricherai subito un nuovo videogioco senza azzerare la tua serie di vittorie!'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
              >
                {lang === 'en' ? 'Cancel' : 'Annulla'}
              </button>
              <button
                type="button"
                onClick={handleConfirmReportCover}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black transition shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
              >
                <span className="font-black text-sm">X</span>
                <span>{lang === 'en' ? 'Confirm & New Cover' : 'Segnala e Nuova Cover'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
