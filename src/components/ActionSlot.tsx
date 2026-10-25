import React, { useEffect, useState } from 'react';
import { GameMode, LolLanguage } from '../types';
import { uiLabel } from '../utils/uiLabels';
import { getTimeUntilNextDaily } from '../utils/dailySeed';

interface ActionSlotProps {
  mode: GameMode;
  isOver: boolean;
  onGiveUp: () => void;
  onNewGame: () => void;
  lang?: LolLanguage;
}

const BUTTON_BASE =
  'h-11 w-52 rounded-xl text-sm font-black uppercase tracking-wider transition cursor-pointer active:scale-95';

export const ActionSlot: React.FC<ActionSlotProps> = ({ mode, isOver, onGiveUp, onNewGame, lang = 'it' }) => {
  const [remaining, setRemaining] = useState(getTimeUntilNextDaily());

  useEffect(() => {
    if (mode !== 'daily' || !isOver) return;
    const timer = setInterval(() => setRemaining(getTimeUntilNextDaily()), 1000);
    return () => clearInterval(timer);
  }, [mode, isOver]);

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

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mt-4 flex min-h-[44px] items-center justify-center">
      {mode === 'infinite' && !isOver && (
        <button
          type="button"
          onClick={onGiveUp}
          className={`${BUTTON_BASE} border border-rose-500/60 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50`}
        >
          {uiLabel('giveUp', lang)}
        </button>
      )}
      {mode === 'infinite' && isOver && (
        <button
          type="button"
          onClick={onNewGame}
          className={`${BUTTON_BASE} bg-amber-600 text-white shadow-lg shadow-amber-600/30 hover:bg-amber-500`}
        >
          {uiLabel('newGame', lang)}
        </button>
      )}
      {mode === 'daily' && isOver && (
        <div className="text-center text-xs text-zinc-400">
          <div className="font-bold text-zinc-300">{uiLabel('comeBackTomorrow', lang)}</div>
          <div>
            {uiLabel('nextDailyIn', lang)} {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
          </div>
        </div>
      )}
    </div>
  );
};
