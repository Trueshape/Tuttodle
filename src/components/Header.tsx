import React from 'react';
import { GameMode, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { HelpCircle, BarChart2, Home, Calendar, Infinity as InfinityIcon } from 'lucide-react';

interface HeaderProps {
  currentCategory: CategoryId | null;
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onGoHome: () => void;
  onOpenHelp: () => void;
  onOpenStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  currentMode,
  onModeChange,
  onGoHome,
  onOpenHelp,
  onOpenStats,
}) => {
  const activeCatObj = CATEGORIES.find((c) => c.id === currentCategory);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0c0c0e]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand / Home */}
        <div className="flex items-center gap-4">
          <button
            onClick={onGoHome}
            id="btn-home"
            className="group flex items-center gap-2.5 text-left transition"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-zinc-100 group-hover:text-white transition-colors">
                GUESS<span className="text-[#6366f1]">-</span>IT
              </h1>
              <p className="hidden text-[10px] uppercase tracking-widest font-bold text-zinc-500 sm:block">
                Challenge your knowledge
              </p>
            </div>
          </button>

          {/* Progress bar pill */}
          <div className="hidden lg:flex items-center gap-3 border-l border-zinc-800 pl-4">
            <div className="h-1 w-20 bg-zinc-800 rounded-full relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-2/3 bg-[#6366f1]" />
            </div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">v1.2</span>
          </div>

          {activeCatObj && (
            <div className="hidden items-center gap-2 border-l border-zinc-800 pl-4 md:flex">
              <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">Tema:</span>
              <span className="rounded-md bg-zinc-900 px-2.5 py-0.5 text-xs font-bold text-zinc-200 border border-zinc-800">
                {activeCatObj.title}
              </span>
            </div>
          )}
        </div>

        {/* Center: Mode Switcher (if category is active) */}
        {currentCategory && (
          <div className="flex items-center rounded-lg bg-zinc-900 p-1 border border-zinc-800">
            <button
              onClick={() => onModeChange('daily')}
              id="btn-mode-daily"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
                currentMode === 'daily'
                  ? 'bg-[#6366f1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Giornaliera</span>
            </button>
            <button
              onClick={() => onModeChange('infinite')}
              id="btn-mode-infinite"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
                currentMode === 'infinite'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <InfinityIcon className="h-3.5 w-3.5" />
              <span>Infinita</span>
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {currentCategory && (
            <button
              onClick={onGoHome}
              id="btn-nav-home"
              title="Torna alla Home"
              className="flex h-9 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-xs font-bold text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition uppercase tracking-wider"
            >
              <Home className="h-4 w-4 text-[#6366f1]" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          <button
            onClick={onOpenHelp}
            id="btn-nav-help"
            title="Come giocare"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenStats}
            id="btn-nav-stats"
            title="Statistiche"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition"
          >
            <BarChart2 className="h-4 w-4 text-[#6366f1]" />
          </button>
        </div>
      </div>
    </header>
  );
};
