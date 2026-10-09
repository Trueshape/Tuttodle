import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LolChampion,
  LolQuote,
  GuessRecord,
  GameMode,
  AttributeMatch,
  LolLanguage,
} from '../../types';
import { LOL_CHAMPIONS } from '../../data/lolChampions';
import { LOL_QUOTES } from '../../data/lolQuotes';
import { compareLolChampion } from '../../utils/comparator';
import { getDailyIndex, getTimeUntilNextDaily } from '../../utils/dailySeed';
import { saveGameResult, getStats } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import {
  LOL_TRANSLATIONS,
  translateRegion,
  translateSpecies,
  translateGender,
  translateResource,
} from '../../utils/lolLocalization';
import { SearchBar, SearchOption } from '../SearchBar';
import {
  Quote,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Lock,
  Unlock,
  FastForward,
  RotateCcw,
  Flame,
  Check,
  Info,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getChampionVoiceAudioUrl } from '../../utils/lolAudio';

interface LoLQuoteGameProps {
  mode: GameMode;
  lang?: LolLanguage;
  onModeChange?: (mode: GameMode) => void;
  onVictory: (
    attemptsCount: number,
    guessesMatches: AttributeMatch[][],
    targetChampion: LolChampion
  ) => void;
  onOpenHelp: () => void;
}

