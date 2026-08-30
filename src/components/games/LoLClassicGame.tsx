import React, { useState, useEffect } from 'react';
import { LolChampion, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { LOL_CHAMPIONS } from '../../data/lolChampions';
import { compareLolChampion } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, Swords, Shield, Sparkles } from 'lucide-react';

interface LoLClassicGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetChampion: LolChampion) => void;
  onOpenHelp: () => void;
}

export const LoLClassicGame: React.FC<LoLClassicGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetChampion, setTargetChampion] = useState<LolChampion>(LOL_CHAMPIONS[0]);
  const [guesses, setGuesses] = useState<GuessRecord<LolChampion>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const initGame = () => {
    let chosen: LolChampion;
    if (mode === 'daily') {
      const idx = getDailyIndex('league-of-legends', 'classico', LOL_CHAMPIONS.length);
      chosen = LOL_CHAMPIONS[idx];
    } else {
      const randIdx = Math.floor(Math.random() * LOL_CHAMPIONS.length);
      chosen = LOL_CHAMPIONS[randIdx];
    }
    setTargetChampion(chosen);
    setGuesses([]);
    setIsGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  const searchOptions: SearchOption[] = LOL_CHAMPIONS.map((c) => ({
    id: c.id,
    name: c.name,
    subtitle: `${c.title} • ${c.positions.join('/')} • ${c.regions.join(', ')}`,
    iconUrl: c.icon,
  }));

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedChamp = LOL_CHAMPIONS.find((c) => c.id === option.id);
    if (!guessedChamp) return;

    const matches = compareLolChampion(guessedChamp, targetChampion);
    const isCorrect = guessedChamp.id === targetChampion.id;

    const record: GuessRecord<LolChampion> = {
      item: guessedChamp,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('league-of-legends', 'classico', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetChampion);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Game Title */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 border border-sky-500/20 mb-2">
          <Swords className="h-3.5 w-3.5" />
          LoLdle Classico • League of Legends
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Indovina il Campione di LoL
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Usa le proprietà di gioco (Genere, Posizione, Specie, Risorsa, Attacco, Regione, Anno) per indovinare il campione.
        </p>
      </div>

      {/* Search Bar */}
      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un campione di LoL (es. Ahri, Yasuo, Jinx, Zed)..."
          />
        </div>
      )}

      {/* Guesses Table */}
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
                  <div className="flex items-center gap-3">
                    <img
                      src={guess.item.icon}
                      alt={guess.item.name}
                      className="h-10 w-10 rounded-xl object-cover bg-slate-800 border border-slate-700"
                    />
                    <div>
                      <span className="font-extrabold text-white text-base">
                        {guess.item.name}
                      </span>
                      <span className="ml-2 text-xs text-slate-400 font-medium">
                        {guess.item.title}
                      </span>
                    </div>
                  </div>
                  {guess.isCorrect && (
                    <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                      CORRETTO!
                    </span>
                  )}
                </div>

                {/* Attribute tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
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
