import React from 'react';
import { CategoryInfo, LolLanguage } from '../types';
import { Trophy, Swords, Car, Clapperboard, Tv, Gamepad2, Play } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelect: (categoryId: CategoryInfo['id'], miniGameId?: string) => void;
  lang?: LolLanguage;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Trophy,
  Swords,
  Car,
  Clapperboard,
  Tv,
  Gamepad2,
};

const COLOR_CLASSES: Record<string, { bg: string; text: string; badge: string }> = {
  green: { bg: 'bg-green-500/20', text: 'text-green-400', badge: 'bg-green-500 text-black' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500 text-black' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', badge: 'bg-amber-500 text-black' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500 text-black' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', badge: 'bg-cyan-500 text-black' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', badge: 'bg-purple-500 text-black' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', badge: 'bg-rose-500 text-black' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', badge: 'bg-indigo-500 text-white' },
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, lang = 'it' }) => {
  const Icon = ICON_MAP[category.iconName] || Trophy;
  const colors = COLOR_CLASSES[category.color] || COLOR_CLASSES.indigo;

  const displayTitle = lang === 'en' && category.titleEn ? category.titleEn : category.title;
  const displaySubtitle = lang === 'en' && category.subtitleEn ? category.subtitleEn : category.subtitle;
  const displaySource = lang === 'en' && category.sourceInfoEn ? category.sourceInfoEn : category.sourceInfo;

  return (
    <div
      onClick={() => onSelect(category.id)}
      id={`cat-card-${category.id}`}
      className="relative group cursor-pointer border border-zinc-800 bg-[#141417] p-6 flex flex-col justify-between overflow-hidden rounded-xl transition-all duration-300 hover:border-zinc-700 hover:bg-[#1a1a1e] hover:-translate-y-1 shadow-lg"
    >
      {/* Watermark acronym behind card */}
      <div className="absolute -right-4 -top-4 text-9xl font-black text-white/[0.03] select-none pointer-events-none transition-opacity duration-300 group-hover:text-white/[0.06]">
        {category.watermarkCode || category.title.substring(0, 2).toUpperCase()}
      </div>

      <div>
        {/* Icon box */}
        <div className={`w-10 h-10 ${colors.bg} ${colors.text} flex items-center justify-center rounded-lg mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-2xl font-bold mb-1 text-zinc-100 group-hover:text-white transition-colors">
          {displayTitle}
        </h2>
        <p className="text-zinc-500 text-sm italic mb-4">
          "{displaySubtitle}"
        </p>

        {/* Mini Games list */}
        <div className="space-y-1.5 border-t border-zinc-800/80 pt-3 mb-4">
          {category.miniGames.map((game) => {
            const gameTitle = lang === 'en' && game.titleEn ? game.titleEn : game.title;

            return (
              <div
                key={game.id}
                onClick={(e) => {
                  if (game.isAvailable) {
                    e.stopPropagation();
                    onSelect(category.id, game.id);
                  }
                }}
                className={`flex items-center justify-between rounded-md px-2.5 py-1 text-xs transition ${
                  game.isAvailable
                    ? 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 cursor-pointer'
                    : 'bg-zinc-900/30 text-zinc-600 border border-zinc-900/50'
                }`}
              >
                <span className="font-medium truncate max-w-[170px]">{gameTitle}</span>
                {game.isAvailable ? (
                  <span className="flex items-center text-emerald-400 p-0.5">
                    <Play className="h-3.5 w-3.5 fill-emerald-400" />
                  </span>
                ) : (
                  <span className="text-[10px] text-zinc-600 uppercase font-semibold">
                    {lang === 'en' ? 'Coming soon' : 'Prossimamente'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer bar inside card */}
      <div className="flex justify-between items-center pt-3 border-t border-zinc-800/60">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold truncate max-w-[150px]">
          {displaySource}
        </span>
        <span className={`px-3.5 py-1 ${colors.badge} text-[10px] font-black rounded-full uppercase tracking-wider transition-transform group-hover:scale-105`}>
          {lang === 'en' ? 'PLAY' : 'GIOCA'}
        </span>
      </div>
    </div>
  );
};
