import React, { useState, useEffect, useMemo } from 'react';
import { AnimeItem, GuessRecord, GameMode, AttributeMatch, LolLanguage } from '../../types';
import { ANIME_LIST } from '../../data/anime';
import { compareAnime } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { getGameSession, saveGameSession } from '../../utils/dailySession';
import { DailyCompletedBanner } from '../DailyCompletedBanner';
import { SearchBar, SearchOption } from '../SearchBar';
import { getProxiedImageUrl } from '../../utils/boxArtGenerator';
import { ArrowUp, ArrowDown, Tv, Lightbulb, Lock, RotateCcw } from 'lucide-react';

interface AnimeGameProps {
  mode: GameMode;
  onModeChange?: (mode: GameMode) => void;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetAnime: AnimeItem) => void;
  onOpenHelp: () => void;
  lang?: LolLanguage;
}

export const AnimeGame: React.FC<AnimeGameProps> = ({
  mode,
  onModeChange,
  onVictory,
  onOpenHelp,
  lang = 'it',
}) => {
  const [targetAnime, setTargetAnime] = useState<AnimeItem>(ANIME_LIST[0]);
  const [guesses, setGuesses] = useState<GuessRecord<AnimeItem>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedCharacter, setUnlockedCharacter] = useState(false);

  const initGame = (forceNew: boolean = false) => {
    if (!forceNew) {
      const session = getGameSession<GuessRecord<AnimeItem>, AnimeItem>('anime', 'anime-stats', mode);
      if (session) {
        let restored = session.targetItem;
        if (!restored && session.targetId) {
          restored = ANIME_LIST.find((a) => a.id === session.targetId);
        }
        if (restored) {
          setTargetAnime(restored);
          const savedGuesses = session.guesses || [];
          setGuesses(savedGuesses);
          setIsGameOver(Boolean(session.isGameOver));
          setUnlockedCharacter(savedGuesses.length >= 3);
          return;
        }
      }
    }

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

    saveGameSession('anime', 'anime-stats', mode, {
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
    if (guesses.length >= 3) setUnlockedCharacter(true);
  }, [guesses.length]);

  const searchOptions: SearchOption[] = useMemo(() => {
    return ANIME_LIST.map((a) => ({
      id: a.id,
      name: a.title,
      subtitle: `${a.studio} • ${a.genres.join(', ')} • ${a.releaseYear}`,
      iconUrl: getProxiedImageUrl(a.coverUrl),
    })).sort((a, b) =>
      a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true })
    );
  }, []);

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

    saveGameSession('anime', 'anime-stats', mode, {
      isWon: isCorrect,
      isGameOver: isCorrect,
      guesses: newGuesses,
      targetItem: targetAnime,
      targetId: targetAnime.id,
    });

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
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina l'Anime
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Confronta Studio di Animazione, Genere, Anno, Conteggio Episodi e Fonte di provenienza.
        </p>
      </div>

      {/* Banner Risultato Daily Già Completata */}
      {mode === 'daily' && isGameOver && (
        <DailyCompletedBanner
          attemptsCount={guesses.length}
          targetName={targetAnime.title}
          targetSubtitle={`${targetAnime.studio} • ${targetAnime.releaseYear}`}
          targetImageUrl={getProxiedImageUrl(targetAnime.coverUrl)}
          onPlayInfinite={onModeChange ? () => onModeChange('infinite') : undefined}
          lang={lang}
        />
      )}

      {!isGameOver && (
        <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 text-center">
          {unlockedCharacter ? (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-purple-200">
              <Lightbulb className="h-4 w-4 text-purple-400 shrink-0" />
              <span><strong>{lang === 'en' ? 'Main Character / Hint:' : 'Protagonista Principale:'}</strong> {targetAnime.mainCharacter}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Main character hint unlocks after 3 attempts' : 'Indizio Protagonista si sblocca dopo 3 tentativi'}</span>
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
            placeholder="Cerca un anime (es. L'Attacco dei Giganti, One Piece, Demon Slayer)..."
          />
        </div>
      )}

      {/* Pulsante Nuova Partita in Modalità Infinita */}
      {isGameOver && mode === 'infinite' && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => initGame(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95"
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
                {/* Cover dell'anime a fianco della scheda */}
                <div className="w-full md:w-48 lg:w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl relative flex items-center justify-center min-h-[140px] md:min-h-0 self-stretch">
                  {guess.item.coverUrl ? (
                    <img
                      src={getProxiedImageUrl(guess.item.coverUrl)}
                      alt={guess.item.title}
                      className="w-full h-full max-h-48 md:max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        const fallback = parent?.querySelector('.anime-fallback');
                        if (fallback) {
                          fallback.classList.remove('hidden');
                          fallback.classList.add('flex');
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`anime-fallback ${
                      guess.item.coverUrl ? 'hidden' : 'flex'
                    } flex-col items-center justify-center p-4 text-center text-slate-500`}
                  >
                    <Tv className="h-9 w-9 text-slate-600 mb-1.5" />
                    <span className="text-xs font-bold text-slate-400 line-clamp-1">
                      {guess.item.title}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5">
                    <div className="text-[11px] font-bold text-white drop-shadow truncate">
                      {guess.item.title}
                    </div>
                  </div>
                </div>

                {/* Scheda delle specifiche dell'anime */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
