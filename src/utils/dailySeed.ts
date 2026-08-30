import { CategoryId } from '../types';

/**
 * Returns a simple string seed for today in YYYY-MM-DD format (UTC or local)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Simple hash string function to map date + category into a deterministic integer
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Gets daily index for a specific dataset array based on current date
 */
export function getDailyIndex(categoryId: CategoryId, miniGameId: string, totalItems: number): number {
  if (totalItems <= 0) return 0;
  const dateStr = getTodayDateString();
  const seedKey = `${dateStr}_${categoryId}_${miniGameId}`;
  const hash = hashString(seedKey);
  return hash % totalItems;
}

/**
 * Calculates remaining time until next daily puzzle (midnight)
 */
export function getTimeUntilNextDaily(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diff = tomorrow.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
