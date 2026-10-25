import React, { useEffect, useMemo, useState } from 'react';
import { MovieItem, GameMode, LolLanguage } from '../../types';
import { MOVIES } from '../../data/movies';
import { getDailyIndex } from '../../utils/dailySeed';
import { scoreForWin } from '../../utils/scoring';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { SearchBar, SearchOption } from '../SearchBar';
import { AttemptsRow } from '../AttemptsRow';
import { ResultCard } from '../ResultCard';

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
      const attemptsUsed = wrongGuesses.length + 1;
      setStatus('won');
      if (mode === 'daily') saveGameResult('film', 'citazioni', true, attemptsUsed, scoreForWin(attemptsUsed, MAX_ATTEMPTS));
      onVictory(attemptsUsed, [], targetMovie);
      return;
    }
    const next = [...wrongGuesses, option.id];
    setWrongGuesses(next);
    if (next.length >= MAX_ATTEMPTS) {
      setStatus('lost');
      if (mode === 'daily') saveGameResult('film', 'citazioni', false, next.length, 0);
    }
  };

  const newGame = () => {
    setTargetMovie(pickRandomMovie(targetMovie.id));
    setWrongGuesses([]);
    setStatus('playing');
  };

  const revealRatio = status === 'playing' ? wrongGuesses.length / MAX_ATTEMPTS : 1;
  const shownQuote = maskQuote(targetMovie.taglineOrQuote, Math.max(0.2, revealRatio));

  return (
    <div className="mx-auto max-w-xl px-4 pt-4 pb-6 text-center">
      <h1 className="text-2xl font-black text-white sm:text-3xl">
        {lang === 'en' ? 'Guess the movie from the quote' : 'Indovina il film dalla citazione'}
      </h1>
      <p className="mt-1 mb-5 text-xs text-slate-400">
        {lang === 'en'
          ? `Each wrong guess reveals more of the quote. ${MAX_ATTEMPTS} attempts.`
          : `Ogni errore svela altre parole della citazione. ${MAX_ATTEMPTS} tentativi.`}
      </p>

      <AttemptsRow
        mode={mode}
        attempts={wrongGuesses.length}
        maxAttempts={MAX_ATTEMPTS}
        won={status === 'won'}
        isOver={status !== 'playing'}
        onGiveUp={() => setStatus('lost')}
        onNewGame={newGame}
        lang={lang}
      />

      <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 min-h-[140px] flex items-center justify-center">
        <p className="text-base italic leading-relaxed text-zinc-100">“{shownQuote}”</p>
      </div>

      <div className={status === 'playing' ? '' : 'invisible'}>
        <SearchBar
          options={searchOptions}
          alreadyGuessedIds={wrongGuesses}
          onSelectOption={handleGuess}
          placeholder={lang === 'en' ? 'Search a movie...' : 'Cerca un film...'}
          disabled={status !== 'playing'}
          focusSignal={`${targetMovie.id}-${wrongGuesses.length}`}
        />
      </div>

      {status !== 'playing' && (
        <ResultCard won={status === 'won'} name={targetMovie.title} details={`${targetMovie.flag} ${targetMovie.director} • ${targetMovie.releaseYear}`} score={status === 'won' ? scoreForWin(wrongGuesses.length + 1, MAX_ATTEMPTS) : 0} lang={lang} />
      )}
    </div>
  );
};
