import React, { useState, useEffect } from 'react';
import { MovieItem, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { MOVIES } from '../../data/movies';
import { compareMovie } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Clapperboard, Lightbulb, Lock } from 'lucide-react';

interface MovieGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetMovie: MovieItem) => void;
  onOpenHelp: () => void;
}

export const MovieGame: React.FC<MovieGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetMovie, setTargetMovie] = useState<MovieItem>(MOVIES[0]);
  const [guesses, setGuesses] = useState<GuessRecord<MovieItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedQuote, setUnlockedQuote] = useState(false);

  const initGame = () => {
    let chosen: MovieItem;
    if (mode === 'daily') {
      const idx = getDailyIndex('film', 'film-stats', MOVIES.length);
      chosen = MOVIES[idx];
    } else {
      const randIdx = Math.floor(Math.random() * MOVIES.length);
      chosen = MOVIES[randIdx];
    }
    setTargetMovie(chosen);
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

  const searchOptions: SearchOption[] = MOVIES.map((m) => ({
    id: m.id,
    name: m.title,
    subtitle: `${m.director} • ${m.genres.join(', ')} • ${m.releaseYear}`,
    flag: m.flag,
  }));

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedMovie = MOVIES.find((m) => m.id === option.id);
    if (!guessedMovie) return;

    const matches = compareMovie(guessedMovie, targetMovie);
    const isCorrect = guessedMovie.id === targetMovie.id;

    const record: GuessRecord<MovieItem> = {
      item: guessedMovie,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('film', 'film-stats', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetMovie);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/20 mb-2">
          <Clapperboard className="h-3.5 w-3.5" />
          Indovina il Film • Cinema & Box Office
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina la Pellicola
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Regista, Genere, Anno di uscita, Paese e Fascia d'incasso.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4 text-center">
        {unlockedQuote ? (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-rose-200">
            <Lightbulb className="h-4 w-4 text-rose-400 shrink-0" />
            <span><strong>Citazione / Indizio:</strong> "{targetMovie.taglineOrQuote}"</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            <span>Indizio Citazione si sblocca dopo 3 tentativi</span>
          </div>
        )}
      </div>

      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un film (es. Inception, Il Padrino, Matrix, Titanic)..."
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
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{guess.item.flag}</span>
                    <span className="font-extrabold text-white text-base">
                      {guess.item.title}
                    </span>
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
