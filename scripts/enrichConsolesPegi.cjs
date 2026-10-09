const fs = require('fs');

// Exact console release mapping and PEGI rating for the 100 IGDB masterpieces
const consoleMapping = {
  "zelda-ocarina-of-time": {
    platforms: ["N64", "GameCube", "Switch"],
    pegi: "PEGI 12"
  },
  "super-mario-64": {
    platforms: ["N64", "Nintendo DS", "Switch"],
    pegi: "PEGI 3"
  },
  "the-witcher-3-wild-hunt": {
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S", "Switch"],
    pegi: "PEGI 18"
  },
  "chrono-trigger": {
    platforms: ["SNES", "PS1", "Nintendo DS", "PC"],
    pegi: "PEGI 12"
  },
  "portal-2": {
    platforms: ["PC", "PS3", "Xbox 360", "Switch"],
    pegi: "PEGI 12"
  },
  "baldurs-gate-3": {
    platforms: ["PC", "PS5", "Xbox Series X/S"],
    pegi: "PEGI 18"
  },
  "red-dead-redemption-2": {
    platforms: ["PS4", "Xbox One", "PC"],
    pegi: "PEGI 18"
  },
  "zelda-breath-of-the-wild": {
    platforms: ["Wii U", "Switch"],
    pegi: "PEGI 12"
  },
  "elden-ring": {
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    pegi: "PEGI 16"
  },
  "half-life-2": {
    platforms: ["PC", "Xbox", "Xbox 360", "PS3"],
    pegi: "PEGI 16"
  },
  "metal-gear-solid": {
    platforms: ["PS1", "PC"],
    pegi: "PEGI 16"
  },
  "final-fantasy-vii": {
    platforms: ["PS1", "PC", "PS4", "Switch", "Xbox One"],
    pegi: "PEGI 12"
  },
  "super-metroid": {
    platforms: ["SNES", "Switch"],
    pegi: "PEGI 7"
  },
  "castlevania-symphony-of-the-night": {
    platforms: ["PS1", "Xbox 360", "PS4"],
    pegi: "PEGI 12"
  },
  "resident-evil-4": {
    platforms: ["GameCube", "PS2", "Wii", "PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 18"
  },
  "bioshock": {
    platforms: ["PC", "Xbox 360", "PS3", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 18"
  },
  "mass-effect-2": {
    platforms: ["PC", "Xbox 360", "PS3", "PS4", "Xbox One"],
    pegi: "PEGI 18"
  },
  "bloodborne": {
    platforms: ["PS4"],
    pegi: "PEGI 16"
  },
  "dark-souls": {
    platforms: ["PS3", "Xbox 360", "PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 16"
  },
  "shadow-of-the-colossus": {
    platforms: ["PS2", "PS3", "PS4"],
    pegi: "PEGI 12"
  },
  "god-of-war-2018": {
    platforms: ["PS4", "PC"],
    pegi: "PEGI 18"
  },
  "the-last-of-us": {
    platforms: ["PS3", "PS4", "PS5", "PC"],
    pegi: "PEGI 18"
  },
  "the-last-of-us-part-2": {
    platforms: ["PS4", "PS5"],
    pegi: "PEGI 18"
  },
  "persona-5-royal": {
    platforms: ["PS4", "PS5", "Switch", "Xbox One", "Xbox Series X/S", "PC"],
    pegi: "PEGI 16"
  },
  "silent-hill-2": {
    platforms: ["PS2", "Xbox", "PC"],
    pegi: "PEGI 18"
  },
  "gta-san-andreas": {
    platforms: ["PS2", "Xbox", "PC", "Xbox 360", "PS3"],
    pegi: "PEGI 18"
  },
  "gta-v": {
    platforms: ["PS3", "Xbox 360", "PS4", "Xbox One", "PC", "PS5", "Xbox Series X/S"],
    pegi: "PEGI 18"
  },
  "halo-combat-evolved": {
    platforms: ["Xbox", "PC", "Xbox 360", "Xbox One"],
    pegi: "PEGI 16"
  },
  "halo-2": {
    platforms: ["Xbox", "PC", "Xbox One"],
    pegi: "PEGI 16"
  },
  "street-fighter-2": {
    platforms: ["SNES", "Mega Drive", "PS1", "Switch"],
    pegi: "PEGI 12"
  },
  "doom-1993": {
    platforms: ["PC", "SNES", "PS1", "Switch", "PS4", "Xbox One"],
    pegi: "PEGI 18"
  },
  "deus-ex": {
    platforms: ["PC", "PS2"],
    pegi: "PEGI 16"
  },
  "disco-elysium": {
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S", "Switch"],
    pegi: "PEGI 18"
  },
  "metroid-prime": {
    platforms: ["GameCube", "Wii", "Switch"],
    pegi: "PEGI 12"
  },
  "hollow-knight": {
    platforms: ["PC", "Switch", "PS4", "Xbox One"],
    pegi: "PEGI 7"
  },
  "hades": {
    platforms: ["PC", "Switch", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    pegi: "PEGI 12"
  },
  "okami": {
    platforms: ["PS2", "Wii", "PS3", "PS4", "Xbox One", "Switch", "PC"],
    pegi: "PEGI 12"
  },
  "super-mario-galaxy": {
    platforms: ["Wii", "Switch"],
    pegi: "PEGI 3"
  },
  "super-mario-galaxy-2": {
    platforms: ["Wii"],
    pegi: "PEGI 3"
  },
  "chrono-cross": {
    platforms: ["PS1", "Switch", "PS4", "Xbox One", "PC"],
    pegi: "PEGI 12"
  },
  "final-fantasy-vi": {
    platforms: ["SNES", "PS1", "GBA", "PC"],
    pegi: "PEGI 12"
  },
  "final-fantasy-ix": {
    platforms: ["PS1", "PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 12"
  },
  "final-fantasy-x": {
    platforms: ["PS2", "PS3", "PS4", "PC", "Xbox One", "Switch"],
    pegi: "PEGI 12"
  },
  "system-shock-2": {
    platforms: ["PC"],
    pegi: "PEGI 16"
  },
  "grim-fandango": {
    platforms: ["PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 12"
  },
  "kotor": {
    platforms: ["PC", "Xbox", "Switch"],
    pegi: "PEGI 12"
  },
  "fallout-new-vegas": {
    platforms: ["PC", "Xbox 360", "PS3"],
    pegi: "PEGI 18"
  },
  "skyrim": {
    platforms: ["PC", "Xbox 360", "PS3", "PS4", "Xbox One", "Switch", "PS5", "Xbox Series X/S"],
    pegi: "PEGI 18"
  },
  "morrowind": {
    platforms: ["PC", "Xbox"],
    pegi: "PEGI 12"
  },
  "pokemon-rosso-blu": {
    platforms: ["Game Boy", "Nintendo 3DS"],
    pegi: "PEGI 3"
  },
  "pokemon-oro-argento": {
    platforms: ["Game Boy", "Nintendo 3DS"],
    pegi: "PEGI 3"
  },
  "diablo-2": {
    platforms: ["PC", "Switch", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    pegi: "PEGI 16"
  },
  "world-of-warcraft": {
    platforms: ["PC"],
    pegi: "PEGI 12"
  },
  "super-smash-bros-melee": {
    platforms: ["GameCube"],
    pegi: "PEGI 3"
  },
  "super-smash-bros-ultimate": {
    platforms: ["Switch"],
    pegi: "PEGI 12"
  },
  "tekken-3": {
    platforms: ["PS1"],
    pegi: "PEGI 12"
  },
  "crash-bandicoot-3": {
    platforms: ["PS1", "PS4", "Xbox One", "Switch", "PC"],
    pegi: "PEGI 7"
  },
  "spyro-2-riptos-rage": {
    platforms: ["PS1", "PS4", "Xbox One", "Switch", "PC"],
    pegi: "PEGI 7"
  },
  "tony-hawks-pro-skater-2": {
    platforms: ["PS1", "N64", "Dreamcast", "PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 12"
  },
  "celeste": {
    platforms: ["PC", "Switch", "PS4", "Xbox One"],
    pegi: "PEGI 7"
  },
  "undertale": {
    platforms: ["PC", "PS4", "Switch", "Xbox One"],
    pegi: "PEGI 12"
  },
  "zelda-a-link-to-the-past": {
    platforms: ["SNES", "GBA", "Switch"],
    pegi: "PEGI 7"
  },
  "zelda-majoras-mask": {
    platforms: ["N64", "GameCube", "Nintendo 3DS", "Switch"],
    pegi: "PEGI 12"
  },
  "zelda-wind-waker": {
    platforms: ["GameCube", "Wii U"],
    pegi: "PEGI 7"
  },
  "zelda-tears-of-the-kingdom": {
    platforms: ["Switch"],
    pegi: "PEGI 12"
  },
  "metal-gear-solid-3": {
    platforms: ["PS2", "PS3", "Xbox 360", "PS5", "Xbox Series X/S", "PC", "Switch"],
    pegi: "PEGI 18"
  },
  "metal-gear-solid-2": {
    platforms: ["PS2", "Xbox", "PC", "PS3", "Xbox 360", "PS5", "Xbox Series X/S", "Switch"],
    pegi: "PEGI 16"
  },
  "resident-evil-2-original": {
    platforms: ["PS1", "N64", "GameCube", "Dreamcast", "PC"],
    pegi: "PEGI 18"
  },
  "resident-evil-2-remake": {
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    pegi: "PEGI 18"
  },
  "half-life-1": {
    platforms: ["PC", "PS2"],
    pegi: "PEGI 16"
  },
  "portal-1": {
    platforms: ["PC", "Xbox 360", "PS3", "Switch"],
    pegi: "PEGI 12"
  },
  "batman-arkham-city": {
    platforms: ["PC", "Xbox 360", "PS3", "PS4", "Xbox One", "Wii U", "Switch"],
    pegi: "PEGI 16"
  },
  "batman-arkham-asylum": {
    platforms: ["PC", "Xbox 360", "PS3", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 16"
  },
  "uncharted-2": {
    platforms: ["PS3", "PS4"],
    pegi: "PEGI 16"
  },
  "uncharted-4": {
    platforms: ["PS4", "PS5", "PC"],
    pegi: "PEGI 16"
  },
  "journey": {
    platforms: ["PS3", "PS4", "PC"],
    pegi: "PEGI 7"
  },
  "sekiro-shadows-die-twice": {
    platforms: ["PC", "PS4", "Xbox One"],
    pegi: "PEGI 18"
  },
  "monster-hunter-world": {
    platforms: ["PC", "PS4", "Xbox One"],
    pegi: "PEGI 16"
  },
  "god-of-war-ragnarok": {
    platforms: ["PS4", "PS5", "PC"],
    pegi: "PEGI 18"
  },
  "cyberpunk-2077": {
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    pegi: "PEGI 18"
  },
  "metroid-dread": {
    platforms: ["Switch"],
    pegi: "PEGI 12"
  },
  "super-mario-world": {
    platforms: ["SNES", "GBA", "Switch"],
    pegi: "PEGI 3"
  },
  "super-mario-odyssey": {
    platforms: ["Switch"],
    pegi: "PEGI 3"
  },
  "mario-kart-8-deluxe": {
    platforms: ["Wii U", "Switch"],
    pegi: "PEGI 3"
  },
  "donkey-kong-country": {
    platforms: ["SNES", "GBA", "Switch"],
    pegi: "PEGI 3"
  },
  "banjo-kazooie": {
    platforms: ["N64", "Xbox 360", "Xbox One", "Switch"],
    pegi: "PEGI 3"
  },
  "goldeneye-007": {
    platforms: ["N64", "Xbox One", "Switch"],
    pegi: "PEGI 16"
  },
  "perfect-dark": {
    platforms: ["N64", "Xbox 360", "Xbox One", "Switch"],
    pegi: "PEGI 16"
  },
  "shenmue": {
    platforms: ["Dreamcast", "PS4", "Xbox One", "PC"],
    pegi: "PEGI 12"
  },
  "sonic-the-hedgehog-2": {
    platforms: ["Mega Drive", "PS3", "Xbox 360", "Switch", "PC"],
    pegi: "PEGI 3"
  },
  "mega-man-x": {
    platforms: ["SNES", "PC", "PS1", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 7"
  },
  "ico": {
    platforms: ["PS2", "PS3"],
    pegi: "PEGI 12"
  },
  "demons-souls": {
    platforms: ["PS3", "PS5"],
    pegi: "PEGI 16"
  },
  "xenoblade-chronicles": {
    platforms: ["Wii", "Nintendo 3DS", "Switch"],
    pegi: "PEGI 12"
  },
  "persona-4-golden": {
    platforms: ["PS Vita", "PC", "PS4", "Xbox One", "Xbox Series X/S", "Switch"],
    pegi: "PEGI 16"
  },
  "mother-3": {
    platforms: ["GBA", "Switch"],
    pegi: "PEGI 12"
  },
  "earthbound": {
    platforms: ["SNES", "Nintendo 3DS", "Wii U", "Switch"],
    pegi: "PEGI 12"
  },
  "return-of-the-obra-dinn": {
    platforms: ["PC", "Switch", "PS4", "Xbox One"],
    pegi: "PEGI 16"
  },
  "outer-wilds": {
    platforms: ["PC", "Xbox One", "PS4", "Switch", "PS5", "Xbox Series X/S"],
    pegi: "PEGI 7"
  },
  "nier-automata": {
    platforms: ["PC", "PS4", "Xbox One", "Switch"],
    pegi: "PEGI 18"
  }
};

const extraFranchise = [
  {
    id: "crash-bash",
    title: "Crash Bash",
    developer: "Eurocom / Universal Interactive",
    releaseYear: 2000,
    genres: ["Party Game", "Minigiochi"],
    themes: ["Commedia", "Cartoonesco"],
    perspective: "3a Persona",
    mainPlatform: "PlayStation",
    platforms: ["PS1"],
    iconicQuote: "Il primo party game di Crash Bandicoot con minigiochi e sfide a punti tra Aku Aku e Uka Uka.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Crash_Bash_Cover_Art.jpg",
    franchise: "Crash Bandicoot",
    pegi: "PEGI 3",
    gameModes: ["Giocatore singolo", "Multiplayer"]
  },
  {
    id: "crash-bandicoot-2-cortex-strikes-back",
    title: "Crash Bandicoot 2: Cortex Strikes Back",
    developer: "Naughty Dog",
    releaseYear: 1997,
    genres: ["Platform 3D"],
    themes: ["Commedia", "Cartoonesco"],
    perspective: "3a Persona",
    mainPlatform: "PlayStation",
    platforms: ["PS1", "PS4", "Xbox One", "Switch", "PC"],
    iconicQuote: "I Cristalli Rosa del Potere, l'ologramma di Neo Cortex e l'inseguimento dell'orso Polar.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/07/Crash_Bandicoot_2_Cortex_Strikes_Back_Cover_Art.png",
    franchise: "Crash Bandicoot",
    pegi: "PEGI 3",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "crash-team-racing",
    title: "Crash Team Racing (CTR)",
    developer: "Naughty Dog",
    releaseYear: 1999,
    genres: ["Corse", "Kart Arcade"],
    themes: ["Commedia", "Competitivo"],
    perspective: "3a Persona",
    mainPlatform: "PlayStation",
    platforms: ["PS1", "PS4", "Xbox One", "Switch"],
    iconicQuote: "La sfida a tutta velocità contro l'extraterrestre Nitros Oxide per salvare la Terra.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/c/c9/Crash_Team_Racing_PAL_artwork.jpg",
    franchise: "Crash Bandicoot",
    pegi: "PEGI 3",
    gameModes: ["Giocatore singolo", "Multiplayer"]
  },
  {
    id: "super-mario-sunshine",
    title: "Super Mario Sunshine",
    developer: "Nintendo",
    releaseYear: 2002,
    genres: ["Platform 3D"],
    themes: ["Isola Tropicale", "Vacanze", "Acqua"],
    perspective: "3a Persona",
    mainPlatform: "Nintendo",
    platforms: ["GameCube", "Switch"],
    iconicQuote: "Mario e lo Splac 3000 alle prese con la melma dell'Isola Delfino.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/7/78/Super_Mario_Sunshine_Coverart.png",
    franchise: "Super Mario",
    pegi: "PEGI 3",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "zelda-twilight-princess",
    title: "The Legend of Zelda: Twilight Princess",
    developer: "Nintendo",
    releaseYear: 2006,
    genres: ["Action-Adventure"],
    themes: ["Dark Fantasy", "Regno del Crepuscolo", "Lupo"],
    perspective: "3a Persona",
    mainPlatform: "Nintendo",
    platforms: ["GameCube", "Wii", "Wii U"],
    iconicQuote: "Link Lupo e Midna, la Principessa del Crepuscolo, per sconfiggere Zant.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Zelda_Twilight_Princess_cover.png",
    franchise: "The Legend of Zelda",
    pegi: "PEGI 12",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "dark-souls-2",
    title: "Dark Souls II",
    developer: "FromSoftware",
    releaseYear: 2014,
    genres: ["Action RPG", "Soulslike"],
    themes: ["Dark Fantasy", "Drangleic", "Re Vendrick"],
    perspective: "3a Persona",
    mainPlatform: "PC / Multi",
    platforms: ["PC", "PS3", "Xbox 360", "PS4", "Xbox One"],
    iconicQuote: "Il regno decaduto di Drangleic alla ricerca di anime per non diventare Vacuo.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Dark_Souls_II_cover.jpg",
    franchise: "Soulsborne",
    pegi: "PEGI 16",
    gameModes: ["Giocatore singolo", "Co-op online", "Online PvP"]
  },
  {
    id: "dark-souls-3",
    title: "Dark Souls III",
    developer: "FromSoftware",
    releaseYear: 2016,
    genres: ["Action RPG", "Soulslike"],
    themes: ["Dark Fantasy", "Lothric", "Signori dei Tizzoni"],
    perspective: "3a Persona",
    mainPlatform: "PC / Multi",
    platforms: ["PC", "PS4", "Xbox One"],
    iconicQuote: "Solo le ceneri rimangono... Il viaggio della Fiamma Sopita a Lothric.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg",
    franchise: "Soulsborne",
    pegi: "PEGI 16",
    gameModes: ["Giocatore singolo", "Co-op online", "Online PvP"]
  },
  {
    id: "final-fantasy-viii",
    title: "Final Fantasy VIII",
    developer: "Square",
    releaseYear: 1999,
    genres: ["JRPG", "A turni"],
    themes: ["Accademia Militare", "Streghe nel Tempo", "Gunblade"],
    perspective: "3a Persona",
    mainPlatform: "PlayStation",
    platforms: ["PS1", "PC", "PS4", "Xbox One", "Switch"],
    iconicQuote: "Squall Leonhart, Rinoa Heartilly e la lotta dei SeeD contro la Strega Artemisia.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Final_Fantasy_VIII_Box_Art.jpg",
    franchise: "Final Fantasy",
    pegi: "PEGI 16",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "resident-evil-village",
    title: "Resident Evil Village",
    developer: "Capcom",
    releaseYear: 2021,
    genres: ["Survival Horror", "FPS"],
    themes: ["Horror Gotico", "Villaggio Romeno", "Lady Dimitrescu"],
    perspective: "1a Persona",
    mainPlatform: "PC / Multi",
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S", "Switch"],
    iconicQuote: "Ethan Winters in un villaggio misterioso tra vampiri, licantropi e Madre Miranda.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png",
    franchise: "Resident Evil",
    pegi: "PEGI 18",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "gta-vice-city",
    title: "Grand Theft Auto: Vice City",
    developer: "Rockstar North",
    releaseYear: 2002,
    genres: ["Action-Adventure", "Open World"],
    themes: ["Anni 80 Miami", "Scarface", "Musica Synthwave", "Crime"],
    perspective: "3a Persona",
    mainPlatform: "PC / Multi",
    platforms: ["PS2", "Xbox", "PC", "PS4", "Xbox One", "Switch"],
    iconicQuote: "Tommy Vercetti domina le strade al neon di Vice City nel 1986.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/c/ce/Vice-city-cover.jpg",
    franchise: "Grand Theft Auto",
    pegi: "PEGI 18",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "halo-3",
    title: "Halo 3",
    developer: "Bungie",
    releaseYear: 2007,
    genres: ["FPS", "Azione"],
    themes: ["Fantascienza Militare", "Guerra Galattica", "Master Chief"],
    perspective: "1a Persona",
    mainPlatform: "Xbox",
    platforms: ["Xbox 360", "Xbox One", "PC"],
    iconicQuote: "Finish the Fight. Master Chief e Arbiter per fermare il Profeta della Verità.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Halo_3_final_boxshot.JPG",
    franchise: "Halo",
    pegi: "PEGI 16",
    gameModes: ["Giocatore singolo", "Co-op online", "Online PvP"]
  },
  {
    id: "god-of-war-3",
    title: "God of War III",
    developer: "Santa Monica Studio",
    releaseYear: 2010,
    genres: ["Action-Adventure", "Hack and Slash"],
    themes: ["Mitologia Greca", "Monte Olimpo", "Vendetta contro Zeus"],
    perspective: "3a Persona",
    mainPlatform: "PlayStation",
    platforms: ["PS3", "PS4"],
    iconicQuote: "Alla fine ci sarà solo il Caos! Kratos scala l'Olimpo sui Titani per sterminare gli dei.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e5/God_of_War_III_cover.jpg",
    franchise: "God of War",
    pegi: "PEGI 18",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "shenmue-2",
    title: "Shenmue II",
    developer: "SEGA AM2",
    releaseYear: 2001,
    genres: ["Avventura Open World", "Picchiaduro 3D"],
    themes: ["Hong Kong Anni 80", "Arti Marziali", "Cultura Cinese"],
    perspective: "3a Persona",
    mainPlatform: "Xbox",
    platforms: ["Dreamcast", "Xbox", "PS4", "Xbox One", "PC"],
    iconicQuote: "Ryo Hazuki sbarca a Hong Kong seguendo le tracce di Lan Di e degli Specchi.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/Shenmue_II_Cover_Art.jpg",
    franchise: "Shenmue",
    pegi: "PEGI 12",
    gameModes: ["Giocatore singolo"]
  },
  {
    id: "persona-3-reload",
    title: "Persona 3 Reload",
    developer: "Atlus",
    releaseYear: 2024,
    genres: ["JRPG", "A turni", "Simulazione Sociale"],
    themes: ["Ora Buia", "Morte ed Esistenza", "Scolastico", "Torre del Tartaro"],
    perspective: "3a Persona",
    mainPlatform: "PC / Multi",
    platforms: ["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S"],
    iconicQuote: "Memento Mori. Evoca la tua Persona durante l'Ora Buia a mezzanotte.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b3/Persona_3_Reload_cover_art.png",
    franchise: "Persona / Megami Tensei",
    pegi: "PEGI 16",
    gameModes: ["Giocatore singolo"]
  }
];

// Read existing igdbTop100Games
const raw = fs.readFileSync('./src/data/igdbTop100Games.ts', 'utf8');
const games = eval(raw.replace(/import.*?;/, "").replace(/export interface.*?}/s, "").replace(/export const IGDB_TOP_100_GAMES.*?=\s*/, ""));

const updatedGames = games.map(g => {
  const c = consoleMapping[g.id] || {};
  const { esrb, ...cleanGame } = g; // remove esrb
  return {
    ...cleanGame,
    platforms: c.platforms || g.platforms || [g.mainPlatform],
    pegi: c.pegi || g.pegi || "PEGI 16"
  };
});

const outputCode = `import { VideoGameItem } from '../types';

export interface IgdbGameItem extends VideoGameItem {
  igdbRating: number;
  igdbUrl: string;
}

export const IGDB_TOP_100_GAMES: IgdbGameItem[] = ${JSON.stringify(updatedGames, null, 2)};

export const EXTRA_FRANCHISE_SEARCH_GAMES: VideoGameItem[] = ${JSON.stringify(extraFranchise, null, 2)};

// Complete searchable catalog including all top 100 masterpieces and famous franchise titles
export const ALL_SEARCHABLE_GAMES: VideoGameItem[] = [
  ...IGDB_TOP_100_GAMES,
  ...EXTRA_FRANCHISE_SEARCH_GAMES
];
`;

fs.writeFileSync('./src/data/igdbTop100Games.ts', outputCode, 'utf8');
console.log('Successfully updated IGDB Top 100 with specific consoles and pure PEGI!');
