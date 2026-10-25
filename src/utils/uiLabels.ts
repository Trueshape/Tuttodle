import { LolLanguage } from '../types';

const LABELS = {
  newGame: { it: 'Nuova partita', en: 'New game' },
  giveUp: { it: 'Arrenditi', en: 'Give up' },
  attempts: { it: 'Tentativi', en: 'Attempts' },
  streak: { it: 'Serie', en: 'Streak' },
  record: { it: 'Record', en: 'Record' },
  hint: { it: 'Aiuto', en: 'Hint' },
  comeBackTomorrow: { it: 'Torna domani', en: 'Come back tomorrow' },
  nextDailyIn: { it: 'Prossima daily tra', en: 'Next daily in' },
} as const;

export type UiLabelKey = keyof typeof LABELS;

export const uiLabel = (key: UiLabelKey, lang: LolLanguage | string = 'it'): string =>
  LABELS[key][lang === 'en' ? 'en' : 'it'];
