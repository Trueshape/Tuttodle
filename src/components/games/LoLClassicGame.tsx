import React, { useState, useEffect, useMemo } from 'react';
import { LolChampion, GuessRecord, GameMode, AttributeMatch, LolLanguage } from '../../types';
import { LOL_CHAMPIONS } from '../../data/lolChampions';
import { compareLolChampion } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import { LOL_TRANSLATIONS, translateRegion } from '../../utils/lolLocalization';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Shield, Sparkles, RotateCcw } from 'lucide-react';

interface LoLClassicGameProps {
  mode: GameMode;
  lang?: LolLanguage;
  onModeChange?: (mode: GameMode) => void;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetChampion: LolChampion) => void;
  onOpenHelp: () => void;
}

export const LoLClassicGame: React.FC<LoLClassicGameProps> = ({
  mode,
  lang = 'it',
  onModeChange,
  onVictory,
  onOpenHelp,
}) => {
  const t = LOL_TRANSLATIONS[lang];
  const [targetChampion, setTargetChampion] = useState<LolChampion>(LOL_CHAMPIONS[0]);
  const [guesses, setGuesses] = useState<GuessRecord<LolChampion>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<LolChampion>, LolChampion>('league-of-legends', 'classico', mode);
      if (session) {
        let restored = session.targetItem;
        if (!restored && session.targetId) {
          restored = LOL_CHAMPIONS.find((c) => c.id === session.targetId);
        }
        if (restored) {
          setTargetChampion(restored);
          setGuesses(session.guesses || []);
          setIsGameOver(Boolean(session.isGameOver));
          return;
        }
      }
    }

    let chosen: LolChampion;
    if (mode === 'daily') {
      const idx = getDailyIndex('league-of-legends', 'classico', LOL_CHAMPIONS.length);
      chosen = LOL_CHAMPIONS[idx];
    } else {
      const randIdx = Math.floor(Math.random() * LOL_CHAMPIONS.length);
      chosen = LOL_CHAMPIONS[randIdx];
    }

    setTargetChampion(chosen);
    setGuesses([]);
    setIsGameOver(false);

    saveGameSession('league-of-legends', 'classico', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosen,
      targetId: chosen.id,
    });
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  const searchOptions: SearchOption[] = useMemo(() => {
    return LOL_CHAMPIONS.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: `${lang === 'en' && c.titleEn ? c.titleEn : c.title} • ${c.positions.join('/')} • ${c.regions.map(r => translateRegion(r, lang)).join(', ')}`,
      iconUrl: c.icon,
    })).sort((a, b) =>
      a.name.localeCompare(b.name, lang, { sensitivity: 'base', numeric: true })
    );
  }, [lang]);

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

    saveGameSession('league-of-legends', 'classico', mode, {
      isWon: isCorrect,
      isGameOver: isCorrect,
      guesses: newGuesses,
      targetItem: targetChampion,
      targetId: targetChampion.id,
    });

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('league-of-legends', 'classico', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, {
        ...targetChampion,
        title: lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title,
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Game Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          {lang === 'en' ? 'Guess the LoL Champion' : 'Indovina il Campione di LoL'}
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          {lang === 'en'
            ? 'Use champion properties (Gender, Position, Species, Resource, Range, Region, Release Year) to guess the champion.'
            : 'Usa le proprietà di gioco (Genere, Posizione, Specie, Risorsa, Attacco, Regione, Anno) per indovinare il campione.'}
        </p>
      </div>

      {/* Banner Risultato Daily Già Completata */}
      {mode === 'daily' && isGameOver && (
        <DailyCompletedBanner
          attemptsCount={guesses.length}
          targetName={targetChampion.name}
          targetSubtitle={`${lang === 'en' && targetChampion.titleEn ? targetChampion.titleEn : targetChampion.title} • ${targetChampion.positions.join('/')}`}
          targetImageUrl={targetChampion.icon}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {/* Search Bar */}
      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder={t.searchPlaceholderClassic}
          />
        </div>
      )}

      {/* Pulsante Nuova Partita in Modalità Infinita */}
      {isGameOver && mode === 'infinite' && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => initGame(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{lang === 'en' ? 'New Game' : 'Nuova Partita'}</span>
          </button>
        </div>
      )}

      {/* Guesses Table */}
      {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            {lang === 'en' ? `Attempts (${guesses.length})` : `Tentativi Effettuati (${guesses.length})`}
          </h3>

          <div className="space-y-4">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-stretch gap-3 group"
              >
                {/* Artwork del Campione a fianco della scheda */}
                <div className="w-full md:w-48 lg:w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl relative flex items-center justify-center min-h-[140px] md:min-h-0 self-stretch">
                  <img
                    src={guess.item.splashUrl || guess.item.icon}
                    alt={guess.item.name}
                    className="w-full h-full max-h-48 md:max-h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = guess.item.icon;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5">
                    <div className="text-[11px] font-bold text-white drop-shadow truncate">
                      {guess.item.name}
                    </div>
                    <div className="text-[10px] text-slate-300 drop-shadow truncate">
                      {lang === 'en' && guess.item.titleEn ? guess.item.titleEn : guess.item.title}
                    </div>
                  </div>
                </div>

                {/* Scheda delle specifiche del campione */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
                  <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={guess.item.icon}
                        alt={guess.item.name}
                        className="h-8 w-8 rounded-lg object-cover bg-slate-800 border border-slate-700"
                      />
                      <div>
                        <span className="font-extrabold text-white text-base">
                          {guess.item.name}
                        </span>
                        <span className="ml-2 text-xs text-slate-400 font-medium">
                          {lang === 'en' && guess.item.titleEn ? guess.item.titleEn : guess.item.title}
                        </span>
                      </div>
                    </div>
                    {guess.isCorrect && (
                      <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                        {lang === 'en' ? 'CORRECT!' : 'CORRETTO!'}
                      </span>
                    )}
                  </div>

                  {/* Attribute tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                    {guess.matches.map((match, mIdx) => (
                      <div
                        key={mIdx}
                        className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition ${
                          match.status === 'exact'
                            ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/50'
                            : match.status === 'partial'
                            ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50'
                            : 'bg-rose-950/40 text-rose-300 border border-rose-900/40'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                          {match.label}
                        </span>
                        <div className="mt-1 flex items-center gap-1 text-xs font-black">
                          <span>{match.value}</span>
                          {match.arrow === 'up' && (
                            <ArrowUp className="h-3.5 w-3.5 text-emerald-300 stroke-[3]" />
                          )}
                          {match.arrow === 'down' && (
                            <ArrowDown className="h-3.5 w-3.5 text-rose-300 stroke-[3]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
