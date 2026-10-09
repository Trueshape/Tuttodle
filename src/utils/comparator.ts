import {
  FootballPlayer,
  LolChampion,
  LolLanguage,
  CarModel,
  MovieItem,
  AnimeItem,
  VideoGameItem,
  AttributeMatch,
  MatchStatus,
  ArrowDirection
} from '../types';
import {
  translateGender,
  translateResource,
  translateRegion,
  translateSpecies,
} from './lolLocalization';
import {
  localizeSpecLabel,
  localizeSpecValue,
} from './vgLocalization';

function getNumericArrow(guessed: number, target: number): ArrowDirection {
  if (guessed < target) return 'up';
  if (guessed > target) return 'down';
  return 'none';
}

// 1. FOOTBALL COMPARISON
export function compareFootballPlayer(guessed: FootballPlayer, target: FootballPlayer): AttributeMatch[] {
  const isNationalityMatch = guessed.nationality === target.nationality;

  const isPositionMatch = guessed.position === target.position;
  const isPositionPartial = !isPositionMatch && (
    (guessed.position === 'ATT' && target.position === 'CEN') ||
    (guessed.position === 'CEN' && target.position === 'ATT') ||
    (guessed.position === 'DIF' && target.position === 'POR') ||
    (guessed.position === 'POR' && target.position === 'DIF')
  );

  const isLeagueMatch = guessed.currentLeague === target.currentLeague;

  const ageDiff = Math.abs(guessed.age - target.age);
  const isAgeExact = guessed.age === target.age;

  const isUclMatch = guessed.uclWinner === target.uclWinner;
  const isWcMatch = guessed.worldCupWinner === target.worldCupWinner;

  return [
    {
      label: 'Nazionalità',
      value: `${guessed.flag} ${guessed.nationality}`,
      status: isNationalityMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Ruolo',
      value: guessed.position,
      status: isPositionMatch ? 'exact' : isPositionPartial ? 'partial' : 'wrong',
    },
    {
      label: 'Campionato',
      value: guessed.currentLeague,
      status: isLeagueMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Età',
      value: `${guessed.age} anni`,
      status: isAgeExact ? 'exact' : ageDiff <= 2 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.age, target.age),
    },
    {
      label: 'Champions League',
      value: guessed.uclWinner ? 'Vinta 🏆' : 'No',
      status: isUclMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Mondiale',
      value: guessed.worldCupWinner ? 'Vinto ⭐️' : 'No',
      status: isWcMatch ? 'exact' : 'wrong',
    },
  ];
}

// 2. LOL CHAMPION COMPARISON
export function compareLolChampion(
  guessed: LolChampion,
  target: LolChampion,
  lang: string = 'it'
): AttributeMatch[] {
  const currentLang = lang === 'en' ? 'en' : 'it';
  const isGenderMatch = guessed.gender === target.gender;

  const commonPos = guessed.positions.filter(p => target.positions.includes(p));
  const isPosExact = guessed.positions.length === target.positions.length && commonPos.length === target.positions.length;
  const isPosPartial = !isPosExact && commonPos.length > 0;

  const commonSpecies = guessed.species.filter(s => target.species.includes(s));
  const isSpeciesExact = guessed.species.length === target.species.length && commonSpecies.length === target.species.length;
  const isSpeciesPartial = !isSpeciesExact && commonSpecies.length > 0;

  const isResourceMatch = guessed.resource === target.resource;

  const isRangeMatch = guessed.rangeType === target.rangeType;
  const isRangePartial = !isRangeMatch && (guessed.rangeType === 'Hybrid' || target.rangeType === 'Hybrid');

  const commonRegions = guessed.regions.filter(r => target.regions.includes(r));
  const isRegionExact = guessed.regions.length === target.regions.length && commonRegions.length === target.regions.length;
  const isRegionPartial = !isRegionExact && commonRegions.length > 0;

  const isYearExact = guessed.releaseYear === target.releaseYear;
  const yearDiff = Math.abs(guessed.releaseYear - target.releaseYear);

  return [
    {
      label: lang === 'en' ? 'Gender' : 'Genere',
      value: translateGender(guessed.gender, lang),
      status: isGenderMatch ? 'exact' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Position' : 'Posizione',
      value: guessed.positions.join(', '),
      status: isPosExact ? 'exact' : isPosPartial ? 'partial' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Species' : 'Specie',
      value: guessed.species.map((s) => translateSpecies(s, lang)).join(', '),
      status: isSpeciesExact ? 'exact' : isSpeciesPartial ? 'partial' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Resource' : 'Risorsa',
      value: translateResource(guessed.resource, lang),
      status: isResourceMatch ? 'exact' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Range' : 'Attacco',
      value: guessed.rangeType,
      status: isRangeMatch ? 'exact' : isRangePartial ? 'partial' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Region' : 'Regione',
      value: guessed.regions.map((r) => translateRegion(r, lang)).join(', '),
      status: isRegionExact ? 'exact' : isRegionPartial ? 'partial' : 'wrong',
    },
    {
      label: lang === 'en' ? 'Release Year' : 'Anno Uscita',
      value: guessed.releaseYear,
      status: isYearExact ? 'exact' : yearDiff <= 2 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.releaseYear, target.releaseYear),
    },
  ];
}

