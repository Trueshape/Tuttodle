import React, { useState, useRef, useEffect } from 'react';
import { GameMode, CategoryId, LolLanguage } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRAND_SUMMARY_STATS } from '../data/consoles';
import {
  HelpCircle,
  BarChart2,
  Calendar,
  Infinity as InfinityIcon,
  Sparkles,
  Swords,
  Quote,
  Zap,
  Image as ImageIcon,
  Grid3X3,
  Gamepad2,
  Trophy,
  Car,
  Clapperboard,
  Tv,
  Flag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ItalyFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 30 20"
    className={`rounded-[2px] overflow-hidden shadow-xs flex-shrink-0 inline-block ${className}`}
    aria-hidden="true"
  >
    <rect width="10" height="20" fill="#009246" />
    <rect x="10" width="10" height="20" fill="#ffffff" />
    <rect x="20" width="10" height="20" fill="#ce2b37" />
  </svg>
);

export const UkFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 60 30"
    className={`rounded-[2px] overflow-hidden shadow-xs flex-shrink-0 inline-block ${className}`}
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip-header">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip-header)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </g>
  </svg>
);

interface HeaderProps {
  currentCategory: CategoryId | null;
  onCategoryChange?: (categoryId: CategoryId) => void;
  currentMiniGame: string | null;
  onMiniGameChange: (miniGameId: string) => void;
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  currentLang: LolLanguage;
  onLanguageChange: (lang: LolLanguage) => void;
  onGoHome: () => void;
  onOpenHelp: () => void;
  onOpenStats: () => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  calcio: Trophy,
  'league-of-legends': Swords,
  automobili: Car,
  film: Clapperboard,
  anime: Tv,
  videogiochi: Gamepad2,
};

const MINI_GAME_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // League of Legends
  classico: Swords,
  citazione: Quote,
  abilita: Zap,
  artwork: ImageIcon,
  // Videogiochi / Videogiochi 2
  pixel: Grid3X3,
  'game-specs': Gamepad2,
  // Calcio
  carriera: Trophy,
  nazionali: Flag,
  // Automobili
  specs: Car,
  silhouette: Car,
  // Cinema
  'film-stats': Clapperboard,
  citazioni: Quote,
  // Anime
  'anime-stats': Tv,
  opening: Sparkles,
};

