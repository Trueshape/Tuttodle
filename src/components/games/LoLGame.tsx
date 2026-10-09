import React, { useState, useEffect } from 'react';
import { GameMode, AttributeMatch, LolChampion, LolLanguage } from '../../types';
import { LoLClassicGame } from './LoLClassicGame';
import { LoLQuoteGame } from './LoLQuoteGame';
import { LoLAbilityGame } from './LoLAbilityGame';
import { LoLArtworkGame } from './LoLArtworkGame';

interface LoLGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  initialSubGame?: string;
  onSubGameChange?: (subGame: string) => void;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetItem: any) => void;
  onOpenHelp: () => void;
  lang?: LolLanguage;
  onLanguageChange?: (lang: LolLanguage) => void;
}

export const LoLGame: React.FC<LoLGameProps> = ({
  mode,
  onModeChange,
  initialSubGame,
  onSubGameChange,
  onVictory,
  onOpenHelp,
  lang: propLang = 'it',
}) => {
  const [subGame, setSubGame] = useState<'classico' | 'citazione' | 'abilita' | 'artwork'>(() => {
    if (
      initialSubGame === 'citazione' ||
      initialSubGame === 'abilita' ||
      initialSubGame === 'artwork'
    ) {
      return initialSubGame;
    }
    return 'classico';
  });

  useEffect(() => {
    if (
      initialSubGame === 'classico' ||
      initialSubGame === 'citazione' ||
      initialSubGame === 'abilita' ||
      initialSubGame === 'artwork'
    ) {
      setSubGame(initialSubGame);
    }
  }, [initialSubGame]);

  const activeLang = propLang;

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:py-6">
      {/* Render selected mini-game with current language */}
      {subGame === 'classico' && (
        <LoLClassicGame
          mode={mode}
          onModeChange={onModeChange}
          lang={activeLang}
          onVictory={onVictory}
          onOpenHelp={onOpenHelp}
        />
      )}
      {subGame === 'citazione' && (
        <LoLQuoteGame
          mode={mode}
          onModeChange={onModeChange}
          lang={activeLang}
          onVictory={onVictory}
          onOpenHelp={onOpenHelp}
        />
      )}
      {subGame === 'abilita' && (
        <LoLAbilityGame
          mode={mode}
          onModeChange={onModeChange}
          lang={activeLang}
          onVictory={onVictory}
          onOpenHelp={onOpenHelp}
        />
      )}
      {subGame === 'artwork' && (
        <LoLArtworkGame
          mode={mode}
          onModeChange={onModeChange}
          lang={activeLang}
          onVictory={onVictory}
          onOpenHelp={onOpenHelp}
        />
      )}
    </div>
  );
};
