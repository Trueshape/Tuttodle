import React, { useState, useEffect, useMemo } from 'react';
import { LolChampion, LolAbility, GameMode, GuessRecord, AttributeMatch, LolLanguage } from '../../types';
import { LOL_CHAMPIONS } from '../../data/lolChampions';
import { LOL_ABILITIES } from '../../data/lolAbilities';
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
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  ZoomIn,
  Clock,
  HelpCircle,
  SkipForward,
  Palette,
  Compass
} from 'lucide-react';

interface LoLAbilityGameProps {
  mode: GameMode;
  lang?: LolLanguage;
  onModeChange?: (mode: GameMode) => void;
  onVictory?: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetItem: any) => void;
  onOpenHelp: () => void;
}

const ROTATION_OPTIONS = [90, 180, 270];

const ALL_SLOTS: ('P' | 'Q' | 'W' | 'E' | 'R')[] = ['P', 'Q', 'W', 'E', 'R'];

export const LoLAbilityGame: React.FC<LoLAbilityGameProps> = ({
  mode,
  lang = 'it',
  onModeChange,
  onVictory,
  onOpenHelp,
}) => {
  const t = LOL_TRANSLATIONS[lang];

  const getSlotTitle = (slot: 'P' | 'Q' | 'W' | 'E' | 'R') => {
    if (slot === 'P') return lang === 'en' ? 'Passive' : 'Passiva';
    if (slot === 'R') return lang === 'en' ? 'Ultimate [R]' : 'Suprema [R]';
    return lang === 'en' ? `Ability ${slot}` : `Abilità ${slot}`;
  };

  const [targetAbility, setTargetAbility] = useState<LolAbility>(LOL_ABILITIES[0]);
  const [targetChampion, setTargetChampion] = useState<LolChampion>(LOL_CHAMPIONS[0]);
  const [initialRotation, setInitialRotation] = useState<number>(90);
  const [guesses, setGuesses] = useState<GuessRecord<LolChampion>[]>([]);
  const [isChampionGuessed, setIsChampionGuessed] = useState(false);
  const [wrongLetterGuesses, setWrongLetterGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilNextDaily());

  // Infinite streak tracker with session and local storage persistence
  const [streak, setStreak] = useState<number>(() => {
    try {
      const s = sessionStorage.getItem('omnidle_lol_ability_streak');
      return s ? parseInt(s, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      const s = localStorage.getItem('omnidle_lol_ability_best_streak');
      return s ? parseInt(s, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const s = sessionStorage.getItem('omnidle_lol_ability_recent');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize game
  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<LolChampion>, LolAbility>('league-of-legends', 'abilita', mode);
      if (session) {
        let restoredAbility = session.targetItem;
        if (!restoredAbility && session.targetId) {
          restoredAbility = LOL_ABILITIES.find((a) => a.id === session.targetId);
        }
        if (restoredAbility) {
          const champ = LOL_CHAMPIONS.find((c) => c.id === restoredAbility.championId) || LOL_CHAMPIONS[0];
          setTargetAbility(restoredAbility);
          setTargetChampion(champ);
          setGuesses(session.guesses || []);
          setWrongLetterGuesses(session.extra?.wrongLetterGuesses || []);
          setIsChampionGuessed(Boolean(session.extra?.isChampionGuessed || session.isWon));
          setIsGameOver(Boolean(session.isGameOver));
          setInitialRotation(session.extra?.initialRotation || 0);
          setIsZoomed(false);
          return;
        }
      }
    }

    let chosenAbility: LolAbility;
    let chosenRotation: number;

    if (mode === 'daily') {
      const idx = getDailyIndex('league-of-legends', 'abilita', LOL_ABILITIES.length);
      chosenAbility = LOL_ABILITIES[idx];
      chosenRotation = ROTATION_OPTIONS[idx % ROTATION_OPTIONS.length];
    } else {
      const available = LOL_ABILITIES.filter((a) => !recentIds.includes(a.id));
      const pool = available.length > 0 ? available : LOL_ABILITIES;
      const randIdx = Math.floor(Math.random() * pool.length);
      chosenAbility = pool[randIdx];
      chosenRotation = ROTATION_OPTIONS[Math.floor(Math.random() * ROTATION_OPTIONS.length)];
      const updatedRecents = [...recentIds.slice(-40), chosenAbility.id];
      setRecentIds(updatedRecents);
      try {
        sessionStorage.setItem('omnidle_lol_ability_recent', JSON.stringify(updatedRecents));
      } catch {}
    }

    const champ = LOL_CHAMPIONS.find((c) => c.id === chosenAbility.championId) || LOL_CHAMPIONS[0];
    setTargetAbility(chosenAbility);
    setTargetChampion(champ);
    setInitialRotation(chosenRotation);
    setGuesses([]);
    setIsChampionGuessed(false);
    setWrongLetterGuesses([]);
    setIsGameOver(false);
    setIsZoomed(false);

    saveGameSession('league-of-legends', 'abilita', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosenAbility,
      targetId: chosenAbility.id,
      extra: {
        initialRotation: chosenRotation,
        wrongLetterGuesses: [],
        isChampionGuessed: false,
      },
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  // Current visual transformation states:
  // Rotation: Normal (0deg) once 1 attempt made or champion guessed, otherwise initialRotation (90, 180, 270)
  const currentRotation = (guesses.length >= 1 || isChampionGuessed || isGameOver) ? 0 : initialRotation;
  // Grayscale: True until 3 attempts made or champion guessed or game over
  const isGrayscale = !isChampionGuessed && !isGameOver && guesses.length < 3;

  // Search options for champions
  const searchOptions: SearchOption[] = useMemo(() => {
    return LOL_CHAMPIONS.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: `${lang === 'en' && c.titleEn ? c.titleEn : c.title} • ${c.positions.join('/')} • ${c.regions.map(r => translateRegion(r, lang)).join(', ')}`,
      iconUrl: c.icon,
    })).sort((a, b) => a.name.localeCompare(b.name, lang, { sensitivity: 'base' }));
  }, [lang]);

  // Phase 1: Guess the Champion
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

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsChampionGuessed(true);
      // Small celebratory particle burst for passing phase 1
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    }

    saveGameSession('league-of-legends', 'abilita', mode, {
      isWon: false,
      isGameOver: false,
      guesses: newGuesses,
      targetItem: targetAbility,
      targetId: targetAbility.id,
      extra: {
        initialRotation,
        wrongLetterGuesses,
        isChampionGuessed: isCorrect,
      },
    });
  };

  const abilityName = lang === 'en' && targetAbility.nameEn ? targetAbility.nameEn : targetAbility.name;
  const abilityDesc = lang === 'en' && targetAbility.descriptionEn ? targetAbility.descriptionEn : targetAbility.description;

  // Phase 2: Select Ability Slot Letter (P, Q, W, E, R)
  const handleSelectSlotLetter = (slot: 'P' | 'Q' | 'W' | 'E' | 'R') => {
    if (!isChampionGuessed || isGameOver) return;

    const isCorrect = slot === targetAbility.slot;

    if (isCorrect) {
      setIsGameOver(true);
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.5 },
      });

      const totalAttempts = guesses.length + wrongLetterGuesses.length + 1;
      saveGameResult('league-of-legends', 'abilita', true, totalAttempts);

      saveGameSession('league-of-legends', 'abilita', mode, {
        isWon: true,
        isGameOver: true,
        guesses,
        targetItem: targetAbility,
        targetId: targetAbility.id,
        extra: {
          initialRotation,
          wrongLetterGuesses,
          isChampionGuessed: true,
        },
      });

      if (mode === 'infinite') {
        const newStreak = streak + 1;
        setStreak(newStreak);
        try {
          sessionStorage.setItem('omnidle_lol_ability_streak', String(newStreak));
        } catch {}

        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          try {
            localStorage.setItem('omnidle_lol_ability_best_streak', String(newStreak));
          } catch {}
        }
      }

      if (onVictory) {
        // Build accurate 2-column matrix: [Campione, Tasto Abilità]
        const matchesHistory: AttributeMatch[][] = [];
        // Wrong champion guesses
        guesses
          .slice()
          .reverse()
          .forEach((g) => {
            if (!g.isCorrect) {
              matchesHistory.push([
                { label: t.champion, value: g.item.name, status: 'wrong' },
                { label: t.ability, value: '—', status: 'wrong' },
              ]);
            }
          });

        // Wrong letter guesses
        wrongLetterGuesses.forEach((wrongSlot) => {
          matchesHistory.push([
            { label: t.champion, value: targetChampion.name, status: 'exact' },
            { label: t.ability, value: wrongSlot, status: 'wrong' },
          ]);
        });

        // Final victory row
        matchesHistory.push([
          { label: t.champion, value: targetChampion.name, status: 'exact' },
          { label: t.ability, value: targetAbility.slot, status: 'exact' },
        ]);

        onVictory(totalAttempts, matchesHistory, {
          name: targetChampion.name,
          title: `[${targetAbility.slot}] ${abilityName}`,
          icon: targetChampion.icon,
          imageUrl: targetChampion.icon,
        });
      }
    } else {
      if (!wrongLetterGuesses.includes(slot)) {
        const updatedWrong = [...wrongLetterGuesses, slot];
        setWrongLetterGuesses(updatedWrong);
        saveGameSession('league-of-legends', 'abilita', mode, {
          isWon: false,
          isGameOver: false,
          guesses,
          targetItem: targetAbility,
          targetId: targetAbility.id,
          extra: {
            initialRotation,
            wrongLetterGuesses: updatedWrong,
            isChampionGuessed: true,
          },
        });
      }
    }
  };

  const handleSurrender = () => {
    if (isGameOver) return;
    setIsChampionGuessed(true);
    setIsGameOver(true);
    if (mode === 'infinite') {
      setStreak(0);
      try {
        sessionStorage.setItem('omnidle_lol_ability_streak', '0');
      } catch {}
    }

    saveGameSession('league-of-legends', 'abilita', mode, {
      isWon: false,
      isGameOver: true,
      guesses,
      targetItem: targetAbility,
      targetId: targetAbility.id,
      extra: {
        initialRotation,
        wrongLetterGuesses,
        isChampionGuessed: true,
      },
    });
  };

  const rotationLabel = initialRotation === 90 ? '+90° (Destra)' : initialRotation === 270 ? '-90° (Sinistra)' : '180° (Capovolta)';

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
      {/* Title & Badge Header */}
      <div className="text-center mb-6">
        {mode === 'infinite' && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/20 mb-2.5">
            <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{t.streak}: {streak} ({t.bestStreak}: {bestStreak})</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {lang === 'en' ? 'Guess the Ability (P, Q, W, E, R)' : "Indovina l'Abilità (P, Q, W, E, R)"}
        </h1>
        <p className="mt-1 text-xs text-zinc-400 max-w-lg mx-auto">
          {lang === 'en'
            ? 'The icon starts grayscale and rotated. After 1 attempt it rotates upright, after 3 it turns into full color. Guess the champion, then pick the ability key!'
            : "L'icona parte in bianco e nero e ruotata. Dopo 1 tentativo torna diritta, dopo 3 a colori. Indovina il campione, poi seleziona la lettera corretta!"}
        </p>
      </div>

      {/* Banner Risultato Daily Già Risolta */}
      {mode === 'daily' && isGameOver && (
        <DailyCompletedBanner
          attemptsCount={guesses.length + wrongLetterGuesses.length + 1}
          targetName={targetChampion.name}
          targetSubtitle={`[${targetAbility.slot}] ${abilityName}`}
          targetImageUrl={targetAbility.iconUrl}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {/* Main Ability Icon Frame */}
      <div className="relative mx-auto max-w-md rounded-2xl border-2 border-amber-500/30 bg-[#121217] p-6 shadow-2xl text-center mb-6 overflow-hidden">
        {/* Hextech corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />

        {/* Status badges bar on top of the card */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Orientation status indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-[11px] font-semibold">
            <Compass className={`h-3 w-3 ${currentRotation === 0 ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className={currentRotation === 0 ? 'text-emerald-400' : 'text-zinc-400'}>
              {currentRotation === 0
                ? (lang === 'en' ? 'Normal Orientation' : 'Orientamento Normale')
                : (lang === 'en' ? `Rotated (${initialRotation}°)` : `Ruotata (${rotationLabel})`)}
            </span>
          </div>

          {/* Color status indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-[11px] font-semibold">
            <Palette className={`h-3 w-3 ${isGrayscale ? 'text-zinc-400' : 'text-sky-400'}`} />
            <span className={isGrayscale ? 'text-zinc-400' : 'text-sky-400'}>
              {isGrayscale ? (lang === 'en' ? 'Grayscale' : 'Bianco e Nero') : (lang === 'en' ? 'In Color' : 'A Colori')}
            </span>
          </div>

          {/* Zoom toggle button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? (lang === 'en' ? 'Zoom out' : 'Riduci zoom') : (lang === 'en' ? 'Zoom in' : 'Ingrandisci icona')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 transition"
          >
            <ZoomIn className="h-3 w-3" />
            <span>{isZoomed ? '2x' : '1x'}</span>
          </button>
        </div>

        {/* Central Icon container */}
        <div className="mx-auto my-4 flex items-center justify-center">
          <div className="relative p-2 rounded-2xl bg-gradient-to-b from-amber-500/40 via-yellow-600/20 to-zinc-900 border-2 border-amber-500/50 shadow-xl shadow-amber-950/50">
            <div
              className={`overflow-hidden rounded-xl transition-all duration-500 ${
                isZoomed ? 'scale-150 p-2' : ''
              }`}
            >
              <img
                src={targetAbility.iconUrl}
                alt="Ability Icon"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  filter: isGrayscale ? 'grayscale(100%) brightness(0.95)' : 'none',
                }}
                className="h-28 w-28 sm:h-32 sm:w-32 object-cover rounded-xl shadow-inner transition-all duration-500 select-none pointer-events-none"
              />
            </div>

            {/* Revealed slot badge if victory or surrendered */}
            {isGameOver && (
              <span className="absolute -bottom-3 -right-3 px-3 py-1 rounded-lg text-sm font-black uppercase border-2 shadow-xl bg-amber-500 text-zinc-950 border-amber-300">
                {targetAbility.slot}
              </span>
            )}
          </div>
        </div>

        {/* Visual progression explanation banner */}
        <div className="mt-3 text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-3 flex items-center justify-around">
          <span className={guesses.length >= 1 || isChampionGuessed ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
            {lang === 'en' ? '✓ 1st try: Upright' : '✓ 1° err: Posizione dritta'}
          </span>
          <span className="text-zinc-700">•</span>
          <span className={guesses.length >= 3 || isChampionGuessed ? 'text-sky-400 font-semibold' : 'text-zinc-500'}>
            {lang === 'en' ? '✓ 3rd try: Color' : '✓ 3° err: A colori'}
          </span>
        </div>
      </div>

      {/* PHASE 2: Champion Guessed! Select the letter (P, Q, W, E, R) */}
      {isChampionGuessed && !isGameOver && (
        <div className="max-w-xl mx-auto mb-8 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-950/40 to-zinc-900/90 p-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.guessedChampion}: {targetChampion.name}!</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
            {t.whichLetterName}
          </h2>
          <p className="text-xs text-zinc-400 mb-5">
            {lang === 'en'
              ? 'Click one of the 5 keys to guess if this is the Passive or Q, W, E, R ability.'
              : 'Clicca su uno dei 5 tasti per indovinare se si tratta della Passiva o delle abilità Q, W, E, R.'}
          </p>

          {/* The 5 Ability Buttons: P, Q, W, E, R */}
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3 max-w-md mx-auto mb-4">
            {ALL_SLOTS.map((slot) => {
              const isWrong = wrongLetterGuesses.includes(slot);
              const fullTitle = getSlotTitle(slot);

              const colorMap = {
                P: { baseBg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/40', hoverBg: 'hover:bg-amber-500/30 hover:border-amber-400' },
                Q: { baseBg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/40', hoverBg: 'hover:bg-sky-500/30 hover:border-sky-400' },
                W: { baseBg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/40', hoverBg: 'hover:bg-emerald-500/30 hover:border-emerald-400' },
                E: { baseBg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/40', hoverBg: 'hover:bg-purple-500/30 hover:border-purple-400' },
                R: { baseBg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/40', hoverBg: 'hover:bg-rose-500/30 hover:border-rose-400' },
              }[slot];

              return (
                <button
                  key={slot}
                  onClick={() => handleSelectSlotLetter(slot)}
                  disabled={isWrong}
                  id={`btn-slot-${slot}`}
                  className={`flex flex-col items-center justify-center py-3 sm:py-4 px-2 rounded-xl font-black border-2 transition-all duration-200 shadow-lg ${
                    isWrong
                      ? 'bg-rose-950/50 border-rose-800 text-rose-500 line-through opacity-50 cursor-not-allowed scale-95'
                      : `${colorMap.baseBg} ${colorMap.border} ${colorMap.text} ${colorMap.hoverBg} hover:scale-105 active:scale-95 cursor-pointer`
                  }`}
                >
                  <span className="text-2xl sm:text-3xl leading-none">{slot}</span>
                  <span className="text-[10px] uppercase font-bold mt-1 tracking-tight truncate w-full">
                    {fullTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {wrongLetterGuesses.length > 0 && (
            <p className="text-xs font-bold text-rose-400 animate-pulse">
              {t.wrongLetterRetry}
            </p>
          )}
        </div>
      )}

      {/* GAME OVER / VICTORY BANNER */}
      {isGameOver && (
        <div className="mx-auto max-w-md mb-8 rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/40 p-5 text-center shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-lg mb-2">
            <CheckCircle2 className="h-6 w-6" />
            <span>{t.abilityGuessed}</span>
          </div>

          <div className="flex items-center justify-center gap-3 my-3">
            <img
              src={targetChampion.icon}
              alt={targetChampion.name}
              className="h-14 w-14 rounded-xl border-2 border-emerald-400 shadow-md object-cover"
            />
            <div className="text-left">
              <h2 className="text-xl font-black text-white">{targetChampion.name}</h2>
              <p className="text-xs text-emerald-300 font-medium">
                {lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-amber-500 text-zinc-950">
                  {targetAbility.slot}
                </span>
                <span className="text-xs font-bold text-zinc-200">
                  {abilityName}
                </span>
              </div>
            </div>
          </div>

          {abilityDesc && (
            <p className="text-xs text-zinc-300 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800/80 mb-4 text-left italic line-clamp-3">
              "{abilityDesc}"
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            {mode === 'infinite' ? (
              <button
                onClick={() => initGame(true)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-black hover:bg-emerald-400 transition shadow-lg"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.nextAbility}</span>
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

      {/* PHASE 1: Search Bar (ONLY shown while champion has not been guessed yet) */}
      {!isChampionGuessed && !isGameOver && (
        <div className="max-w-xl mx-auto mb-6">
          <div className="mb-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Phase 1: Find the Champion' : 'Fase 1: Trova il Campione'}
            </span>
          </div>

          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeChampionGuess}
            placeholder={t.searchPlaceholderAbility}
          />

          <div className="flex items-center justify-between mt-2.5 px-1 text-xs text-zinc-500">
            <span>
              {lang === 'en' ? 'Attempts' : 'Tentativi effettuati'}: <strong className="text-zinc-300">{guesses.length}</strong>
            </span>
            {mode === 'infinite' && (
              <button
                onClick={handleSurrender}
                className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-rose-400 transition"
              >
                <SkipForward className="h-3 w-3" />
                <span>{lang === 'en' ? 'Give up and reveal' : 'Arrenditi e scopri'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Guess History for Phase 1 */}
      {guesses.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-3 mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 text-center mb-3">
            {lang === 'en' ? `Guessed Champions (${guesses.length})` : `Campioni Provati (${guesses.length})`}
          </h3>

          <div className="space-y-2">
            {guesses.map((guess, idx) => {
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
