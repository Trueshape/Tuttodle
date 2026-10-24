import React, { useMemo, useState } from 'react';
import { MovieItem, LolLanguage } from '../../types';
import { MOVIES } from '../../data/movies';
import { SearchBar, SearchOption } from '../SearchBar';

const MAX_ATTEMPTS = 5;

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
  onVictory: (attemptsCount: number, guessesMatches: never[], targetMovie: MovieItem) => void;
  lang?: LolLanguage;
}

export const QuoteGame: React.FC<QuoteGameProps> = ({ onVictory, lang = 'it' }) => {
  const [targetMovie, setTargetMovie] = useState<MovieItem>(() => pickRandomMovie());
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

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

      {status !== 'playing' && (
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
