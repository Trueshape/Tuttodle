import React, { useState, useEffect } from 'react';
import { VideoGameItem, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { VIDEO_GAMES } from '../../data/videoGames';
import { compareVideoGame } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Gamepad2, Lightbulb, Lock } from 'lucide-react';

interface VideoGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetGame: VideoGameItem) => void;
  onOpenHelp: () => void;
}

export const VideoGame: React.FC<VideoGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetGame, setTargetGame] = useState<VideoGameItem>(VIDEO_GAMES[0]);
  const [guesses, setGuesses] = useState<GuessRecord<VideoGameItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedQuote, setUnlockedQuote] = useState(false);

  const initGame = () => {
    let chosen: VideoGameItem;
    if (mode === 'daily') {
      const idx = getDailyIndex('videogiochi', 'game-specs', VIDEO_GAMES.length);
      chosen = VIDEO_GAMES[idx];
    } else {
      const randIdx = Math.floor(Math.random() * VIDEO_GAMES.length);
      chosen = VIDEO_GAMES[randIdx];
    }
    setTargetGame(chosen);
    setGuesses([]);
    setIsGameOver(false);
    setUnlockedQuote(false);
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  useEffect(() => {
    if (guesses.length >= 3) setUnlockedQuote(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = VIDEO_GAMES.map((g) => ({
    id: g.id,
    name: g.title,
    subtitle: `${g.developer} • ${g.genres.join(', ')} • ${g.releaseYear}`,
  }));

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedGame = VIDEO_GAMES.find((g) => g.id === option.id);
    if (!guessedGame) return;

    const matches = compareVideoGame(guessedGame, targetGame);
    const isCorrect = guessedGame.id === targetGame.id;

    const record: GuessRecord<VideoGameItem> = {
      item: guessedGame,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('videogiochi', 'game-specs', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetGame);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20 mb-2">
          <Gamepad2 className="h-3.5 w-3.5" />
          Indovina il Videogioco • Sviluppatore & Dettagli
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina il Videogioco
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Sviluppatore, Genere, Anno Uscita, Prospettiva e Piattaforma principale.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 text-center">
        {unlockedQuote ? (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-200">
            <Lightbulb className="h-4 w-4 text-indigo-400 shrink-0" />
            <span><strong>Citazione / Trama:</strong> "{targetGame.iconicQuote}"</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            <span>Indizio Citazione / Trama si sblocca dopo 3 tentativi</span>
          </div>
        )}
      </div>

      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un videogioco (es. Elden Ring, GTA V, Skyrim, Zelda)..."
          />
        </div>
      )}

      {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            Tentativi Effettuati ({guesses.length})
          </h3>

          <div className="space-y-3">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl"
              >
                <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="font-extrabold text-white text-base">
                    {guess.item.title}
                  </div>
                  {guess.isCorrect && (
                    <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                      CORRETTO!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {guess.matches.map((match, mIdx) => (
                    <div
                      key={mIdx}
                      className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition ${
                        match.status === 'exact'
                          ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/50'
                          : match.status === 'partial'
                          ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50'
                          : 'bg-rose-950/40 text-rose-300 border border-rose-900/40'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                        {match.label}
                      </span>
                      <div className="mt-1 flex items-center gap-1 text-xs font-black">
                        <span>{match.value}</span>
                        {match.arrow === 'up' && (
                          <ArrowUp className="h-3.5 w-3.5 text-emerald-300 stroke-[3]" />
                        )}
                        {match.arrow === 'down' && (
                          <ArrowDown className="h-3.5 w-3.5 text-rose-300 stroke-[3]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
