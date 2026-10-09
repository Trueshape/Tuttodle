import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, Calendar } from 'lucide-react';
import { getTimeUntilNextDaily } from '../utils/dailySeed';
import { AttributeMatch, GameMode, LolLanguage } from '../types';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  targetName: string;
  targetSubtitle?: string;
  targetImageUrl?: string;
  attemptsCount: number;
  guessesMatches: AttributeMatch[][];
  mode: GameMode;
  onPlayNextInfinite?: () => void;
  lang?: LolLanguage;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  targetName,
  targetSubtitle,
  targetImageUrl,
  attemptsCount,
  mode,
  onPlayNextInfinite,
  lang = 'it',
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextDaily());
  const isEn = lang === 'en';

  useEffect(() => {
    if (isOpen) {
      // Fire confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  // Countdown timer for next daily
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/40 bg-slate-900 p-6 shadow-2xl text-slate-100 text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Victory Icon Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h2 className="mt-4 text-2xl font-black text-white">
          {isEn ? 'CONGRATULATIONS!' : 'COMPLIMENTI!'}
        </h2>
        <p className="text-sm font-medium text-emerald-400">
          {isEn ? (
            <>
              You guessed it in <strong className="text-white text-base">{attemptsCount}</strong>{' '}
              {attemptsCount === 1 ? 'attempt' : 'attempts'}!
            </>
          ) : (
            <>
              Hai indovinato in <strong className="text-white text-base">{attemptsCount}</strong>{' '}
              {attemptsCount === 1 ? 'tentativo' : 'tentativi'}!
            </>
          )}
        </p>

        {/* Answer Reveal Card */}
        <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 text-center">
          {targetImageUrl && (
            <img
              src={targetImageUrl}
              alt={targetName}
              className="mx-auto mb-3 h-20 w-20 rounded-xl object-cover border border-slate-600 shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          )}
          <div className="text-xl font-black text-slate-100">{targetName}</div>
          {targetSubtitle && (
            <div className="text-xs text-slate-400 mt-1">{targetSubtitle}</div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          {mode === 'infinite' ? (
            <button
              onClick={onPlayNextInfinite}
              id="btn-next-infinite"
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg hover:bg-indigo-500 transition cursor-pointer"
            >
              <RotateCcw className="h-5 w-5" />
              {isEn ? 'Next Infinite Round' : 'Prossima Sfida Infinita'}
            </button>
          ) : (
            <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3 text-xs text-slate-400">
              <div className="flex items-center justify-center gap-1 text-slate-300 font-medium">
                <Calendar className="h-4 w-4 text-indigo-400" />
                {isEn ? 'Next daily challenge in:' : 'Prossima sfida giornaliera tra:'}
              </div>
              <div className="mt-1 font-mono text-lg font-extrabold text-indigo-300">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            id="btn-close-victory"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 mt-1 transition cursor-pointer"
          >
            {isEn ? 'View Summary' : 'Vedi Riepilogo'}
          </button>
        </div>
      </div>
    </div>
  );
};
