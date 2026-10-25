import React, { useEffect, useMemo, useState } from 'react';
import { CarModel, GameMode, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { getDailyIndex } from '../../utils/dailySeed';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';
import { ActionSlot } from '../ActionSlot';
import { ResultCard } from '../ResultCard';

const ZOOM_START = 5;
const ZOOM_END = 1;

type Status = 'playing' | 'won' | 'lost';

const ZOOM_POOL = CAR_MODELS.filter((c) => c.imageUrl);

const pickRandomCar = (exclude?: string): CarModel => {
  const pool = ZOOM_POOL.filter((c) => c.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

const randomFocus = () => ({
  x: 20 + Math.random() * 60,
  y: 20 + Math.random() * 60,
});

interface CarZoomGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: never[], targetCar: CarModel) => void;
  lang?: LolLanguage;
}

export const CarZoomGame: React.FC<CarZoomGameProps> = ({ mode, onVictory, lang = 'it' }) => {
  const maxAttempts = mode === 'daily' ? 5 : 7;

  const [init] = useState(() => {
    const session = getGameSession<string, CarModel>('automobili', 'zoom', mode);
    if (session?.targetItem) {
      return {
        target: session.targetItem,
        wrong: session.guesses ?? [],
        status: (session.isWon ? 'won' : session.isGameOver ? 'lost' : 'playing') as Status, focus: (session.extra?.focus as { x: number; y: number }) ?? randomFocus(),
      };
    }
    if (mode === 'daily') {
      const t = ZOOM_POOL[getDailyIndex('automobili', 'zoom', ZOOM_POOL.length)];
      return { target: t, wrong: [] as string[], status: 'playing' as Status, focus: randomFocus() };
    }
    const t = pickRandomCar();
    return { target: t, wrong: [] as string[], status: 'playing' as Status, focus: randomFocus() };
  });

  const [targetCar, setTargetCar] = useState<CarModel>(init.target);
  const [focus, setFocus] = useState(init.focus);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>(init.wrong);
  const [status, setStatus] = useState<Status>(init.status);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    saveGameSession('automobili', 'zoom', mode, {
      isWon: status === 'won',
      isGameOver: status !== 'playing',
      guesses: wrongGuesses,
      targetItem: targetCar,
      targetId: targetCar.id,
      extra: { focus },
    });
  }, [mode, targetCar, focus, wrongGuesses, status]);

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
      ? ZOOM_START - (wrongGuesses.length / maxAttempts) * (ZOOM_START - ZOOM_END)
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
    if (next.length >= maxAttempts) setStatus('lost');
  };

  const newGame = () => {
    setImageReady(false);
    setTargetCar(pickRandomCar(targetCar.id));
    setFocus(randomFocus());
    setWrongGuesses([]);
    setStatus('playing');
  };

  return (
    <div className="mx-auto max-w-xl px-4 pt-4 pb-6 text-center">
      <h1 className="text-2xl font-black text-white sm:text-3xl">
        {lang === 'en' ? 'Guess the car from the zoomed image' : 'Indovina l\'auto dall\'immagine zoomata'}
      </h1>
      <p className="mt-1 mb-5 text-xs text-slate-400">
        {lang === 'en'
          ? `The image zooms out with every wrong guess. ${maxAttempts} attempts.`
          : `L'immagine si rimpicciolisce a ogni errore. ${maxAttempts} tentativi.`}
      </p>

      <div className="relative mb-4 rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <img
          key={targetCar.id}
          onLoad={() => setImageReady(true)}
          src={getProxiedImageUrl(targetCar.imageUrl)}
          alt={lang === 'en' ? 'Zoomed car' : 'Auto zoomata'}
          className={`w-full h-auto block select-none pointer-events-none ${wrongGuesses.length > 0 ? 'transition-transform duration-500' : ''}`}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${focus.x}% ${focus.y}%`,
            opacity: imageReady ? 1 : 0,
          }}
        />
      </div>

      <p className="text-xs text-zinc-500 mb-3">
        {lang === 'en' ? 'Attempts' : 'Tentativi'}: {wrongGuesses.length} / {maxAttempts}
      </p>

      <div className={status === 'playing' ? '' : 'invisible'}>
        <SearchBar
          options={searchOptions}
          alreadyGuessedIds={wrongGuesses}
          onSelectOption={handleGuess}
          placeholder={lang === 'en' ? 'Search a car...' : "Cerca un'auto..."}
          disabled={status !== 'playing'}
          focusSignal={`${targetCar.id}-${wrongGuesses.length}`}
        />
      </div>

      <ActionSlot mode={mode} isOver={status !== 'playing'} onGiveUp={() => setStatus('lost')} onNewGame={newGame} lang={lang} />

      {status !== 'playing' && (
        <ResultCard won={status === 'won'} name={targetCar.name} details={`${targetCar.flag} ${targetCar.brand} • ${targetCar.releaseYear}`} lang={lang} />
      )}
    </div>
  );
};
