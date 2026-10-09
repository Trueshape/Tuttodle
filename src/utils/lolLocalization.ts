import { LolLanguage } from '../types';

export const LOL_TRANSLATIONS = {
  it: {
    // UI General
    language: 'Lingua',
    italian: 'Italiano',
    english: 'Inglese',
    championClassic: 'Campioni',
    quoteGame: 'Frasi',
    abilityIcon: 'Abilità',
    artworkSplash: 'Artwork',
    newBadge: 'Nuovo',
    // Attributes
    champion: 'Campione',
    gender: 'Genere',
    position: 'Posizione',
    species: 'Specie',
    resource: 'Risorsa',
    rangeType: 'Gittata',
    region: 'Regione',
    year: 'Anno',
    ability: 'Abilità',
    artwork: 'Artwork',
    quote: 'Citazione',
    slot: 'Tasto',
    // Values
    male: 'Maschio',
    female: 'Femmina',
    other: 'Altro',
    mana: 'Mana',
    energy: 'Energia',
    manaless: 'Senza Risorsa',
    health: 'Salute',
    fury: 'Furia',
    flow: 'Flusso',
    shield: 'Scudo',
    melee: 'Melee',
    ranged: 'Ranged',
    hybrid: 'Ibrido',
    // Gameplay labels
    searchPlaceholderClassic: 'Digita il nome di un campione (es. Aatrox, Ahri)...',
    searchPlaceholderQuote: 'Chi ha detto questa frase? (es. Yasuo, Jinx)...',
    searchPlaceholderAbility: 'A quale campione appartiene questa abilità?',
    searchPlaceholderArtwork: 'A quale campione appartiene questo artwork?',
    skipQuote: 'Salta',
    skipQuoteFull: 'Salta questa citazione',
    skipArtwork: 'Salta',
    skipArtworkFull: 'Salta questo artwork',
    skipAbility: 'Salta abilità',
    filterSkinsPlaceholder: 'Filtra tra le skin...',
    guessedChampion: 'Campione Trovato',
    whichSkinName: 'Qual è il nome di questo artwork / skin?',
    whichLetterName: 'A quale tasto corrisponde questa abilità?',
    dontKnowSkinSkip: 'Non conosci la skin? Salta artwork',
    quoteSkipped: 'CITAZIONE SALTATA',
    quoteGuessed: 'CITAZIONE INDOVINATA!',
    artworkSkipped: 'ARTWORK SALTATO',
    artworkGuessed: 'ARTWORK INDOVINATO!',
    abilityGuessed: 'ABILITÀ INDOVINATA!',
    shareResult: 'Condividi Risultato',
    copied: 'Copiato!',
    nextQuote: 'Prossima Citazione',
    nextArtwork: 'Prossimo Artwork',
    nextAbility: 'Prossima Abilità',
    nextDailyIn: 'Prossimo tra',
    streak: 'Serie',
    bestStreak: 'Max',
    listenVoice: 'Ascolta',
    voicePlaying: 'In riproduzione...',
    voiceOriginalRiot: 'Voce Originale Riot',
    quoteContext: 'Contesto Citazione',
    hintsProgress: 'Indizi Progressivi',
    hintAtError: (err: number) => `Sblocco a ${err} tentativi`,
    errorsDezoom: 'Errori dezoom',
    zoomFull: 'Visione Completa',
    missingErrorsForFull: (n: number) => `Mancano ${n} errori per vedere l'artwork al 100% completo`,
    artworkFullShown: '✓ Artwork visualizzato al 100% della grandezza!',
    wrongArtworkRetry: "Artwork errato! Riprova con un altro nome (l'immagine si dezooma ulteriormente).",
    wrongLetterRetry: 'Lettera errata! Riprova con un altro tasto.',
    passive: 'Passiva',
    base: 'Base',
  },
  en: {
    // UI General
    language: 'Language',
    italian: 'Italian',
    english: 'English',
    championClassic: 'Champions',
    quoteGame: 'Quotes',
    abilityIcon: 'Abilities',
    artworkSplash: 'Artwork',
    newBadge: 'New',
    // Attributes
    champion: 'Champion',
    gender: 'Gender',
    position: 'Position',
    species: 'Species',
    resource: 'Resource',
    rangeType: 'Range',
    region: 'Region',
    year: 'Year',
    ability: 'Ability',
    artwork: 'Artwork',
    quote: 'Quote',
    slot: 'Key',
    // Values
    male: 'Male',
    female: 'Female',
    other: 'Other',
    mana: 'Mana',
    energy: 'Energy',
    manaless: 'Manaless',
    health: 'Health',
    fury: 'Fury',
    flow: 'Flow',
    shield: 'Shield',
    melee: 'Melee',
    ranged: 'Ranged',
    hybrid: 'Hybrid',
    // Gameplay labels
    searchPlaceholderClassic: 'Type a champion name (e.g. Aatrox, Ahri)...',
    searchPlaceholderQuote: 'Who said this line? (e.g. Yasuo, Jinx)...',
    searchPlaceholderAbility: 'Which champion does this ability belong to?',
    searchPlaceholderArtwork: 'Which champion does this artwork belong to?',
    skipQuote: 'Skip',
    skipQuoteFull: 'Skip this quote',
    skipArtwork: 'Skip',
    skipArtworkFull: 'Skip this artwork',
    skipAbility: 'Skip ability',
    filterSkinsPlaceholder: 'Filter skins...',
    guessedChampion: 'Champion Found',
    whichSkinName: 'What is the name of this artwork / skin?',
    whichLetterName: 'Which key is this ability bound to?',
    dontKnowSkinSkip: "Don't know the skin? Skip artwork",
    quoteSkipped: 'QUOTE SKIPPED',
    quoteGuessed: 'QUOTE GUESSED!',
    artworkSkipped: 'ARTWORK SKIPPED',
    artworkGuessed: 'ARTWORK GUESSED!',
    abilityGuessed: 'ABILITY GUESSED!',
    shareResult: 'Share Result',
    copied: 'Copied!',
    nextQuote: 'Next Quote',
    nextArtwork: 'Next Artwork',
    nextAbility: 'Next Ability',
    nextDailyIn: 'Next daily in',
    streak: 'Streak',
    bestStreak: 'Best',
    listenVoice: 'Listen',
    voicePlaying: 'Playing...',
    voiceOriginalRiot: 'Original Riot Audio',
    quoteContext: 'Quote Context',
    hintsProgress: 'Progressive Hints',
    hintAtError: (err: number) => `Unlocks at ${err} attempts`,
    errorsDezoom: 'Dezoom errors',
    zoomFull: 'Full View',
    missingErrorsForFull: (n: number) => `${n} more errors until artwork is 100% visible`,
    artworkFullShown: '✓ Artwork shown at 100% full scale!',
    wrongArtworkRetry: 'Wrong artwork! Try another name (the image will zoom out further).',
    wrongLetterRetry: 'Wrong ability key! Try another one.',
    passive: 'Passive',
    base: 'Base',
  },
};

