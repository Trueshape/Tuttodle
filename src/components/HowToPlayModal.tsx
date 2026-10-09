import React from 'react';
import { X, ArrowUp, ArrowDown, Database, Gamepad2 } from 'lucide-react';
import { CategoryId, LolLanguage } from '../types';
import { CONSOLE_DATABASE_STATS, BRAND_SUMMARY_STATS } from '../data/consoles';
import { ConsoleBadge } from './games/PlatformIcons';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: CategoryId | null;
  lang?: LolLanguage;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  categoryId,
  lang = 'it',
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-5 sm:p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          id="btn-close-help"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-black text-slate-100">
          {isEn ? 'How to Play' : 'Come Giocare'}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {isEn
            ? 'Find the mystery target by trying names and analyzing feedback clues from colored tiles.'
            : "Trova l'elemento misterioso tentando diversi nomi e analizzando i feedback dei riquadri colorati."}
        </p>

        {/* Tiles Explanation */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-slate-950">
              🟩
            </div>
            <div>
              <div className="font-bold text-emerald-400">
                {isEn ? 'Green - Correct' : 'Verde - Corretto'}
              </div>
              <div className="text-xs text-slate-300">
                {isEn
                  ? 'Attribute matches the target item exactly.'
                  : "L'attributo corrisponde esattamente a quello dell'elemento da indovinare."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-slate-950">
              🟨
            </div>
            <div>
              <div className="font-bold text-amber-400">
                {isEn ? 'Yellow - Partial / Close' : 'Giallo - Parziale / Vicino'}
              </div>
              <div className="text-xs text-slate-300">
                {isEn
                  ? 'Partial match or closely adjacent numerical value.'
                  : 'Corrispondenza parziale o valore numerico molto vicino.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 font-bold text-slate-950">
              🟥
            </div>
            <div>
              <div className="font-bold text-rose-400">
                {isEn ? 'Red - Incorrect' : 'Rosso - Errato'}
              </div>
              <div className="text-xs text-slate-300">
                {isEn
                  ? 'Attribute does not match the target item.'
                  : "L'attributo non corrisponde all'elemento da indovinare."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-800 border border-slate-700 p-3">
            <div className="flex items-center gap-1 font-bold text-indigo-400 bg-slate-900 px-2 py-1 rounded-md">
              <ArrowUp className="h-4 w-4" /> / <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-indigo-300">
                {isEn ? 'Arrow Up / Down' : 'Freccia In Alto / In Basso'}
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-indigo-400">⬆️</span>{' '}
                {isEn
                  ? 'Target value is'
                  : "Indica che il valore dell'elemento misterioso è"}{' '}
                <strong>{isEn ? 'HIGHER' : 'PIÙ ALTO'}</strong>.<br />
                <span className="font-semibold text-indigo-400">⬇️</span>{' '}
                {isEn ? 'Target value is' : 'Indica che il valore è'}{' '}
                <strong>{isEn ? 'LOWER' : 'PIÙ BASSO'}</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Category specific hint info */}
        {categoryId === 'league-of-legends' && (
          <div className="mt-4 rounded-xl bg-amber-950/40 border border-amber-800/60 p-3 text-xs text-amber-200">
            <strong>{isEn ? 'League of Legends Mode:' : 'Modalità League of Legends:'}</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>
                <strong>{isEn ? 'Champions:' : 'Campioni:'}</strong>{' '}
                {isEn
                  ? 'Guess comparing Gender, Positions, Species, Resource, Range, Region and Year.'
                  : 'Indovina confrontando Genere, Posizione, Specie, Risorsa, Gittata, Regione e Anno.'}
              </li>
              <li>
                <strong>{isEn ? 'Quotes:' : 'Frasi:'}</strong>{' '}
                {isEn
                  ? 'Listen or read the famous quote! Unlock progressive hints and hear audio voice.'
                  : "Ascolta o leggi la celebre battuta del campione misterioso con indizi progressivi e traccia vocale."}
              </li>
              <li>
                <strong>{isEn ? 'Abilities:' : 'Abilità:'}</strong>{' '}
                {isEn
                  ? 'Inverted B&W icon rotates back on errors. Once guessed, pick the key [P] [Q] [W] [E] [R]!'
                  : "L'icona parte capovolta in B&W. Una volta indovinato il campione, seleziona la lettera [P] [Q] [W] [E] [R]!"}
              </li>
              <li>
                <strong>{isEn ? 'Artwork:' : 'Artwork:'}</strong>{' '}
                {isEn
                  ? 'Artwork starts zoomed in at 500% and zooms out on mistakes. Identify champion & skin!'
                  : "L'artwork parte ingrandito al 500% e si allarga ad ogni errore. Individua campione e skin!"}
              </li>
            </ul>
          </div>
        )}

        {categoryId === 'videogiochi' && (
          <div className="mt-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 p-3 text-xs text-indigo-200">
            <strong>{isEn ? 'Videogames:' : 'Modalità Videogiochi:'}</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>
                <strong>{isEn ? 'Cover:' : 'Cover:'}</strong>{' '}
                {isEn
                  ? 'Identify the game from the pixelated cover, uncovering tiles at each mistake (max 5 attempts).'
                  : 'Indovina il gioco dalla cover sfuocata sbloccando tasselli ad ogni errore (max 5 tentativi).'}
              </li>
              <li>
                <strong>{isEn ? 'Specs:' : 'Specs:'}</strong>{' '}
                {isEn
                  ? 'Compare Developer, Genre, Theme, Release Year, Platforms (PC, PlayStation, Nintendo, Xbox), PEGI Rating, and Game Modes. Daily mode grants 20 attempts represented by pixel-art hearts. Endless mode includes hints to solve unsolved specs (when more than 1 spec is missing).'
                  : 'Confronta Sviluppatore, Genere, Tema narrativo, Anno Uscita, Piattaforme con icone, Classificazione PEGI e Modalità di gioco. La modalità Daily offre 20 tentativi rappresentati da cuoricini pixel art. In Endless puoi usare un aiuto per rivelare un campo non ancora indovinato (se ne manca più di uno).'}
              </li>
              <li>
                <strong>{isEn ? 'Same Saga / Franchise Hint:' : 'Indizio Stessa Saga / Franchise:'}</strong>{' '}
                {isEn
                  ? 'If you guess another game from the same series (e.g. Crash Bash for Crash Bandicoot 2), a special Golden Badge confirms you nailed the saga!'
                  : 'Se inserisci un gioco appartenente alla stessa serie (es. Crash Bash quando il titolo è Crash Bandicoot), un badge d\'oro ti segnalerà che hai indovinato la saga!'}
              </li>
            </ul>

            {/* Sezione Database Giochi per Console */}
            <div className="mt-4 pt-3 border-t border-indigo-800/50">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-1.5 font-bold text-indigo-100 text-sm">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>{isEn ? 'Console Database Library' : 'Database Giochi per Console'}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  {BRAND_SUMMARY_STATS.Total} {isEn ? 'games available' : 'giochi disponibili'}
                </span>
              </div>
              <p className="text-[11px] text-indigo-300/80 mb-3">
                {isEn
                  ? 'Official console game count in the quiz database with authentic covers and metadata:'
                  : 'Numero esatto di giochi completi presenti nel database per ciascuna console:'}
              </p>

              <div className="space-y-2.5">
                {/* 1. Sony PlayStation */}
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-blue-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-blue-300 text-xs flex items-center gap-1.5">
                      <span>🔷</span> Sony PlayStation
                    </span>
                    <span className="text-[10px] font-bold text-blue-300 bg-blue-950/80 border border-blue-800/60 px-1.5 py-0.5 rounded">
                      {BRAND_SUMMARY_STATS.Sony} {isEn ? 'games' : 'giochi'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Sony').map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-1 bg-slate-950/70 border border-blue-900/30 px-2 py-1.5 rounded-lg"
                      >
                        <ConsoleBadge consoleKey={item.key} />
                        <span className="text-xs font-black font-mono text-blue-200">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Nintendo */}
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-rose-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                      <span>🍄</span> Nintendo
                    </span>
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-950/80 border border-rose-800/60 px-1.5 py-0.5 rounded">
                      {BRAND_SUMMARY_STATS.Nintendo} {isEn ? 'games' : 'giochi'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Nintendo').map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-1 bg-slate-950/70 border border-rose-900/30 px-2 py-1.5 rounded-lg"
                      >
                        <ConsoleBadge consoleKey={item.key} />
                        <span className="text-xs font-black font-mono text-rose-200">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Microsoft Xbox */}
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-emerald-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
                      <span>🟩</span> Microsoft Xbox
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                      {BRAND_SUMMARY_STATS.Microsoft} {isEn ? 'games' : 'giochi'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {CONSOLE_DATABASE_STATS.filter((s) => s.brand === 'Microsoft').map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-1 bg-slate-950/70 border border-emerald-900/30 px-2 py-1.5 rounded-lg"
                      >
                        <ConsoleBadge consoleKey={item.key} />
                        <span className="text-xs font-black font-mono text-emerald-200">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          id="btn-understand-help"
          className="mt-6 w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-lg hover:bg-indigo-500 transition cursor-pointer"
        >
          {isEn ? 'Got it!' : 'Ho Capito!'}
        </button>
      </div>
    </div>
  );
};
