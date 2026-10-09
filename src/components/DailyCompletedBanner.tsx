import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Infinity as InfinityIcon } from 'lucide-react';
import { getTimeUntilNextDaily } from '../utils/dailySeed';
import { LolLanguage } from '../types';

interface DailyCompletedBannerProps {
  attemptsCount: number;
  targetName: string;
  targetSubtitle?: string;
  targetImageUrl?: string;
  onPlayInfinite?: () => void;
  lang?: LolLanguage;
}

export const DailyCompletedBanner: React.FC<DailyCompletedBannerProps> = ({
  attemptsCount,
  targetName,
  targetSubtitle,
  targetImageUrl,
  onPlayInfinite,
  lang = 'it',
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextDaily());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-zinc-950/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left: Badge, Target item, attempts */}
        <div className="flex items-center gap-4 text-left">
          {targetImageUrl ? (
            <div className="relative shrink-0">
              <img
                src={targetImageUrl}
                alt={targetName}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-1 shadow-md">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
          ) : (
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shrink-0">
              <CheckCircle2 className="h-9 w-9" />
            </div>
          )}

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-emerald-300 border border-emerald-500/30 mb-1.5">
              <span>{lang === 'en' ? 'Daily Completed!' : 'Sfida Quotidiana Risolta!'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {targetName}
            </h2>
            {targetSubtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 line-clamp-1">
                {targetSubtitle}
              </p>
            )}
            <div className="mt-2 text-xs font-semibold text-emerald-400/90 flex items-center gap-2">
              <span>
                {lang === 'en'
                  ? `Solved in ${attemptsCount} ${attemptsCount === 1 ? 'try' : 'tries'}`
                  : `Indovinato in ${attemptsCount} ${attemptsCount === 1 ? 'tentativo' : 'tentativi'}`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Countdown & Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <div className="flex h-[52px] items-center gap-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 px-4 text-xs text-zinc-300 w-full sm:w-auto justify-center shadow-inner box-border">
            <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block leading-tight">
                {lang === 'en' ? 'Next Daily in:' : 'Nuova Daily tra:'}
              </span>
              <span className="text-sm font-black text-indigo-200">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {onPlayInfinite && (
            <button
              type="button"
              onClick={onPlayInfinite}
              className="flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-5 text-xs font-black uppercase tracking-wider text-white transition shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95 w-full sm:w-auto box-border"
            >
              <InfinityIcon className="h-4 w-4" />
              <span>{lang === 'en' ? 'Play Endless' : 'Gioca Endless'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