const getSubGameActiveClass = (categoryId: CategoryId, subGameId: string) => {
  if (categoryId === 'league-of-legends') {
    if (subGameId === 'classico') return 'bg-[#6366f1] text-white shadow-md shadow-indigo-600/30';
    if (subGameId === 'citazione') return 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/30';
    if (subGameId === 'abilita') return 'bg-orange-500 text-zinc-950 font-black shadow-md shadow-orange-500/30';
    if (subGameId === 'artwork') return 'bg-emerald-500 text-zinc-950 font-black shadow-md shadow-emerald-500/30';
  }
  if (categoryId === 'videogiochi') {
    if (subGameId === 'pixel') return 'bg-rose-600 text-white shadow-md shadow-rose-600/30';
    if (subGameId === 'game-specs') return 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30';
  }
  if (categoryId === 'calcio') {
    return 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30';
  }
  if (categoryId === 'automobili') {
    return 'bg-blue-600 text-white shadow-md shadow-blue-600/30';
  }
  if (categoryId === 'film') {
    return 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30';
  }
  if (categoryId === 'anime') {
    return 'bg-purple-600 text-white shadow-md shadow-purple-600/30';
  }
  return 'bg-[#6366f1] text-white shadow-md';
};

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onCategoryChange,
  currentMiniGame,
  onMiniGameChange,
  currentMode,
  onModeChange,
  currentLang,
  onLanguageChange,
  onGoHome,
  onOpenHelp,
  onOpenStats,
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCatObj = CATEGORIES.find((c) => c.id === currentCategory);
  const CategoryIcon = currentCategory ? CATEGORY_ICONS[currentCategory] || Sparkles : Sparkles;

  const activeCategoryTitle =
    activeCatObj && (currentLang === 'en' && activeCatObj.titleEn ? activeCatObj.titleEn : activeCatObj.title);

  // Other categories in alphabetical order by localized title
  const otherCategories = CATEGORIES.filter((c) => c.id !== currentCategory).sort((a, b) => {
    const titleA = currentLang === 'en' && a.titleEn ? a.titleEn : a.title;
    const titleB = currentLang === 'en' && b.titleEn ? b.titleEn : b.title;
    return titleA.localeCompare(titleB, currentLang === 'en' ? 'en' : 'it', { sensitivity: 'base' });
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    if (isCategoryMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0c0c0e]/95 backdrop-blur-md">
      {/* Top Single Unified Navigation Bar with expanded max width to comfortably fit everything */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 px-3 py-2 sm:px-6">
        {/* Left: Brand / Home Logo (cliccandoci si torna alla Home) & Nome Categoria con Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={onGoHome}
            id="btn-home"
            className="group flex items-center gap-2 text-left transition hover:opacity-90 cursor-pointer"
            title={currentLang === 'en' ? 'Return to Home' : 'Torna alla Home'}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1] to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-zinc-100 group-hover:text-white transition-colors">
                TUTTO<span className="text-[#6366f1]">DLE</span>
              </h1>
              <p className="hidden text-[9px] uppercase tracking-widest font-bold text-zinc-500 md:block">
                All-in-one Guess Game
              </p>
            </div>
          </button>

          {/* Nome della categoria nell'header con Dropdown alfabetico di tutte le altre categorie */}
          {activeCatObj && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                id="btn-category-dropdown"
                title={
                  currentLang === 'en'
                    ? 'Click to switch category'
                    : 'Clicca per cambiare categoria'
                }
                className="flex items-center gap-1.5 rounded-lg bg-zinc-900/90 px-2.5 sm:px-3 py-1 text-xs font-bold text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition cursor-pointer shadow-sm"
              >
                <CategoryIcon className="h-3.5 w-3.5 text-[#6366f1] flex-shrink-0" />
                <span className="max-w-[130px] sm:max-w-[170px] truncate">
                  {activeCategoryTitle}
                </span>
                {isCategoryMenuOpen ? (
                  <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                )}
              </button>

              {/* Menu a comparsa con tutte le altre categorie ordinate alfabeticamente */}
              {isCategoryMenuOpen && (
                <div
                  id="category-dropdown-menu"
                  className="absolute left-0 mt-1.5 w-56 sm:w-64 rounded-xl border border-zinc-800 bg-[#121215] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-lg"
                >
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-500 border-b border-zinc-800/80 mb-1">
                    {currentLang === 'en' ? 'Switch Category' : 'Cambia Categoria'}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1 pr-0.5">
                    {otherCategories.map((cat) => {
                      const IconComponent = CATEGORY_ICONS[cat.id] || Sparkles;
                      const catTitle =
                        currentLang === 'en' && cat.titleEn ? cat.titleEn : cat.title;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            if (onCategoryChange) {
                              onCategoryChange(cat.id);
                            }
                            setIsCategoryMenuOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition group"
                        >
                          <span className="flex items-center gap-2">
                            <IconComponent className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#6366f1] transition-colors" />
                            <span className="truncate">{catTitle}</span>
                          </span>
                          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
                            {cat.miniGames.length} {currentLang === 'en' ? 'games' : 'giochi'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Section: Pillole dei Giochi della categoria CENTRATI nell'header */}
        <div className="flex-1 flex justify-center items-center px-1 sm:px-3 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          {activeCatObj && activeCatObj.miniGames && activeCatObj.miniGames.length > 0 && (
            <div
              id="header-mini-games-pills"
              className="flex items-center gap-1 rounded-lg bg-zinc-900/90 p-0.5 sm:p-1 border border-zinc-800 shadow-sm flex-shrink-0"
            >
              {activeCatObj.miniGames.map((game) => {
                const isSelected = currentMiniGame === game.id;
                const IconComp = MINI_GAME_ICONS[game.id] || Sparkles;
                const gameTitle = currentLang === 'en' && game.titleEn ? game.titleEn : game.title;
                const gameDesc = currentLang === 'en' && game.descriptionEn ? game.descriptionEn : game.description;

                return (
                  <button
                    key={game.id}
                    id={`tab-header-${game.id}`}
                    disabled={!game.isAvailable}
                    onClick={() => game.isAvailable && onMiniGameChange(game.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2 sm:px-2.5 py-1 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      !game.isAvailable
                        ? 'opacity-35 cursor-not-allowed text-zinc-500'
                        : isSelected
                        ? getSubGameActiveClass(currentCategory, game.id)
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70'
                    }`}
                    title={gameDesc}
                  >
                    <IconComp className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">{gameTitle}</span>
                    <span className="inline sm:hidden">
                      {gameTitle.length > 8 ? gameTitle.split(' ')[0] : gameTitle}
                    </span>
                    {game.id === 'citazione' && (
                      <span className="hidden lg:inline rounded-full bg-rose-500 px-1 py-0.2 text-[8px] font-black uppercase text-white shadow-sm">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: Daily/Infinite + Bandiere Lingua + Help & Stats */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">

          {/* Daily / Infinite Switcher */}
          {currentCategory && (
            <div className="flex items-center rounded-lg bg-zinc-900 p-0.5 sm:p-1 border border-zinc-800 shadow-sm flex-shrink-0">
              <button
                onClick={() => onModeChange('daily')}
                id="btn-mode-daily"
                className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2 sm:px-2.5 py-1 text-xs font-bold transition ${
                  currentMode === 'daily'
                    ? 'bg-[#6366f1] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={
                  currentLang === 'en'
                    ? 'Daily Challenge: Same challenge for everyone each day'
                    : 'Modalità Giornaliera: Sfida uguale per tutti ogni giorno'
                }
              >
                <Calendar className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Daily</span>
              </button>
              <button
                onClick={() => onModeChange('infinite')}
                id="btn-mode-infinite"
                className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2 sm:px-2.5 py-1 text-xs font-bold transition ${
                  currentMode === 'infinite'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={
                  currentLang === 'en'
                    ? 'Infinite Mode: Play unlimited rounds whenever you want'
                    : 'Modalità Infinita: Gioca senza limiti quante volte vuoi'
                }
              >
                <InfinityIcon className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Infinite</span>
              </button>
            </div>
          )}

          {/* Language Switcher - Icone grafiche SVG bandiera Italiana ed Inglese a destra di Daily/Infinite */}
          <div
            id="header-language-switcher"
            className="flex items-center gap-1 rounded-lg bg-zinc-900 p-1 border border-zinc-800 shadow-sm flex-shrink-0"
          >
            <button
              onClick={() => onLanguageChange('it')}
              id="btn-lang-it"
              title="Italiano"
              aria-label="Italiano"
              className={`flex items-center justify-center rounded-md px-1.5 py-1 transition-all cursor-pointer ${
                currentLang === 'it'
                  ? 'bg-zinc-800 ring-2 ring-indigo-500 shadow-sm scale-105'
                  : 'opacity-40 hover:opacity-100 hover:bg-zinc-800/60'
              }`}
            >
              <ItalyFlagIcon className="w-5 h-3.5" />
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              id="btn-lang-en"
              title="English"
              aria-label="English"
              className={`flex items-center justify-center rounded-md px-1.5 py-1 transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-zinc-800 ring-2 ring-indigo-500 shadow-sm scale-105'
                  : 'opacity-40 hover:opacity-100 hover:bg-zinc-800/60'
              }`}
            >
              <UkFlagIcon className="w-5 h-3.5" />
            </button>
          </div>

          {/* Help & Stats Buttons */}
          <div className="flex items-center gap-1 border-l border-zinc-800 pl-1.5 sm:pl-2 flex-shrink-0">
            <button
              onClick={onOpenHelp}
              id="btn-nav-help"
              title={
                currentLang === 'en'
                  ? `How to play - ${BRAND_SUMMARY_STATS.Total} Console Games in Database (Sony: ${BRAND_SUMMARY_STATS.Sony}, Nintendo: ${BRAND_SUMMARY_STATS.Nintendo}, Xbox: ${BRAND_SUMMARY_STATS.Microsoft})`
                  : `Come giocare - ${BRAND_SUMMARY_STATS.Total} Giochi Console nel Database (Sony: ${BRAND_SUMMARY_STATS.Sony}, Nintendo: ${BRAND_SUMMARY_STATS.Nintendo}, Xbox: ${BRAND_SUMMARY_STATS.Microsoft})`
              }
              className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <button
              onClick={onOpenStats}
              id="btn-nav-stats"
              title={currentLang === 'en' ? 'Statistics' : 'Statistiche'}
              className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
            >
              <BarChart2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#6366f1]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
