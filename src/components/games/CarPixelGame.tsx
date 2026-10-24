import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CarModel, GameMode, LolLanguage } from '../../types';
import { CAR_MODELS } from '../../data/cars';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { getDailyIndex } from '../../utils/dailySeed';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';

const COLS = 6;
const ROWS = 5;
const TILES = COLS * ROWS;
const LOW_SCALE = 4;
const MAX_ATTEMPTS = 5;
const CANVAS_W = 600;

type Status = 'playing' | 'won' | 'lost';

const PIXEL_POOL = CAR_MODELS.filter((c) => c.imageUrl);

const pickRandomCar = (exclude?: string): CarModel => {
  const pool = PIXEL_POOL.filter((c) => c.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

const shuffled = (rand: () => number): number[] => {
  const order = Array.from({ length: TILES }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

const seededRandom = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
};

interface CarPixelGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: never[], targetCar: CarModel) => void;
  lang?: LolLanguage;
}

export const CarPixelGame: React.FC<CarPixelGameProps> = ({ mode, onVictory, lang = 'it' }) => {
  const [init] = useState(() => {
    const session = getGameSession<string, CarModel>('automobili', 'pixel', mode);
    if (session?.targetItem) {
      return {
        target: session.targetItem,
        wrong: session.guesses ?? [],
        status: (session.isWon ? 'won' : session.isGameOver ? 'lost' : 'playing') as Status, order: (session.extra?.order as number[]) ?? shuffled(seededRandom(session.targetItem.id)),
      };
    }
    if (mode === 'daily') {
      const t = PIXEL_POOL[getDailyIndex('automobili', 'pixel', PIXEL_POOL.length)];
      return { target: t, wrong: [] as string[], status: 'playing' as Status, order: shuffled(seededRandom(t.id)) };
    }
    const t = pickRandomCar();
    return { target: t, wrong: [] as string[], status: 'playing' as Status, order: shuffled(Math.random) };
  });

  const [targetCar, setTargetCar] = useState<CarModel>(init.target);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>(init.wrong);
  const [status, setStatus] = useState<Status>(init.status);
  const [order, setOrder] = useState<number[]>(init.order);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageReady, setImageReady] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    saveGameSession('automobili', 'pixel', mode, {
      isWon: status === 'won',
      isGameOver: status !== 'playing',
      guesses: wrongGuesses,
      targetItem: targetCar,
      targetId: targetCar.id,
      extra: { order },
    });
  }, [mode, targetCar, wrongGuesses, status, order]);

  useEffect(() => {
    setImageReady(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImageReady(img);
    img.src = getProxiedImageUrl(targetCar.imageUrl);
  }, [targetCar]);

  const revealedCount = status === 'playing' ? Math.min(TILES, wrongGuesses.length + 1) : TILES;
  const revealed = new Set(order.slice(0, revealedCount));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageReady) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = CANVAS_W;
    const H = Math.round((CANVAS_W * imageReady.naturalHeight) / imageReady.naturalWidth);
    canvas.width = W;
    canvas.height = H;
    const full = document.createElement('canvas');
    full.width = W;
    full.height = H;
    full.getContext('2d')?.drawImage(imageReady, 0, 0, W, H);

    const low = document.createElement('canvas');
    low.width = COLS * LOW_SCALE;
    low.height = ROWS * LOW_SCALE;
    low.getContext('2d')?.drawImage(full, 0, 0, low.width, low.height);

    const tileW = W / COLS;
    const tileH = H / ROWS;
    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < TILES; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const dx = col * tileW;
      const dy = row * tileH;
      if (revealed.has(i)) {
        ctx.drawImage(full, dx, dy, tileW, tileH, dx, dy, tileW, tileH);
      } else {
        ctx.drawImage(low, col * LOW_SCALE, row * LOW_SCALE, LOW_SCALE, LOW_SCALE, dx, dy, tileW, tileH);
      }
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(dx, dy, tileW, tileH);
    }
  }, [imageReady, revealedCount, order, status]);

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

  const newGame = () => {
    setTargetCar(pickRandomCar(targetCar.id));
    setOrder(shuffled(Math.random));
    setWrongGuesses([]);
    setStatus('playing');
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-black mb-1">
        {lang === 'en' ? 'Guess the car from the tiles' : 'Indovina l\'auto dalle tessere'}
      </h2>
      <p className="text-xs text-zinc-400 mb-4">
        {lang === 'en'
          ? `One tile is revealed at start, and one more at every wrong guess. ${MAX_ATTEMPTS} attempts.`
          : `Una tessera è scoperta all'inizio, e una in più a ogni errore. ${MAX_ATTEMPTS} tentativi.`}
      </p>

      <div className="mb-4 rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <canvas ref={canvasRef} className="w-full h-auto block" />
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
