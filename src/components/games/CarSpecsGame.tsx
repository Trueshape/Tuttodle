import React, { useState, useEffect, useMemo } from 'react';
import { CarModel, GuessRecord, GameMode, AttributeMatch, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { compareCarModel } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import { SearchBar, SearchOption } from '../SearchBar';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { ArrowUp, ArrowDown, Car, Lightbulb, Lock, RotateCcw } from 'lucide-react';

interface CarSpecsGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetCar: CarModel) => void;
  onOpenHelp: () => void;
  lang?: LolLanguage;
}

export const CarSpecsGame: React.FC<CarSpecsGameProps> = ({
  mode,
  onModeChange,
  onVictory,
  onOpenHelp,
  lang = 'it',
}) => {
  const [targetCar, setTargetCar] = useState<CarModel>(CAR_MODELS[0]);
  const [guesses, setGuesses] = useState<GuessRecord<CarModel>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedFact, setUnlockedFact] = useState(false);

  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<CarModel>, CarModel>('automobili', 'specs', mode);
      if (session) {
        let restored = session.targetItem;
        if (!restored && session.targetId) {
          restored = CAR_MODELS.find((c) => c.id === session.targetId);
        }
        if (restored) {
          setTargetCar(restored);
          const savedGuesses = session.guesses || [];
          setGuesses(savedGuesses);
          setIsGameOver(Boolean(session.isGameOver));
          setUnlockedFact(savedGuesses.length >= 3);
          return;
        }
      }
    }

    let chosen: CarModel;
    if (mode === 'daily') {
      const idx = getDailyIndex('automobili', 'specs', CAR_MODELS.length);
      chosen = CAR_MODELS[idx];
    } else {
      const randIdx = Math.floor(Math.random() * CAR_MODELS.length);
      chosen = CAR_MODELS[randIdx];
    }

    setTargetCar(chosen);
    setGuesses([]);
    setIsGameOver(false);
    setUnlockedFact(false);

    saveGameSession('automobili', 'specs', mode, {
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

  useEffect(() => {
    if (guesses.length >= 3) setUnlockedFact(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = useMemo(() => {
    return CAR_MODELS.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: `${c.flag} ${c.brand} • ${c.bodyType} • ${c.horsepower} CV • ${c.releaseYear}`,
      flag: c.flag,
      iconUrl: getProxiedImageUrl(c.imageUrl),
    })).sort((a, b) =>
      a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })
    );
  }, []);

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedCar = CAR_MODELS.find((c) => c.id === option.id);
    if (!guessedCar) return;

    const matches = compareCarModel(guessedCar, targetCar);
    const isCorrect = guessedCar.id === targetCar.id;

    const record: GuessRecord<CarModel> = {
      item: guessedCar,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    saveGameSession('automobili', 'specs', mode, {
      isWon: isCorrect,
      isGameOver: isCorrect,
      guesses: newGuesses,
      targetItem: targetCar,
      targetId: targetCar.id,
    });

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('automobili', 'specs', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetCar);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Game Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          {lang === 'en' ? 'Guess the Car Model' : "Indovina il Modello d'Auto"}
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          {lang === 'en'
            ? 'Compare Country, Body Type, Engine Type, Drivetrain, Horsepower, and Release Year.'
            : 'Confronta Nazione, Carrozzeria, Tipo Motore, Trazione, Cavalli e Anno di lancio.'}
        </p>
      </div>

      {/* Banner Risultato Daily Già Completata */}
      {mode === 'daily' && isGameOver && (
        <DailyCompletedBanner
          attemptsCount={guesses.length}
          targetName={targetCar.name}
          targetSubtitle={`${targetCar.flag} ${targetCar.brand} • ${targetCar.bodyType} • ${targetCar.horsepower} CV • ${targetCar.releaseYear}`}
          targetImageUrl={getProxiedImageUrl(targetCar.imageUrl)}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {/* Unlocked Hint Box - solo durante la partita */}
      {!isGameOver && (
        <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-center">
          {unlockedFact ? (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-200">
              <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" />
              <span><strong>{lang === 'en' ? 'Fact / Hint:' : 'Curiosità / Indizio:'}</strong> "{targetCar.sloganOrFact}"</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Trivia hint unlocks after 3 attempts' : 'Indizio Slogan/Curiosità si sblocca dopo 3 tentativi'}</span>
            </div>
          )}
        </div>
      )}

      {/* Search Bar */}
      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un'auto (es. Ferrari F40, Porsche 911, Nissan GT-R)..."
          />
        </div>
      )}

      {/* Pulsante Nuova Partita in Modalità Infinita */}
      {isGameOver && mode === 'infinite' && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => initGame(true)}
            className="flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition shadow-lg shadow-amber-600/30 cursor-pointer active:scale-95"
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
            Tentativi Effettuati ({guesses.length})
          </h3>

          <div className="space-y-4">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-stretch gap-3 group"
              >
                {/* Immagine dell'auto a fianco della scheda (altezza massima = altezza della scheda) */}
                <div className="w-full md:w-52 lg:w-60 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl relative flex items-center justify-center min-h-[140px] md:min-h-0 self-stretch">
                  {guess.item.imageUrl ? (
                    <img
                      src={getProxiedImageUrl(guess.item.imageUrl)}
                      alt={guess.item.name}
                      className="w-full h-full max-h-48 md:max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        const fallback = parent?.querySelector('.car-fallback');
                        if (fallback) {
                          fallback.classList.remove('hidden');
                          fallback.classList.add('flex');
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`car-fallback ${
                      guess.item.imageUrl ? 'hidden' : 'flex'
                    } flex-col items-center justify-center p-4 text-center text-slate-500`}
                  >
                    <Car className="h-9 w-9 text-slate-600 mb-1.5" />
                    <span className="text-xs font-bold text-slate-400 line-clamp-1">
                      {guess.item.name}
                    </span>
                  </div>

                  {/* Gradient overlay with car title and flag */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white drop-shadow">
                      <span className="truncate">{guess.item.name}</span>
                      <span className="text-xs shrink-0 ml-1.5">{guess.item.flag}</span>
                    </div>
                  </div>
                </div>

                {/* Scheda delle specifiche dell'auto */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
                  <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{guess.item.flag}</span>
                      <span className="font-extrabold text-white text-base">
                        {guess.item.name}
                      </span>
                    </div>
                    {guess.isCorrect && (
                      <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                        CORRETTO!
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
