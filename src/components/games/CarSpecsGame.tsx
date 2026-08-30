import React, { useState, useEffect } from 'react';
import { CarModel, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { compareCarModel } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Car, Lightbulb, Lock } from 'lucide-react';

interface CarSpecsGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetCar: CarModel) => void;
  onOpenHelp: () => void;
}

export const CarSpecsGame: React.FC<CarSpecsGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetCar, setTargetCar] = useState<CarModel>(CAR_MODELS[0]);
  const [guesses, setGuesses] = useState<GuessRecord<CarModel>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedFact, setUnlockedFact] = useState(false);

  const initGame = () => {
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
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  useEffect(() => {
    if (guesses.length >= 3) setUnlockedFact(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = CAR_MODELS.map((c) => ({
    id: c.id,
    name: c.name,
    subtitle: `${c.flag} ${c.brand} • ${c.bodyType} • ${c.horsepower} CV • ${c.releaseYear}`,
    flag: c.flag,
  }));

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
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20 mb-2">
          <Car className="h-3.5 w-3.5" />
          Indovina l'Auto • Specifiche & Motori
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina il Modello d'Auto
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Nazione, Carrozzeria, Tipo Motore, Trazione, Cavalli e Anno di lancio.
        </p>
      </div>

      {/* Unlocked Hint Box */}
      <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-center">
        {unlockedFact ? (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-200">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" />
            <span><strong>Curiosità / Indizio:</strong> "{targetCar.sloganOrFact}"</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            <span>Indizio Slogan/Curiosità si sblocca dopo 3 tentativi</span>
          </div>
        )}
      </div>

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

      {/* Guesses Table */}
      {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            Tentativi Effettuati ({guesses.length})
          </h3>

          <div className="space-y-3">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl"
              >
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
