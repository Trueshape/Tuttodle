import { CategoryId, GameMode } from '../types';
import { getTodayDateString } from './dailySeed';

export interface DailyGameSession<T = any> {
  date: string;
  categoryId: CategoryId;
  miniGameId: string;
  isWon: boolean;
  isGameOver: boolean;
  guesses: T[];
  targetId?: string;
  targetItem?: any;
  extra?: Record<string, any>;
  updatedAt?: number;
}

export interface GameSession<T = any, Target = any> {
  mode: GameMode;
  date?: string;
  categoryId: string;
  miniGameId: string;
  isWon: boolean;
  isGameOver: boolean;
  targetId?: string;
  targetItem?: Target;
  guesses: T[];
  extra?: Record<string, any>;
  updatedAt: number;
}

export function getGameSession<T = any, Target = any>(
  categoryId: string,
  miniGameId: string,
  mode: GameMode
): GameSession<T, Target> | null {
  try {
    const today = getTodayDateString();
    const key =
      mode === 'daily'
        ? `omnidle_daily_session_${categoryId}_${miniGameId}_${today}`
        : `omnidle_infinite_session_${categoryId}_${miniGameId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const session: GameSession<T, Target> = JSON.parse(raw);
    if (mode === 'daily' && session.date !== today) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveGameSession<T = any, Target = any>(
  categoryId: string,
  miniGameId: string,
  mode: GameMode,
  session: {
    isWon: boolean;
    isGameOver: boolean;
    guesses: T[];
    targetId?: string;
    targetItem?: Target;
    extra?: Record<string, any>;
  }
): void {
  try {
    const today = getTodayDateString();
    const key =
      mode === 'daily'
        ? `omnidle_daily_session_${categoryId}_${miniGameId}_${today}`
        : `omnidle_infinite_session_${categoryId}_${miniGameId}`;
    const payload: GameSession<T, Target> = {
      mode,
      date: today,
      categoryId,
      miniGameId,
      isWon: session.isWon,
      isGameOver: session.isGameOver,
      targetId: session.targetId || (session.targetItem as any)?.id,
      targetItem: session.targetItem,
      guesses: session.guesses || [],
      extra: session.extra,
      updatedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function clearGameSession(
  categoryId: string,
  miniGameId: string,
  mode: GameMode
): void {
  try {
    const today = getTodayDateString();
    const key =
      mode === 'daily'
        ? `omnidle_daily_session_${categoryId}_${miniGameId}_${today}`
        : `omnidle_infinite_session_${categoryId}_${miniGameId}`;
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function getDailySession<T = any>(
  categoryId: CategoryId,
  miniGameId: string
): DailyGameSession<T> | null {
  return getGameSession<T>(categoryId, miniGameId, 'daily') as any;
}

export function saveDailySession<T = any>(
  categoryId: CategoryId,
  miniGameId: string,
  session: {
    isWon: boolean;
    isGameOver: boolean;
    guesses: T[];
    targetId?: string;
    targetItem?: any;
    extra?: Record<string, any>;
  }
): void {
  saveGameSession(categoryId, miniGameId, 'daily', session);
}

export function isDailyCompletedToday(categoryId: CategoryId, miniGameId: string): boolean {
  const session = getDailySession(categoryId, miniGameId);
  return Boolean(session && session.isGameOver);
}