// 3. CAR MODEL COMPARISON
export function compareCarModel(guessed: CarModel, target: CarModel): AttributeMatch[] {
  const isBrandMatch = guessed.brand === target.brand;
  const isCountryMatch = guessed.country === target.country;
  const isBodyMatch = guessed.bodyType === target.bodyType;
  const isEngineMatch = guessed.engineType === target.engineType;
  const isDriveMatch = guessed.drivetrain === target.drivetrain;

  const hpDiff = Math.abs(guessed.horsepower - target.horsepower);
  const isHpExact = guessed.horsepower === target.horsepower;

  const yearDiff = Math.abs(guessed.releaseYear - target.releaseYear);
  const isYearExact = guessed.releaseYear === target.releaseYear;

  return [
    {
      label: 'Marca',
      value: guessed.brand,
      status: isBrandMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Nazione',
      value: `${guessed.flag} ${guessed.country}`,
      status: isCountryMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Carrozzeria',
      value: guessed.bodyType,
      status: isBodyMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Motore',
      value: guessed.engineType,
      status: isEngineMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Trazione',
      value: guessed.drivetrain,
      status: isDriveMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Potenza',
      value: `${guessed.horsepower} CV`,
      status: isHpExact ? 'exact' : hpDiff <= 50 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.horsepower, target.horsepower),
    },
    {
      label: 'Anno Lancio',
      value: guessed.releaseYear,
      status: isYearExact ? 'exact' : yearDiff <= 3 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.releaseYear, target.releaseYear),
    },
  ];
}

// 4. MOVIE COMPARISON
export function compareMovie(guessed: MovieItem, target: MovieItem): AttributeMatch[] {
  const isDirectorMatch = guessed.director === target.director;

  const commonGenres = guessed.genres.filter(g => target.genres.includes(g));
  const isGenreExact = guessed.genres.length === target.genres.length && commonGenres.length === target.genres.length;
  const isGenrePartial = !isGenreExact && commonGenres.length > 0;

  const yearDiff = Math.abs(guessed.releaseYear - target.releaseYear);
  const isYearExact = guessed.releaseYear === target.releaseYear;

  const isCountryMatch = guessed.country === target.country;
  const isBoxOfficeMatch = guessed.boxOfficeTier === target.boxOfficeTier;

  return [
    {
      label: 'Regista',
      value: guessed.director,
      status: isDirectorMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Genere',
      value: guessed.genres.join(', '),
      status: isGenreExact ? 'exact' : isGenrePartial ? 'partial' : 'wrong',
    },
    {
      label: 'Anno',
      value: guessed.releaseYear,
      status: isYearExact ? 'exact' : yearDiff <= 3 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.releaseYear, target.releaseYear),
    },
    {
      label: 'Paese',
      value: `${guessed.flag} ${guessed.country}`,
      status: isCountryMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Fascia Incassi',
      value: guessed.boxOfficeTier,
      status: isBoxOfficeMatch ? 'exact' : 'wrong',
    },
  ];
}

