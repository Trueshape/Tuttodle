import React, { useState, useEffect } from 'react';
import { FootballPlayer, GuessRecord, GameMode, AttributeMatch } from '../../types';
import { FOOTBALL_PLAYERS } from '../../data/footballPlayers';
import { compareFootballPlayer } from '../../utils/comparator';
import { getDailyIndex } from '../../utils/dailySeed';
import { saveGameResult } from '../../utils/stats';
import { SearchBar, SearchOption } from '../SearchBar';
import { ArrowUp, ArrowDown, HelpCircle, Lightbulb, Trophy, Award, Lock, ShieldCheck } from 'lucide-react';

interface FootballTransferGameProps {
  mode: GameMode;
  onVictory: (attemptsCount: number, guessesMatches: AttributeMatch[][], targetPlayer: FootballPlayer) => void;
  onOpenHelp: () => void;
}

export const FootballTransferGame: React.FC<FootballTransferGameProps> = ({
  mode,
  onVictory,
  onOpenHelp,
}) => {
  const [targetPlayer, setTargetPlayer] = useState<FootballPlayer>(FOOTBALL_PLAYERS[0]);
  const [guesses, setGuesses] = useState<GuessRecord<FootballPlayer>[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedHints, setUnlockedHints] = useState<{ hint1: boolean; hint2: boolean }>({
    hint1: false,
    hint2: false,
  });

  // Pick target player based on mode
  const initGame = () => {
    let chosen: FootballPlayer;
    if (mode === 'daily') {
      const idx = getDailyIndex('calcio', 'carriera', FOOTBALL_PLAYERS.length);
      chosen = FOOTBALL_PLAYERS[idx];
    } else {
      const randIdx = Math.floor(Math.random() * FOOTBALL_PLAYERS.length);
      chosen = FOOTBALL_PLAYERS[randIdx];
    }
    setTargetPlayer(chosen);
    setGuesses([]);
    setIsGameOver(false);
    setUnlockedHints({ hint1: false, hint2: false });
  };

  useEffect(() => {
    initGame();
  }, [mode]);

  // Unlock hints based on attempt count
  useEffect(() => {
    if (guesses.length >= 3) setUnlockedHints((h) => ({ ...h, hint1: true }));
    if (guesses.length >= 5) setUnlockedHints((h) => ({ ...h, hint2: true }));
  }, [guesses.length]);

  const searchOptions: SearchOption[] = FOOTBALL_PLAYERS.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: `${p.flag} ${p.nationality} • ${p.position} • ${p.currentClub}`,
    flag: p.flag,
  }));

  const handleMakeGuess = (option: SearchOption) => {
    if (isGameOver) return;
    const guessedPlayer = FOOTBALL_PLAYERS.find((p) => p.id === option.id);
    if (!guessedPlayer) return;

    const matches = compareFootballPlayer(guessedPlayer, targetPlayer);
    const isCorrect = guessedPlayer.id === targetPlayer.id;

    const record: GuessRecord<FootballPlayer> = {
      item: guessedPlayer,
      matches,
      isCorrect,
    };

    const newGuesses = [record, ...guesses];
    setGuesses(newGuesses);

    if (isCorrect) {
      setIsGameOver(true);
      saveGameResult('calcio', 'carriera', true, newGuesses.length);
      const matchesHistory = newGuesses.map((g) => g.matches);
      onVictory(newGuesses.length, matchesHistory, targetPlayer);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Game Title & Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
          <Trophy className="h-3.5 w-3.5" />
          Indovina il Calciatore • Carriera & Trasferimenti
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Chi è questo calciatore?
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Analizza la lista dei trasferimenti in ordine cronologico e seleziona il nome corretto.
        </p>
      </div>

      {/* Transfer History Timeline Card */}
      <div className="mb-8 rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-bold text-slate-200">Cronologia Carriera</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {targetPlayer.transfers.length} Tappe Registrate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {targetPlayer.transfers.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-2xl bg-slate-800/80 p-3.5 border border-slate-700/60 shadow-md hover:border-emerald-500/40 transition"
            >
              <span className="text-2xl">{t.countryFlag}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate font-bold text-slate-100 text-sm">
                    {t.club}
                  </span>
                  {t.isLoan && (
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                      Prestito
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono font-medium text-emerald-400 mt-0.5">
                  {t.years}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unlocked Hints Section */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">Indizi Sbloccabili:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {unlockedHints.hint1 ? (
              <span className="rounded-xl bg-amber-500/20 px-3 py-1.5 font-semibold text-amber-300 border border-amber-500/30">
                Numero Maglia: #{targetPlayer.hints.shirtNumber}
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-1.5 text-slate-500 border border-slate-800">
                <Lock className="h-3 w-3" /> Indizio 1 (dopo 3 tentativi)
              </span>
            )}

            {unlockedHints.hint2 ? (
              <span className="rounded-xl bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-300 border border-emerald-500/30">
                {targetPlayer.hints.nationalTeamApps}
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-1.5 text-slate-500 border border-slate-800">
                <Lock className="h-3 w-3" /> Indizio 2 (dopo 5 tentativi)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      {!isGameOver && (
        <div className="mb-8">
          <SearchBar
            options={searchOptions}
            alreadyGuessedIds={guesses.map((g) => g.item.id)}
            onSelectOption={handleMakeGuess}
            placeholder="Cerca un calciatore (es. Messi, Ronaldo, Mbappé...)..."
          />
        </div>
      )}

      {/* Guesses Table */}
      {guesses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
            I Tuoi Tentativi ({guesses.length})
          </h3>

          <div className="space-y-3">
            {guesses.map((guess, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl transition"
              >
                {/* Player Name Header */}
                <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{guess.item.flag}</span>
                    <span className="font-extrabold text-white text-base">
                      {guess.item.name}
                    </span>
                    <span className="text-xs text-slate-400">({guess.item.currentClub})</span>
                  </div>
                  {guess.isCorrect && (
                    <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                      CORRETTO!
                    </span>
                  )}
                </div>

                {/* Attribute tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
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