const REGION_EN_MAP: Record<string, string> = {
  'Isole Ombra': 'Shadow Isles',
  'Città di Bandle': 'Bandle City',
  'Vuoto': 'Void',
};

const SPECIES_EN_MAP: Record<string, string> = {
  'Umano': 'Human',
  'Nato dal Vuoto': 'Voidborn',
  'Non Morto': 'Undead',
  'Spettro': 'Spectre',
  'Spirito': 'Spirit',
  'Divinità': 'God',
  'Costrutto': 'Construct',
  'Aspetto': 'Aspect',
  'Drago': 'Dragon',
  'Demone': 'Demon',
  'Minotauro': 'Minotaur',
  'Cyborg': 'Cyborg',
  'Golem': 'Golem',
  'Magia': 'Magic',
};

const GENDER_EN_MAP: Record<string, string> = {
  'Maschio': 'Male',
  'Femmina': 'Female',
  'Altro': 'Other',
};

const RESOURCE_EN_MAP: Record<string, string> = {
  'Senza Risorsa': 'Manaless',
  'Salute': 'Health',
  'Furia': 'Fury',
  'Flusso': 'Flow',
  'Scudo': 'Shield',
  'Energia': 'Energy',
};

export function translateRegion(region: string, lang: string = 'it'): string {
  if (lang === 'it') return region;
  return REGION_EN_MAP[region] || region;
}

export function translateSpecies(species: string, lang: string = 'it'): string {
  if (lang === 'it') return species;
  return SPECIES_EN_MAP[species] || species;
}

export function translateGender(gender: string, lang: string = 'it'): string {
  if (lang === 'it') return gender;
  return GENDER_EN_MAP[gender] || gender;
}

export function translateResource(resource: string, lang: string = 'it'): string {
  if (lang === 'it') return resource;
  return RESOURCE_EN_MAP[resource] || resource;
}
