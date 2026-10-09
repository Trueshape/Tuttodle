import React, { useState, useEffect, useMemo } from 'react';
import { MovieItem, GuessRecord, GameMode, AttributeMatch, LolLanguage } from '../../types';
import { MOVIES } from '../../data/movies';
import { compareMovie } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import { SearchBar, SearchOption } from '../SearchBar';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { ArrowUp, ArrowDown, Clapperboard, Lightbulb, Lock, RotateCcw } from 'lucide-react';

interface MovieGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetMovie: MovieItem) => void;
  onOpenHelp: () => void;
  lang?: LolLanguage;
}

export const MovieGame: React.FC<MovieGameProps> = ({
  mode,
  onModeChange,
  onVictory,
  onOpenHelp,
  lang = 'it',
}) => {
  const [targetMovie, setTargetMovie] = useState<MovieItem>(MOVIES[0]);
  const [guesses, setGuesses] = useState<GuessRecord<MovieItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedQuote, setUnlockedQuote] = useState(false);

  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<MovieItem>, MovieItem>('film', 'film-stats', mode);
      if (session) {
        let restored = session.targetItem;
        if (!restored && session.targetId) {
          restored = MOVIES.find((m) => m.id === session.targetId);
        }
        if (restored) {
          setTargetMovie(restored);
          const savedGuesses = session.guesses || [];
          setGuesses(savedGuesses);
          setIsGameOver(Boolean(session.isGameOver));
          setUnlockedQuote(savedGuesses.length >= 3);
          return;
        }
      }
    }

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

    saveGameSession('film', 'film-stats', mode, {
      isWon: false,
      isGameOver: false,
      guesses: [],
      targetItem: chosen,
      targetId: chosen.id,
    });
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  useEffect(() => {
    if (guesses.length >= 3) setUnlockedQuote(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = useMemo(() => {
    return MOVIES.map((m) => ({
      id: m.id,
      name: m.title,
      subtitle: `${m.director} • ${m.genres.join(', ')} • ${m.releaseYear}`,
      flag: m.flag,
      iconUrl: getProxiedImageUrl(m.posterUrl),
    })).sort((a, b) =>
      a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })
    );
  }, []);

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

    saveGameSession('film', 'film-stats', mode, {
      isWon: isCorrect,
      isGameOver: isCorrect,
      guesses: newGuesses,
      targetItem: targetMovie,
      targetId: targetMovie.id,
    });

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
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina la Pellicola
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Regista, Genere, Anno di uscita, Paese e Fascia d'incasso.
        </p>
      </div>

      {/* Banner Risultato Daily Già Completata */}
      {mode === 'daily' && isGameOver && (
        <DailyCompletedBanner
          attemptsCount={guesses.length}
          targetName={targetMovie.title}
          targetSubtitle={`${targetMovie.director} • ${targetMovie.releaseYear}`}
          targetImageUrl={getProxiedImageUrl(targetMovie.posterUrl)}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {!isGameOver && (
        <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4 text-center">
          {unlockedQuote ? (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-rose-200">
              <Lightbulb className="h-4 w-4 text-rose-400 shrink-0" />
              <span><strong>{lang === 'en' ? 'Quote / Hint:' : 'Citazione / Indizio:'}</strong> "{targetMovie.taglineOrQuote}"</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Quote hint unlocks after 3 attempts' : 'Indizio Citazione si sblocca dopo 3 tentativi'}</span>
            </div>
          )}
        </div>
      )}

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

      {/* Pulsante Nuova Partita in Modalità Infinita */}
      {isGameOver && mode === 'infinite' && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => initGame(true)}
            className="flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition shadow-lg shadow-rose-600/30 cursor-pointer active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{lang === 'en' ? 'New Game' : 'Nuova Partita'}</span>
          </button>
        </div>
      )}

      {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            Tentativi Effettuati ({guesses.length})
          </h3>

          <div className="space-y-4">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-stretch gap-3 group"
              >
                {/* Locandina del film a fianco della scheda */}
                <div className="w-full md:w-48 lg:w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl relative flex items-center justify-center min-h-[140px] md:min-h-0 self-stretch">
                  {guess.item.posterUrl ? (
                    <img
                      src={getProxiedImageUrl(guess.item.posterUrl)}
                      alt={guess.item.title}
                      className="w-full h-full max-h-48 md:max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        const fallback = parent?.querySelector('.movie-fallback');
                        if (fallback) {
                          fallback.classList.remove('hidden');
                          fallback.classList.add('flex');
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`movie-fallback ${
                      guess.item.posterUrl ? 'hidden' : 'flex'
                    } flex-col items-center justify-center p-4 text-center text-slate-500`}
                  >
                    <Clapperboard className="h-9 w-9 text-slate-600 mb-1.5" />
                    <span className="text-xs font-bold text-slate-400 line-clamp-1">
                      {guess.item.title}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white drop-shadow">
                      <span className="truncate">{guess.item.title}</span>
                      <span className="text-xs shrink-0 ml-1.5">{guess.item.flag}</span>
                    </div>
                  </div>
                </div>

                {/* Scheda delle specifiche del film */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
