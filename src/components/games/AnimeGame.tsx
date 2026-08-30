import React, { useState, useEffect } from 'react';
import { AnimeItem, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { ANIME_LIST } from '../../data/anime';
import { compareAnime } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Tv, Lightbulb, Lock } from 'lucide-react';

interface AnimeGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetAnime: AnimeItem) => void;
  onOpenHelp: () => void;
}

export const AnimeGame: React.FC<AnimeGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetAnime, setTargetAnime] = useState<AnimeItem>(ANIME_LIST[0]);
  const [guesses, setGuesses] = useState<GuessRecord<AnimeItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedCharacter, setUnlockedCharacter] = useState(false);

  const initGame = () => {
    let chosen: AnimeItem;
    if (mode === 'daily') {
      const idx = getDailyIndex('anime', 'anime-stats', ANIME_LIST.length);
      chosen = ANIME_LIST[idx];
    } else {
      const randIdx = Math.floor(Math.random() * ANIME_LIST.length);
      chosen = ANIME_LIST[randIdx];
    }
    setTargetAnime(chosen);
    setGuesses([]);
    setIsGameOver(false);
    setUnlockedCharacter(false);
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  useEffect(() => {
    if (guesses.length >= 3) setUnlockedCharacter(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = ANIME_LIST.map((a) => ({
    id: a.id,
    name: a.title,
    subtitle: `${a.studio} • ${a.genres.join(', ')} • ${a.releaseYear}`,
  }));

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedAnime = ANIME_LIST.find((a) => a.id === option.id);
    if (!guessedAnime) return;

    const matches = compareAnime(guessedAnime, targetAnime);
    const isCorrect = guessedAnime.id === targetAnime.id;

    const record: GuessRecord<AnimeItem> = {
      item: guessedAnime,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('anime', 'anime-stats', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetAnime);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/20 mb-2">
          <Tv className="h-3.5 w-3.5" />
          Indovina l'Anime • Studio & Genere
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina l'Anime
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Studio di Animazione, Genere, Anno, Conteggio Episodi e Fonte di provenienza.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 text-center">
        {unlockedCharacter ? (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-purple-200">
            <Lightbulb className="h-4 w-4 text-purple-400 shrink-0" />
            <span><strong>Protagonista Principale:</strong> {targetAnime.mainCharacter}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            <span>Indizio Protagonista si sblocca dopo 3 tentativi</span>
          </div>
        )}
      </div>

      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un anime (es. L'Attacco dei Giganti, One Piece, Demon Slayer)..."
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
