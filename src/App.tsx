import React, { useState } from 'react';
import { CategoryId, GameMode, AttributeMatch, UserStats } from './types';
import { CATEGORIES } from './data/categories';
import { getStats } from './utils/stats';
import { CategoryCard } from './components/CategoryCard';
import { HowToPlayModal } from './components/HowToPlayModal';
import { StatsModal } from './components/StatsModal';
import { VictoryModal } from './components/VictoryModal';
import { FootballTransferGame } from './components/games/FootballTransferGame';
import { LoLClassicGame } from './components/games/LoLClassicGame';
import { CarSpecsGame } from './components/games/CarSpecsGame';
import { MovieGame } from './components/games/MovieGame';
import { AnimeGame } from './components/games/AnimeGame';
import { VideoGame } from './components/games/VideoGame';
import { Trophy, Flame, Home, Calendar, Infinity as InfinityIcon, ArrowLeft, BarChart2, HelpCircle } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('daily');

  // Modals state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Victory modal payload
  const [victoryData, setVictoryData] = useState<{
    attemptsCount: number;
    guessesMatches: AttributeMatch[][];
    targetName: string;
    targetSubtitle?: string;
    targetImageUrl?: string;
  }>({
    attemptsCount: 0,
    guessesMatches: [],
    targetName: '',
  });

  // Current stats object for modal
  const getCurrentStats = (): UserStats => {
    if (!selectedCategory) {
      return { played: 0, won: 0, currentStreak: 0, maxStreak: 0, guessDistribution: {} };
    }
    const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
    const primaryGameId = catObj?.miniGames[0]?.id || 'default';
    return getStats(selectedCategory, primaryGameId);
  };

  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVictory = (
    attemptsCount: number,
    guessesMatches: AttributeMatch[][],
    targetItem: any
  ) => {
    setVictoryData({
      attemptsCount,
      guessesMatches,
      targetName: targetItem.name || targetItem.title || 'Vittoria',
      targetSubtitle: targetItem.currentClub || targetItem.brand || targetItem.director || targetItem.studio || targetItem.developer || targetItem.title,
      targetImageUrl: targetItem.icon || targetItem.imageUrl || targetItem.posterUrl,
    });
    setIsVictoryOpen(true);
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] font-sans selection:bg-[#6366f1] selection:text-white antialiased flex flex-col justify-between">
      <div>
        {/* Main Content Area */}
        <main className="pb-12">
          {!selectedCategory ? (
            /* HOME VIEW */
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
              {/* Hero Banner Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-zinc-900">
                <div>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none text-white">
                    TUTTO<span className="text-[#6366f1]">DLE</span>
                  </h1>
                  <p className="text-zinc-500 mt-2 uppercase tracking-widest text-xs font-bold">
                    Challenge your knowledge across 6 universes
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsStatsOpen(true)}
                    id="btn-hero-stats"
                    className="px-3.5 py-1.5 border border-zinc-800 rounded-md text-[11px] font-bold text-zinc-300 uppercase tracking-widest bg-zinc-900/80 hover:bg-zinc-800 hover:text-white transition flex items-center gap-1.5"
                  >
                    <BarChart2 className="h-3.5 w-3.5 text-[#6366f1]" />
                    <span>Statistiche</span>
                  </button>
                  <button
                    onClick={() => setIsHelpOpen(true)}
                    id="btn-hero-help"
                    className="px-3.5 py-1.5 bg-[#6366f1] text-white rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Come Giocare</span>
                  </button>
                </div>
              </div>

              {/* Categories Grid Header */}
              <div className="mb-6 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
                    Seleziona una Categoria
                  </h2>
                  <p className="text-xs text-zinc-500 italic">
                    Confronta gli attributi stile LoLdle & Wordle per vincere.
                  </p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6366f1] bg-[#6366f1]/10 px-3 py-1 rounded-md border border-[#6366f1]/20">
                  {CATEGORIES.length} Mondi Attivi
                </span>
              </div>

              {/* Categories Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* GAME VIEW */
            <div>
              {/* Compact Navigation & Mode bar for active game */}
              <div className="border-b border-zinc-800 bg-[#0c0c0e]/95 py-3 px-4 sm:px-6 mb-4">
                <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    id="btn-back-home"
                    className="flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition uppercase tracking-wider"
                  >
                    <ArrowLeft className="h-4 w-4 text-[#6366f1]" />
                    <span>Torna ai Temi</span>
                  </button>

                  {/* Mode switcher */}
                  <div className="flex items-center rounded-lg bg-zinc-900 p-1 border border-zinc-800">
                    <button
                      onClick={() => setGameMode('daily')}
                      id="btn-mode-daily"
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
                        gameMode === 'daily'
                          ? 'bg-[#6366f1] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Daily</span>
                    </button>
                    <button
                      onClick={() => setGameMode('infinite')}
                      id="btn-mode-infinite"
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
                        gameMode === 'infinite'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <InfinityIcon className="h-3.5 w-3.5" />
                      <span>Infinite</span>
                    </button>
                  </div>
                </div>
              </div>
              {selectedCategory === 'calcio' && (
                <FootballTransferGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'league-of-legends' && (
                <LoLClassicGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'automobili' && (
                <CarSpecsGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'film' && (
                <MovieGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'anime' && (
                <AnimeGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'videogiochi' && (
                <VideoGame
                  mode={gameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <HowToPlayModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        categoryId={selectedCategory}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={getCurrentStats()}
        gameTitle={activeCategoryObj?.title || 'OmniDle'}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        onClose={() => setIsVictoryOpen(false)}
        gameTitle={activeCategoryObj?.title || 'OmniDle'}
        targetName={victoryData.targetName}
        targetSubtitle={victoryData.targetSubtitle}
        targetImageUrl={victoryData.targetImageUrl}
        attemptsCount={victoryData.attemptsCount}
        guessesMatches={victoryData.guessesMatches}
        mode={gameMode}
        onPlayNextInfinite={() => {
          setIsVictoryOpen(false);
          // Re-trigger game re-init
          window.dispatchEvent(new Event('resize'));
        }}
      />
    </div>
  );
}
