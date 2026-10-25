import { useEffect, useMemo, useState } from 'react';
import { VideoGameItem } from '../types';
import { getRealCoverUrl } from '../data/realGameCovers';

const readFlaggedFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem('omni_flagged_broken_covers');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => (typeof item === 'string' ? item : item.id)).filter(Boolean);
      }
    }
  } catch {}
  return [];
};

const readCoverReplacements = (): Record<string, string> => {
  try {
    const saved = localStorage.getItem('omni_cover_replacements');
    if (saved) return JSON.parse(saved);
  } catch {}
  return {};
};

export function usePlayableGames(gameList: VideoGameItem[]) {
  const previouslyFlaggedGameIds = useMemo(readFlaggedFromStorage, []);
  const [coverReplacements, setCoverReplacements] = useState<Record<string, string>>(readCoverReplacements);
  const [serverFlaggedIds, setServerFlaggedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/flagged-covers')
      .then((res) => (res.ok ? res.json() : []))
      .then((list: { id: string }[]) => setServerFlaggedIds(list.map((item) => item.id)))
      .catch(() => {});
  }, []);

  const playableGames = useMemo(() => {
    return gameList
      .filter((g) => !previouslyFlaggedGameIds.includes(g.id) && !serverFlaggedIds.includes(g.id))
      .map((g) => {
        const replacedCover = coverReplacements[g.id];
        const real = replacedCover || getRealCoverUrl(g) || (g.coverUrl && g.coverUrl.startsWith('http') ? g.coverUrl : undefined);
        return real ? { ...g, coverUrl: real } : null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null) as VideoGameItem[];
  }, [gameList, previouslyFlaggedGameIds, serverFlaggedIds, coverReplacements]);

  return { playableGames, serverFlaggedIds, setServerFlaggedIds, coverReplacements, setCoverReplacements };
}