// 5. ANIME COMPARISON
export function compareAnime(guessed: AnimeItem, target: AnimeItem): AttributeMatch[] {
  const isStudioMatch = guessed.studio === target.studio || (guessed.studio.includes(target.studio) || target.studio.includes(guessed.studio));

  const commonGenres = guessed.genres.filter(g => target.genres.includes(g));
  const isGenreExact = guessed.genres.length === target.genres.length && commonGenres.length === target.genres.length;
  const isGenrePartial = !isGenreExact && commonGenres.length > 0;

  const yearDiff = Math.abs(guessed.releaseYear - target.releaseYear);
  const isYearExact = guessed.releaseYear === target.releaseYear;

  const epDiff = Math.abs(guessed.episodeCount - target.episodeCount);
  const isEpExact = guessed.episodeCount === target.episodeCount;

  const isSourceMatch = guessed.sourceMaterial === target.sourceMaterial;

  return [
    {
      label: 'Studio',
      value: guessed.studio,
      status: isStudioMatch ? 'exact' : 'wrong',
    },
    {
      label: 'Genere',
      value: guessed.genres.join(', '),
      status: isGenreExact ? 'exact' : isGenrePartial ? 'partial' : 'wrong',
    },
    {
      label: 'Anno Uscita',
      value: guessed.releaseYear,
      status: isYearExact ? 'exact' : yearDiff <= 3 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.releaseYear, target.releaseYear),
    },
    {
      label: 'Episodi',
      value: `${guessed.episodeCount} ep`,
      status: isEpExact ? 'exact' : epDiff <= 15 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.episodeCount, target.episodeCount),
    },
    {
      label: 'Fonte',
      value: guessed.sourceMaterial,
      status: isSourceMatch ? 'exact' : 'wrong',
    },
  ];
}

