import React, { useState, useEffect, useMemo } from 'react';
import { VideoGameItem, GuessRecord, GameMode, AttributeMatch, LolLanguage } from '../../types';
import { IGDB_TOP_100_GAMES, ALL_SEARCHABLE_GAMES } from '../../data/igdbTop100Games';
import { compareVideoGame } from '../../utils/comparator';
import { getSafeCoverUrl, getFallbackSvgCover } from '../../utils/boxArtGenerator';
import { getDailyIndex, getTodayDateString } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Gamepad2, Lightbulb, Grid3X3, Sparkles, Star, Play, RotateCcw, HelpCircle } from 'lucide-react';
import { VideoGamePixelGame } from './VideoGamePixelGame';
import { VideoGameFilters, VideoGameFiltersState, DEFAULT_FILTERS, gameMatchesFilters } from './VideoGameFilters';
import { PlatformIcons } from './PlatformIcons';
import { PixelHeart } from './PixelHeart';
import { localizeSpecLabel, localizeSpecValue } from '../../utils/vgLocalization';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import {
  VideoGameDifficulty,
  gameMatchesDifficulty,
  DIFFICULTY_OPTIONS,
} from '../../utils/videoGameDifficulty';

interface VideoGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  initialSubGame?: string;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetGame: VideoGameItem) => void;
  onOpenHelp: () => void;
  isIgdbCategory?: boolean;
  lang?: LolLanguage;
}

const MAX_DAILY_ATTEMPTS = 20;
const DAILY_SPECS_STORAGE_KEY_PREFIX = 'omnidle_daily_specs_';

interface SpecFieldDef {
  key: string;
  labelIt: string;
  labelEn: string;
  isPlatform?: boolean;
  getValueDisplay: (game: VideoGameItem, lang?: LolLanguage | string) => {
    displayValue: any;
    rawPlatforms?: string[];
  };
}

const SPEC_FIELD_DEFINITIONS: SpecFieldDef[] = [
  {
    key: 'developer',
    labelIt: 'Sviluppatore',
    labelEn: 'Developer',
    getValueDisplay: (game) => ({
      displayValue: game.developer,
    }),
  },
  {
    key: 'genres',
    labelIt: 'Genere',
    labelEn: 'Genre',
    getValueDisplay: (game, lang) => ({
      displayValue: localizeSpecValue('Genere', game.genres.join(', '), lang),
    }),
  },
  {
    key: 'themes',
    labelIt: 'Tema',
    labelEn: 'Theme',
    getValueDisplay: (game, lang) => {
      const themes = game.themes && game.themes.length > 0 ? game.themes : ['Generale'];
      return {
        displayValue: localizeSpecValue('Tema', themes.join(', '), lang),
      };
    },
  },
  {
    key: 'releaseYear',
    labelIt: 'Anno Uscita',
    labelEn: 'Release Year',
    getValueDisplay: (game) => ({
      displayValue: String(game.releaseYear),
    }),
  },
  {
    key: 'platforms',
    labelIt: 'Piattaforme',
    labelEn: 'Platforms',
    isPlatform: true,
    getValueDisplay: (game) => {
      const plats = game.platforms && game.platforms.length > 0 ? game.platforms : [game.mainPlatform as any];
      return {
        displayValue: plats,
        rawPlatforms: plats,
      };
    },
  },
  {
    key: 'pegi',
    labelIt: 'PEGI',
    labelEn: 'PEGI',
    getValueDisplay: (game, lang) => ({
      displayValue: game.pegi || (lang === 'en' ? 'N/A' : 'N/D'),
    }),
  },
  {
    key: 'gameModes',
    labelIt: 'Modalità',
    labelEn: 'Game Modes',
    getValueDisplay: (game, lang) => {
      const modes = game.gameModes || ['Giocatore singolo'];
      return {
        displayValue: localizeSpecValue('Modalità', modes.join(', '), lang),
      };
    },
  },
  {
    key: 'perspective',
    labelIt: 'Prospettiva',
    labelEn: 'Perspective',
    getValueDisplay: (game, lang) => ({
      displayValue: localizeSpecValue('Prospettiva', game.perspective, lang),
    }),
  },
  {
    key: 'gameType',
    labelIt: 'Tipo',
    labelEn: 'Type',
    getValueDisplay: (game, lang) => ({
      displayValue: localizeSpecValue('Tipo', game.gameType || 'Normale', lang),
    }),
  },
];

