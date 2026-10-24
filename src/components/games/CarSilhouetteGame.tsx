import React, { useMemo, useState } from 'react';
import { CarModel, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { SearchBar, SearchOption } from '../SearchBar';

const MAX_ATTEMPTS = 5;
const BRIGHTNESS_BY_WRONG = [0, 0.25, 0.5, 0.75, 1];

const pickRandomCar = (exclude?: string): CarModel => {
  const pool = CAR_MODELS.filter((c) => c.imageUrl && c.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

interface CarSilhouetteGameProps {
  onVictory: (attemptsCount: number, guessesMatches: never[], targetCar: CarModel) => void;
  lang?: LolLanguage;
}

export const CarSilhouetteGame: React.FC<CarSilhouetteGameProps> = ({ onVictory, lang = 'it' }) => {
  const [targetCar, setTargetCar] = useState<CarModel>(() => pickRandomCar());
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const searchOptions: SearchOption[] = useMemo(
    () =>
      CAR_MODELS.map((c) => ({
        id: c.id,
        name: c.name,
        subtitle: `${c.flag} ${c.brand} • ${c.releaseYear}`,
        flag: c.flag,
        iconUrl: getProxiedImageUrl(c.imageUrl),
      })).sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })),
    []
  );

  const handleGuess = (option: SearchOption) => {
    if (status !== 'playing') return;
    if (option.id === targetCar.id) {
      setStatus('won');
      onVictory(wrongGuesses.length + 1, [], targetCar);
      return;
    }
    const next = [...wrongGuesses, option.id];
    setWrongGuesses(next);
    if (next.length >= MAX_ATTEMPTS) setStatus('lost');
  };

  const brightness = BRIGHTNESS_BY_WRONG[Math.min(wrongGuesses.length, BRIGHTNESS_BY_WRONG.length - 1)];

  const newGame = () => {
    setTargetCar(pickRandomCar(targetCar.id));
    setWrongGuesses([]);
    setStatus('playing');
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-black mb-1">
        {lang === 'en' ? 'Guess the car from its silhouette' : 'Indovina l\'auto dalla silhouette'}
      </h2>
      <p className="text-xs text-zinc-400 mb-4">
        {lang === 'en'
          ? `Each wrong guess reveals more colour. ${MAX_ATTEMPTS} attempts.`
          : `Ogni errore mostra più colore. ${MAX_ATTEMPTS} tentativi.`}
      </p>

      <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 flex items-center justify-center min-h-[220px]">
        <img
          src={getProxiedImageUrl(targetCar.imageUrl)}
          alt={lang === 'en' ? 'Car silhouette' : 'Silhouette dell\'auto'}
          className="max-h-[220px] w-auto object-contain transition-[filter] duration-500"
          style={{ filter: `brightness(${brightness})` }}
        />
      </div>

      <p className="text-xs text-zinc-500 mb-3">
        {lang === 'en' ? 'Attempts' : 'Tentativi'}: {wrongGuesses.length} / {MAX_ATTEMPTS}
      </p>

      {status === 'playing' && (
        <SearchBar
          options={searchOptions}
          alreadyGuessedIds={wrongGuesses}
          onSelectOption={handleGuess}
          placeholder={lang === 'en' ? 'Search a car...' : 'Cerca un\'auto...'}
        />
      )}

      {status === 'lost' && (
        <p className="mt-4 text-sm font-bold text-rose-300">
          {lang === 'en' ? 'It was' : 'Era'} {targetCar.name}
        </p>
      )}
      {status === 'won' && (
        <p className="mt-4 text-sm font-bold text-emerald-300">
          {lang === 'en' ? 'Correct!' : 'Esatto!'} {targetCar.name}
        </p>
      )}

      {status !== 'playing' && (
        <button
          type="button"
          onClick={newGame}
          className="mt-4 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition cursor-pointer active:scale-95"
        >
          {lang === 'en' ? 'New Game' : 'Nuova Partita'}
        </button>
      )}
    </div>
  );
};