// 6. VIDEO GAME COMPARISON
export function compareVideoGame(
  guessed: VideoGameItem,
  target: VideoGameItem,
  lang: string = 'it'
): AttributeMatch[] {
  const currentLang: LolLanguage = lang === 'en' ? 'en' : 'it';
  const isEn = currentLang === 'en';
  const isDevMatch = guessed.developer.toLowerCase().trim() === target.developer.toLowerCase().trim();

  // 1. Genere (Gameplay mechanics: Azione, RPG, Platform, FPS, ecc.)
  const commonGenres = guessed.genres.filter((g) =>
    target.genres.some((tg) => tg.toLowerCase() === g.toLowerCase())
  );
  const isGenreExact = guessed.genres.length === target.genres.length && commonGenres.length === target.genres.length;
  const isGenrePartial = !isGenreExact && commonGenres.length > 0;

  // 2. Tema (Narrativa/Ambientazione: Arti Marziali, Storico, Fantasy, Sci-Fi, ecc.)
  const guessedThemes = guessed.themes || [];
  const targetThemes = target.themes || [];
  const commonThemes = guessedThemes.filter((t) =>
    targetThemes.some((tt) => tt.toLowerCase() === t.toLowerCase())
  );
  const isThemeExact = guessedThemes.length > 0 && guessedThemes.length === targetThemes.length && commonThemes.length === targetThemes.length;
  const isThemePartial = !isThemeExact && commonThemes.length > 0;

  // 3. Anno Uscita
  const yearDiff = Math.abs(guessed.releaseYear - target.releaseYear);
  const isYearExact = guessed.releaseYear === target.releaseYear;

  // 4. Piattaforme (PC, PlayStation, Nintendo, Xbox)
  const guessedPlats = (guessed.platforms && guessed.platforms.length > 0) ? guessed.platforms : [guessed.mainPlatform as any];
  const targetPlats = (target.platforms && target.platforms.length > 0) ? target.platforms : [target.mainPlatform as any];
  const commonPlats = guessedPlats.filter((p) => targetPlats.includes(p));
  const isPlatExact = guessedPlats.length === targetPlats.length && commonPlats.length === targetPlats.length;
  const isPlatPartial = !isPlatExact && commonPlats.length > 0;

  // 5. PEGI
  const isPegiExact = !!guessed.pegi && !!target.pegi && guessed.pegi === target.pegi;
  const pegiTiers = ['PEGI 3', 'PEGI 7', 'PEGI 12', 'PEGI 16', 'PEGI 18'];
  const gIdx = pegiTiers.indexOf(guessed.pegi || '');
  const tIdx = pegiTiers.indexOf(target.pegi || '');
  const isPegiPartial = !isPegiExact && gIdx !== -1 && tIdx !== -1 && Math.abs(gIdx - tIdx) <= 1;

  // 6. Modalità (Giocatore singolo, Multiplayer, etc.)
  const guessedModes = guessed.gameModes || ['Giocatore singolo'];
  const targetModes = target.gameModes || ['Giocatore singolo'];
  const commonModes = guessedModes.filter((m) => targetModes.includes(m));
  const isModeExact = guessedModes.length === targetModes.length && commonModes.length === targetModes.length;
  const isModePartial = !isModeExact && commonModes.length > 0;

  // 7. Prospettiva
  const isPerspectiveMatch = guessed.perspective === target.perspective;

  // 8. Tipo (Normale, Remake, Remaster secondo IGDB)
  const guessedType = guessed.gameType || 'Normale';
  const targetType = target.gameType || 'Normale';
  const isTypeExact = guessedType === targetType;
  const isTypePartial =
    !isTypeExact &&
    ((guessedType === 'Remake' && targetType === 'Remaster') ||
      (guessedType === 'Remaster' && targetType === 'Remake'));

  const rawGenreStr = guessed.genres.join(', ');
  const rawThemeStr = guessedThemes.length > 0 ? guessedThemes.join(', ') : 'Generale';
  const rawModeStr = guessedModes.join(', ');

  return [
    {
      label: localizeSpecLabel('Sviluppatore', currentLang),
      value: guessed.developer,
      status: isDevMatch ? 'exact' : 'wrong',
    },
    {
      label: localizeSpecLabel('Genere', currentLang),
      value: localizeSpecValue('Genere', rawGenreStr, currentLang),
      status: isGenreExact ? 'exact' : isGenrePartial ? 'partial' : 'wrong',
    },
    {
      label: localizeSpecLabel('Tema', currentLang),
      value: localizeSpecValue('Tema', rawThemeStr, currentLang),
      status: isThemeExact ? 'exact' : isThemePartial ? 'partial' : 'wrong',
    },
    {
      label: localizeSpecLabel('Anno Uscita', currentLang),
      value: guessed.releaseYear,
      status: isYearExact ? 'exact' : yearDiff <= 3 ? 'partial' : 'wrong',
      arrow: getNumericArrow(guessed.releaseYear, target.releaseYear),
    },
    {
      label: localizeSpecLabel('Piattaforme', currentLang),
      value: guessedPlats,
      status: isPlatExact ? 'exact' : isPlatPartial ? 'partial' : 'wrong',
    },
    {
      label: 'PEGI',
      value: guessed.pegi || (isEn ? 'N/A' : 'N/D'),
      status: isPegiExact ? 'exact' : isPegiPartial ? 'partial' : 'wrong',
    },
    {
      label: localizeSpecLabel('Modalità', currentLang),
      value: localizeSpecValue('Modalità', rawModeStr, currentLang),
      status: isModeExact ? 'exact' : isModePartial ? 'partial' : 'wrong',
    },
    {
      label: localizeSpecLabel('Prospettiva', currentLang),
      value: localizeSpecValue('Prospettiva', guessed.perspective, currentLang),
      status: isPerspectiveMatch ? 'exact' : 'wrong',
    },
    {
      label: localizeSpecLabel('Tipo', currentLang),
      value: localizeSpecValue('Tipo', guessedType, currentLang),
      status: isTypeExact ? 'exact' : isTypePartial ? 'partial' : 'wrong',
    },
  ];
}
