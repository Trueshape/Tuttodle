import React from 'react';
import { X, Flame } from 'lucide-react';
import { UserStats, LolLanguage } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  gameTitle?: string;
  lang?: LolLanguage;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  gameTitle = 'Partita',
  lang = 'it',
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const maxAttemptsCount = Math.max(...(Object.values(stats.guessDistribution) as number[]), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          id="btn-close-stats"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-black text-slate-100">
          {isEn ? 'Statistics' : 'Statistiche'}
        </h2>
        <p className="text-xs font-semibold text-indigo-400 mt-0.5">{gameTitle}</p>

        {/* Top 4 Stats Cards */}
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-3">
            <div className="text-2xl font-black text-slate-100">{stats.played}</div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mt-1">
              {isEn ? 'Played' : 'Giocate'}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-3">
            <div className="text-2xl font-black text-emerald-400">{winRate}%</div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mt-1">
              {isEn ? 'Win %' : 'Vittorie'}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-3">
            <div className="flex items-center justify-center gap-0.5 text-2xl font-black text-amber-400">
              <Flame className="h-5 w-5 fill-amber-400" />
              {stats.currentStreak}
            </div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mt-1">
              {isEn ? 'Streak' : 'Serie'}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-3">
            <div className="text-2xl font-black text-purple-400">{stats.maxStreak}</div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mt-1">
              {isEn ? 'Max Streak' : 'Max Serie'}
            </div>
          </div>
        </div>

        {/* Guess Distribution Chart */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {isEn ? 'Guess Distribution' : 'Distribuzione Tentativi'}
          </h3>
          <div className="space-y-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const count = stats.guessDistribution[num] || 0;
              const percentage = Math.max((count / maxAttemptsCount) * 100, 8);

              return (
                <div key={num} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-bold text-slate-400">{num}</span>
                  <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden h-6">
                    <div
                      style={{ width: `${percentage}%` }}
                      className={`h-full flex items-center justify-end px-2 font-bold text-slate-950 transition-all duration-500 ${
                        count > 0 ? 'bg-emerald-400' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          id="btn-close-stats-footer"
          className="mt-6 w-full rounded-2xl bg-slate-800 border border-slate-700 py-3 font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
        >
          {isEn ? 'Close' : 'Chiudi'}
        </button>
      </div>
    </div>
  );
};
