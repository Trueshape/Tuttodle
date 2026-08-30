import React from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';
import { CategoryId } from '../types';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: CategoryId | null;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose, categoryId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          id="btn-close-help"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-black text-slate-100">Come Giocare</h2>
        <p className="mt-1 text-sm text-slate-400">
          Trova l'elemento misterioso tentando diversi nomi e analizzando i feedback dei riquadri colorati.
        </p>

        {/* Tiles Explanation */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-slate-950">
              🟩
            </div>
            <div>
              <div className="font-bold text-emerald-400">Verde - Corretto</div>
              <div className="text-xs text-slate-300">L'attributo corrisponde esattamente a quello dell'elemento da indovinare.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-slate-950">
              🟨
            </div>
            <div>
              <div className="font-bold text-amber-400">Giallo - Parziale / Vicino</div>
              <div className="text-xs text-slate-300">Corrispondenza parziale o valore numerico molto vicino.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 font-bold text-slate-950">
              🟥
            </div>
            <div>
              <div className="font-bold text-rose-400">Rosso - Errato</div>
              <div className="text-xs text-slate-300">L'attributo non corrisponde all'elemento da indovinare.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-800 border border-slate-700 p-3">
            <div className="flex items-center gap-1 font-bold text-indigo-400 bg-slate-900 px-2 py-1 rounded-md">
              <ArrowUp className="h-4 w-4" /> / <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-indigo-300">Freccia In Alto / In Basso</div>
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-indigo-400">⬆️</span> Indica che il valore dell'elemento misterioso è <strong>PIÙ ALTO</strong>.<br />
                <span className="font-semibold text-indigo-400">⬇️</span> Indica che il valore è <strong>PIÙ BASSO</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Category specific hint info */}
        {categoryId === 'calcio' && (
          <div className="mt-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 p-3 text-xs text-emerald-200">
            <strong>Suggerimento Calcio:</strong> Esamina la cronologia dei trasferimenti con anni e bandiere delle squadre! Dopo 3 o 5 tentativi sbloccherai indizi su maglia e presenze in nazionale.
          </div>
        )}

        <button
          onClick={onClose}
          id="btn-understand-help"
          className="mt-6 w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-lg hover:bg-indigo-500 transition"
        >
          Ho Capito!
        </button>
      </div>
    </div>
  );
};
