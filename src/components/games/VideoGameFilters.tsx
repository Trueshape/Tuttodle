import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw, X, Gamepad2, Calendar, Tag, Check, Layers, Play } from 'lucide-react';
import { LolLanguage, VideoGameItem } from '../../types';
import { ConsoleBadge } from './PlatformIcons';
import { localizeSpecValue } from '../../utils/vgLocalization';

export type ConsoleBrand = 'ALL' | 'Sony' | 'Nintendo' | 'Microsoft' | 'Sega';

export interface VideoGameFiltersState {
  brand: ConsoleBrand;
  selectedConsoles: string[]; // empty means all consoles for the selected brand
  minYear: number;
  maxYear: number;
  excludedGenres: string[];
}

export const DEFAULT_FILTERS: VideoGameFiltersState = {
  brand: 'ALL',
  selectedConsoles: [],
  minYear: 1980,
  maxYear: 2026,
  excludedGenres: [],
};

export const BRAND_DEFINITIONS: Record<
  Exclude<ConsoleBrand, 'ALL'>,
  { name: string; icon: string; consoles: string[]; description: string }
> = {
  Sony: {
    name: 'Sony PlayStation',
    icon: '🔷',
    consoles: ['PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PlayStation', 'PS Vita', 'PSP'],
    description: 'PS1, PS2, PS3, PS4, PS5, PS Vita, PSP',
  },
  Nintendo: {
    name: 'Nintendo',
    icon: '🍄',
    consoles: ['NES', 'SNES', 'N64', 'GameCube', 'Wii', 'Wii U', 'Switch', 'Switch 2', 'Game Boy', 'GBA', 'Nintendo DS', 'Nintendo 3DS', 'Nintendo'],
    description: 'NES, SNES, N64, GameCube, Wii, Switch, Switch 2, Game Boy, GBA, DS, 3DS',
  },
  Microsoft: {
    name: 'Microsoft Xbox',
    icon: '🟩',
    consoles: ['Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X/S'],
    description: 'Xbox Original, Xbox 360, Xbox One, Series X/S',
  },
  Sega: {
    name: 'Sega',
    icon: '🌀',
    consoles: ['Mega Drive', 'Dreamcast'],
    description: 'Mega Drive, Dreamcast',
  },
};

/**
 * Checks if a game matches the current filters
 */
export function gameMatchesFilters(game: VideoGameItem, filters: VideoGameFiltersState): boolean {
  // 1. Year filter: 1980 - 2026
  if (game.releaseYear < filters.minYear || game.releaseYear > filters.maxYear) {
    return false;
  }

  // 2. Excluded genres filter
  if (
    filters.excludedGenres.length > 0 &&
    game.genres.some((g) => filters.excludedGenres.includes(g))
  ) {
    return false;
  }

  // 3. Platform & Brand filter
  const gamePlats: string[] = [
    ...(game.platforms || []),
    game.mainPlatform || '',
  ].filter(Boolean);

  // If specific consoles are chosen, the game must match at least one
  if (filters.selectedConsoles && filters.selectedConsoles.length > 0) {
    const matchesConsole = gamePlats.some((p) => filters.selectedConsoles.includes(p));
    if (!matchesConsole) return false;
  } else if (filters.brand && filters.brand !== 'ALL') {
    // Brand filter without specific console restriction
    const brandConsoles = BRAND_DEFINITIONS[filters.brand]?.consoles || [];
    const matchesBrand = gamePlats.some((p) => {
      if (brandConsoles.includes(p)) return true;
      if (filters.brand === 'Sony' && (p.includes('PS') || p.includes('PlayStation'))) return true;
      if (
        filters.brand === 'Nintendo' &&
        (p.includes('Nintendo') ||
          p === 'SNES' ||
          p === 'N64' ||
          p === 'GameCube' ||
          p === 'Wii' ||
          p === 'Switch' ||
          p.includes('Game Boy') ||
          p === 'GBA' ||
          p.includes('DS'))
      )
        return true;
      if (filters.brand === 'Microsoft' && p.includes('Xbox')) return true;
      if (
        filters.brand === 'Sega' &&
        (p.includes('Sega') || p === 'Dreamcast' || p === 'Mega Drive' || p === 'Genesis')
      )
        return true;
      return false;
    });
    if (!matchesBrand) return false;
  }

  return true;
}

