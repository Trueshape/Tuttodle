import { UserStats, CategoryId } from '../types';
import { getTodayDateString } from './dailySeed';

const STATS_KEY_PREFIX = 'omnidle_stats_';

export function getStats(categoryId: CategoryId, miniGameId: string): UserStats {
  const key = `${STATS_KEY_PREFIX}${categoryId}_${miniGameId}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  return {
    played: 0,
    won: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
  };
}

export function saveGameResult(
  categoryId: CategoryId,
  miniGameId: string,
  isWon: boolean,
  attempts: number
): UserStats {
  const currentStats = getStats(categoryId, miniGameId);
  const today = getTodayDateString();

  const newPlayed = currentStats.played + 1;
  const newWon = isWon ? currentStats.won + 1 : currentStats.won;

  let newCurrentStreak = currentStats.currentStreak;
  if (isWon) {
    newCurrentStreak += 1;
  } else {
    newCurrentStreak = 0;
  }

  const newMaxStreak = Math.max(currentStats.maxStreak, newCurrentStreak);

  const newDistribution = { ...currentStats.guessDistribution };
  if (isWon) {
    const cappedAttempt = Math.min(attempts, 10);
    newDistribution[cappedAttempt] = (newDistribution[cappedAttempt] || 0) + 1;
  }

  const updated: UserStats = {
    played: newPlayed,
    won: newWon,
    currentStreak: newCurrentStreak,
    maxStreak: newMaxStreak,
    guessDistribution: newDistribution,
    lastPlayedDate: today,
  };

  const key = `${STATS_KEY_PREFIX}${categoryId}_${miniGameId}`;
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
}
