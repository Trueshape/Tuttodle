import React from 'react';
import { LolLanguage } from '../types';

interface ResultCardProps {
  won: boolean;
  name: string;
  details?: string;
  score?: number;
  lang?: LolLanguage;
}

export const ResultCard: React.FC<ResultCardProps> = ({ won, name, details, score, lang = 'it' }) => (
  <div
    className={`mx-auto mt-4 max-w-md rounded-2xl border p-4 text-center ${
      won ? 'border-emerald-500/40 bg-emerald-950/30' : 'border-rose-500/40 bg-rose-950/30'
    }`}
  >
    <div className={`text-xs font-black uppercase tracking-widest ${won ? 'text-emerald-300' : 'text-rose-300'}`}>
      {won ? (lang === 'en' ? 'Correct!' : 'Esatto!') : lang === 'en' ? 'It was' : 'Era'}
    </div>
    <div className="mt-1 text-lg font-black text-white">{name}</div>
    {details && <div className="mt-0.5 text-xs text-zinc-400">{details}</div>}
    {score !== undefined && (
      <div className={`mt-2 text-sm font-black ${won ? 'text-emerald-300' : 'text-rose-300'}`}>
        {score} {lang === 'en' ? 'points' : 'punti'}
      </div>
    )}
  </div>
);
