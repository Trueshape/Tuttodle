import React, { useEffect } from 'react';
import { GameMode, LolLanguage } from '../types';
import { uiLabel } from '../utils/uiLabels';

interface AttemptsRowProps {
  mode: GameMode;
  attempts: number;
  maxAttempts?: number;
  won: boolean;
  isOver: boolean;
  onGiveUp: () => void;
  onNewGame: () => void;
  lang?: LolLanguage;
}

export const AttemptsRow: React.FC<AttemptsRowProps> = ({
  mode,
  attempts,
  maxAttempts,
  won,
  isOver,
  onGiveUp,
  onNewGame,
  lang = 'it',
}) => {
  useEffect(() => {
    if (mode !== 'infinite' || !isOver) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNewGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, isOver, onNewGame]);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {maxAttempts ? (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxAttempts }).map((_, i) => {
            const isUsed = i < attempts;
            const isCurrent = i === attempts && !isOver;
            const wasCorrect = isUsed && i === attempts - 1 && won;
            return (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black transition-all ${
                  wasCorrect
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                    : isUsed
                    ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400'
                    : isCurrent
                    ? 'bg-zinc-800 border-2 border-rose-500 text-white animate-pulse'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-600'
                }`}
              >
                {wasCorrect ? '✓' : isUsed ? '✕' : i + 1}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-8 items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-black text-zinc-300">
          {uiLabel('attempts', lang)}: {attempts}
        </div>
      )}

      <div className="ml-2 flex min-w-[96px] items-center justify-center">
        {mode === 'infinite' && !isOver && (
          <button
            type="button"
            onClick={onGiveUp}
            className="flex w-28 items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1.5 text-xs font-bold text-zinc-400 transition hover:border-rose-500/50 hover:text-rose-400 cursor-pointer active:scale-95"
          >
            {uiLabel('giveUp', lang)}
          </button>
        )}
        {mode === 'infinite' && isOver && (
          <button
            type="button"
            onClick={onNewGame}
            className="flex w-28 items-center justify-center gap-1.5 rounded-lg border border-rose-500/50 bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-rose-600/30 transition hover:bg-rose-500 cursor-pointer active:scale-95"
          >
            {uiLabel('newGame', lang)}
          </button>
        )}
        {mode === 'daily' && isOver && (
          <span className="text-xs font-bold text-zinc-400">{uiLabel('comeBackTomorrow', lang)}</span>
        )}
      </div>
    </div>
  );
};
