import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';

export interface SearchOption {
  id: string;
  name: string;
  subtitle?: string;
  iconUrl?: string;
  flag?: string;
  badge?: string;
  badgeColor?: 'cyan' | 'purple' | 'amber' | 'zinc';
}

interface SearchBarProps {
  options: SearchOption[];
  alreadyGuessedIds?: string[];
  onSelectOption?: (option: SearchOption) => void;
  onSelect?: (option: SearchOption) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  options,
  alreadyGuessedIds = [],
  onSelectOption,
  onSelect,
  placeholder = 'Cerca e seleziona...',
  disabled = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on query and sort alphabetically by name (A-Z)
  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? options.filter(
          (opt) =>
            opt.name.toLowerCase().includes(q) ||
            (opt.subtitle && opt.subtitle.toLowerCase().includes(q))
        )
      : [...options];

    return list.sort((a, b) =>
      a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })
    );
  }, [options, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions[selectedIndex]) {
        const selected = filteredOptions[selectedIndex];
        if (!alreadyGuessedIds?.includes(selected.id)) {
          handleSelect(selected);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: SearchOption) => {
    if (alreadyGuessedIds?.includes(option.id)) return;
    if (onSelectOption) {
      onSelectOption(option);
    } else if (onSelect) {
      onSelect(option);
    }
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(0);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto z-30">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          id="input-search-bar"
          disabled={disabled}
          value={query}
          onChange={(e) => {
            if (disabled) return;
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (!disabled) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-zinc-800 bg-[#141417] py-3.5 pl-12 pr-10 text-base font-medium text-zinc-100 placeholder-zinc-500 shadow-xl backdrop-blur-md outline-none transition-all ${
            disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]'
          }`}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            id="btn-clear-search"
            className="absolute right-3.5 text-zinc-400 hover:text-zinc-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-xl border border-zinc-800 bg-[#141417] p-1.5 shadow-2xl backdrop-blur-xl divide-y divide-zinc-800/60 z-50">
          {filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-sm font-medium text-zinc-500">
              Nessun risultato trovato per "{query}"
            </div>
          ) : (
            filteredOptions.map((opt, idx) => {
              const isGuessed = alreadyGuessedIds.includes(opt.id);
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  disabled={isGuessed}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm transition ${
                    isGuessed
                      ? 'opacity-40 cursor-not-allowed bg-zinc-950/40'
                      : isSelected
                      ? 'bg-[#6366f1]/20 text-white border border-[#6366f1]/40'
                      : 'text-zinc-200 hover:bg-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {opt.iconUrl && (
                      <img
                        src={opt.iconUrl}
                        alt={opt.name}
                        className="h-9 w-9 rounded-lg object-cover bg-zinc-800 border border-zinc-700"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                    {opt.flag && <span className="text-xl">{opt.flag}</span>}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-100">{opt.name}</span>
                        {opt.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap ${
                              opt.badgeColor === 'purple' || opt.badge.toLowerCase().includes('remake')
                                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                                : opt.badgeColor === 'cyan' || opt.badge.toLowerCase().includes('remaster')
                                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                                : opt.badgeColor === 'amber' || opt.badge.toLowerCase().includes('espansione') || opt.badge.toLowerCase().includes('expansion')
                                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                            }`}
                          >
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      {opt.subtitle && (
                        <div className="text-xs text-zinc-400 mt-0.5">{opt.subtitle}</div>
                      )}
                    </div>
                  </div>

                  {isGuessed && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      <Check className="h-3 w-3" />
                      Già Provato
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
