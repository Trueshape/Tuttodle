export const REVEAL_MAX_ATTEMPTS = 5;
export const COMPARE_MAX_ATTEMPTS = 20;

const MAX_SCORE = 500;
const MIN_SCORE = 100;

export function scoreForWin(attemptsUsed: number, maxAttempts: number): number {
  const step = maxAttempts <= REVEAL_MAX_ATTEMPTS ? 100 : 20;
  return Math.max(MIN_SCORE, MAX_SCORE - (Math.max(1, attemptsUsed) - 1) * step);
}
