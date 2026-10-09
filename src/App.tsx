import React, { useState } from 'react';
import { CategoryId, GameMode, AttributeMatch, UserStats, LolLanguage } from './types';
import { CATEGORIES } from './data/categories';
import { getStats } from './utils/stats';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { HowToPlayModal } from './components/HowToPlayModal';
import { StatsModal } from './components/StatsModal';
import { VictoryModal } from './components/VictoryModal';
import { FootballTransferGame } from './components/games/FootballTransferGame';
import { LoLGame } from './components/games/LoLGame';
import { CarSpecsGame } from './components/games/CarSpecsGame';
import { MovieGame } from './components/games/MovieGame';
import { AnimeGame } from './components/games/AnimeGame';
import { VideoGame } from './components/games/VideoGame';
import { BarChart2, HelpCircle } from 'lucide-react';

const getEffectiveMiniGame = (catId: CategoryId | null, subId: string | null): string => {
  if (!catId) return 'default';
  if (subId) return subId;
  if (catId === 'league-of-legends') return 'classico';
  if (catId === 'videogiochi') return 'pixel';
  if (catId === 'calcio') return 'carriera';
  if (catId === 'automobili') return 'specs';
  if (catId === 'film') return 'film-stats';
  if (catId === 'anime') return 'anime-stats';
  const catObj = CATEGORIES.find((c) => c.id === catId);
  return catObj?.miniGames[0]?.id || 'default';
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedMiniGame, setSelectedMiniGame] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('daily');
  const [roundKey, setRoundKey] = useState<number>(0);

  const [lang, setLang] = useState<LolLanguage>(() => {
    try {
      const saved = localStorage.getItem('omnidle_lol_language');
      if (saved === 'en' || saved === 'it') return saved;
    } catch {}
    return 'it';
  });

  const handleLanguageChange = (newLang: LolLanguage) => {
    setLang(newLang);
    try {
      localStorage.setItem('omnidle_lol_language', newLang);
    } catch {}
  };

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

  const activeMiniGame = getEffectiveMiniGame(selectedCategory, selectedMiniGame);

  // Current stats object for modal
  const getCurrentStats = (): UserStats => {
    if (!selectedCategory) {
      return { played: 0, won: 0, currentStreak: 0, maxStreak: 0, guessDistribution: {} };
    }
    const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
    const gameId = activeMiniGame || catObj?.miniGames[0]?.id || 'default';
    return getStats(selectedCategory, gameId);
  };

  const handleSelectCategory = (catId: CategoryId, miniGameId?: string) => {
    setSelectedCategory(catId);
    const defaultSub =
      miniGameId ||
      (catId === 'videogiochi'
        ? 'pixel'
        : catId === 'league-of-legends'
        ? 'classico'
        : null);
    setSelectedMiniGame(defaultSub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedCategory(null);
    setSelectedMiniGame(null);
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
      targetSubtitle:
        targetItem.currentClub ||
        targetItem.brand ||
        targetItem.director ||
        targetItem.studio ||
        targetItem.developer ||
        targetItem.title,
      targetImageUrl: targetItem.icon || targetItem.imageUrl || targetItem.posterUrl || targetItem.coverUrl,
    });
    setIsVictoryOpen(true);
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] font-sans selection:bg-[#6366f1] selection:text-white antialiased flex flex-col justify-between">
      <div>
        {/* Sticky Header with Brand, Mini-game Switcher, Mode Switcher, Language Switcher, and Actions */}
        <Header
          currentCategory={selectedCategory}
          onCategoryChange={handleSelectCategory}
          currentMiniGame={activeMiniGame}
          onMiniGameChange={(gameId) => setSelectedMiniGame(gameId)}
          currentMode={gameMode}
          onModeChange={setGameMode}
          currentLang={lang}
          onLanguageChange={handleLanguageChange}
          onGoHome={handleGoHome}
          onOpenHelp={() => setIsHelpOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="pb-12">
          {!selectedCategory ? (
            /* HOME VIEW */
            <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
              {/* Categories Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onSelect={handleSelectCategory}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* GAME VIEW */
            <div>
              {selectedCategory === 'calcio' && (
                <FootballTransferGame
                  key={`calcio-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}
              {selectedCategory === 'league-of-legends' && (
                <LoLGame
                  key={`lol-${activeMiniGame}-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  initialSubGame={activeMiniGame}
                  onSubGameChange={(sub) => setSelectedMiniGame(sub)}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  lang={lang}
                  onLanguageChange={handleLanguageChange}
                />
              )}
              {selectedCategory === 'automobili' && (
                <CarSpecsGame
                  key={`auto-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  lang={lang}
                />
              )}
              {selectedCategory === 'film' && (
                <MovieGame
                  key={`film-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  lang={lang}
                />
              )}
              {selectedCategory === 'anime' && (
                <AnimeGame
                  key={`anime-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  lang={lang}
                />
              )}
              {selectedCategory === 'videogiochi' && (
                <VideoGame
                  key={`vg-${activeMiniGame}-${roundKey}`}
                  mode={gameMode}
                  onModeChange={setGameMode}
                  initialSubGame={activeMiniGame}
                  onVictory={handleVictory}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  lang={lang}
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
        lang={lang}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={getCurrentStats()}
        gameTitle={
          lang === 'en' && activeCategoryObj?.titleEn
            ? activeCategoryObj.titleEn
            : activeCategoryObj?.title || 'TuttoDle'
        }
        lang={lang}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        onClose={() => setIsVictoryOpen(false)}
        gameTitle={
          lang === 'en' && activeCategoryObj?.titleEn
            ? activeCategoryObj.titleEn
            : activeCategoryObj?.title || 'TuttoDle'
        }
        targetName={victoryData.targetName}
        targetSubtitle={victoryData.targetSubtitle}
        targetImageUrl={victoryData.targetImageUrl}
        attemptsCount={victoryData.attemptsCount}
        guessesMatches={victoryData.guessesMatches}
        mode={gameMode}
        lang={lang}
        onPlayNextInfinite={() => {
          setIsVictoryOpen(false);
          setRoundKey((prev) => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
