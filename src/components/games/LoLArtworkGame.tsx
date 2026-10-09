import React, { useState, useEffect, useMemo } from 'react';
import { LolChampion, LolArtwork, GameMode, GuessRecord, AttributeMatch, LolLanguage } from '../../types';
import { LOL_CHAMPIONS } from '../../data/lolChampions';
import { LOL_ARTWORKS } from '../../data/lolArtworks';
import { compareLolChampion } from '../../utils/comparator';
import { getDailyIndex, getTimeUntilNextDaily } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import { LOL_TRANSLATIONS, translateRegion } from '../../utils/lolLocalization';
import { SearchBar, SearchOption } from '../SearchBar';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  Clock,
  HelpCircle,
  SkipForward,
  FastForward,
  ZoomOut,
  Maximize2,
  Search
} from 'lucide-react';

interface LoLArtworkGameProps {
  mode: GameMode;
  lang?: LolLanguage;
  onModeChange?: (mode: GameMode) => void;
  onVictory?: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetItem: any) => void;
  onOpenHelp: () => void;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const LoLArtworkGame: React.FC<LoLArtworkGameProps> = ({
  mode,
  lang = 'it',
  onModeChange,
  onVictory,
  onOpenHelp,
}) => {
  const t = LOL_TRANSLATIONS[lang];
  const getArtworkName = (a: LolArtwork) => (lang === 'en' && a.artworkNameEn ? a.artworkNameEn : a.artworkName);

  const [targetArtwork, setTargetArtwork] = useState<LolArtwork>(LOL_ARTWORKS[0]);
  const [targetChampion, setTargetChampion] = useState<LolChampion>(LOL_CHAMPIONS[0]);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number }>({ x: 50, y: 40 });
  const [championGuesses, setChampionGuesses] = useState<GuessRecord<LolChampion>[]>([]);
  const [isChampionGuessed, setIsChampionGuessed] = useState(false);
  const [wrongArtworkGuesses, setWrongArtworkGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [skinFilterQuery, setSkinFilterQuery] = useState('');
  const [wasSkipped, setWasSkipped] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilNextDaily());

  // Infinite streak tracker
  const [streak, setStreak] = useState<number>(() => {
    try {
      const s = sessionStorage.getItem('omnidle_lol_artwork_streak');
      return s ? parseInt(s, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      const s = localStorage.getItem('omnidle_lol_artwork_best_streak');
      return s ? parseInt(s, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [recentArtworkIds, setRecentArtworkIds] = useState<string[]>(() => {
    try {
      const s = sessionStorage.getItem('omnidle_lol_artwork_recent');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  // Countdown timer for daily
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize round
  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<LolChampion>, LolArtwork>('league-of-legends', 'artwork', mode);
      if (session) {
        let restoredArtwork = session.targetItem;
        if (!restoredArtwork && session.targetId) {
          restoredArtwork = LOL_ARTWORKS.find((a) => a.id === session.targetId);
        }
        if (restoredArtwork) {
          const champ = LOL_CHAMPIONS.find((c) => c.id === restoredArtwork.championId) || LOL_CHAMPIONS[0];
          setTargetArtwork(restoredArtwork);
          setTargetChampion(champ);
          setChampionGuesses(session.guesses || []);
          setWrongArtworkGuesses(session.extra?.wrongArtworkGuesses || []);
          setIsChampionGuessed(Boolean(session.extra?.isChampionGuessed || session.isWon));
          setIsGameOver(Boolean(session.isGameOver));
          setWasSkipped(Boolean(session.extra?.wasSkipped));
          setSkinFilterQuery('');
          if (session.extra?.focusPoint) {
            setFocusPoint(session.extra.focusPoint);
          }
          return;
        }
      }
    }

    let chosenArtwork: LolArtwork;

    if (mode === 'daily') {
      const idx = getDailyIndex('league-of-legends', 'artwork', LOL_ARTWORKS.length);
      chosenArtwork = LOL_ARTWORKS[idx];
    } else {
      const available = LOL_ARTWORKS.filter((a) => !recentArtworkIds.includes(a.id));
      const pool = available.length > 0 ? available : LOL_ARTWORKS;
      const randIdx = Math.floor(Math.random() * pool.length);
      chosenArtwork = pool[randIdx];

      const updated = [...recentArtworkIds.slice(-40), chosenArtwork.id];
      setRecentArtworkIds(updated);
      try {
        sessionStorage.setItem('omnidle_lol_artwork_recent', JSON.stringify(updated));
      } catch {}
    }

    const champ = LOL_CHAMPIONS.find((c) => c.id === chosenArtwork.championId) || LOL_CHAMPIONS[0];

    // Calculate a stable focal point around character's focal region (head/torso: 35-65% X, 25-55% Y)
    const h = hashString(chosenArtwork.id);
    const fx = 38 + (h % 26); // 38% to 64%
    const fy = 25 + ((h >> 3) % 25); // 25% to 50%

    setTargetArtwork(chosenArtwork);
    setTargetChampion(champ);
    setFocusPoint({ x: fx, y: fy });
    setChampionGuesses([]);
    setIsChampionGuessed(false);
    setWrongArtworkGuesses([]);
    setIsGameOver(false);
    setWasSkipped(false);
    setSkinFilterQuery('');

    saveGameSession('league-of-legends', 'artwork', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosenArtwork,
      targetId: chosenArtwork.id,
      extra: {
        focusPoint: { x: fx, y: fy },
        wrongArtworkGuesses: [],
        isChampionGuessed: false,
        wasSkipped: false,
      },
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  // Total errors count determines dezooming (max 25)
  const totalErrors = championGuesses.length + wrongArtworkGuesses.length;
  // Zoom formula: starts at 5.0 (500%), each error dezooms smoothly down to 1.0 (100%) at 25 errors
  const currentZoomFactor = isGameOver
    ? 1.0
    : Math.max(1.0, 5.0 - (Math.min(totalErrors, 25) / 25) * 4.0);

  // Available skins for the target champion
  const championSkins = useMemo(() => {
    return LOL_ARTWORKS.filter((a) => a.championId === targetChampion.id);
  }, [targetChampion]);

  // Filtered skins for phase 2 selector (matches both IT and EN)
  const filteredSkins = useMemo(() => {
    if (!skinFilterQuery.trim()) return championSkins;
    const q = skinFilterQuery.toLowerCase();
    return championSkins.filter((s) => {
      const itName = s.artworkName.toLowerCase();
      const enName = (s.artworkNameEn || '').toLowerCase();
      return itName.includes(q) || enName.includes(q);
    });
  }, [championSkins, skinFilterQuery]);

  // Search options for Phase 1 (173 champions)
  const searchOptions: SearchOption[] = useMemo(() => {
    return LOL_CHAMPIONS.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: `${lang === 'en' && c.titleEn ? c.titleEn : c.title} • ${c.positions.join('/')} • ${c.regions.map(r => translateRegion(r, lang)).join(', ')}`,
      iconUrl: c.icon,
    })).sort((a, b) => a.name.localeCompare(b.name, lang, { sensitivity: 'base' }));
  }, [lang]);

  // Phase 1: Guess Champion
  const handleMakeChampionGuess = (option: SearchOption) => {
    if (isChampionGuessed || isGameOver) return;
    const guessedChamp = LOL_CHAMPIONS.find((c) => c.id === option.id);
    if (!guessedChamp) return;

    const matches = compareLolChampion(guessedChamp, targetChampion, lang);
    const isCorrect = guessedChamp.id === targetChampion.id;

    const record: GuessRecord<LolChampion> = {
      item: guessedChamp,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...championGuesses];
    setChampionGuesses(newGuesses);

    if (isCorrect) {
      setIsChampionGuessed(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    saveGameSession('league-of-legends', 'artwork', mode, {
      isWon: false,
      isGameOver: false,
      guesses: newGuesses,
      targetItem: targetArtwork,
      targetId: targetArtwork.id,
      extra: {
        focusPoint,
        wrongArtworkGuesses,
        isChampionGuessed: isCorrect,
        wasSkipped: false,
      },
    });
  };

  // Phase 2: Guess Artwork/Skin Name
  const handleSelectArtworkName = (artwork: LolArtwork) => {
    if (!isChampionGuessed || isGameOver) return;

    const isCorrect = artwork.id === targetArtwork.id;

    if (isCorrect) {
      setIsGameOver(true);
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.5 },
      });

      const totalAttempts = championGuesses.length + wrongArtworkGuesses.length + 1;
      saveGameResult('league-of-legends', 'artwork', true, totalAttempts);

      saveGameSession('league-of-legends', 'artwork', mode, {
        isWon: true,
        isGameOver: true,
        guesses: championGuesses,
        targetItem: targetArtwork,
        targetId: targetArtwork.id,
        extra: {
          focusPoint,
          wrongArtworkGuesses,
          isChampionGuessed: true,
          wasSkipped: false,
        },
      });

      if (mode === 'infinite') {
        const newStreak = streak + 1;
        setStreak(newStreak);
        try {
          sessionStorage.setItem('omnidle_lol_artwork_streak', String(newStreak));
        } catch {}

        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          try {
            localStorage.setItem('omnidle_lol_artwork_best_streak', String(newStreak));
          } catch {}
        }
      }

      if (onVictory) {
        // Build accurate 2-column matrix: [Campione, Artwork]
        const matchesHistory: AttributeMatch[][] = [];
        // Wrong champion guesses (only 1st column guessed, wrong)
        championGuesses
          .slice()
          .reverse()
          .forEach((g) => {
            if (!g.isCorrect) {
              matchesHistory.push([
                { label: t.champion, value: g.item.name, status: 'wrong' },
                { label: t.artwork, value: '—', status: 'wrong' },
              ]);
            }
          });

        // Wrong artwork guesses after finding champion
        wrongArtworkGuesses.forEach(() => {
          matchesHistory.push([
            { label: t.champion, value: targetChampion.name, status: 'exact' },
            { label: t.artwork, value: 'Errato', status: 'wrong' },
          ]);
        });

        // Final winning guess
        matchesHistory.push([
          { label: t.champion, value: targetChampion.name, status: 'exact' },
          { label: t.artwork, value: getArtworkName(targetArtwork), status: 'exact' },
        ]);

        onVictory(totalAttempts, matchesHistory, {
          name: targetChampion.name,
          title: getArtworkName(targetArtwork),
          icon: targetArtwork.splashUrl,
          imageUrl: targetArtwork.splashUrl,
        });
      }
    } else {
      if (!wrongArtworkGuesses.includes(artwork.id)) {
        const updatedWrong = [...wrongArtworkGuesses, artwork.id];
        setWrongArtworkGuesses(updatedWrong);
        saveGameSession('league-of-legends', 'artwork', mode, {
          isWon: false,
          isGameOver: false,
          guesses: championGuesses,
          targetItem: targetArtwork,
          targetId: targetArtwork.id,
          extra: {
            focusPoint,
            wrongArtworkGuesses: updatedWrong,
            isChampionGuessed: true,
            wasSkipped: false,
          },
        });
      }
    }
  };

  const handleSkip = (immediate = false) => {
    if (isGameOver && !immediate) return;

    if (immediate && mode === 'infinite') {
      if (mode === 'infinite') {
        setStreak(0);
        try {
          sessionStorage.setItem('omnidle_lol_artwork_streak', '0');
        } catch {}
      }
      initGame(true);
      return;
    }

    setIsChampionGuessed(true);
    setIsGameOver(true);
    setWasSkipped(true);
    if (mode === 'infinite') {
      setStreak(0);
      try {
        sessionStorage.setItem('omnidle_lol_artwork_streak', '0');
      } catch {}
    }

    saveGameSession('league-of-legends', 'artwork', mode, {
      isWon: false,
      isGameOver: true,
      guesses: championGuesses,
      targetItem: targetArtwork,
      targetId: targetArtwork.id,
      extra: {
        focusPoint,
        wrongArtworkGuesses,
        isChampionGuessed: true,
        wasSkipped: true,
      },
    });
  };

  const progressPercent = Math.min(100, Math.round((totalErrors / 25) * 100));

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
      {/* Header Badge & Title */}
      <div className="text-center mb-6">
        {mode === 'infinite' && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/20 mb-2.5">
            <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{t.streak}: {streak} ({t.bestStreak}: {bestStreak})</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {lang === 'en' ? "Guess the Champion's Artwork" : "Indovina l'Artwork del Campione"}
        </h1>
        <p className="mt-1 text-xs text-zinc-400 max-w-lg mx-auto">
          {lang === 'en'
            ? 'The image starts at 500% zoom and zooms out with every error. At 25 errors the artwork is 100% visible! Once the champion is found, guess the skin name.'
            : "L'immagine parte con zoom al 500% e si dezooma ad ogni errore. Al 25° errore l'artwork è visibile al 100%! Una volta trovato il campione, indovina il nome della skin."}
        </p>
      </div>

      {/* Banner Risultato Daily Già Risolta */}
      {mode === 'daily' && isGameOver && !wasSkipped && (
        <DailyCompletedBanner
          attemptsCount={championGuesses.length + wrongArtworkGuesses.length + 1}
          targetName={targetChampion.name}
          targetSubtitle={getArtworkName(targetArtwork)}
          targetImageUrl={targetArtwork.splashUrl}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {/* Main Artwork Viewer Container */}
      <div className="relative mx-auto max-w-2xl rounded-2xl border-2 border-amber-500/40 bg-[#0d0d10] p-3 sm:p-4 shadow-2xl mb-6 overflow-hidden">
        {/* Top Zoom Info Bar */}
        <div className="flex items-center justify-between text-xs mb-2.5 px-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <ZoomOut className="h-3.5 w-3.5" />
            <span>
              Zoom: <strong>{Math.round(currentZoomFactor * 100)}%</strong>
              {currentZoomFactor === 1.0 && ` (${t.zoomFull})`}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-zinc-400 text-[11px] font-semibold">
              {lang === 'en' ? 'Errors' : 'Errori'}: <strong className="text-zinc-200">{totalErrors}</strong> / 25
            </div>

            {!isGameOver && (
              <button
                onClick={() => handleSkip()}
                id="btn-skip-artwork-top"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:bg-zinc-800 hover:border-amber-500/50 transition shadow"
              >
                <FastForward className="h-3 w-3" />
                <span>{t.skipArtwork}</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar to 25 attempts */}
        <div className="w-full bg-zinc-800/80 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* The Zoomable Artwork Canvas */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[18/9] rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-inner">
          <img
            src={targetArtwork.splashUrl}
            alt="Artwork"
            style={{
              transform: `scale(${currentZoomFactor})`,
              transformOrigin: `${focusPoint.x}% ${focusPoint.y}%`,
              transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="w-full h-full object-cover select-none pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.opacity = '0.5';
            }}
          />

          {/* Vignette border overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] rounded-xl" />
        </div>

        {/* Bottom indicator hint */}
        <div className="mt-2.5 text-center text-[11px] text-zinc-500">
          {totalErrors < 25 ? (
            <span>{t.missingErrorsForFull(25 - totalErrors)}</span>
          ) : (
            <span className="text-emerald-400 font-bold">{t.artworkFullShown}</span>
          )}
        </div>
      </div>

      {/* PHASE 2: Champion Guessed! Select the Artwork/Skin Name */}
      {isChampionGuessed && !isGameOver && (
        <div className="max-w-2xl mx-auto mb-8 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-950/40 via-zinc-900/90 to-zinc-900 p-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.guessedChampion}: {targetChampion.name}!</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
            {t.whichSkinName}
          </h2>
          <p className="text-xs text-zinc-400 mb-4">
            {lang === 'en'
              ? `Select the correct skin among all official artworks of ${targetChampion.name}.`
              : `Seleziona la skin corretta tra tutti gli artwork ufficiali di ${targetChampion.name}.`}
          </p>

          {/* Quick search filter for champions with many skins */}
          {championSkins.length > 6 && (
            <div className="relative max-w-sm mx-auto mb-4">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                value={skinFilterQuery}
                onChange={(e) => setSkinFilterQuery(e.target.value)}
                placeholder={t.filterSkinsPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Skin Selection Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1 text-left custom-scrollbar">
            {filteredSkins.map((skin) => {
              const isWrong = wrongArtworkGuesses.includes(skin.id);
              const skinName = getArtworkName(skin);

              return (
                <button
                  key={skin.id}
                  onClick={() => handleSelectArtworkName(skin)}
                  disabled={isWrong}
                  className={`flex items-center justify-between p-3 rounded-xl border font-bold text-xs transition-all duration-200 shadow ${
                    isWrong
                      ? 'bg-rose-950/40 border-rose-800 text-rose-500 line-through opacity-50 cursor-not-allowed'
                      : 'bg-zinc-900/90 border-zinc-700/80 text-zinc-200 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 cursor-pointer active:scale-98'
                  }`}
                >
                  <span className="truncate pr-2">{skinName}</span>
                  {skin.skinNum === 0 && (
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                      {t.base}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {wrongArtworkGuesses.length > 0 && (
            <p className="mt-3 text-xs font-bold text-rose-400 animate-pulse">
              {t.wrongArtworkRetry}
            </p>
          )}

          {/* Skip option in Phase 2 */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-center">
            <button
              onClick={() => handleSkip()}
              id="btn-skip-skin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-amber-400 hover:text-amber-300 hover:border-amber-500 transition shadow"
            >
              <FastForward className="h-3.5 w-3.5" />
              <span>{t.dontKnowSkinSkip}</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER / VICTORY BANNER */}
      {isGameOver && (
        <div
          className={`mx-auto max-w-xl mb-8 rounded-2xl border-2 p-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300 ${
            wasSkipped
              ? 'border-amber-500/50 bg-amber-950/40'
              : 'border-emerald-500/60 bg-emerald-950/40'
          }`}
        >
          <div
            className={`flex items-center justify-center gap-2 font-black text-lg mb-2 ${
              wasSkipped ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {wasSkipped ? (
              <>
                <FastForward className="h-6 w-6" />
                <span>{t.artworkSkipped}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-6 w-6" />
                <span>{t.artworkGuessed}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 my-3">
            <img
              src={targetChampion.icon}
              alt={targetChampion.name}
              className={`h-14 w-14 rounded-xl border-2 shadow-md object-cover ${
                wasSkipped ? 'border-amber-400' : 'border-emerald-400'
              }`}
            />
            <div className="text-left">
              <h2 className="text-xl font-black text-white">{getArtworkName(targetArtwork)}</h2>
              <p
                className={`text-xs font-medium ${
                  wasSkipped ? 'text-amber-300' : 'text-emerald-300'
                }`}
              >
                {targetChampion.name} • {lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title}
              </p>
              <p className="text-[11px] text-zinc-400">
                {wasSkipped
                  ? (lang === 'en' ? 'You chose to skip this artwork' : 'Hai scelto di saltare questo artwork')
                  : `${lang === 'en' ? 'Total attempts' : 'Tentativi totali'}: ${championGuesses.length + wrongArtworkGuesses.length}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {mode === 'infinite' ? (
              <button
                onClick={() => initGame(true)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-black hover:bg-emerald-400 transition shadow-lg"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.nextArtwork}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>
                  {t.nextDailyIn}: {String(countdown.hours).padStart(2, '0')}:
                  {String(countdown.minutes).padStart(2, '0')}:
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASE 1: Search Bar (Active until champion is guessed) */}
      {!isChampionGuessed && !isGameOver && (
        <div className="max-w-xl mx-auto mb-6">
          <div className="mb-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Phase 1: Guess the Champion' : 'Fase 1: Indovina il Campione'}
            </span>
          </div>

          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={championGuesses.map((g) => g.item.id)}
            onSelectOption={handleMakeChampionGuess}
            placeholder={t.searchPlaceholderArtwork}
          />

          <div className="flex items-center justify-between mt-2.5 px-1 text-xs text-zinc-500">
            <span>
              {lang === 'en' ? 'Attempts' : 'Tentativi effettuati'}: <strong className="text-zinc-300">{championGuesses.length}</strong>
            </span>
            <button
              onClick={() => handleSkip()}
              id="btn-skip-search"
              className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
            >
              <FastForward className="h-3.5 w-3.5" />
              <span>{t.skipArtworkFull}</span>
            </button>
          </div>
        </div>
      )}

      {/* Champion Guesses History */}
      {championGuesses.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-3 mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 text-center mb-3">
            {lang === 'en' ? `Guessed Champions (${championGuesses.length})` : `Campioni Provati (${championGuesses.length})`}
          </h3>

          <div className="space-y-2">
            {championGuesses.map((guess, idx) => {
              const c = guess.item;
              const isMatch = guess.isCorrect;

              return (
                <div
                  key={c.id + '-' + idx}
                  className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition ${
                    isMatch
                      ? 'bg-emerald-950/30 border-emerald-500/60 shadow-md'
                      : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={c.icon}
                        alt={c.name}
                        className="h-10 w-10 rounded-lg border border-zinc-700 object-cover"
                      />
                      {isMatch ? (
                        <CheckCircle2 className="absolute -top-1.5 -right-1.5 h-4 w-4 text-emerald-400 bg-zinc-950 rounded-full" />
                      ) : (
                        <XCircle className="absolute -top-1.5 -right-1.5 h-4 w-4 text-rose-500 bg-zinc-950 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-100">{c.name}</h4>
                      <p className="text-[11px] text-zinc-500">
                        {lang === 'en' && c.titleEn ? c.titleEn : c.title}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                      isMatch
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {isMatch
                      ? (lang === 'en' ? 'Correct Champion!' : 'Campione Corretto!')
                      : (lang === 'en' ? 'Wrong Champion' : 'Campione Errato')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
