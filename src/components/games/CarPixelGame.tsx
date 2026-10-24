import React, { useEffect, useMemo, useState } from 'react';
import { CarModel, GameMode, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { getDailyIndex } from '../../utils/dailySeed';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';
import { PixelatedCoverCanvas } from './PixelatedCoverCanvas';

const PIXEL_MIN = 6;
const PIXEL_MAX = 48;

type Status = 'playing' | 'won' | 'lost';

const PIXEL_POOL = CAR_MODELS.filter((c) => c.imageUrl);

const pickRandomCar = (exclude?: string): CarModel => {
  const pool = PIXEL_POOL.filter((c) => c.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

interface CarPixelGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: never[], targetCar: CarModel) => void;
  lang?: LolLanguage;
}

export const CarPixelGame: React.FC<CarPixelGameProps> = ({ mode, onVictory, lang = 'it' }) => {
  const maxAttempts = mode === 'daily' ? 5 : 7;

  const [init] = useState(() => {
    if (mode === 'daily') {
      const session = getGameSession<string, CarModel>('automobili', 'pixel', mode);
      if (session?.targetItem) {
        return {
          target: session.targetItem,
          wrong: session.guesses ?? [],
          status: (session.isWon ? 'won' : session.isGameOver ? 'lost' : 'playing') as Status,
        };
      }
      return { target: PIXEL_POOL[getDailyIndex('automobili', 'pixel', PIXEL_POOL.length)], wrong: [] as string[], status: 'playing' as Status };
    }
    return { target: pickRandomCar(), wrong: [] as string[], status: 'playing' as Status };
  });

  const [targetCar, setTargetCar] = useState<CarModel>(init.target);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>(init.wrong);
  const [status, setStatus] = useState<Status>(init.status);

  useEffect(() => {
    if (mode !== 'daily') return;
    saveGameSession('automobili', 'pixel', mode, {
      isWon: status === 'won',
      isGameOver: status !== 'playing',
      guesses: wrongGuesses,
      targetItem: targetCar,
      targetId: targetCar.id,
    });
  }, [mode, targetCar, wrongGuesses, status]);

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

  const pixelCols =
    status === 'playing'
      ? Math.round(PIXEL_MIN + (PIXEL_MAX - PIXEL_MIN) * (wrongGuesses.length / maxAttempts))
      : PIXEL_MAX;
  const pixelRows = Math.round(pixelCols * 0.75);

  const handleGuess = (option: SearchOption) => {
    if (status !== 'playing') return;
    if (option.id === targetCar.id) {
      setStatus('won');
      onVictory(wrongGuesses.length + 1, [], targetCar);
      return;
    }
    const next = [...wrongGuesses, option.id];
    setWrongGuesses(next);
    if (next.length >= maxAttempts) setStatus('lost');
  };

  const newGame = () => {
    setTargetCar(pickRandomCar(targetCar.id));
    setWrongGuesses([]);
    setStatus('playing');
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-black mb-1">
        {lang === 'en' ? 'Guess the car from the pixels' : 'Indovina l\'auto dai pixel'}
      </h2>
      <p className="text-xs text-zinc-400 mb-4">
        {lang === 'en'
          ? `Each wrong guess reveals more detail. ${maxAttempts} attempts.`
          : `Ogni errore mostra più dettagli. ${maxAttempts} tentativi.`}
      </p>

      <div className="relative mb-4 aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <PixelatedCoverCanvas
          src={getProxiedImageUrl(targetCar.imageUrl)}
          isGameOver={status !== 'playing'}
          pixelCols={pixelCols}
          pixelRows={pixelRows}
          className="w-full h-full"
        />
      </div>

      <p className="text-xs text-zinc-500 mb-3">
        {lang === 'en' ? 'Attempts' : 'Tentativi'}: {wrongGuesses.length} / {maxAttempts}
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
      {mode === 'daily' && status !== 'playing' && (
        <p className="mt-2 text-xs text-zinc-500">
          {lang === 'en' ? 'Daily completed. Come back tomorrow.' : 'Daily completata. Torna domani.'}
        </p>
      )}

      {mode === 'infinite' && status !== 'playing' && (
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