export const VideoGame: React.FC<VideoGameProps> = ({
  mode,
  onModeChange,
  initialSubGame,
  onVictory,
  onOpenHelp,
  lang = 'it',
}) => {
  // Modalità Daily e Sfida Infinita con catalogo completo console e classici (~1340 giochi)
  const gamesPool: VideoGameItem[] = useMemo(() => {
    return ALL_SEARCHABLE_GAMES;
  }, []);

  const categoryKey = 'videogiochi';

  const [subGame, setSubGame] = useState<'game-specs' | 'pixel'>(
    initialSubGame === 'game-specs' ? 'game-specs' : 'pixel'
  );

  useEffect(() => {
    if (initialSubGame === 'game-specs' || initialSubGame === 'pixel') {
      setSubGame(initialSubGame);
    }
  }, [initialSubGame]);

  // Filtri per modalità Endless / Sfida Infinita
  const [filters, setFilters] = useState<VideoGameFiltersState>(DEFAULT_FILTERS);
  const [difficulty, setDifficulty] = useState<VideoGameDifficulty>('all');

  const availablePlatforms = useMemo(() => {
    const plats = new Set<string>();
    gamesPool.forEach((g) => {
      if (g.platforms && g.platforms.length > 0) {
        g.platforms.forEach((p) => plats.add(p));
      } else if (g.mainPlatform) {
        plats.add(g.mainPlatform);
      }
    });
    return Array.from(plats).sort();
  }, [gamesPool]);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    gamesPool.forEach((g) => {
      (g.genres || []).forEach((gen) => genres.add(gen));
    });
    return Array.from(genres).sort();
  }, [gamesPool]);

  const filteredGamesPool = useMemo(() => {
    return gamesPool.filter((g) =>
      gameMatchesFilters(g, filters) && gameMatchesDifficulty(g, difficulty)
    );
  }, [gamesPool, filters, difficulty]);

  const [targetGame, setTargetGame] = useState<VideoGameItem>(gamesPool[0]);
  const [guesses, setGuesses] = useState<GuessRecord<VideoGameItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [revealedHintKeys, setRevealedHintKeys] = useState<string[]>([]);

  const getDailyStorageKey = () => `${DAILY_SPECS_STORAGE_KEY_PREFIX}${getTodayDateString()}`;

  const initGame = (
    customFilters?: VideoGameFiltersState,
    customDifficulty?: VideoGameDifficulty,
    forceNew: boolean = false
  ) => {
    const currentFilters = customFilters || filters;
    const currentDiff = customDifficulty !== undefined ? customDifficulty : difficulty;

    // Se non è richiesta una nuova partita, controlla se c'è una sessione attiva o terminata
    if (!forceNew) {
      const savedSession = getGameSession<GuessRecord<VideoGameItem>, VideoGameItem>(
        categoryKey,
        'game-specs',
        mode
      );

      if (savedSession) {
        let restoredTarget: VideoGameItem | undefined = savedSession.targetItem;
        if (!restoredTarget && savedSession.targetId) {
          restoredTarget =
            gamesPool.find((g) => g.id === savedSession.targetId) ||
            ALL_SEARCHABLE_GAMES.find((g) => g.id === savedSession.targetId);
        }

        if (restoredTarget) {
          setTargetGame(restoredTarget);
          setGuesses(savedSession.guesses || []);
          setIsGameOver(Boolean(savedSession.isGameOver));
          setIsVictory(Boolean(savedSession.isWon));
          setRevealedHintKeys((savedSession.extra?.revealedHintKeys as string[]) || []);
          return;
        }
      }
    }

    let chosen: VideoGameItem;

    if (mode === 'daily') {
      const idx = getDailyIndex(categoryKey, 'game-specs', gamesPool.length);
      chosen = gamesPool[idx];
    } else {
      const currentFiltered = gamesPool.filter((g) =>
        gameMatchesFilters(g, currentFilters) && gameMatchesDifficulty(g, currentDiff)
      );
      const activePool = currentFiltered.length > 0 ? currentFiltered : gamesPool;
      const randIdx = Math.floor(Math.random() * activePool.length);
      chosen = activePool[randIdx];
    }

    setTargetGame(chosen);
    setGuesses([]);
    setIsGameOver(false);
    setIsVictory(false);
    setRevealedHintKeys([]);

    saveGameSession(categoryKey, 'game-specs', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosen,
      targetId: chosen.id,
      extra: { revealedHintKeys: [] },
    });
  };

  useEffect(() => {
    initGame();
  }, [mode, categoryKey]);

  // Conteggio tentativi errati e vite rimanenti (20 in Daily)
  const wrongGuessesCount = useMemo(() => {
    return guesses.filter((g) => !g.isCorrect).length;
  }, [guesses]);

  const remainingDailyLives = Math.max(0, MAX_DAILY_ATTEMPTS - wrongGuessesCount);

  // Campi non ancora indovinati né svelati dall'aiuto
  const unsolvedFields = useMemo(() => {
    return SPEC_FIELD_DEFINITIONS.map((def, idx) => ({ def, idx })).filter(
      ({ def, idx }) => {
        // Se già svelato dall'aiuto in Endless
        if (revealedHintKeys.includes(def.key)) return false;
        // Se già indovinato con esito esatto in uno dei tentativi effettuati
        const isGuessedExactly = guesses.some(
          (g) => g.matches[idx] && g.matches[idx].status === 'exact'
        );
        return !isGuessedExactly;
      }
    );
  }, [guesses, revealedHintKeys]);

  // Azione Aiuto in Infinite: risolve uno dei campi non ancora indovinati (solo se ne mancano > 1)
  const handleUseEndlessHint = () => {
    if (mode !== 'infinite' || isGameOver || unsolvedFields.length <= 1) return;
    const randomIndex = Math.floor(Math.random() * unsolvedFields.length);
    const chosenField = unsolvedFields[randomIndex];
    setRevealedHintKeys((prev) => [...prev, chosenField.def.key]);
  };

  const searchOptions: SearchOption[] = useMemo(() => {
    const activeList = mode === 'infinite' ? filteredGamesPool : gamesPool;
    const uniqueMap = new Map<string, VideoGameItem>();

    activeList.forEach((g) => {
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
        iconUrl: getSafeCoverUrl(g),
        badge,
        badgeColor,
      };
    }).sort((a, b) =>
      a.name.localeCompare(b.name, lang === 'en' ? 'en' : 'it', { sensitivity: 'base', numeric: true })
    );
  }, [mode, filteredGamesPool, gamesPool, lang]);

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedGame =
      gamesPool.find((g) => g.id === option.id) ||
      ALL_SEARCHABLE_GAMES.find((g) => g.id === option.id);
    if (!guessedGame) return;

    const matches = compareVideoGame(guessedGame, targetGame, lang);
    const isCorrect = guessedGame.id === targetGame.id;
    const isSameFranchise =
      !isCorrect &&
      Boolean(guessedGame.franchise && targetGame.franchise) &&
      guessedGame.franchise?.toLowerCase().trim() === targetGame.franchise?.toLowerCase().trim();

    const record: GuessRecord<VideoGameItem> = {
      item: guessedGame,
      matches,
      isCorrect,
      isSameFranchise,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    const isDefeat = mode === 'daily' && newGuesses.filter((g) => !g.isCorrect).length >= MAX_DAILY_ATTEMPTS;
    const isOver = isCorrect || isDefeat;

    if (isCorrect) {
      setIsGameOver(true);
      setIsVictory(true);
      saveGameResult(categoryKey, 'game-specs', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetGame);
    } else if (isDefeat) {
      setIsGameOver(true);
      setIsVictory(false);
      saveGameResult(categoryKey, 'game-specs', false, MAX_DAILY_ATTEMPTS);
    }

    saveGameSession(categoryKey, 'game-specs', mode, {
      isWon: isCorrect,
      isGameOver: isOver,
      guesses: newGuesses,
      targetItem: targetGame,
      targetId: targetGame.id,
      extra: { revealedHintKeys },
    });
  };

  return (
    <div className="mx-auto max-w-[1500px] px-3 sm:px-6 py-4 sm:py-6">
      {subGame === 'pixel' ? (
        <VideoGamePixelGame
          mode={mode}
          onModeChange={onModeChange}
          onOpenHelp={onOpenHelp}
          gameList={ALL_SEARCHABLE_GAMES}
          categoryKey={categoryKey}
          badgeTitle="IGDB API"
          lang={lang}
        />
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              {lang === 'en' ? 'Videogames: Specs' : 'Videogiochi: Specs'}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              {lang === 'en'
                ? 'Compare Developer, Genre, Theme, Release Year, Platforms, PEGI, and Game Modes.'
                : 'Confronta Sviluppatore, Genere, Tema, Anno Uscita, Piattaforme, PEGI e Modalità.'}
            </p>
          </div>

          {/* Banner Risultato Daily Già Completata in Specs */}
          {mode === 'daily' && isGameOver && isVictory && (
            <DailyCompletedBanner
              attemptsCount={guesses.length}
              targetName={targetGame.title}
              targetSubtitle={`${targetGame.developer} • ${targetGame.releaseYear}`}
              targetImageUrl={getSafeCoverUrl(targetGame)}
              onPlayInfinite={() => {
                if (onModeChange) onModeChange('infinite');
              }}
              lang={lang}
            />
          )}

          {/* Barra Tentativi con Cuoricini Pixel Art per la modalità Daily (20 vite) */}
          {mode === 'daily' && (
            <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 sm:p-4 text-center shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-300">
                    {lang === 'en' ? 'Daily Attempts' : 'Tentativi Giornalieri'}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                    ({lang === 'en' ? '1 heart lost per mistake' : '1 cuore perso per ogni errore'})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <span
                    className={
                      remainingDailyLives <= 5
                        ? 'text-rose-400 font-extrabold animate-pulse'
                        : 'text-zinc-200'
                    }
                  >
                    {remainingDailyLives}
                  </span>
                  <span className="text-zinc-500">/ {MAX_DAILY_ATTEMPTS}</span>
                  <span className="text-zinc-400 text-[11px] font-medium ml-1">
                    {lang === 'en' ? 'lives' : 'vite rimaste'}
                  </span>
                </div>
              </div>

              {/* Griglia Cuoricini Pixel Art */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                {Array.from({ length: MAX_DAILY_ATTEMPTS }).map((_, i) => (
                  <PixelHeart
                    key={i}
                    filled={i < remainingDailyLives}
                    size={22}
                    className={i >= remainingDailyLives ? 'opacity-35 scale-90' : 'hover:scale-110'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Filtri Modalità Sfida Infinita */}
          {mode === 'infinite' && (
            <VideoGameFilters
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
              }}
              availablePlatforms={availablePlatforms}
              availableGenres={availableGenres}
              matchingCount={filteredGamesPool.length}
              totalCount={gamesPool.length}
              onApplyAndNewGame={() => initGame(filters, difficulty, true)}
              lang={lang}
            />
          )}

          {/* Selettore Difficoltà (Facile, Medio, Difficile, Tutte) per Specs */}
          {mode === 'infinite' && (
            <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 sm:p-4 text-center shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-300">
                    {lang === 'en' ? 'Difficulty Level:' : 'Livello di Difficoltà:'}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-500">
                    ({filteredGamesPool.length} {lang === 'en' ? 'games available' : 'giochi disponibili'})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DIFFICULTY_OPTIONS.map((opt) => {
                  const isSelected = difficulty === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        if (difficulty !== opt.key) {
                          setDifficulty(opt.key);
                          initGame(filters, opt.key);
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? `${opt.activeBtnClass} shadow-md scale-[1.02] ring-2 ring-white/20`
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                      title={lang === 'en' ? opt.descEn : opt.descIt}
                    >
                      <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm">
                        <span>{opt.icon}</span>
                        <span>{lang === 'en' ? opt.labelEn : opt.labelIt}</span>
                      </div>
                      <span className="text-[10px] mt-0.5 opacity-75 line-clamp-1">
                        {lang === 'en' ? opt.descEn : opt.descIt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specifiche Svelate dall'Aiuto in Modalità Endless */}
          {mode === 'infinite' && revealedHintKeys.length > 0 && (
            <div className="mb-6 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-200">
                    {lang === 'en' ? 'Revealed Specs (Endless Hint)' : 'Specifiche Svelate (Aiuto Endless)'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-indigo-300/80">
                  {revealedHintKeys.length}{' '}
                  {lang === 'en' ? 'unlocked spec(s)' : 'specifica/he sbloccata/e'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {SPEC_FIELD_DEFINITIONS.filter((def) => revealedHintKeys.includes(def.key)).map((def) => {
                  const info = def.getValueDisplay(targetGame, lang);
                  const label = lang === 'en' ? def.labelEn : def.labelIt;
                  return (
                    <div
                      key={def.key}
                      className="flex flex-col items-center justify-center rounded-xl p-2 text-center min-h-[76px] bg-emerald-600/30 text-emerald-200 border border-emerald-500/50 shadow-sm"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 opacity-90 mb-0.5">
                        {label}
                      </span>
                      <div className="flex items-center justify-center gap-1 text-xs font-black w-full">
                        {def.isPlatform ? (
                          <PlatformIcons platforms={info.rawPlatforms || []} iconSize="h-3.5 w-3.5" />
                        ) : (
                          <span className="break-words leading-tight text-[11px] sm:text-xs text-white">
                            {info.displayValue}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Schermata Vittoria Endless */}
          {isGameOver && mode === 'infinite' && (
            <div className="mb-8 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-xl">
              <div className="text-xl font-black text-emerald-400 mb-2">
                {lang === 'en' ? 'Game Completed!' : 'Partita Completata!'}
              </div>
              <p className="text-sm text-zinc-300 mb-4">
                {lang === 'en' ? 'The videogame was: ' : 'Il videogioco era: '}
                <strong className="text-white font-bold">{targetGame.title}</strong>
              </p>
              <button
                type="button"
                onClick={() => initGame(undefined, undefined, true)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black uppercase tracking-wider text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30 scale-105 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>{lang === 'en' ? 'Next Endless Videogame' : 'Prossimo Videogioco Endless'}</span>
              </button>
            </div>
          )}

          {/* Schermata Sconfitta Daily (20 tentativi esauriti) */}
          {isGameOver && mode === 'daily' && !isVictory && (
            <div className="mb-8 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900 border border-rose-500/40 text-center shadow-xl">
              <div className="text-3xl mb-2">💔</div>
              <div className="text-xl font-black text-rose-400 mb-2">
                {lang === 'en' ? 'Out of Attempts!' : 'Tentativi Esauriti!'}
              </div>
              <p className="text-sm text-zinc-300 mb-4">
                {lang === 'en' ? 'The daily videogame was: ' : 'Il videogioco del giorno era: '}
                <strong className="text-white font-bold">{targetGame.title}</strong>
              </p>
              <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3 max-w-sm mb-4">
                <img
                  src={getSafeCoverUrl(targetGame)}
                  alt={targetGame.title}
                  className="h-16 w-12 object-cover rounded-lg shrink-0 shadow border border-zinc-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getFallbackSvgCover(targetGame);
                  }}
                />
                <div className="text-left text-xs">
                  <div className="font-extrabold text-white text-sm">{targetGame.title}</div>
                  <div className="text-zinc-400">
                    {targetGame.developer} • {targetGame.releaseYear}
                  </div>
                  <div className="text-zinc-500 text-[11px]">{targetGame.genres.join(', ')}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                {lang === 'en'
                  ? 'Come back tomorrow for a new daily challenge!'
                  : 'Torna domani per una nuova sfida giornaliera!'}
              </p>
            </div>
          )}

          {/* Pulsante Aiuto Endless & Barra di Ricerca */}
          {!isGameOver && (
            <div className="mb-8 space-y-3">
              {mode === 'infinite' && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleUseEndlessHint}
                    disabled={unsolvedFields.length <= 1}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-md ${
                      unsolvedFields.length > 1
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 cursor-pointer hover:scale-105 active:scale-95'
                        : 'bg-zinc-800/40 border border-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
                    }`}
                    title={
                      unsolvedFields.length <= 1
                        ? lang === 'en'
                          ? 'Cannot use hint when only 1 field is left to guess'
                          : 'Non puoi usare l\'aiuto se manca solo un campo da indovinare'
                        : lang === 'en'
                        ? 'Automatically reveals one unsolved field'
                        : 'Risolve automaticamente uno dei campi non ancora indovinati'
                    }
                  >
                    <Lightbulb
                      className={`h-4 w-4 ${
                        unsolvedFields.length > 1 ? 'text-amber-400 animate-pulse' : 'text-zinc-600'
                      }`}
                    />
                    <span>
                      {lang === 'en' ? 'Use Hint (Reveal 1 Spec)' : 'Usa Aiuto (Rivela 1 Specifica)'}
                    </span>
                    {unsolvedFields.length <= 1 ? (
                      <span className="text-[10px] text-zinc-500 font-normal">
                        ({lang === 'en' ? 'min. 2 unsolved needed' : 'non se ne manca solo uno'})
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-300/80 font-normal">
                        ({unsolvedFields.length} {lang === 'en' ? 'unsolved' : 'mancanti'})
                      </span>
                    )}
                  </button>
                </div>
              )}

              <SearchBar
                options={searchOptions}
                alreadyGuessedIds={guesses.map((g) => g.item.id)}
                onSelectOption={handleMakeGuess}
                placeholder={
                  mode === 'infinite' && (difficulty !== 'all' || filters.platform !== 'all' || filters.genre !== 'all' || filters.decade !== 'all' || filters.pegi !== 'all')
                    ? (lang === 'en' ? `Search filtered game (${searchOptions.length} available)...` : `Cerca tra i giochi filtrati (${searchOptions.length} disponibili)...`)
                    : (lang === 'en' ? "Search videogame (e.g. Ocarina of Time, Crash Bash, Chrono Trigger, The Witcher)..." : "Cerca un videogioco (es. Ocarina of Time, Crash Bash, Chrono Trigger, The Witcher)...")
                }
              />
            </div>
          )}

          {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            {lang === 'en'
              ? `Attempts (${guesses.length})`
              : `Tentativi Effettuati (${guesses.length})`}
          </h3>

          <div className="space-y-4">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-stretch gap-3 group"
              >
                {/* Cover del videogioco a fianco della scheda */}
                <div className="w-full md:w-48 lg:w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl relative flex items-center justify-center min-h-[140px] md:min-h-0 self-stretch">
                  <img
                    src={getSafeCoverUrl(guess.item)}
                    alt={guess.item.title}
                    className="w-full h-full max-h-48 md:max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackSvgCover(guess.item);
                    }}
                  />
                  <div
                    className={`game-fallback ${
                      guess.item.coverUrl ? 'hidden' : 'flex'
                    } flex-col items-center justify-center p-4 text-center text-slate-500`}
                  >
                    <Gamepad2 className="h-9 w-9 text-slate-600 mb-1.5" />
                    <span className="text-xs font-bold text-slate-400 line-clamp-1">
                      {guess.item.title}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5">
                    <div className="text-[11px] font-bold text-white drop-shadow truncate">
                      {guess.item.title}
                    </div>
                  </div>
                </div>

                {/* Scheda delle specifiche del videogioco */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
                  <div className="mb-3 border-b border-slate-800 pb-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-extrabold text-white text-base">
                          {guess.item.title}
                        </div>
                        {(guess.item as any).igdbRating && (
                          <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-black text-amber-300 border border-amber-500/30">
                            <Star className="h-3 w-3 fill-amber-300" />
                            IGDB {(guess.item as any).igdbRating}
                          </span>
                        )}
                        {guess.isSameFranchise && (
                          <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-300 border border-amber-500/40 animate-pulse">
                            🌟 {lang === 'en' ? 'SAME FRANCHISE:' : 'STESSA SAGA:'} {guess.item.franchise?.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {guess.isCorrect ? (
                        <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                          {lang === 'en' ? 'CORRECT!' : 'CORRETTO!'}
                        </span>
                      ) : guess.isSameFranchise ? (
                        <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                          {lang === 'en' ? 'SAME FRANCHISE' : 'STESSO FRANCHISE'}
                        </span>
                      ) : null}
                    </div>

                    {guess.isSameFranchise && !guess.isCorrect && (
                      <div className="mt-2 text-xs font-medium text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
                        🎯 {lang === 'en'
                          ? `Great intuition! You guessed the right saga (${guess.item.franchise}), but try a different game in the series.`
                          : `Ottima intuizione! Hai indovinato la saga (${guess.item.franchise}), ma il titolo corretto è un altro capitolo della serie.`}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
                    {guess.matches.map((match, mIdx) => {
                      const displayLabel = localizeSpecLabel(match.label, lang);
                      const displayValue = localizeSpecValue(match.label, match.value, lang);
                      const isPlatform =
                        match.label === 'Piattaforme' ||
                        match.label === 'Platforms' ||
                        displayLabel === 'Platforms' ||
                        displayLabel === 'Piattaforme';

                      return (
                        <div
                          key={mIdx}
                          className={`flex flex-col items-center justify-center rounded-xl p-2 text-center transition min-h-[76px] ${
                            match.status === 'exact'
                              ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/50'
                              : match.status === 'partial'
                              ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50'
                              : 'bg-rose-950/40 text-rose-300 border border-rose-900/40'
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 mb-0.5">
                            {displayLabel}
                          </span>
                          <div className="flex items-center justify-center gap-1 text-xs font-black w-full">
                            {isPlatform ? (
                              <PlatformIcons platforms={match.value as string[]} iconSize="h-3.5 w-3.5" />
                            ) : (
                              <span className="break-words leading-tight text-[11px] sm:text-xs">
                                {displayValue}
                              </span>
                            )}
                            {match.arrow === 'up' && (
                              <ArrowUp className="h-3.5 w-3.5 text-emerald-300 stroke-[3] shrink-0" />
                            )}
                            {match.arrow === 'down' && (
                              <ArrowDown className="h-3.5 w-3.5 text-rose-300 stroke-[3] shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