export const LoLQuoteGame: React.FC<LoLQuoteGameProps> = ({
  mode,
  lang = 'it' as LolLanguage,
  onModeChange,
  onVictory,
  onOpenHelp,
}) => {
  const currentLang: LolLanguage = lang === 'en' ? 'en' : 'it';
  const t = LOL_TRANSLATIONS[currentLang];

  // Pick target quote
  const [targetQuote, setTargetQuote] = useState<LolQuote>(LOL_QUOTES[0]);
  const [targetChampion, setTargetChampion] = useState<LolChampion>(LOL_CHAMPIONS[0]);

  const [guesses, setGuesses] = useState<GuessRecord<LolChampion>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  // Progressive manual hint overrides
  const [manuallyUnlockedHints, setManuallyUnlockedHints] = useState<number[]>([]);

  // Infinite mode streaks
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Audio / Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSourceType, setAudioSourceType] = useState<'riot' | 'tts'>('riot');
  const [audioSupported, setAudioSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer for daily
  const [countdown, setCountdown] = useState(getTimeUntilNextDaily());

  // Load stats for streak
  useEffect(() => {
    const stats = getStats('league-of-legends', 'citazione');
    setStreak(stats.currentStreak);
    setBestStreak(stats.maxStreak);
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (mode !== 'daily') return;
    const interval = setInterval(() => {
      setCountdown(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setAudioSupported(false);
    }
  }, []);

  // Initialize target quote based on mode
  const setupQuote = (customIndex?: number, forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<LolChampion>, LolQuote>('league-of-legends', 'citazione', mode);
      if (session) {
        let restoredQuote = session.targetItem;
        if (!restoredQuote && session.targetId) {
          restoredQuote = LOL_QUOTES.find((q) => q.id === session.targetId);
        }
        if (restoredQuote) {
          const champ = LOL_CHAMPIONS.find((c) => c.id === restoredQuote.championId) || LOL_CHAMPIONS[0];
          setTargetQuote(restoredQuote);
          setTargetChampion(champ);
          setGuesses(session.guesses || []);
          setIsGameOver(Boolean(session.isGameOver));
          setIsVictory(Boolean(session.isWon));
          setIsSkipped(Boolean(session.extra?.isSkipped));
          setManuallyUnlockedHints(
            session.extra?.manuallyUnlockedHints || (session.isGameOver ? [1, 2, 3, 4] : [])
          );
          setIsPlayingAudio(false);
          return;
        }
      }
    }

    let quote: LolQuote;
    if (mode === 'daily') {
      const idx = getDailyIndex('league-of-legends', 'citazione', LOL_QUOTES.length);
      quote = LOL_QUOTES[idx];
    } else {
      if (customIndex !== undefined) {
        quote = LOL_QUOTES[customIndex % LOL_QUOTES.length];
      } else {
        const randIdx = Math.floor(Math.random() * LOL_QUOTES.length);
        quote = LOL_QUOTES[randIdx];
      }
    }
    const champ = LOL_CHAMPIONS.find((c) => c.id === quote.championId) || LOL_CHAMPIONS[0];
    setTargetQuote(quote);
    setTargetChampion(champ);

    setGuesses([]);
    setIsGameOver(false);
    setIsVictory(false);
    setIsSkipped(false);
    setManuallyUnlockedHints([]);
    setIsPlayingAudio(false);

    saveGameSession('league-of-legends', 'citazione', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: quote,
      targetId: quote.id,
      extra: {
        isSkipped: false,
        manuallyUnlockedHints: [],
      },
    });

    // Cancel any active speech & audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    setupQuote();
  }, [mode]);

  // Search options for champions
  const searchOptions = useMemo<SearchOption[]>(() => {
    return LOL_CHAMPIONS.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: `${lang === 'en' && c.titleEn ? c.titleEn : c.title} • ${c.positions.join('/')} • ${c.regions.map((r) => translateRegion(r, lang)).join(', ')}`,
      iconUrl: c.icon,
    })).sort((a, b) => a.name.localeCompare(b.name, lang, { sensitivity: 'base', numeric: true }));
  }, [lang]);

  // Fallback speech synthesis
  const playSpeechSynthesisFallback = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingAudio(false);
      return;
    }

    setAudioSourceType('tts');
    window.speechSynthesis.cancel();

    const quoteText = lang === 'en' ? targetQuote.quoteEn : targetQuote.quoteIt;
    const cleanText = quoteText.replace(/\*.*?\*/g, '').trim() || quoteText;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'en' ? 'en-US' : 'it-IT';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const langCode = lang === 'en' ? 'en' : 'it';
    const matchingVoice = voices.find((v) => v.lang.toLowerCase().startsWith(langCode));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Play quote voice: First try authentic Riot game audio file (.ogg), fallback to SpeechSynthesis
  const handlePlayVoice = () => {
    // If already playing, stop it
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    // Try real audio first
    const realAudioUrl = getChampionVoiceAudioUrl(targetChampion.id, currentLang);
    if (realAudioUrl) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audio = new Audio(realAudioUrl);
        audioRef.current = audio;
        setAudioSourceType('riot');
        setIsPlayingAudio(true);

        audio.onended = () => {
          setIsPlayingAudio(false);
          audioRef.current = null;
        };

        audio.onerror = () => {
          // If real audio fails to load, gracefully fallback to SpeechSynthesis
          console.warn('Real audio file failed to load, falling back to TTS');
          audioRef.current = null;
          playSpeechSynthesisFallback();
        };

        audio.play().catch((err) => {
          console.warn('Audio play rejected, falling back to TTS:', err);
          audioRef.current = null;
          playSpeechSynthesisFallback();
        });
        return;
      } catch (e) {
        console.warn('Error creating audio, falling back to TTS:', e);
      }
    }

    // Fallback if no real audio URL
    playSpeechSynthesisFallback();
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Progressive Hint Unlocks:
  // Hint 1 (Context / Quote Type): Unlocked at 1 attempt or manual
  // Hint 2 (Gender & Year): Unlocked at 2 attempts or manual
  // Hint 3 (Region): Unlocked at 3 attempts or manual
  // Hint 4 (Role / Positions): Unlocked at 4 attempts or manual
  const attempts = guesses.length;
  const isHint1Unlocked = isGameOver || attempts >= 1 || manuallyUnlockedHints.includes(1);
  const isHint2Unlocked = isGameOver || attempts >= 2 || manuallyUnlockedHints.includes(2);
  const isHint3Unlocked = isGameOver || attempts >= 3 || manuallyUnlockedHints.includes(3);
  const isHint4Unlocked = isGameOver || attempts >= 4 || manuallyUnlockedHints.includes(4);

  const unlockHint = (hintNum: number) => {
    if (!manuallyUnlockedHints.includes(hintNum)) {
      const updatedHints = [...manuallyUnlockedHints, hintNum];
      setManuallyUnlockedHints(updatedHints);
      saveGameSession('league-of-legends', 'citazione', mode, {
        isWon: false,
        isGameOver: false,
        guesses,
        targetItem: targetQuote,
        targetId: targetQuote.id,
        extra: {
          isSkipped: false,
          manuallyUnlockedHints: updatedHints,
        },
      });
    }
  };

  // Handle a guess
  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;

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

    saveGameSession('league-of-legends', 'citazione', mode, {
      isWon: isCorrect,
      isGameOver: isCorrect,
      guesses: newGuesses,
      targetItem: targetQuote,
      targetId: targetQuote.id,
      extra: {
        isSkipped: false,
        manuallyUnlockedHints,
      },
    });

    if (isCorrect) {
      setIsGameOver(true);
      setIsVictory(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const updated = saveGameResult('league-of-legends', 'citazione', true, newGuesses.length);
      setStreak(updated.currentStreak);
      setBestStreak(updated.maxStreak);

      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, {
        ...targetChampion,
        title: lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title,
      });
    }
  };

  // Handle skip
  const handleSkip = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    setIsVictory(false);
    setIsSkipped(true);

    const updated = saveGameResult('league-of-legends', 'citazione', false, guesses.length + 1);
    setStreak(updated.currentStreak);
    setBestStreak(updated.maxStreak);

    saveGameSession('league-of-legends', 'citazione', mode, {
      isWon: false,
      isGameOver: true,
      guesses,
      targetItem: targetQuote,
      targetId: targetQuote.id,
      extra: {
        isSkipped: true,
        manuallyUnlockedHints: [1, 2, 3, 4],
      },
    });
  };

  // Handle next round (infinite mode)
  const handleNextRound = () => {
    setupQuote(undefined, true);
  };

  const currentQuoteText = lang === 'en' ? targetQuote.quoteEn : targetQuote.quoteIt;
  const alternateQuoteText = lang === 'en' ? targetQuote.quoteIt : targetQuote.quoteEn;
  const currentQuoteType = lang === 'en' ? targetQuote.quoteTypeEn : targetQuote.quoteTypeIt;
  const hasRealRiotAudio = !!getChampionVoiceAudioUrl(targetChampion.id, currentLang);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header Info */}
      <div className="text-center mb-6">
        {mode === 'infinite' && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/20 mb-2.5">
            <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{t.streak}: {streak} ({t.bestStreak}: {bestStreak})</span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {lang === 'en' ? 'Guess the Champion from the Quote' : 'Indovina il Campione dalla Citazione'}
        </h1>
        <p className="mt-1 text-xs text-zinc-400 max-w-lg mx-auto">
          {lang === 'en'
            ? 'Read or listen to the iconic voice line. Hints unlock as you make guesses!'
            : 'Leggi o ascolta la celebre battuta di gioco. Gli indizi progressivi si sbloccano ad ogni tentativo!'}
        </p>
      </div>

      {/* Banner Risultato Daily Già Risolta */}
      {mode === 'daily' && isGameOver && isVictory && (
        <DailyCompletedBanner
          attemptsCount={guesses.length}
          targetName={targetChampion.name}
          targetSubtitle={`"${currentQuoteText}" • ${lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title}`}
          targetImageUrl={targetChampion.icon}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {/* Main Quote Card */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Background decorative watermark */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-5">
          <Quote className="h-44 w-44 text-amber-300" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Audio Button */}
          <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={handlePlayVoice}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md ${
                isPlayingAudio
                  ? 'bg-amber-500 text-zinc-950 ring-4 ring-amber-500/30 scale-105'
                  : 'bg-zinc-800 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950'
              }`}
              title={isPlayingAudio ? 'Ferma / Stop' : t.listenVoice}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="h-4 w-4 animate-bounce" />
                  <span>{t.voicePlaying}</span>
                  <span className="flex gap-0.5">
                    <span className="h-2 w-0.5 animate-pulse bg-zinc-950" />
                    <span className="h-3 w-0.5 animate-pulse delay-75 bg-zinc-950" />
                    <span className="h-2 w-0.5 animate-pulse delay-150 bg-zinc-950" />
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>{t.listenVoice}</span>
                </>
              )}
            </button>
          </div>

          {/* The Quote Itself */}
          <div className="relative my-2 max-w-2xl px-4 py-2">
            <span className="text-3xl sm:text-5xl font-serif text-amber-500/40 select-none mr-1">“</span>
            <span className="text-xl sm:text-3xl font-extrabold italic text-zinc-100 tracking-wide leading-relaxed font-serif">
              {currentQuoteText}
            </span>
            <span className="text-3xl sm:text-5xl font-serif text-amber-500/40 select-none ml-1">”</span>
          </div>

          {/* Secondary translation hint */}
          <div className="mt-2 text-xs text-zinc-400 italic">
            <span>{lang === 'en' ? 'IT: ' : 'EN: '}</span>
            <span>"{alternateQuoteText}"</span>
          </div>
        </div>

        {/* Progressive Hints Grid */}
        <div className="mt-8 border-t border-zinc-800/80 pt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hintsProgress}
            </span>
            <span className="text-[11px] text-zinc-400">
              {attempts} {lang === 'en' ? 'attempts made' : 'tentativi effettuati'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Hint 1: Quote Context */}
            <div
              className={`rounded-2xl border p-3 transition-all ${
                isHint1Unlocked
                  ? 'bg-zinc-800/70 border-amber-500/30'
                  : 'bg-zinc-900/50 border-zinc-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>{t.quoteContext}</span>
                {isHint1Unlocked ? (
                  <Unlock className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Lock className="h-3 w-3 text-zinc-500" />
                )}
              </div>
              {isHint1Unlocked ? (
                <div className="text-sm font-bold text-white truncate">{currentQuoteType}</div>
              ) : (
                <button
                  onClick={() => unlockHint(1)}
                  className="text-xs text-amber-400/80 hover:text-amber-300 font-semibold"
                >
                  {t.hintAtError(1)}
                </button>
              )}
            </div>

            {/* Hint 2: Gender & Release Year */}
            <div
              className={`rounded-2xl border p-3 transition-all ${
                isHint2Unlocked
                  ? 'bg-zinc-800/70 border-amber-500/30'
                  : 'bg-zinc-900/50 border-zinc-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>
                  {t.gender} & {t.year}
                </span>
                {isHint2Unlocked ? (
                  <Unlock className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Lock className="h-3 w-3 text-zinc-500" />
                )}
              </div>
              {isHint2Unlocked ? (
                <div className="text-sm font-bold text-white truncate">
                  {translateGender(targetChampion.gender, lang)} • {targetChampion.releaseYear}
                </div>
              ) : (
                <button
                  onClick={() => unlockHint(2)}
                  className="text-xs text-amber-400/80 hover:text-amber-300 font-semibold"
                >
                  {t.hintAtError(2)}
                </button>
              )}
            </div>

            {/* Hint 3: Region */}
            <div
              className={`rounded-2xl border p-3 transition-all ${
                isHint3Unlocked
                  ? 'bg-zinc-800/70 border-amber-500/30'
                  : 'bg-zinc-900/50 border-zinc-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>{t.region}</span>
                {isHint3Unlocked ? (
                  <Unlock className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Lock className="h-3 w-3 text-zinc-500" />
                )}
              </div>
              {isHint3Unlocked ? (
                <div className="text-sm font-bold text-white truncate">
                  {targetChampion.regions.map((r) => translateRegion(r, lang)).join(', ')}
                </div>
              ) : (
                <button
                  onClick={() => unlockHint(3)}
                  className="text-xs text-amber-400/80 hover:text-amber-300 font-semibold"
                >
                  {t.hintAtError(3)}
                </button>
              )}
            </div>

            {/* Hint 4: Position / Role */}
            <div
              className={`rounded-2xl border p-3 transition-all ${
                isHint4Unlocked
                  ? 'bg-zinc-800/70 border-amber-500/30'
                  : 'bg-zinc-900/50 border-zinc-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>{t.position}</span>
                {isHint4Unlocked ? (
                  <Unlock className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Lock className="h-3 w-3 text-zinc-500" />
                )}
              </div>
              {isHint4Unlocked ? (
                <div className="text-sm font-bold text-white truncate">
                  {targetChampion.positions.join(' / ')}
                </div>
              ) : (
                <button
                  onClick={() => unlockHint(4)}
                  className="text-xs text-amber-400/80 hover:text-amber-300 font-semibold"
                >
                  {t.hintAtError(4)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input / Guessing Section */}
      {!isGameOver && (
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto">
          <div className="flex-1 w-full">
            <SearchBar
              options={searchOptions}
              alreadyGuessedIds={guesses.map((g) => g.item.id)}
              onSelectOption={handleMakeGuess}
              placeholder={t.searchPlaceholderQuote}
            />
          </div>
          <button
            onClick={handleSkip}
            id="btn-skip-quote"
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-400 hover:text-rose-400 hover:border-rose-500/50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            title={t.skipQuoteFull}
          >
            <FastForward className="h-4 w-4" />
            <span>{t.skipQuote}</span>
          </button>
        </div>
      )}

      {/* Game Over / Victory / Skip Card */}
      {isGameOver && (
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md text-center max-w-xl mx-auto">
          <div className="mb-3">
            <span
              className={`inline-block rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wider border ${
                isVictory
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              }`}
            >
              {isVictory ? t.quoteGuessed : t.quoteSkipped}
            </span>
          </div>

          {/* Champion Reveal Card */}
          <div className="my-4 flex items-center justify-center gap-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800 max-w-md mx-auto">
            <img
              src={targetChampion.icon}
              alt={targetChampion.name}
              className="h-16 w-16 rounded-2xl border-2 border-amber-500/40 object-cover shadow-lg"
            />
            <div className="text-left">
              <h2 className="text-2xl font-black text-white">{targetChampion.name}</h2>
              <p className="text-xs text-amber-400 font-semibold">
                {lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                {targetChampion.positions.join('/')} • {targetChampion.regions.map((r) => translateRegion(r, lang)).join(', ')} • {targetChampion.releaseYear}
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 italic mb-4">
            "{currentQuoteText}"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {mode === 'infinite' ? (
              <button
                onClick={handleNextRound}
                id="btn-next-quote-round"
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black text-zinc-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{t.nextQuote}</span>
              </button>
            ) : (
              <div className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 px-3 py-2 bg-zinc-950/60 rounded-xl border border-zinc-800">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>{t.nextDailyIn}:</span>
                <span className="font-mono text-amber-400">
                  {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Previous Guesses Table / Feedback */}
      {guesses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 text-center">
            {lang === 'en' ? `Attempts (${guesses.length})` : `Tentativi Effettuati (${guesses.length})`}
          </h3>

          <div className="space-y-3">
            {guesses.map((guess, idx) => (
              <div
                key={guess.item.id + idx}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-lg"
              >
                {/* Champion summary row */}
                <div className="flex items-center justify-between gap-3 mb-2.5 border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={guess.item.icon}
                      alt={guess.item.name}
                      className="h-10 w-10 rounded-xl border border-zinc-700 object-cover shadow-sm"
                    />
                    <div>
                      <div className="font-extrabold text-sm text-white">{guess.item.name}</div>
                      <div className="text-[11px] text-zinc-400">
                        {lang === 'en' && guess.item.titleEn ? guess.item.titleEn : guess.item.title}
                      </div>
                    </div>
                  </div>

                  {guess.isCorrect && (
                    <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-black text-emerald-400 border border-emerald-500/30">
                      {lang === 'en' ? 'CORRECT!' : 'CORRETTO!'}
                    </span>
                  )}
                </div>

                {/* Attribute match badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {guess.matches.map((m, mIdx) => {
                    const isExact = m.status === 'exact';
                    const isPartial = m.status === 'partial';
                    const bgColor = isExact
                      ? 'bg-emerald-600/90 border-emerald-500'
                      : isPartial
                      ? 'bg-amber-600/90 border-amber-500'
                      : 'bg-zinc-800 border-zinc-700';

                    return (
                      <div
                        key={mIdx}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center text-white ${bgColor}`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-200">
                          {m.label}
                        </span>
                        <div className="flex items-center gap-1 font-bold text-xs mt-0.5">
                          <span className="truncate max-w-[85px]">
                            {Array.isArray(m.value) ? m.value.join(', ') : m.value}
                          </span>
                          {m.arrow === 'up' && <ArrowUp className="h-3.5 w-3.5 text-white shrink-0" />}
                          {m.arrow === 'down' && <ArrowDown className="h-3.5 w-3.5 text-white shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
