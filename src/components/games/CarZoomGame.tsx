import React, { useMemo, useState } from 'react';
import { CarModel, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { SearchBar, SearchOption } from '../SearchBar';

const MAX_ATTEMPTS = 5;
const ZOOM_START = 5;
const ZOOM_END = 1;

const pickRandomCar = (exclude?: string): CarModel => {
  const pool = CAR_MODELS.filter((c) => c.imageUrl && c.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

const randomFocus = () => ({
  x: 20 + Math.random() * 60,
  y: 20 + Math.random() * 60,
});

interface CarZoomGameProps {
  onVictory: (attemptsCount: number, guessesMatches: never[], targetCar: CarModel) => void;
  lang?: LolLanguage;
}

export const CarZoomGame: React.FC<CarZoomGameProps> = ({ onVictory, lang = 'it' }) => {
  const [targetCar, setTargetCar] = useState<CarModel>(() => pickRandomCar());
  const [focus, setFocus] = useState(randomFocus);
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

  const zoom =
    status === 'playing'
      ? ZOOM_START - (wrongGuesses.length / MAX_ATTEMPTS) * (ZOOM_START - ZOOM_END)
      : ZOOM_END;

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

  const newGame = () => {
    setTargetCar(pickRandomCar(targetCar.id));
    setFocus(randomFocus());
    setWrongGuesses([]);
    setStatus('playing');
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-black mb-1">
        {lang === 'en' ? 'Guess the car from the zoomed image' : 'Indovina l\'auto dall\'immagine zoomata'}
      </h2>
      <p className="text-xs text-zinc-400 mb-4">
        {lang === 'en'
          ? `The image zooms out with every wrong guess. ${MAX_ATTEMPTS} attempts.`
          : `L'immagine si rimpicciolisce a ogni errore. ${MAX_ATTEMPTS} tentativi.`}
      </p>

      <div className="relative mb-4 aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <img
          src={getProxiedImageUrl(targetCar.imageUrl)}
          alt={lang === 'en' ? 'Zoomed car' : 'Auto zoomata'}
          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${focus.x}% ${focus.y}%`,
          }}
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
