import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Share2, CheckCircle2, RotateCcw, Calendar, Copy, Check } from 'lucide-react';
import { getTimeUntilNextDaily } from '../utils/dailySeed';
import { AttributeMatch, GameMode } from '../types';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  targetName: string;
  targetSubtitle?: string;
  targetImageUrl?: string;
  attemptsCount: number;
  guessesMatches: AttributeMatch[][];
  mode: GameMode;
  onPlayNextInfinite?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  gameTitle,
  targetName,
  targetSubtitle,
  targetImageUrl,
  attemptsCount,
  guessesMatches,
  mode,
  onPlayNextInfinite,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextDaily());

  useEffect(() => {
    if (isOpen) {
      // Fire confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  // Countdown timer for next daily
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Generate emoji grid for sharing
  const generateShareString = () => {
    let emojiText = `OmniDle - ${gameTitle} (${mode === 'daily' ? 'Giornaliera' : 'Infinita'})\nTentativi: ${attemptsCount}\n\n`;
    guessesMatches.forEach((row) => {
      row.forEach((match) => {
        if (match.status === 'exact') emojiText += '🟩';
        else if (match.status === 'partial') emojiText += '🟨';
        else emojiText += '🟥';
      });
      emojiText += '\n';
    });
    emojiText += '\nGioca ora su OmniDle!';
    return emojiText;
  };

  const handleShare = () => {
    const shareText = generateShareString();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/40 bg-slate-900 p-6 shadow-2xl text-slate-100 text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* Victory Icon Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h2 className="mt-4 text-2xl font-black text-white">COMPLIMENTI!</h2>
        <p className="text-sm font-medium text-emerald-400">
          Hai indovinato in <strong className="text-white text-base">{attemptsCount}</strong> {attemptsCount === 1 ? 'tentativo' : 'tentativi'}!
        </p>

        {/* Answer Reveal Card */}
        <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 text-center">
          {targetImageUrl && (
            <img
              src={targetImageUrl}
              alt={targetName}
              className="mx-auto mb-3 h-20 w-20 rounded-xl object-cover border border-slate-600 shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          )}
          <div className="text-xl font-black text-slate-100">{targetName}</div>
          {targetSubtitle && (
            <div className="text-xs text-slate-400 mt-1">{targetSubtitle}</div>
          )}
        </div>

        {/* Emoji Matrix Preview */}
        <div className="mt-4 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Matrice Risultato
          </div>
          <div className="flex flex-col items-center gap-1 font-mono text-sm">
            {guessesMatches.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1">
                {row.map((m, cIdx) => (
                  <span key={cIdx}>
                    {m.status === 'exact' ? '🟩' : m.status === 'partial' ? '🟨' : '🟥'}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleShare}
            id="btn-share-results"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Copiato negli Appunti!
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5" />
                Condividi Risultato
              </>
            )}
          </button>

          {mode === 'infinite' ? (
            <button
              onClick={onPlayNextInfinite}
              id="btn-next-infinite"
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg hover:bg-indigo-500 transition"
            >
              <RotateCcw className="h-5 w-5" />
              Prossima Sfida Infinita
            </button>
          ) : (
            <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3 text-xs text-slate-400">
              <div className="flex items-center justify-center gap-1 text-slate-300 font-medium">
                <Calendar className="h-4 w-4 text-indigo-400" />
                Prossima sfida giornaliera tra:
              </div>
              <div className="mt-1 font-mono text-lg font-extrabold text-indigo-300">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            id="btn-close-victory"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 mt-1 transition"
          >
            Vedi Riepilogo
          </button>
        </div>
      </div>
    </div>
  );
};
