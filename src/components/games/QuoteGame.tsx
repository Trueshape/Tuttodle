import React, { useEffect, useMemo, useState } from 'react';
import { MovieItem, GameMode, LolLanguage } from '../../types';
import { MOVIES } from '../../data/movies';
import { getDailyIndex } from '../../utils/dailySeed';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';

const MAX_ATTEMPTS = 5;

type Status = 'playing' | 'won' | 'lost';

const QUOTABLE = MOVIES.filter((m) => m.taglineOrQuote && m.taglineOrQuote.trim().length > 0);

const pickRandomMovie = (exclude?: string): MovieItem => {
  const pool = QUOTABLE.filter((m) => m.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

const maskQuote = (quote: string, revealRatio: number): string => {
  const words = quote.split(/\s+/);
  const revealCount = Math.ceil(words.length * revealRatio);
  return words.map((w, i) => (i < revealCount ? w : '…')).join(' ');
};

interface QuoteGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: never[], targetMovie: MovieItem) => void;
  lang?: LolLanguage;
}

export const QuoteGame: React.FC<QuoteGameProps> = ({ mode, onVictory, lang = 'it' }) => {
  const [init] = useState(() => {
    const session = getGameSession<string, MovieItem>('film', 'citazioni', mode);
    if (session?.targetItem) {
      return {
        target: session.targetItem,
        wrong: session.guesses ?? [],
        status: (session.isWon ? 'won' : session.isGameOver ? 'lost' : 'playing') as Status,
      };
    }
    if (mode === 'daily') {
      const t = QUOTABLE[getDailyIndex('film', 'citazioni', QUOTABLE.length)];
      return { target: t, wrong: [] as string[], status: 'playing' as Status };
    }
    const t = pickRandomMovie();
    return { target: t, wrong: [] as string[], status: 'playing' as Status };
  });

  const [targetMovie, setTargetMovie] = useState<MovieItem>(init.target);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>(init.wrong);
  const [status, setStatus] = useState<Status>(init.status);

  useEffect(() => {
    saveGameSession('film', 'citazioni', mode, {
      isWon: status === 'won',
      isGameOver: status !== 'playing',
      guesses: wrongGuesses,
      targetItem: targetMovie,
      targetId: targetMovie.id,
    });
  }, [mode, targetMovie, wrongGuesses, status]);

  const searchOptions: SearchOption[] = useMemo(
    () =>
      MOVIES.map((m) => ({
        id: m.id,
        name: m.title,
        subtitle: `${m.flag} ${m.director} • ${m.releaseYear}`,
        flag: m.flag,
      })).sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })),
    []
  );

  const handleGuess = (option: SearchOption) => {
    if (status !== 'playing') return;
    if (option.id === targetMovie.id) {
      setStatus('won');
      onVictory(wrongGuesses.length + 1, [], targetMovie);
      return;
    }
    const next = [...wrongGuesses, option.id];
    setWrongGuesses(next);
    if (next.length >= MAX_ATTEMPTS) setStatus('lost');
  };

  const newGame = () => {
    setTargetMovie(pickRandomMovie(targetMovie.id));
    setWrongGuesses([]);
    setStatus('playing');
  };

  const revealRatio = status === 'playing' ? wrongGuesses.length / MAX_ATTEMPTS : 1;
  const shownQuote = maskQuote(targetMovie.taglineOrQuote, Math.max(0.2, revealRatio));

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-xl font-black mb-1">
        {lang === 'en' ? 'Guess the movie from the quote' : 'Indovina il film dalla citazione'}
      </h2>
      <p className="text-xs text-zinc-400 mb-4">
        {lang === 'en'
          ? `Each wrong guess reveals more of the quote. ${MAX_ATTEMPTS} attempts.`
          : `Ogni errore svela altre parole della citazione. ${MAX_ATTEMPTS} tentativi.`}
      </p>

      <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 min-h-[140px] flex items-center justify-center">
        <p className="text-base italic leading-relaxed text-zinc-100">“{shownQuote}”</p>
      </div>

      <p className="text-xs text-zinc-500 mb-3">
        {lang === 'en' ? 'Attempts' : 'Tentativi'}: {wrongGuesses.length} / {MAX_ATTEMPTS}
      </p>

      {status === 'playing' && (
        <SearchBar
          options={searchOptions}
          alreadyGuessedIds={wrongGuesses}
          onSelectOption={handleGuess}
          placeholder={lang === 'en' ? 'Search a movie...' : 'Cerca un film...'}
        />
      )}

      {status === 'lost' && (
        <p className="mt-4 text-sm font-bold text-rose-300">
          {lang === 'en' ? 'It was' : 'Era'} {targetMovie.title}
        </p>
      )}
      {status === 'won' && (
        <p className="mt-4 text-sm font-bold text-emerald-300">
          {lang === 'en' ? 'Correct!' : 'Esatto!'} {targetMovie.title}
        </p>
      )}
      {mode === 'daily' && status !== 'playing' && (
        <p className="mt-2 text-xs text-zinc-500">
          {lang === 'en' ? 'Daily completed. Come back tomorrow.' : 'Daily completata. Torna domani.'}
        </p>
      )}

      {mode === 'infinite' && status !== 'playing' && (
        <button
          type="button"
          onClick={newGame}
          className="mt-4 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition cursor-pointer active:scale-95"
        >
          {lang === 'en' ? 'New Game' : 'Nuova Partita'}
        </button>
      )}
    </div>
  );
};