interface VideoGameFiltersProps {
  filters: VideoGameFiltersState;
  onChange: (filters: VideoGameFiltersState) => void;
  availablePlatforms: string[];
  availableGenres: string[];
  matchingCount: number;
  totalCount: number;
  onApplyAndNewGame?: () => void;
  lang?: LolLanguage;
}

export const VideoGameFilters: React.FC<VideoGameFiltersProps> = ({
  filters,
  onChange,
  availablePlatforms,
  availableGenres,
  matchingCount,
  totalCount,
  onApplyAndNewGame,
  lang = 'it',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');

  const activeFiltersCount =
    (filters.brand !== 'ALL' || filters.selectedConsoles.length > 0 ? 1 : 0) +
    (filters.minYear > 1980 || filters.maxYear < 2026 ? 1 : 0) +
    (filters.excludedGenres.length > 0 ? 1 : 0);

  const handleBrandChange = (brand: ConsoleBrand) => {
    if (brand === 'ALL') {
      onChange({ ...filters, brand: 'ALL', selectedConsoles: [] });
    } else {
      // If switching brand, filter to that brand and reset custom console selections to include all of that brand
      onChange({ ...filters, brand, selectedConsoles: [] });
    }
  };

  const handleToggleConsole = (consoleName: string) => {
    const isSelected = filters.selectedConsoles.includes(consoleName);
    let updated: string[];

    if (isSelected) {
      updated = filters.selectedConsoles.filter((c) => c !== consoleName);
    } else {
      updated = [...filters.selectedConsoles, consoleName];
    }

    onChange({
      ...filters,
      selectedConsoles: updated,
    });
  };

  const handleSelectAllBrandConsoles = (brandKey: Exclude<ConsoleBrand, 'ALL'>) => {
    const brandConsoles = BRAND_DEFINITIONS[brandKey]?.consoles || [];
    const newSelected = Array.from(new Set([...filters.selectedConsoles, ...brandConsoles]));
    onChange({
      ...filters,
      selectedConsoles: newSelected,
    });
  };

  const handleClearConsoles = () => {
    onChange({
      ...filters,
      selectedConsoles: [],
      brand: 'ALL',
    });
  };

  const handleYearChange = (min: number, max: number) => {
    const clampedMin = Math.max(1980, Math.min(min, max));
    const clampedMax = Math.min(2026, Math.max(max, clampedMin));
    onChange({ ...filters, minYear: clampedMin, maxYear: clampedMax });
  };

  const handleToggleExcludeGenre = (genre: string) => {
    const isExcluded = filters.excludedGenres.includes(genre);
    const updated = isExcluded
      ? filters.excludedGenres.filter((g) => g !== genre)
      : [...filters.excludedGenres, genre];
    onChange({ ...filters, excludedGenres: updated });
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_FILTERS });
  };

  // Decade / epoch presets spanning 1980 to 2026
  const yearPresets = [
    { label: lang === 'en' ? 'All (1980-2026)' : 'Tutti (1980-2026)', min: 1980, max: 2026 },
    { label: lang === 'en' ? "80s (1980-1989)" : "Anni '80 (1980-1989)", min: 1980, max: 1989 },
    { label: lang === 'en' ? "90s (1990-1999)" : "Anni '90 (1990-1999)", min: 1990, max: 1999 },
    { label: lang === 'en' ? '2000s (2000-2009)' : 'Anni 2000 (2000-2009)', min: 2000, max: 2009 },
    { label: lang === 'en' ? '2010s (2010-2019)' : 'Anni 2010 (2010-2019)', min: 2010, max: 2019 },
    { label: lang === 'en' ? '2020-2026' : '2020-2026', min: 2020, max: 2026 },
  ];

  // List of genres translated if lang === 'en' and searchable by both names
  const filteredGenresList = useMemo(() => {
    const query = genreSearch.trim().toLowerCase();
    return availableGenres
      .filter((g) => {
        if (!query) return true;
        const localized = String(localizeSpecValue('Genere', g, lang)).toLowerCase();
        const italian = g.toLowerCase();
        return localized.includes(query) || italian.includes(query);
      })
      .sort((a, b) => {
        const nameA = String(localizeSpecValue('Genere', a, lang));
        const nameB = String(localizeSpecValue('Genere', b, lang));
        return nameA.localeCompare(nameB, lang === 'en' ? 'en' : 'it', { sensitivity: 'base' });
      });
  }, [availableGenres, genreSearch, lang]);

  return (
    <div className="w-full mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm p-3 sm:p-4 shadow-xl transition-all">
      {/* Top Bar / Accordion Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-500/20 transition">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white group-hover:text-indigo-300 transition">
                {lang === 'en' ? 'Endless Challenge Filters' : 'Filtri Sfida Infinita'}
              </span>
              {activeFiltersCount > 0 && (
                <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 text-[10px] font-black text-indigo-300">
                  {activeFiltersCount} {lang === 'en' ? 'active' : 'attivi'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400">
              {lang === 'en'
                ? 'Filter consoles & brands (Sony, Nintendo, Microsoft, Sega), years (1980-2026), or exclude genres'
                : 'Scegli console e brand (Sony, Nintendo, Microsoft, Sega), anni (1980-2026) ed escludi generi'}
            </p>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition ml-1" />
          )}
        </button>

        {/* Counter & Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={`flex h-[40px] items-center gap-1.5 px-3.5 rounded-xl text-xs font-bold border box-border shrink-0 ${
              matchingCount > 0
                ? 'bg-zinc-950 border-zinc-800 text-zinc-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              <strong className={matchingCount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {matchingCount}
              </strong>
              /{totalCount} {lang === 'en' ? 'games' : 'videogiochi'}
            </span>
          </div>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex h-[40px] items-center gap-1 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 px-3 text-xs text-zinc-300 hover:text-white transition border border-zinc-700/60 cursor-pointer box-border shrink-0"
              title={lang === 'en' ? 'Reset all filters' : 'Ripristina tutti i filtri'}
            >
              <RotateCcw className="h-3 w-3" />
              <span>{lang === 'en' ? 'Reset' : 'Ripristina'}</span>
            </button>
          )}

          {onApplyAndNewGame && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onApplyAndNewGame();
              }}
              disabled={matchingCount === 0}
              className="flex h-[40px] items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none px-4 text-xs font-bold text-white transition shadow-sm cursor-pointer box-border shrink-0"
            >
              <span>{lang === 'en' ? 'New Game' : 'Nuovo Videogioco'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Panel */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-5">
          {/* 1. SELEZIONE BRAND & CONSOLE MULTIPLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>
                  {lang === 'en'
                    ? 'Consoles & Brands Filter (Multi-select)'
                    : 'Filtro Console e Brand (Selezione Multipla)'}
                </span>
                {filters.selectedConsoles.length > 0 && (
                  <span className="text-[10px] text-indigo-300 font-black bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    {filters.selectedConsoles.length}{' '}
                    {lang === 'en' ? 'consoles selected' : 'console selezionate'}
                  </span>
                )}
              </div>

              {filters.selectedConsoles.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearConsoles}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                >
                  {lang === 'en' ? 'Deselect all consoles' : 'Deseleziona tutte'}
                </button>
              )}
            </div>

            {/* Brand Quick-Filter Buttons */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
                <Layers className="h-3 w-3 text-zinc-500" />
                <span>{lang === 'en' ? 'Brand Presets:' : 'Scegli per Brand:'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleBrandChange('ALL')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer ${
                    filters.brand === 'ALL' && filters.selectedConsoles.length === 0
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {lang === 'en' ? '🌐 All Brands' : '🌐 Tutti i Brand'}
                </button>

                {(['Sony', 'Nintendo', 'Microsoft', 'Sega'] as const).map((brandKey) => {
                  const b = BRAND_DEFINITIONS[brandKey];
                  const isBrandActive = filters.brand === brandKey && filters.selectedConsoles.length === 0;

                  return (
                    <button
                      key={brandKey}
                      type="button"
                      onClick={() => handleBrandChange(brandKey)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer flex items-center gap-1.5 ${
                        isBrandActive
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <span>{b.icon}</span>
                      <span>{b.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Multi-Select Consoles List */}
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-[11px] font-bold text-zinc-400">
                  {lang === 'en'
                    ? 'Select specific consoles simultaneously (click to toggle):'
                    : 'Seleziona contemporaneamente le singole console (clicca per attivare/disattivare):'}
                </span>
                {filters.brand !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => handleSelectAllBrandConsoles(filters.brand as Exclude<ConsoleBrand, 'ALL'>)}
                    className="text-[11px] text-zinc-400 hover:text-indigo-300 underline cursor-pointer"
                  >
                    {lang === 'en'
                      ? `Select all ${BRAND_DEFINITIONS[filters.brand as Exclude<ConsoleBrand, 'ALL'>]?.name}`
                      : `Seleziona tutte di ${BRAND_DEFINITIONS[filters.brand as Exclude<ConsoleBrand, 'ALL'>]?.name}`}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {availablePlatforms.map((plat) => {
                  // If specific consoles are chosen, check membership in selectedConsoles
                  // Otherwise, if brand is chosen, check if this console belongs to that brand
                  const isExplicitlySelected = filters.selectedConsoles.includes(plat);
                  const isBrandImplicitlySelected =
                    filters.selectedConsoles.length === 0 &&
                    filters.brand !== 'ALL' &&
                    (BRAND_DEFINITIONS[filters.brand]?.consoles.includes(plat) ||
                      (filters.brand === 'Sony' && (plat.includes('PS') || plat.includes('PlayStation'))) ||
                      (filters.brand === 'Nintendo' &&
                        (plat.includes('Nintendo') ||
                          plat === 'SNES' ||
                          plat === 'N64' ||
                          plat === 'GameCube' ||
                          plat === 'Wii' ||
                          plat === 'Switch' ||
                          plat.includes('Game Boy') ||
                          plat === 'GBA' ||
                          plat.includes('DS'))) ||
                      (filters.brand === 'Microsoft' && plat.includes('Xbox')) ||
                      (filters.brand === 'Sega' && (plat.includes('Sega') || plat === 'Dreamcast' || plat === 'Mega Drive')));

                  const isChecked = isExplicitlySelected || isBrandImplicitlySelected;

                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => handleToggleConsole(plat)}
                      className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold transition border cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/40'
                          : 'bg-zinc-900/80 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`h-3 w-3 rounded flex items-center justify-center text-[9px] ${
                          isChecked ? 'bg-indigo-500 text-white' : 'border border-zinc-700 bg-zinc-950'
                        }`}
                      >
                        {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                      <ConsoleBadge consoleKey={plat} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. RANGE DI ANNO (1980 - 2026) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>
                  {lang === 'en' ? 'Release Year Range (1980 - 2026)' : 'Range Anno di Uscita (1980 - 2026)'}
                </span>
              </div>
              <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
                {filters.minYear} – {filters.maxYear}
              </span>
            </div>

            {/* Decade Quick-select pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {yearPresets.map((preset) => {
                const isActive = filters.minYear === preset.min && filters.maxYear === preset.max;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleYearChange(preset.min, preset.max)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-medium transition border cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Sliders & Numerical Inputs from 1980 to 2026 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-zinc-400">
                    {lang === 'en' ? 'From Year (Min 1980):' : "Dall'anno (Min 1980):"}
                  </label>
                  <input
                    type="number"
                    min={1980}
                    max={filters.maxYear}
                    value={filters.minYear}
                    onChange={(e) => handleYearChange(Number(e.target.value), filters.maxYear)}
                    className="w-16 rounded-md bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 text-xs text-white font-mono text-center"
                  />
                </div>
                <input
                  type="range"
                  min={1980}
                  max={filters.maxYear}
                  value={filters.minYear}
                  onChange={(e) => handleYearChange(Number(e.target.value), filters.maxYear)}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-zinc-400">
                    {lang === 'en' ? 'To Year (Max 2026):' : "Fino all'anno (Max 2026):"}
                  </label>
                  <input
                    type="number"
                    min={filters.minYear}
                    max={2026}
                    value={filters.maxYear}
                    onChange={(e) => handleYearChange(filters.minYear, Number(e.target.value))}
                    className="w-16 rounded-md bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 text-xs text-white font-mono text-center"
                  />
                </div>
                <input
                  type="range"
                  min={filters.minYear}
                  max={2026}
                  value={filters.maxYear}
                  onChange={(e) => handleYearChange(filters.minYear, Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. RIMOZIONE GENERI SPECIFICI (Tradotti in Inglese quando lang === 'en') */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Tag className="h-3.5 w-3.5 text-rose-400" />
                <span>
                  {lang === 'en' ? 'Remove Specific Genres' : 'Rimuovi / Escludi Generi Specifici'}
                </span>
                {filters.excludedGenres.length > 0 && (
                  <span className="text-[10px] text-rose-400 font-black bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                    {filters.excludedGenres.length} {lang === 'en' ? 'excluded' : 'esclusi'}
                  </span>
                )}
              </div>

              {filters.excludedGenres.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, excludedGenres: [] })}
                  className="text-[11px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                >
                  {lang === 'en' ? 'Clear excluded' : 'Deseleziona tutti gli esclusi'}
                </button>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 mb-2">
              {lang === 'en'
                ? 'Click on any genre below to exclude it from appearing in the challenge.'
                : 'Clicca su un genere per escluderlo dai videogiochi proposti nella sfida.'}
            </p>

            {/* Quick search input for genres */}
            <div className="mb-2">
              <input
                type="text"
                placeholder={
                  lang === 'en'
                    ? 'Filter genres (e.g. Action, RPG, Horror, FPS)...'
                    : 'Filtra lista generi (es. Azione, RPG, Horror, FPS)...'
                }
                value={genreSearch}
                onChange={(e) => setGenreSearch(e.target.value)}
                className="w-full sm:w-72 rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Genres Chips Grid with English translation */}
            <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-1.5 rounded-xl bg-zinc-950/40 border border-zinc-800/50">
              {filteredGenresList.map((genre) => {
                const isExcluded = filters.excludedGenres.includes(genre);
                const displayGenre = localizeSpecValue('Genere', genre, lang);

                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleToggleExcludeGenre(genre)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition border cursor-pointer ${
                      isExcluded
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 line-through'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                    title={
                      isExcluded
                        ? lang === 'en'
                          ? 'Click to re-include'
                          : 'Clicca per reincludere'
                        : lang === 'en'
                        ? 'Click to exclude'
                        : 'Clicca per escludere'
                    }
                  >
                    {isExcluded && <X className="h-3 w-3 text-rose-400 shrink-0" />}
                    <span>{displayGenre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zero results warning banner */}
          {matchingCount === 0 && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <span>
                ⚠️{' '}
                {lang === 'en'
                  ? 'No games match your current filter criteria. Broaden your search or reset filters!'
                  : 'Nessun videogioco corrisponde ai criteri impostati. Allarga i filtri per poter giocare!'}
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="font-bold underline cursor-pointer ml-2 shrink-0"
              >
                {lang === 'en' ? 'Reset now' : 'Ripristina'}
              </button>
            </div>
          )}

          {/* Azione rapida in fondo al pannello: chiude il pannello ed avvia la partita */}
          {onApplyAndNewGame && (
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-zinc-400">
                <strong className={matchingCount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {matchingCount}
                </strong>
                /{totalCount} {lang === 'en' ? 'games match' : 'videogiochi corrispondenti'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  {lang === 'en' ? 'Close' : 'Chiudi'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onApplyAndNewGame();
                  }}
                  disabled={matchingCount === 0}
                  className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none px-4 py-2 text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>{lang === 'en' ? 'New Game' : 'Nuovo Videogioco'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
