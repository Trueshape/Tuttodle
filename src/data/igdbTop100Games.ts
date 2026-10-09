import { VideoGameItem } from '../types';
import { ALL_CONSOLE_GAMES } from './consoles';

export interface IgdbGameItem extends VideoGameItem {
  igdbRating: number;
  igdbUrl: string;
}

export const IGDB_TOP_100_GAMES: IgdbGameItem[] = [
  {
    "id": "zelda-ocarina-of-time",
    "title": "The Legend of Zelda: Ocarina of Time",
    "developer": "Nintendo",
    "releaseYear": 1998,
    "genres": [
      "Azione",
      "Avventura"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "La spada suprema nel Tempio del Tempo, l'Ocarina e il viaggio temporale di Link per salvare Hyrule.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_Time.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 96,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-ocarina-of-time",
    "themes": [
      "Fantasy",
      "Viaggi nel tempo",
      "Magia"
    ],
    "platforms": [
      "N64",
      "GameCube",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "super-mario-64",
    "title": "Super Mario 64",
    "developer": "Nintendo",
    "releaseYear": 1996,
    "genres": [
      "Platform 3D",
      "Azione"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "It's-a me, Mario! Il capolavoro che ha rivoluzionato il platform 3D nel castello della Principessa Peach.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/e9/Super_Mario_64.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/super-mario-64",
    "themes": [
      "Fantasy",
      "Commedia"
    ],
    "platforms": [
      "N64",
      "Nintendo DS",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "the-witcher-3-wild-hunt",
    "title": "The Witcher 3: Wild Hunt",
    "developer": "CD Projekt Red",
    "releaseYear": 2015,
    "genres": [
      "Action RPG",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il male è male. Minore, maggiore, medio... Geralt di Rivia sulle tracce di Ciri e della Caccia Selvaggia.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/the-witcher-3-wild-hunt",
    "themes": [
      "Dark Fantasy",
      "Mitologia Slava",
      "Magia"
    ],
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Witcher",
    "gameType": "Normale"
  },
  {
    "id": "chrono-trigger",
    "title": "Chrono Trigger",
    "developer": "Square",
    "releaseYear": 1995,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Crono, Lucca e Marle attraverso epoche storiche per fermare la minaccia cosmica di Lavos.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/a/a7/Chrono_Trigger.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/chrono-trigger",
    "themes": [
      "Fantascienza",
      "Viaggi nel tempo",
      "Fantasy"
    ],
    "platforms": [
      "SNES",
      "PS1",
      "Nintendo DS",
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Chrono",
    "gameType": "Normale"
  },
  {
    "id": "portal-2",
    "title": "Portal 2",
    "developer": "Valve",
    "releaseYear": 2011,
    "genres": [
      "Rompicapo",
      "FPS"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "La torta è una bugia! GLaDOS, Wheatley e la pistola spara-portali nei laboratori Aperture Science.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/f9/Portal2cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/portal-2",
    "themes": [
      "Fantascienza",
      "Commedia",
      "Distopico"
    ],
    "platforms": [
      "PC",
      "PS3",
      "Xbox 360",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "franchise": "Portal",
    "gameType": "Normale"
  },
  {
    "id": "baldurs-gate-3",
    "title": "Baldur's Gate 3",
    "developer": "Larian Studios",
    "releaseYear": 2023,
    "genres": [
      "CRPG",
      "A turni"
    ],
    "perspective": "Isometrica",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il girino Illithid che scava nella mente. L'avventura D&D che ha conquistato il mondo con scelte morali assolute.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/12/Baldur%27s_Gate_3_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 96,
    "igdbUrl": "https://www.igdb.com/games/baldurs-gate-3",
    "themes": [
      "High Fantasy",
      "D&D",
      "Magia"
    ],
    "platforms": [
      "PC",
      "PS5",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "franchise": "Baldur's Gate",
    "gameType": "Normale"
  },
  {
    "id": "red-dead-redemption-2",
    "title": "Red Dead Redemption 2",
    "developer": "Rockstar Games",
    "releaseYear": 2018,
    "genres": [
      "Action-Adventure",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Arthur Morgan e la banda di Dutch van der Linde nell'epilogo cruento del selvaggio Far West nel 1899.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/red-dead-redemption-2",
    "themes": [
      "Western",
      "Storico",
      "Drammatico"
    ],
    "platforms": [
      "PS4",
      "Xbox One",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Online PvP"
    ],
    "franchise": "Red Dead",
    "gameType": "Normale"
  },
  {
    "id": "zelda-breath-of-the-wild",
    "title": "The Legend of Zelda: Breath of the Wild",
    "developer": "Nintendo",
    "releaseYear": 2017,
    "genres": [
      "Action-Adventure",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Svegliati, Link... Un'infinita libertà esplorativa attraverso i sacrari di Hyrule contro la Calamità Ganon.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild",
    "themes": [
      "Fantasy",
      "Post-Apocalittico"
    ],
    "platforms": [
      "Wii U",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "elden-ring",
    "title": "Elden Ring",
    "developer": "FromSoftware",
    "releaseYear": 2022,
    "genres": [
      "Action RPG",
      "Soulslike",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Sia lodata la Grazia, Senzaluce! Conquista l'Anello ancestrale nell'Interregno ideato da Miyazaki e George R.R. Martin.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/elden-ring",
    "themes": [
      "Dark Fantasy",
      "Mitologico"
    ],
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Soulsborne",
    "gameType": "Normale"
  },
  {
    "id": "half-life-2",
    "title": "Half-Life 2",
    "developer": "Valve",
    "releaseYear": 2004,
    "genres": [
      "FPS",
      "Azione"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Gordon Freeman, il piede di porco, la Gravity Gun e City 17 sotto il giogo dei Combine.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/2/25/Half-Life_2_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 95,
    "igdbUrl": "https://www.igdb.com/games/half-life-2",
    "themes": [
      "Fantascienza",
      "Distopico",
      "Alieni"
    ],
    "platforms": [
      "PC",
      "Xbox",
      "Xbox 360",
      "PS3"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Half-Life",
    "gameType": "Normale"
  },
  {
    "id": "metal-gear-solid",
    "title": "Metal Gear Solid",
    "developer": "Konami",
    "releaseYear": 1998,
    "genres": [
      "Stealth",
      "Azione"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Solid Snake infiltrato nell'isola di Shadow Moses. Psycho Mantis, Liquid Snake e il Metal Gear REX.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/3/33/Metal_Gear_Solid_cover_art.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/metal-gear-solid",
    "themes": [
      "Spionaggio Militare",
      "Cyberpunk",
      "Guerra Fredda"
    ],
    "platforms": [
      "PS1",
      "PC"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metal Gear",
    "gameType": "Normale"
  },
  {
    "id": "final-fantasy-vii",
    "title": "Final Fantasy VII",
    "developer": "Square",
    "releaseYear": 1997,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Cloud Strife, la Buster Sword, la Shinra a Midgar e l'iconico scontro finale con Sephiroth.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/final-fantasy-vii",
    "themes": [
      "Cyberpunk",
      "Sci-Fi",
      "Ecologia",
      "Fantasy"
    ],
    "platforms": [
      "PS1",
      "PC",
      "PS4",
      "Switch",
      "Xbox One"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Final Fantasy",
    "gameType": "Normale"
  },
  {
    "id": "super-metroid",
    "title": "Super Metroid",
    "developer": "Nintendo",
    "releaseYear": 1994,
    "genres": [
      "Metroidvania",
      "Platform 2D",
      "Azione"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Samus Aran atterra sul pianeta Zebes alla ricerca dell'ultimo cucciolo di Metroid rubato da Ridley.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/super-metroid",
    "themes": [
      "Fantascienza",
      "Spaziale",
      "Alieni",
      "Isolamento"
    ],
    "platforms": [
      "SNES",
      "Switch"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metroid",
    "gameType": "Normale"
  },
  {
    "id": "castlevania-symphony-of-the-night",
    "title": "Castlevania: Symphony of the Night",
    "developer": "Konami",
    "releaseYear": 1997,
    "genres": [
      "Metroidvania",
      "Action RPG"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PlayStation",
    "iconicQuote": "What is a man? A miserable little pile of secrets! Alucard esplora il castello capovolto di Dracula.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/cf/Castlevania_SOTN_PAL.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/castlevania-symphony-of-the-night",
    "themes": [
      "Horror Gotico",
      "Vampiri",
      "Dark Fantasy"
    ],
    "platforms": [
      "PS1",
      "Xbox 360",
      "PS4"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Castlevania",
    "gameType": "Normale"
  },
  {
    "id": "resident-evil-4",
    "title": "Resident Evil 4",
    "developer": "Capcom",
    "releaseYear": 2005,
    "genres": [
      "Survival Horror",
      "Sparatutto in 3a"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Leon S. Kennedy in missione in un tetro villaggio spagnolo per salvare la figlia del presidente rapita dai Los Illuminados.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d9/Resi4-gc-cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/resident-evil-4",
    "themes": [
      "Horror",
      "Occulto",
      "Bioterrorismo",
      "Cospirazione"
    ],
    "platforms": [
      "GameCube",
      "PS2",
      "Wii",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Resident Evil",
    "gameType": "Normale"
  },
  {
    "id": "bioshock",
    "title": "BioShock",
    "developer": "Irrational Games",
    "releaseYear": 2007,
    "genres": [
      "FPS",
      "Immersive Sim"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Per favore, saresti così gentile? Andrew Ryan, i Big Daddy e la città sottomarina decaduta di Rapture.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/6d/BioShock_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/bioshock",
    "themes": [
      "Distopico",
      "Sci-Fi Retrò",
      "Filosofico",
      "Sottomarino"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "BioShock",
    "gameType": "Normale"
  },
  {
    "id": "mass-effect-2",
    "title": "Mass Effect 2",
    "developer": "BioWare",
    "releaseYear": 2010,
    "genres": [
      "Action RPG",
      "Sparatutto in 3a"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Comandante Shepard recluta una squadra leggendaria a bordo della Normandy per la missione suicida contro i Collettori.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/05/MassEffect2_cover.PNG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/mass-effect-2",
    "themes": [
      "Space Opera",
      "Fantascienza",
      "Alieni",
      "Politica Galattica"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Mass Effect",
    "gameType": "Normale"
  },
  {
    "id": "bloodborne",
    "title": "Bloodborne",
    "developer": "FromSoftware",
    "releaseYear": 2015,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Temi il sangue antico. Una notte di caccia senza fine per le strade maledette di Yharnam e gli orrori cosmici.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/bloodborne",
    "themes": [
      "Horror Gotico",
      "Cosmic Horror",
      "Lovecraftiano"
    ],
    "platforms": [
      "PS4"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Soulsborne",
    "gameType": "Normale"
  },
  {
    "id": "dark-souls",
    "title": "Dark Souls",
    "developer": "FromSoftware",
    "releaseYear": 2011,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Praise the Sun! Il Non-morto prescelto, il falò e il destino della Prima Fiamma nel regno di Lordran.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/dark-souls",
    "themes": [
      "Dark Fantasy",
      "Medievale",
      "Maledizione"
    ],
    "platforms": [
      "PS3",
      "Xbox 360",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Soulsborne",
    "gameType": "Normale"
  },
  {
    "id": "shadow-of-the-colossus",
    "title": "Shadow of the Colossus",
    "developer": "Team Ico",
    "releaseYear": 2005,
    "genres": [
      "Action-Adventure",
      "Boss Rush"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Wander e il fedele cavallo Agro abbattono sedici maestosi colossi per resuscitare la giovane Mono.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/f8/Shadow_of_the_Colossus_%282005%29_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/shadow-of-the-colossus",
    "themes": [
      "Fantasy Minimalista",
      "Tragico",
      "Miti Antichi"
    ],
    "platforms": [
      "PS2",
      "PS3",
      "PS4"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Team Ico",
    "gameType": "Normale"
  },
  {
    "id": "god-of-war-2018",
    "title": "God of War (2018)",
    "developer": "Santa Monica Studio",
    "releaseYear": 2018,
    "genres": [
      "Action-Adventure",
      "Hack and Slash"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Ragazzo! Kratos e suo figlio Atreus con l'ascia Leviatano attraverso i nove regni della mitologia nordica.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/god-of-war--1",
    "themes": [
      "Mitologia Norrena",
      "Dramma Familiare",
      "Dei"
    ],
    "platforms": [
      "PS4",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "God of War",
    "gameType": "Normale"
  },
  {
    "id": "the-last-of-us",
    "title": "The Last of Us",
    "developer": "Naughty Dog",
    "releaseYear": 2013,
    "genres": [
      "Action-Adventure",
      "Survival"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Joel ed Ellie attraversano un'America straziata dall'infezione da Cordyceps e dagli infetti Clicker.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/the-last-of-us",
    "themes": [
      "Post-Apocalittico",
      "Drammatico",
      "Infezione Fungina"
    ],
    "platforms": [
      "PS3",
      "PS4",
      "PS5",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Online PvP"
    ],
    "franchise": "The Last of Us",
    "gameType": "Normale"
  },
  {
    "id": "the-last-of-us-part-2",
    "title": "The Last of Us Part II",
    "developer": "Naughty Dog",
    "releaseYear": 2020,
    "genres": [
      "Action-Adventure",
      "Stealth",
      "Survival"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Il ciclo implacabile della vendetta e del trauma che contrappone Ellie e Abby tra le rovine di Seattle.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/the-last-of-us-part-ii",
    "themes": [
      "Post-Apocalittico",
      "Vendetta",
      "Drammatico"
    ],
    "platforms": [
      "PS4",
      "PS5"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Last of Us",
    "gameType": "Normale"
  },
  {
    "id": "persona-5-royal",
    "title": "Persona 5 Royal",
    "developer": "Atlus",
    "releaseYear": 2019,
    "genres": [
      "JRPG",
      "A turni",
      "Simulazione Sociale"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "I Phantom Thieves rubano i desideri corrotti nei Palazzi psichici di Tokyo per risvegliare i cuori.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b0/Persona_5_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/persona-5-royal",
    "themes": [
      "Scolastico",
      "Ladri Fantasma",
      "Psicologia",
      "Anime"
    ],
    "platforms": [
      "PS4",
      "PS5",
      "Switch",
      "Xbox One",
      "Xbox Series X/S",
      "PC"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Persona / Megami Tensei",
    "gameType": "Normale"
  },
  {
    "id": "silent-hill-2",
    "title": "Silent Hill 2",
    "developer": "Konami",
    "releaseYear": 2001,
    "genres": [
      "Survival Horror",
      "Avventura Psicologica"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Una lettera dalla moglie defunta porta James Sunderland nella nebbiosa cittadina di Silent Hill contro Pyramid Head.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/95/Silent_Hill_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/silent-hill-2",
    "themes": [
      "Horror Psicologico",
      "Senso di Colpa",
      "Nebbia",
      "Occulto"
    ],
    "platforms": [
      "PS2",
      "Xbox",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Silent Hill",
    "gameType": "Normale"
  },
  {
    "id": "gta-san-andreas",
    "title": "Grand Theft Auto: San Andreas",
    "developer": "Rockstar Games",
    "releaseYear": 2004,
    "genres": [
      "Action-Adventure",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Ah shit, here we go again. Carl \"CJ\" Johnson ritorna a Los Santos per riunire la famiglia dei Grove Street.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/c4/GTASABOX.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/grand-theft-auto-san-andreas",
    "themes": [
      "Crime",
      "Gangster Anni 90",
      "Urbano",
      "Satira Sociale"
    ],
    "platforms": [
      "PS2",
      "Xbox",
      "PC",
      "Xbox 360",
      "PS3"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Grand Theft Auto",
    "gameType": "Normale"
  },
  {
    "id": "gta-v",
    "title": "Grand Theft Auto V",
    "developer": "Rockstar Games",
    "releaseYear": 2013,
    "genres": [
      "Action-Adventure",
      "Open World"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Tre vite criminali intrecciate tra rapine kolossal a Los Santos: Michael, Trevor e Franklin.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/grand-theft-auto-v",
    "themes": [
      "Crime",
      "Rapine",
      "Satira Moderna",
      "Urbano"
    ],
    "platforms": [
      "PS3",
      "Xbox 360",
      "PS4",
      "Xbox One",
      "PC",
      "PS5",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Online PvP",
      "Co-op online"
    ],
    "franchise": "Grand Theft Auto",
    "gameType": "Normale"
  },
  {
    "id": "halo-combat-evolved",
    "title": "Halo: Combat Evolved",
    "developer": "Bungie",
    "releaseYear": 2001,
    "genres": [
      "FPS",
      "Azione"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Xbox",
    "iconicQuote": "Master Chief e Cortana atterrano sulla misteriosa installazione ad anello aliena Halo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/halo-combat-evolved",
    "themes": [
      "Fantascienza Militare",
      "Guerra Aliena",
      "Space Opera"
    ],
    "platforms": [
      "Xbox",
      "PC",
      "Xbox 360",
      "Xbox One"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Multiplayer"
    ],
    "franchise": "Halo",
    "gameType": "Normale"
  },
  {
    "id": "halo-2",
    "title": "Halo 2",
    "developer": "Bungie",
    "releaseYear": 2004,
    "genres": [
      "FPS",
      "Azione"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Xbox",
    "iconicQuote": "La guerra contro i Covenant raggiunge la Terra, con la prospettiva divisa tra Master Chief e l'Arbiter.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/92/Halo2-cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/halo-2",
    "themes": [
      "Fantascienza Militare",
      "Guerra Aliena",
      "Covenant"
    ],
    "platforms": [
      "Xbox",
      "PC",
      "Xbox One"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Halo",
    "gameType": "Normale"
  },
  {
    "id": "street-fighter-2",
    "title": "Street Fighter II",
    "developer": "Capcom",
    "releaseYear": 1991,
    "genres": [
      "Picchiaduro 2D",
      "Arcade"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Hadouken! Shoryuken! Ryu, Ken e Chun-Li definiscono per sempre la storia dei picchiaduro mondiali.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/1d/SF2_JPN_flyer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/street-fighter-ii-the-world-warrior",
    "themes": [
      "Arti Marziali",
      "Torneo Mondiale",
      "Combattimento"
    ],
    "platforms": [
      "SNES",
      "Mega Drive",
      "PS1",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer",
      "Online PvP"
    ],
    "franchise": "Street Fighter",
    "gameType": "Normale"
  },
  {
    "id": "doom-1993",
    "title": "DOOM (1993)",
    "developer": "id Software",
    "releaseYear": 1993,
    "genres": [
      "FPS",
      "Azione Boomer Shooter"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Doomguy massacra le orde demoniache spalancatesi dai portali infernali sulle lune di Marte.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/doom",
    "themes": [
      "Demoni",
      "Inferno",
      "Sci-Fi Spaziale",
      "Gore"
    ],
    "platforms": [
      "PC",
      "SNES",
      "PS1",
      "Switch",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "DOOM",
    "gameType": "Normale"
  },
  {
    "id": "deus-ex",
    "title": "Deus Ex",
    "developer": "Ion Storm",
    "releaseYear": 2000,
    "genres": [
      "Action RPG",
      "Immersive Sim",
      "FPS"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "JC Denton, aumentazioni nanotecnologiche e teorie del complotto globale tra gli Illuminati e l'Area 51.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/ba/Deus_Ex_%28game_box_art%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/deus-ex",
    "themes": [
      "Cyberpunk",
      "Cospirazioni",
      "Transumanesimo",
      "Distopico"
    ],
    "platforms": [
      "PC",
      "PS2"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Deus Ex",
    "gameType": "Normale"
  },
  {
    "id": "disco-elysium",
    "title": "Disco Elysium",
    "developer": "ZA/UM",
    "releaseYear": 2019,
    "genres": [
      "CRPG",
      "Avventura Narrativa"
    ],
    "perspective": "Isometrica",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Un detective amnesico in hangover indaga su un linciaggio nel quartiere decadente di Martinaise.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/0d/Disco_Elysium_Poster.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/disco-elysium",
    "themes": [
      "Investigativo",
      "Noir",
      "Filosofico",
      "Politica",
      "Drammatico"
    ],
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Disco Elysium",
    "gameType": "Normale"
  },
  {
    "id": "metroid-prime",
    "title": "Metroid Prime",
    "developer": "Retro Studios",
    "releaseYear": 2002,
    "genres": [
      "Action-Adventure",
      "FPS",
      "Esplorazione"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Samus Aran atterra su Tallon IV: scansione ambientale ed esplorazione in prima persona mozzafiato.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/ba/MetroidPrimebox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/metroid-prime",
    "themes": [
      "Fantascienza",
      "Spaziale",
      "Rovine Antiche",
      "Isolamento"
    ],
    "platforms": [
      "GameCube",
      "Wii",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metroid",
    "gameType": "Normale"
  },
  {
    "id": "hollow-knight",
    "title": "Hollow Knight",
    "developer": "Team Cherry",
    "releaseYear": 2017,
    "genres": [
      "Metroidvania",
      "Action",
      "Soulslike"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Un piccolo cavaliere silenzioso esplora le rovine sotterranee del regno di insetti infetti di Nidosacro.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/de/Hollow_Knight_2026_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/hollow-knight",
    "themes": [
      "Dark Fantasy",
      "Insetti",
      "Regno Dimenticato",
      "Mistero"
    ],
    "platforms": [
      "PC",
      "Switch",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Hollow Knight",
    "gameType": "Normale"
  },
  {
    "id": "hades",
    "title": "Hades",
    "developer": "Supergiant Games",
    "releaseYear": 2020,
    "genres": [
      "Roguelike",
      "Action RPG",
      "Hack and Slash"
    ],
    "perspective": "Isometrica",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Zagreus, principe degli Inferi, tenta di fuggire dal regno di suo padre Ade con l'aiuto degli dèi dell'Olimpo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/hades",
    "themes": [
      "Mitologia Greca",
      "Oltretomba",
      "Dei dell'Olimpo"
    ],
    "platforms": [
      "PC",
      "Switch",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Hades",
    "gameType": "Normale"
  },
  {
    "id": "okami",
    "title": "Okami",
    "developer": "Clover Studio",
    "releaseYear": 2006,
    "genres": [
      "Action-Adventure"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "La dea del sole Amaterasu sotto forma di lupo bianco dipinge il mondo con il pennello celestiale.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/be/OkamiNTSCcoverFinal.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/okami",
    "themes": [
      "Mitologia Giapponese",
      "Folklore",
      "Arte Sumi-e",
      "Dei"
    ],
    "platforms": [
      "PS2",
      "Wii",
      "PS3",
      "PS4",
      "Xbox One",
      "Switch",
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Okami",
    "gameType": "Normale"
  },
  {
    "id": "super-mario-galaxy",
    "title": "Super Mario Galaxy",
    "developer": "Nintendo",
    "releaseYear": 2007,
    "genres": [
      "Platform 3D"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Mario viaggia tra pianeti sferici curvando la gravità con la Principessa Rosalinda e i dolci Sfavillotti.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/76/SuperMarioGalaxy.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/super-mario-galaxy",
    "themes": [
      "Spaziale",
      "Gravità Cosmica",
      "Fantasy",
      "Fiabesco"
    ],
    "platforms": [
      "Wii",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Co-op Locale"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "super-mario-galaxy-2",
    "title": "Super Mario Galaxy 2",
    "developer": "Nintendo",
    "releaseYear": 2010,
    "genres": [
      "Platform 3D"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "L'astronave Mario e il dinosauro Yoshi cavalcano verso nuove galassie cosmiche piene di stelle.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/65/Super_Mario_Galaxy_2_Box_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/super-mario-galaxy-2",
    "themes": [
      "Spaziale",
      "Fantasy",
      "Cosmico"
    ],
    "platforms": [
      "Wii"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Co-op Locale"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "chrono-cross",
    "title": "Chrono Cross",
    "developer": "Square",
    "releaseYear": 1999,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Serge scivola tra due mondi paralleli nell'arcipelago tropicale di El Nido con oltre quaranta compagni.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/9a/Chronocrossbox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/chrono-cross",
    "themes": [
      "Dimensioni Parallele",
      "Fantasy Tropicale",
      "Destino"
    ],
    "platforms": [
      "PS1",
      "Switch",
      "PS4",
      "Xbox One",
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Chrono",
    "gameType": "Normale"
  },
  {
    "id": "final-fantasy-vi",
    "title": "Final Fantasy VI",
    "developer": "Square",
    "releaseYear": 1994,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Terra Branford, Locke, il folle Kefka Palazzo e l'apocalisse che spacca in due il Mondo dell'Equilibrio.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/0/05/Final_Fantasy_VI.jpg/330px-Final_Fantasy_VI.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/final-fantasy-vi",
    "themes": [
      "Steampunk",
      "Magia vs Tecnologia",
      "Apocalittico"
    ],
    "platforms": [
      "SNES",
      "PS1",
      "GBA",
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Final Fantasy",
    "gameType": "Normale"
  },
  {
    "id": "final-fantasy-ix",
    "title": "Final Fantasy IX",
    "developer": "Square",
    "releaseYear": 2000,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Gidan Tribal, la principessa Garnet e il tenero mago nero Vivi riscoprono il significato dell'esistenza.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/51/Ffixbox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/final-fantasy-ix",
    "themes": [
      "High Fantasy Medievale",
      "Esistenzialismo",
      "Fiabesco"
    ],
    "platforms": [
      "PS1",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Final Fantasy",
    "gameType": "Normale"
  },
  {
    "id": "final-fantasy-x",
    "title": "Final Fantasy X",
    "developer": "Square",
    "releaseYear": 2001,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Questa è la mia storia! Tidus e l'invocatrice Yuna nel pellegrinaggio a Spira contro la calamità Sin.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/a/a7/Ffxboxart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/final-fantasy-x",
    "themes": [
      "Fantasy Asiatico",
      "Pellegrinaggio Religioso",
      "Dramma"
    ],
    "platforms": [
      "PS2",
      "PS3",
      "PS4",
      "PC",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Final Fantasy",
    "gameType": "Normale"
  },
  {
    "id": "system-shock-2",
    "title": "System Shock 2",
    "developer": "Irrational Games",
    "releaseYear": 1999,
    "genres": [
      "Action RPG",
      "Immersive Sim",
      "FPS"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "L'IA malvagia SHODAN manipola il protagonista a bordo dell'astronave infetta Von Braun.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/91/Systemshock2box.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/system-shock-2",
    "themes": [
      "Cyberpunk",
      "Horror Spaziale",
      "Intelligenza Artificiale"
    ],
    "platforms": [
      "PC"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "franchise": "System Shock",
    "gameType": "Normale"
  },
  {
    "id": "grim-fandango",
    "title": "Grim Fandango",
    "developer": "LucasArts",
    "releaseYear": 1998,
    "genres": [
      "Avventura Grafica",
      "Point and Click",
      "Rompicapo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Manny Calavera, agente di viaggio nel Giorno dei Morti messicano, svela una cospirazione di anime.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/76/Grim_Fandango_artwork.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/grim-fandango",
    "themes": [
      "Noir",
      "Giorno dei Morti Messicano",
      "Commedia Cinematografica"
    ],
    "platforms": [
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Grim Fandango",
    "gameType": "Normale"
  },
  {
    "id": "kotor",
    "title": "Star Wars: Knights of the Old Republic",
    "developer": "BioWare",
    "releaseYear": 2003,
    "genres": [
      "CRPG",
      "Action RPG"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "La spada laser, la Forza e il colpo di scena leggendario dell'identità del Signore dei Sith Darth Revan.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/9/94/Star_Wars_Knights_of_the_Old_Republic_logo.png/330px-Star_Wars_Knights_of_the_Old_Republic_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/star-wars-knights-of-the-old-republic",
    "themes": [
      "Space Opera",
      "Jedi vs Sith",
      "Morale Lato Oscuro / Chiaro"
    ],
    "platforms": [
      "PC",
      "Xbox",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Star Wars",
    "gameType": "Normale"
  },
  {
    "id": "fallout-new-vegas",
    "title": "Fallout: New Vegas",
    "developer": "Obsidian Entertainment",
    "releaseYear": 2010,
    "genres": [
      "Action RPG",
      "FPS",
      "Open World"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Corriere sopravvissuto a un proiettile in testa decide il destino della diga di Hoover e di New Vegas.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/commons/4/43/Free_depiction_of_the_Fallout_New_Vegas_Xbox_360_box_art_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/fallout-new-vegas",
    "themes": [
      "Post-Apocalittico",
      "Western Retrò",
      "Fazioni Politiche"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Fallout",
    "gameType": "Normale"
  },
  {
    "id": "skyrim",
    "title": "The Elder Scrolls V: Skyrim",
    "developer": "Bethesda Game Studios",
    "releaseYear": 2011,
    "genres": [
      "Action RPG",
      "Open World"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Fus Ro Dah! Il Sangue di Drago (Dovahkiin) risveglia l'urlo degli antichi contro il drago Alduin.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/the-elder-scrolls-v-skyrim",
    "themes": [
      "High Fantasy Medievale",
      "Draghi",
      "Mitologia Norrena",
      "Guerra Civile"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "PS4",
      "Xbox One",
      "Switch",
      "PS5",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Elder Scrolls",
    "gameType": "Normale"
  },
  {
    "id": "morrowind",
    "title": "The Elder Scrolls III: Morrowind",
    "developer": "Bethesda Game Studios",
    "releaseYear": 2002,
    "genres": [
      "Action RPG",
      "Open World"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Nerevarine approda sull'isola vulcanica aliena di Vvardenfell tra i dunmer e la Montagna Rossa.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/53/MorrowindCOVER.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/the-elder-scrolls-iii-morrowind",
    "themes": [
      "Dark Fantasy Esotico",
      "Politica Teocratica",
      "Profezia"
    ],
    "platforms": [
      "PC",
      "Xbox"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Elder Scrolls",
    "gameType": "Normale"
  },
  {
    "id": "pokemon-rosso-blu",
    "title": "Pokémon Rosso e Blu",
    "developer": "Game Freak",
    "releaseYear": 1996,
    "genres": [
      "JRPG",
      "Collezione Mostri"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Gotta catch 'em all! Biancavilla, il Professor Oak e la scelta tra Bulbasaur, Charmander e Squirtle.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/a/af/Pok%C3%A9mon_Red_and_Blue_cover_art.webp",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/pokemon-red-version",
    "themes": [
      "Avventura Giovanile",
      "Collezionismo",
      "Torneo"
    ],
    "platforms": [
      "Game Boy",
      "Nintendo 3DS"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Pokémon",
    "gameType": "Normale"
  },
  {
    "id": "pokemon-oro-argento",
    "title": "Pokémon Oro e Argento",
    "developer": "Game Freak",
    "releaseYear": 1999,
    "genres": [
      "JRPG",
      "Collezione Mostri"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "La regione di Johto, il ciclo giorno/notte e l'incredibile ritorno a Kanto con la sfida sul Monte Argento contro Rosso.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/4c/Pok%C3%A9mon_box_art_-_Gold_Version.png",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/pokemon-gold-version",
    "themes": [
      "Avventura Giovanile",
      "Tradizione Giapponese",
      "Collezionismo"
    ],
    "platforms": [
      "Game Boy",
      "Nintendo 3DS"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Pokémon",
    "gameType": "Normale"
  },
  {
    "id": "diablo-2",
    "title": "Diablo II",
    "developer": "Blizzard Entertainment",
    "releaseYear": 2000,
    "genres": [
      "Action RPG",
      "Hack and Slash"
    ],
    "perspective": "Isometrica",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "L'Oscuro Viandante marcia verso oriente per liberare i Primi Maligni: Mephisto, Diablo e Baal.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/diablo-ii",
    "themes": [
      "Dark Fantasy",
      "Demoni",
      "Inferno",
      "Gothic Horror"
    ],
    "platforms": [
      "PC",
      "Switch",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Diablo",
    "gameType": "Normale"
  },
  {
    "id": "world-of-warcraft",
    "title": "World of Warcraft",
    "developer": "Blizzard Entertainment",
    "releaseYear": 2004,
    "genres": [
      "MMORPG",
      "Action RPG"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Per l'Orda! Per l'Alleanza! Il mondo di Azeroth apre le sue porte a milioni di eroi in tutto il pianeta.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/65/World_of_Warcraft.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/world-of-warcraft",
    "themes": [
      "High Fantasy",
      "Orchi vs Umani",
      "Guerra tra Fazioni"
    ],
    "platforms": [
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Multiplayer",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Warcraft",
    "gameType": "Normale"
  },
  {
    "id": "super-smash-bros-melee",
    "title": "Super Smash Bros. Melee",
    "developer": "HAL Laboratory",
    "releaseYear": 2001,
    "genres": [
      "Picchiaduro Platform",
      "Party Game"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Il picchiaduro Nintendo fulmineo su GameCube con Fox, Marth e il wave-dash tecnico più celebrato.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/75/Super_Smash_Bros_Melee_box_art.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/super-smash-bros-melee",
    "themes": [
      "Crossover Nintendo",
      "Competitivo"
    ],
    "platforms": [
      "GameCube"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Super Smash Bros.",
    "gameType": "Normale"
  },
  {
    "id": "super-smash-bros-ultimate",
    "title": "Super Smash Bros. Ultimate",
    "developer": "Bandai Namco / Sora",
    "releaseYear": 2018,
    "genres": [
      "Picchiaduro Platform",
      "Party Game"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Tutti sono qui! 89 lottatori leggendari si affrontano nella celebrazione definitiva del videogioco.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/super-smash-bros-ultimate",
    "themes": [
      "Crossover Gaming Globale",
      "Competitivo"
    ],
    "platforms": [
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer",
      "Online PvP"
    ],
    "franchise": "Super Smash Bros.",
    "gameType": "Normale"
  },
  {
    "id": "tekken-3",
    "title": "Tekken 3",
    "developer": "Namco",
    "releaseYear": 1997,
    "genres": [
      "Picchiaduro 3D",
      "Arcade"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Jin Kazama, Hwoarang, Eddy Gordo e il mostruoso Ogre nel torneo King of Iron Fist su PS1.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/7d/Tekken_3_flyer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/tekken-3",
    "themes": [
      "Arti Marziali",
      "Geni Demoniaci",
      "Torneo Mondiale"
    ],
    "platforms": [
      "PS1"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Tekken",
    "gameType": "Normale"
  },
  {
    "id": "crash-bandicoot-3",
    "title": "Crash Bandicoot: Warped",
    "developer": "Naughty Dog",
    "releaseYear": 1998,
    "genres": [
      "Platform 3D",
      "Azione"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Crash e Coco viaggiano tra ere storiche per raccogliere i cristalli del tempo contro Neo Cortex e Uka Uka.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/3/3e/Crash_Bandicoot_3_Warped_Original_Box_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/crash-bandicoot-warped",
    "themes": [
      "Viaggi nel tempo",
      "Commedia",
      "Cartoonesco"
    ],
    "platforms": [
      "PS1",
      "PS4",
      "Xbox One",
      "Switch",
      "PC"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Crash Bandicoot",
    "gameType": "Normale"
  },
  {
    "id": "spyro-2-riptos-rage",
    "title": "Spyro 2: Ripto's Rage!",
    "developer": "Insomniac Games",
    "releaseYear": 1999,
    "genres": [
      "Platform 3D",
      "Collezionismo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Il draghetto viola Spyro e Sparx finiscono nel regno di Avalar per salvare gli amici dal malvagio Ripto.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/91/Spyro_2_-_Ripto%27s_Rage%21_Coverart.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/spyro-2-riptos-rage",
    "themes": [
      "Fantasy Fiabesco",
      "Draghi",
      "Commedia"
    ],
    "platforms": [
      "PS1",
      "PS4",
      "Xbox One",
      "Switch",
      "PC"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Spyro the Dragon",
    "gameType": "Normale"
  },
  {
    "id": "tony-hawks-pro-skater-2",
    "title": "Tony Hawk's Pro Skater 2",
    "developer": "Neversoft",
    "releaseYear": 2000,
    "genres": [
      "Sportivo",
      "Skateboard Arcade"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Trick folli con il manual, colonna sonora punk-rock indimenticabile e il mito di Tony Hawk.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/41/Tony_Hawk%27s_Pro_Skater_2_cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/tony-hawks-pro-skater-2",
    "themes": [
      "Skate Culture",
      "Punk Rock Anni 2000",
      "Urbano"
    ],
    "platforms": [
      "PS1",
      "N64",
      "Dreamcast",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Tony Hawk's",
    "gameType": "Normale"
  },
  {
    "id": "celeste",
    "title": "Celeste",
    "developer": "Maddy Makes Games",
    "releaseYear": 2018,
    "genres": [
      "Platform 2D",
      "Precision Platformer"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Madeline affronta le sue ansie interiori scalando la ripida e suggestiva montagna di Celeste.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/960px-Celeste_box_art_full.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/celeste",
    "themes": [
      "Salute Mentale",
      "Superamento dei Limiti",
      "Montagna"
    ],
    "platforms": [
      "PC",
      "Switch",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Celeste",
    "gameType": "Normale"
  },
  {
    "id": "undertale",
    "title": "Undertale",
    "developer": "tobyfox",
    "releaseYear": 2015,
    "genres": [
      "JRPG",
      "Bullet Hell",
      "Rompicapo"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il gioco di ruolo dove non devi distruggere nessuno. Sans, Papyrus, Megalovania e la determinazione.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Undertale_cover.jpg",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/undertale",
    "themes": [
      "Meta-Narrativo",
      "Monstri Simpatici",
      "Filosofico",
      "Commedia"
    ],
    "platforms": [
      "PC",
      "PS4",
      "Switch",
      "Xbox One"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Undertale",
    "gameType": "Normale"
  },
  {
    "id": "zelda-a-link-to-the-past",
    "title": "The Legend of Zelda: A Link to the Past",
    "developer": "Nintendo",
    "releaseYear": 1991,
    "genres": [
      "Action-Adventure"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Il passaggio tra il Mondo della Luce e il Mondo delle Tenebre che ha fissato la formula di Zelda.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg/330px-The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-a-link-to-the-past",
    "themes": [
      "High Fantasy",
      "Mondo della Luce / Oscurità",
      "Magia"
    ],
    "platforms": [
      "SNES",
      "GBA",
      "Switch"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "zelda-majoras-mask",
    "title": "The Legend of Zelda: Majora's Mask",
    "developer": "Nintendo",
    "releaseYear": 2000,
    "genres": [
      "Action-Adventure"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Hai incontrato un destino terribile, vero? Tre giorni per fermare la caduta della luna su Termina.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg/330px-The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-majoras-mask",
    "themes": [
      "Dark Fantasy",
      "Loop Temporale di 3 Giorni",
      "Maschere",
      "Fine del Mondo"
    ],
    "platforms": [
      "N64",
      "GameCube",
      "Nintendo 3DS",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "zelda-wind-waker",
    "title": "The Legend of Zelda: The Wind Waker",
    "developer": "Nintendo",
    "releaseYear": 2002,
    "genres": [
      "Action-Adventure"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Toon Link e il Re dei Leoni Rossi salpano sul Grande Mare con la Bacchetta del Vento.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-the-wind-waker",
    "themes": [
      "Fantasy Cel-Shading",
      "Esplorazione Oceanica",
      "Pirati"
    ],
    "platforms": [
      "GameCube",
      "Wii U"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "zelda-tears-of-the-kingdom",
    "title": "The Legend of Zelda: Tears of the Kingdom",
    "developer": "Nintendo",
    "releaseYear": 2023,
    "genres": [
      "Action-Adventure",
      "Open World",
      "Fisica Creativa"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Dalle Isole Celesti al sottosuolo di Hyrule: il potere dell'Ultramano per forgiare veicoli e armi incredibili.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/the-legend-of-zelda-tears-of-the-kingdom",
    "themes": [
      "Fantasy",
      "Isole Celesti",
      "Costruzione e Fusione"
    ],
    "platforms": [
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "The Legend of Zelda",
    "gameType": "Normale"
  },
  {
    "id": "metal-gear-solid-3",
    "title": "Metal Gear Solid 3: Snake Eater",
    "developer": "Konami",
    "releaseYear": 2004,
    "genres": [
      "Stealth",
      "Action-Adventure",
      "Survival"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Naked Snake nella giungla sovietica durante la Guerra Fredda fino al commovente duello con The Boss.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b3/Mgs3box.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/metal-gear-solid-3-snake-eater",
    "themes": [
      "Guerra Fredda 1964",
      "Spionaggio Sovietico",
      "Giungla",
      "Patriottismo"
    ],
    "platforms": [
      "PS2",
      "PS3",
      "Xbox 360",
      "PS5",
      "Xbox Series X/S",
      "PC",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metal Gear",
    "gameType": "Normale"
  },
  {
    "id": "metal-gear-solid-2",
    "title": "Metal Gear Solid 2: Sons of Liberty",
    "developer": "Konami",
    "releaseYear": 2001,
    "genres": [
      "Stealth",
      "Action-Adventure"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "La Big Shell, Raiden e la preveggente riflessione di Kojima sull'era digitale e la disinformazione.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/6a/Metalgear2boxart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/metal-gear-solid-2-sons-of-liberty",
    "themes": [
      "Postmodernismo",
      "Controllo Informazioni",
      "Cospirazione IA"
    ],
    "platforms": [
      "PS2",
      "Xbox",
      "PC",
      "PS3",
      "Xbox 360",
      "PS5",
      "Xbox Series X/S",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metal Gear",
    "gameType": "Normale"
  },
  {
    "id": "resident-evil-2-original",
    "title": "Resident Evil 2 (1998)",
    "developer": "Capcom",
    "releaseYear": 1998,
    "genres": [
      "Survival Horror"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "La stazione di polizia di Raccoon City invasa dai non-morti con Leon S. Kennedy e Claire Redfield.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/40/NTSC_Resident_Evil_2_Cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/resident-evil-2",
    "themes": [
      "Infezione Zombie",
      "Stazione di Polizia",
      "Gore",
      "Cospirazione"
    ],
    "platforms": [
      "PS1",
      "N64",
      "GameCube",
      "Dreamcast",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Resident Evil",
    "gameType": "Normale"
  },
  {
    "id": "resident-evil-2-remake",
    "title": "Resident Evil 2 (Remake)",
    "developer": "Capcom",
    "releaseYear": 2019,
    "genres": [
      "Survival Horror",
      "Sparatutto in 3a"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "I passi pesanti del Tyrant Mr. X che risuonano nelle buie stanze della stazione R.P.D.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_2_Remake.jpg",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/resident-evil-2--1",
    "themes": [
      "Infezione Zombie",
      "Mr. X Stalker",
      "Horror Psicologico"
    ],
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Resident Evil",
    "gameType": "Remake"
  },
  {
    "id": "half-life-1",
    "title": "Half-Life",
    "developer": "Valve",
    "releaseYear": 1998,
    "genres": [
      "FPS",
      "Azione"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "L'incidente di risonanza a Black Mesa spalanca i varchi alieni di Xen: Gordon Freeman prende il comando.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/fa/Half-Life_Cover_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/half-life",
    "themes": [
      "Incidente Scientifico",
      "Invasione Aliena",
      "Cospirazione Black Mesa"
    ],
    "platforms": [
      "PC",
      "PS2"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Half-Life",
    "gameType": "Normale"
  },
  {
    "id": "portal-1",
    "title": "Portal",
    "developer": "Valve",
    "releaseYear": 2007,
    "genres": [
      "Rompicapo",
      "FPS"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Now you're thinking with portals. Chell supera i test di GLaDOS prima della leggendaria canzone Still Alive.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/9f/Portal_standalonebox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/portal",
    "themes": [
      "Fantascienza Laboratorio",
      "GLaDOS IA Impazzita",
      "Umorismo Nero"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Portal",
    "gameType": "Normale"
  },
  {
    "id": "batman-arkham-city",
    "title": "Batman: Arkham City",
    "developer": "Rocksteady Studios",
    "releaseYear": 2011,
    "genres": [
      "Action-Adventure",
      "Picchiaduro a Scorrimento",
      "Stealth"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Cavaliere Oscuro plana sui tetti della prigione a cielo aperto di Arkham City contro Joker e Hugo Strange.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Batman_Arkham_City_Game_Cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/batman-arkham-city",
    "themes": [
      "Supereroi DC",
      "Città Prigione",
      "Criminalità Notturna",
      "Joker"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "PS4",
      "Xbox One",
      "Wii U",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Batman Arkham",
    "gameType": "Normale"
  },
  {
    "id": "batman-arkham-asylum",
    "title": "Batman: Arkham Asylum",
    "developer": "Rocksteady Studios",
    "releaseYear": 2009,
    "genres": [
      "Action-Adventure",
      "Metroidvania",
      "Stealth"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Benvenuto al manicomio! Il sistema di combattimento FreeFlow rivoluzionario tra le celle di Arkham.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/42/Batman_Arkham_Asylum_Videogame_Cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/batman-arkham-asylum",
    "themes": [
      "Supereroi DC",
      "Manicomio Criminale",
      "Horror Gotico"
    ],
    "platforms": [
      "PC",
      "Xbox 360",
      "PS3",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Batman Arkham",
    "gameType": "Normale"
  },
  {
    "id": "uncharted-2",
    "title": "Uncharted 2: Among Thieves",
    "developer": "Naughty Dog",
    "releaseYear": 2009,
    "genres": [
      "Action-Adventure",
      "Sparatutto in 3a"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Nathan Drake aggrappato a un treno che precipita nel vuoto in Himalaya alla ricerca di Shambhala.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/7b/Uncharted_2_box_artwork.jpg",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/uncharted-2-among-thieves",
    "themes": [
      "Archeologia d'Avventura",
      "Shambhala",
      "Cinema d'Azione"
    ],
    "platforms": [
      "PS3",
      "PS4"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Uncharted",
    "gameType": "Normale"
  },
  {
    "id": "uncharted-4",
    "title": "Uncharted 4: Fine di un Ladro",
    "developer": "Naughty Dog",
    "releaseYear": 2016,
    "genres": [
      "Action-Adventure",
      "Sparatutto in 3a"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "L'ultima spedizione di Nathan e suo fratello Sam sulle tracce della colonia pirata perduta di Libertalia.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/1a/Uncharted_4_box_artwork.png",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/uncharted-4-a-thiefs-end",
    "themes": [
      "Tesoro dei Pirati Libertalia",
      "Famiglia e Fratellanza",
      "Esotico"
    ],
    "platforms": [
      "PS4",
      "PS5",
      "PC"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Online PvP"
    ],
    "franchise": "Uncharted",
    "gameType": "Normale"
  },
  {
    "id": "journey",
    "title": "Journey",
    "developer": "thatgamecompany",
    "releaseYear": 2012,
    "genres": [
      "Avventura Poetica",
      "Esplorazione"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Una figura con mantello rosso scivola sulle dune dorate del deserto verso una luminosa montagna sacra.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/64/Journey_Title_Poster.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/journey",
    "themes": [
      "Viaggio Spirituale",
      "Deserto Infinito",
      "Montagna Sacra",
      "Minimalista"
    ],
    "platforms": [
      "PS3",
      "PS4",
      "PC"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "franchise": "thatgamecompany",
    "gameType": "Normale"
  },
  {
    "id": "sekiro-shadows-die-twice",
    "title": "Sekiro: Shadows Die Twice",
    "developer": "FromSoftware",
    "releaseYear": 2019,
    "genres": [
      "Action-Adventure",
      "Soulslike"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "La deviazione perfetta (deflect) katana contro katana: il Lupo a un braccio protegge il giovane Signore Kuro.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/sekiro-shadows-die-twice",
    "themes": [
      "Giappone Feudale Sengoku",
      "Shinobi",
      "Arti Marziali con Katana",
      "Immortalità"
    ],
    "platforms": [
      "PC",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Soulsborne",
    "gameType": "Normale"
  },
  {
    "id": "monster-hunter-world",
    "title": "Monster Hunter: World",
    "developer": "Capcom",
    "releaseYear": 2018,
    "genres": [
      "Action RPG",
      "Caccia cooperativa"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "La Quinta Flotta salpa verso il Nuovo Mondo per cacciare e studiare i Draghi Anziani tra ecosistemi viventi.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/monster-hunter-world",
    "themes": [
      "Ecosistemi Vivi",
      "Draghi e Mostri Giganti",
      "Crafting Armature"
    ],
    "platforms": [
      "PC",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "franchise": "Monster Hunter",
    "gameType": "Normale"
  },
  {
    "id": "god-of-war-ragnarok",
    "title": "God of War Ragnarök",
    "developer": "Santa Monica Studio",
    "releaseYear": 2022,
    "genres": [
      "Action-Adventure",
      "Hack and Slash"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Il Fimbulwinter congela Midgard: Kratos e Atreus sfidano Odino e Thor prima della fine del mondo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/god-of-war-ragnarok",
    "themes": [
      "Mitologia Norrena",
      "I Nove Regni",
      "Apocalisse Ragnarök",
      "Famiglia"
    ],
    "platforms": [
      "PS4",
      "PS5",
      "PC"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "God of War",
    "gameType": "Normale"
  },
  {
    "id": "cyberpunk-2077",
    "title": "Cyberpunk 2077",
    "developer": "CD Projekt Red",
    "releaseYear": 2020,
    "genres": [
      "Action RPG",
      "FPS",
      "Open World"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Svegliati, samurai! Abbiamo una città da bruciare. V e il biochip con Johnny Silverhand a Night City.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/cyberpunk-2077",
    "themes": [
      "Cyberpunk",
      "Night City Distopica",
      "Impianti Cibernetici",
      "Corporazioni"
    ],
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Cyberpunk",
    "gameType": "Normale"
  },
  {
    "id": "metroid-dread",
    "title": "Metroid Dread",
    "developer": "MercurySteam",
    "releaseYear": 2021,
    "genres": [
      "Metroidvania",
      "Platform 2D",
      "Azione"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Samus braccata dagli inesorabili robot E.M.M.I. nelle profondità ostili del pianeta ZDR.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/f7/Metroid_Dread_Banner.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/metroid-dread",
    "themes": [
      "Fantascienza Terrorizzante",
      "Robot E.M.M.I. Assassini",
      "Pianeta Alieno"
    ],
    "platforms": [
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Metroid",
    "gameType": "Normale"
  },
  {
    "id": "super-mario-world",
    "title": "Super Mario World",
    "developer": "Nintendo",
    "releaseYear": 1990,
    "genres": [
      "Platform 2D"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Il debutto leggendario di Yoshi nella Terra dei Dinosauri con la piuma della cappa su Super Nintendo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/super-mario-world",
    "themes": [
      "Fantasy Fiabesco",
      "Isola dei Dinosauri",
      "Yoshi"
    ],
    "platforms": [
      "SNES",
      "GBA",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "super-mario-odyssey",
    "title": "Super Mario Odyssey",
    "developer": "Nintendo",
    "releaseYear": 2017,
    "genres": [
      "Platform 3D",
      "Avventura Sandbox"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Mario lancia il cappello vivente Cappy per cap-turare nemici e sfrecciare tra New Donk City e mille regni.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/super-mario-odyssey",
    "themes": [
      "Giro del Mondo",
      "Cappello Magico Cappy",
      "Fantasy Creativo"
    ],
    "platforms": [
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Co-op Locale"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "mario-kart-8-deluxe",
    "title": "Mario Kart 8 Deluxe",
    "developer": "Nintendo",
    "releaseYear": 2017,
    "genres": [
      "Corse",
      "Kart Arcade"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Piste antigravitazionali, il temibile guscio blu e il party racing più venduto di sempre.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b5/MarioKart8Boxart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/mario-kart-8-deluxe",
    "themes": [
      "Antigravità",
      "Crossover Nintendo",
      "Festa"
    ],
    "platforms": [
      "Wii U",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer",
      "Online PvP"
    ],
    "franchise": "Super Mario",
    "gameType": "Normale"
  },
  {
    "id": "donkey-kong-country",
    "title": "Donkey Kong Country",
    "developer": "Rare",
    "releaseYear": 1994,
    "genres": [
      "Platform 2D"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Donkey Kong e Diddy sfrecciano a bordo dei carrelli da miniera tra le giungle di DK Island contro King K. Rool.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/1a/Donkey_Kong_Country_SNES_cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/donkey-kong-country",
    "themes": [
      "Giungla",
      "Banane Rubate",
      "Pirati Rettili"
    ],
    "platforms": [
      "SNES",
      "GBA",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Donkey Kong",
    "gameType": "Normale"
  },
  {
    "id": "banjo-kazooie",
    "title": "Banjo-Kazooie",
    "developer": "Rare",
    "releaseYear": 1998,
    "genres": [
      "Platform 3D",
      "Collezionismo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "L'orso Banjo e la sfacciata pennuta Kazooie nel loro zaino contro la strega Gruntilda.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Banjo_Kazooie_logo.png/330px-Banjo_Kazooie_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/banjo-kazooie",
    "themes": [
      "Fiaba Umoristica",
      "Streghe",
      "Cartoonesco"
    ],
    "platforms": [
      "N64",
      "Xbox 360",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Banjo-Kazooie",
    "gameType": "Normale"
  },
  {
    "id": "goldeneye-007",
    "title": "GoldenEye 007",
    "developer": "Rare",
    "releaseYear": 1997,
    "genres": [
      "FPS",
      "Stealth"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "La pistola con silenziatore di James Bond e le mitiche sfide a schermo condiviso a quattro giocatori su N64.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/1/13/GoldenEye_007_N64_cover.jpg/330px-GoldenEye_007_N64_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/goldeneye-007",
    "themes": [
      "Spionaggio Internazionale",
      "Guerra Fredda",
      "Cinema d'Azione"
    ],
    "platforms": [
      "N64",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "James Bond 007",
    "gameType": "Normale"
  },
  {
    "id": "perfect-dark",
    "title": "Perfect Dark",
    "developer": "Rare",
    "releaseYear": 2000,
    "genres": [
      "FPS",
      "Stealth"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "L'agente Joanna Dark indaga sulle cospirazioni aliene dell'istituto Carrington con arsenale futuristico.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/3/32/Perfect_dark_box.jpg/330px-Perfect_dark_box.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/perfect-dark",
    "themes": [
      "Cyberpunk Anno 2023",
      "Alieni",
      "Cospirazioni Industriali"
    ],
    "platforms": [
      "N64",
      "Xbox 360",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer",
      "Co-op Locale"
    ],
    "franchise": "Perfect Dark",
    "gameType": "Normale"
  },
  {
    "id": "shenmue",
    "title": "Shenmue",
    "developer": "Sega AM2",
    "releaseYear": 1999,
    "genres": [
      "Avventura Open World",
      "Picchiaduro 3D",
      "Simulazione di Vita"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Ryo Hazuki cerca l'assassino di suo padre per le strade di Yokosuka nel 1986 interrogando ogni passante.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/4/44/Shenmue_series_logo.png/330px-Shenmue_series_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/shenmue",
    "themes": [
      "Arti Marziali",
      "Giappone Anni 80",
      "Vendetta Paterna",
      "Cultura Asiatica"
    ],
    "platforms": [
      "Dreamcast",
      "PS4",
      "Xbox One",
      "PC"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Shenmue",
    "gameType": "Normale"
  },
  {
    "id": "sonic-the-hedgehog-2",
    "title": "Sonic the Hedgehog 2",
    "developer": "Sonic Team",
    "releaseYear": 1992,
    "genres": [
      "Platform 2D",
      "Alta Velocità"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Lo Spin Dash, la comparsa di Tails con due code e i giri della morte nella Chemical Plant Zone.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/0c/Sonic_2_US_Cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/sonic-the-hedgehog-2",
    "themes": [
      "Animali vs Robot",
      "Smeraldi del Caos",
      "Ecologia"
    ],
    "platforms": [
      "Mega Drive",
      "PS3",
      "Xbox 360",
      "Switch",
      "PC"
    ],
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "franchise": "Sonic the Hedgehog",
    "gameType": "Normale"
  },
  {
    "id": "mega-man-x",
    "title": "Mega Man X",
    "developer": "Capcom",
    "releaseYear": 1993,
    "genres": [
      "Platform 2D",
      "Run and Gun"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "X, il reploid dalle possibilità infinite, armato di X-Buster e scatto a parete contro i Maverick ribelli.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/5/5f/Mega_Man_X_logo_%28V2%29.png/330px-Mega_Man_X_logo_%28V2%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/mega-man-x",
    "themes": [
      "Fantascienza Robotica",
      "Replicanti Ribelli",
      "Cyberpunk"
    ],
    "platforms": [
      "SNES",
      "PC",
      "PS1",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Mega Man",
    "gameType": "Normale"
  },
  {
    "id": "ico",
    "title": "Ico",
    "developer": "Team Ico",
    "releaseYear": 2001,
    "genres": [
      "Action-Adventure",
      "Rompicapo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "Un ragazzo con le corna tiene per mano la misteriosa ragazza Yorda fuggendo dalle ombre di una fortezza senza tempo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/40/Ico_cover_-_EU%2BJP.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/ico",
    "themes": [
      "Castello delle Ombre",
      "Ragazzo con le Corna",
      "Minimalismo Poetico"
    ],
    "platforms": [
      "PS2",
      "PS3"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Team Ico",
    "gameType": "Normale"
  },
  {
    "id": "demons-souls",
    "title": "Demon's Souls",
    "developer": "FromSoftware",
    "releaseYear": 2009,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "iconicQuote": "L'Antico si è destato avvolgendo il regno di Boletaria in una nebbia incolore di anime perdute.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/91/Demon%27s_Souls_Cover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/demons-souls",
    "themes": [
      "Dark Fantasy Gotico",
      "Regno di Boletaria",
      "Nebbia Infernale"
    ],
    "platforms": [
      "PS3",
      "PS5"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "franchise": "Soulsborne",
    "gameType": "Normale"
  },
  {
    "id": "xenoblade-chronicles",
    "title": "Xenoblade Chronicles",
    "developer": "Monolith Soft",
    "releaseYear": 2010,
    "genres": [
      "JRPG",
      "Action RPG"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Shulk impugna la leggendaria spada Monado sui corpi giganteschi e titanici di Bionis e Mechanis.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d9/Xenoblade_box_artwork.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/xenoblade-chronicles",
    "themes": [
      "Titani Giganti Bionis e Mechanis",
      "Spada Monado",
      "Sci-Fi Fantasy"
    ],
    "platforms": [
      "Wii",
      "Nintendo 3DS",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Xenoblade / Xeno",
    "gameType": "Normale"
  },
  {
    "id": "persona-4-golden",
    "title": "Persona 4 Golden",
    "developer": "Atlus",
    "releaseYear": 2012,
    "genres": [
      "JRPG",
      "A turni",
      "Simulazione Sociale"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Il Midnight Channel trasmette a mezzanotte nei giorni di pioggia nella tranquilla cittadina di Inaba.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/10/Shin_Megami_Tensei_Persona_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/persona-4-golden",
    "themes": [
      "Giallo Investigativo",
      "Mistero del Midnight Channel",
      "Campagna Giapponese",
      "Scolastico"
    ],
    "platforms": [
      "PS Vita",
      "PC",
      "PS4",
      "Xbox One",
      "Xbox Series X/S",
      "Switch"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Persona / Megami Tensei",
    "gameType": "Remaster"
  },
  {
    "id": "mother-3",
    "title": "Mother 3",
    "developer": "HAL Laboratory",
    "releaseYear": 2006,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Lucas e la sua famiglia nelle isole Nowhere: una toccante storia d'amore, perdita e industrializzazione.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/e/ee/Deluxe_package.jpg/330px-Deluxe_package.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/mother-3",
    "themes": [
      "Tragedia Familiare",
      "Commedia Assurda",
      "Critica al Consumismo",
      "Musica e Ritmo"
    ],
    "platforms": [
      "GBA",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Mother / EarthBound",
    "gameType": "Normale"
  },
  {
    "id": "earthbound",
    "title": "EarthBound",
    "developer": "Ape / HAL Laboratory",
    "releaseYear": 1994,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "iconicQuote": "Ness, la mazza da baseball e gli attacchi PSI contro la minaccia cosmica di Giygas a Onett.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/1/1f/EarthBound_Box.jpg/330px-EarthBound_Box.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/earthbound",
    "themes": [
      "Parodia America Anni 90",
      "Alieni Psichedelici",
      "Giygas",
      "Umorismo"
    ],
    "platforms": [
      "SNES",
      "Nintendo 3DS",
      "Wii U",
      "Switch"
    ],
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Mother / EarthBound",
    "gameType": "Normale"
  },
  {
    "id": "return-of-the-obra-dinn",
    "title": "Return of the Obra Dinn",
    "developer": "Lucas Pope",
    "releaseYear": 2018,
    "genres": [
      "Investigativo",
      "Rompicapo Logico"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "L'orologio tascabile Memento Mortem rivive l'istante della morte dei 60 passeggeri del vascello fantasma.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d6/Return_of_the_Obra_Dinn_logo-title.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 91,
    "igdbUrl": "https://www.igdb.com/games/return-of-the-obra-dinn",
    "themes": [
      "Mistero Marittimo 1807",
      "Nave Fantasma",
      "Grafica 1-bit Retrò"
    ],
    "platforms": [
      "PC",
      "Switch",
      "PS4",
      "Xbox One"
    ],
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Lucas Pope Games",
    "gameType": "Normale"
  },
  {
    "id": "outer-wilds",
    "title": "Outer Wilds",
    "developer": "Mobius Digital",
    "releaseYear": 2019,
    "genres": [
      "Avventura Spaziale",
      "Esplorazione",
      "Mistero"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Un loop temporale di 22 minuti prima che il sole esploda in una supernova: svela i segreti dei Nomai.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/f/f6/Outer_Wilds_Steam_artwork.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/outer-wilds",
    "themes": [
      "Fisica Quantistica",
      "Loop Temporale di 22 Minuti",
      "Archeologia Spaziale"
    ],
    "platforms": [
      "PC",
      "Xbox One",
      "PS4",
      "Switch",
      "PS5",
      "Xbox Series X/S"
    ],
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "Outer Wilds",
    "gameType": "Normale"
  },
  {
    "id": "nier-automata",
    "title": "NieR: Automata",
    "developer": "PlatinumGames",
    "releaseYear": 2017,
    "genres": [
      "Action RPG",
      "Hack and Slash",
      "Shoot em up"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "iconicQuote": "Gloria all'umanità. Gli androidi 2B e 9S combattono una guerra senza fine per una Terra ormai desolata.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/2/21/Nier_Automata_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/nier-automata",
    "themes": [
      "Esistenzialismo Filosofico",
      "Androidi vs Biomacchine",
      "Post-Apocalittico"
    ],
    "platforms": [
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "franchise": "NieR / Drakengard",
    "gameType": "Normale"
  },
  {
    "id": "soulcalibur",
    "title": "Soulcalibur",
    "developer": "Namco",
    "releaseYear": 1999,
    "genres": [
      "Picchiaduro 3D",
      "Azione"
    ],
    "themes": [
      "Arti Marziali",
      "Fantasy Storico",
      "Spade e Magia"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast"
    ],
    "iconicQuote": "Welcome back to the stage of history! La leggendaria sfida tra la spada malefica Soul Edge e la sacra Soul Calibur.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/45/Soulcalibur_flyer.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 98,
    "igdbUrl": "https://www.igdb.com/games/soulcalibur",
    "franchise": "Soulcalibur",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "jet-set-radio",
    "title": "Jet Set Radio",
    "developer": "Smilebit",
    "releaseYear": 2000,
    "genres": [
      "Action",
      "Skateboard Arcade",
      "Alta Velocità"
    ],
    "themes": [
      "Cyberpunk Urbano",
      "Cultura Giovanile"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "PC"
    ],
    "iconicQuote": "Pattini a reazione, graffiti coloratissimi a Tokyo-to e le trasmissioni pirata di Professor K.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/7b/Jetsetradiopalboxart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 94,
    "igdbUrl": "https://www.igdb.com/games/jet-set-radio",
    "franchise": "Jet Set Radio",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "gameType": "Normale"
  },
  {
    "id": "crazy-taxi",
    "title": "Crazy Taxi",
    "developer": "Hitmaker",
    "releaseYear": 2000,
    "genres": [
      "Arcade",
      "Corse",
      "Azione"
    ],
    "themes": [
      "Punk Rock Anni 2000",
      "Guida Arcade",
      "Commedia"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "PS2",
      "GameCube",
      "PC"
    ],
    "iconicQuote": "Hey hey hey, it's time to make some crazy money! Gare folli a tempo a San Francisco a bordo del taxi giallo.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/1/1d/Crazy_Taxi_logo.png/330px-Crazy_Taxi_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/crazy-taxi",
    "franchise": "Crazy Taxi",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ],
    "gameType": "Normale"
  },
  {
    "id": "resident-evil-code-veronica",
    "title": "Resident Evil: Code: Veronica",
    "developer": "Capcom",
    "releaseYear": 2000,
    "genres": [
      "Survival Horror",
      "Avventura"
    ],
    "themes": [
      "Horror",
      "Mistero"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "PS2",
      "GameCube"
    ],
    "iconicQuote": "Claire Redfield prigioniera sull'isola di Rockfort e Chris Redfield in Antartide alla ricerca della sorella.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/4/44/RECV_boxart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/resident-evil-code-veronica",
    "franchise": "Resident Evil",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ],
    "gameType": "Normale"
  },
  {
    "id": "skies-of-arcadia",
    "title": "Skies of Arcadia",
    "developer": "Overworks",
    "releaseYear": 2000,
    "genres": [
      "JRPG",
      "Avventura"
    ],
    "themes": [
      "Pirati dell'aria",
      "Fantasy",
      "Esplorazione"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "GameCube"
    ],
    "iconicQuote": "Vyse e i Blue Rogues, giovani pirati dell'aria che solcano cieli fluttuanti su navi volanti alla ricerca dei Moon Crystals.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/6/65/ArcadiaDC.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/skies-of-arcadia",
    "franchise": "Skies of Arcadia",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ],
    "gameType": "Normale"
  },
  {
    "id": "marvel-vs-capcom-2",
    "title": "Marvel vs. Capcom 2: New Age of Heroes",
    "developer": "Capcom",
    "releaseYear": 2000,
    "genres": [
      "Picchiaduro 2D",
      "Azione"
    ],
    "themes": [
      "Crossover Gaming Globale",
      "Arti Marziali"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "PS2",
      "Xbox"
    ],
    "iconicQuote": "I Wanna Take You for a Ride! Il leggendario picchiaduro tag-team 3v3 con 56 eroi Marvel e lottatori Capcom.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/1/19/MVC2_Arcade_Flyer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 90,
    "igdbUrl": "https://www.igdb.com/games/marvel-vs-capcom-2-new-age-of-heroes",
    "franchise": "Marvel vs. Capcom",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "sonic-adventure-2",
    "title": "Sonic Adventure 2",
    "developer": "Sonic Team",
    "releaseYear": 2001,
    "genres": [
      "Platform 3D",
      "Azione",
      "Alta Velocità"
    ],
    "themes": [
      "Velocità Sonica",
      "Smeraldi del Caos",
      "Fantascienza"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "GameCube",
      "PC"
    ],
    "iconicQuote": "Live & Learn! Il debutto di Shadow the Hedgehog e la battaglia tra fazione Hero e Dark nello spazio.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/99/Sonic_Adventure_2_cover.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 89,
    "igdbUrl": "https://www.igdb.com/games/sonic-adventure-2",
    "franchise": "Sonic",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "phantasy-star-online",
    "title": "Phantasy Star Online",
    "developer": "Sonic Team",
    "releaseYear": 2000,
    "genres": [
      "Action RPG",
      "MMORPG",
      "Avventura Spaziale"
    ],
    "themes": [
      "Pianeta Alieno",
      "Fantascienza",
      "Cooperazione Spaziale"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "Dreamcast",
      "GameCube",
      "Xbox",
      "PC"
    ],
    "iconicQuote": "La colonizzazione del pianeta Ragol con la nave Pioneer 2 tra cacciatori Hunter, Ranger e Force.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d3/Phantasy_Star_Online_cover_art_jp.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "igdbRating": 89,
    "igdbUrl": "https://www.igdb.com/games/phantasy-star-online",
    "franchise": "Phantasy Star",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer",
      "Co-op online"
    ],
    "gameType": "Normale"
  },
  {
    "id": "paper-mario-64",
    "title": "Paper Mario",
    "developer": "Intelligent Systems",
    "releaseYear": 2000,
    "genres": [
      "JRPG",
      "Avventura",
      "A turni"
    ],
    "themes": [
      "Fantasy Cartaceo",
      "Commedia",
      "Magia"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "platforms": [
      "N64",
      "Switch"
    ],
    "iconicQuote": "Mario in versione cartacea nel Regno dei Funghi per salvare gli Spiriti Stellari rapiti da Bowser con la Star Rod.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/6/61/Papermario.jpg/330px-Papermario.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 93,
    "igdbUrl": "https://www.igdb.com/games/paper-mario",
    "franchise": "Paper Mario",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ],
    "gameType": "Normale"
  },
  {
    "id": "conkers-bad-fur-day",
    "title": "Conker's Bad Fur Day",
    "developer": "Rare",
    "releaseYear": 2001,
    "genres": [
      "Platform 3D",
      "Azione",
      "Avventura"
    ],
    "themes": [
      "Commedia Satirica",
      "Goliardico"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "platforms": [
      "N64",
      "Xbox"
    ],
    "iconicQuote": "L'irriverente scoiattolo Conker alle prese con una sbornia memorabile, parodie cinematografiche e il boss Great Mighty Poo.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/9/99/Conkersbfdbox.jpg/330px-Conkersbfdbox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 92,
    "igdbUrl": "https://www.igdb.com/games/conker-s-bad-fur-day",
    "franchise": "Conker",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "super-smash-bros-64",
    "title": "Super Smash Bros.",
    "developer": "HAL Laboratory",
    "releaseYear": 1999,
    "genres": [
      "Picchiaduro Platform",
      "Party Game"
    ],
    "themes": [
      "Crossover Nintendo",
      "Lotte da Party"
    ],
    "perspective": "2D Side-Scroller",
    "mainPlatform": "Nintendo",
    "platforms": [
      "N64"
    ],
    "iconicQuote": "Il capostipite del crossover Nintendo: Mario, Link, Pikachu, Donkey Kong, Samus e Fox si sfidano sul ring.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/4/42/Supersmashbox.jpg/330px-Supersmashbox.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 90,
    "igdbUrl": "https://www.igdb.com/games/super-smash-bros",
    "franchise": "Super Smash Bros.",
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "star-fox-64",
    "title": "Star Fox 64",
    "developer": "Nintendo",
    "releaseYear": 1997,
    "genres": [
      "Shoot em up",
      "Azione",
      "Avventura Spaziale"
    ],
    "themes": [
      "Battaglie Spaziali",
      "Piloti Stellari",
      "Fantascienza"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "platforms": [
      "N64",
      "Nintendo 3DS",
      "Switch"
    ],
    "iconicQuote": "Do a barrel roll! Fox McCloud e il team Star Fox a bordo degli Arwing contro l'esercito di Andross.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/6/63/StarFox64_N64_Game_Box.jpg/330px-StarFox64_N64_Game_Box.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 90,
    "igdbUrl": "https://www.igdb.com/games/star-fox-64",
    "franchise": "Star Fox",
    "pegi": "PEGI 7",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  },
  {
    "id": "mario-kart-64",
    "title": "Mario Kart 64",
    "developer": "Nintendo",
    "releaseYear": 1996,
    "genres": [
      "Kart Arcade",
      "Corse",
      "Party Game"
    ],
    "themes": [
      "Corse Funghi",
      "Party Game",
      "Commedia"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "platforms": [
      "N64",
      "Switch"
    ],
    "iconicQuote": "Gusci blu, piste memorabili come Rainbow Road e corse frenetiche a 4 giocatori a schermo diviso.",
    "coverUrl": "https://thumb.wikimedia.org/wikipedia/en/thumb/a/a1/Mario_Kart_64.jpg/330px-Mario_Kart_64.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "igdbRating": 89,
    "igdbUrl": "https://www.igdb.com/games/mario-kart-64",
    "franchise": "Mario Kart",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ],
    "gameType": "Normale"
  }
];

export const EXTRA_FRANCHISE_SEARCH_GAMES: VideoGameItem[] = [
  {
    "id": "crash-bash",
    "title": "Crash Bash",
    "developer": "Eurocom / Universal Interactive",
    "releaseYear": 2000,
    "genres": [
      "Party Game",
      "Minigiochi"
    ],
    "themes": [
      "Commedia",
      "Cartoonesco"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS1"
    ],
    "iconicQuote": "Il primo party game di Crash Bandicoot con minigiochi e sfide a punti tra Aku Aku e Uka Uka.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/90/Crash_Bash_Cover_Art.jpg",
    "franchise": "Crash Bandicoot",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ]
  },
  {
    "id": "crash-bandicoot-2-cortex-strikes-back",
    "title": "Crash Bandicoot 2: Cortex Strikes Back",
    "developer": "Naughty Dog",
    "releaseYear": 1997,
    "genres": [
      "Platform 3D"
    ],
    "themes": [
      "Commedia",
      "Cartoonesco"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS1",
      "PS4",
      "Xbox One",
      "Switch",
      "PC"
    ],
    "iconicQuote": "I Cristalli Rosa del Potere, l'ologramma di Neo Cortex e l'inseguimento dell'orso Polar.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/0/07/Crash_Bandicoot_2_Cortex_Strikes_Back_Cover_Art.png",
    "franchise": "Crash Bandicoot",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "crash-team-racing",
    "title": "Crash Team Racing (CTR)",
    "developer": "Naughty Dog",
    "releaseYear": 1999,
    "genres": [
      "Corse",
      "Kart Arcade"
    ],
    "themes": [
      "Commedia",
      "Competitivo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS1",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "iconicQuote": "La sfida a tutta velocità contro l'extraterrestre Nitros Oxide per salvare la Terra.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/c9/Crash_Team_Racing_PAL_artwork.jpg",
    "franchise": "Crash Bandicoot",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo",
      "Multiplayer"
    ]
  },
  {
    "id": "super-mario-sunshine",
    "title": "Super Mario Sunshine",
    "developer": "Nintendo",
    "releaseYear": 2002,
    "genres": [
      "Platform 3D"
    ],
    "themes": [
      "Isola Tropicale",
      "Vacanze",
      "Acqua"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "platforms": [
      "GameCube",
      "Switch"
    ],
    "iconicQuote": "Mario e lo Splac 3000 alle prese con la melma dell'Isola Delfino.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/78/Super_Mario_Sunshine_Coverart.png",
    "franchise": "Super Mario",
    "pegi": "PEGI 3",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "zelda-twilight-princess",
    "title": "The Legend of Zelda: Twilight Princess",
    "developer": "Nintendo",
    "releaseYear": 2006,
    "genres": [
      "Action-Adventure"
    ],
    "themes": [
      "Dark Fantasy",
      "Regno del Crepuscolo",
      "Lupo"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Nintendo",
    "platforms": [
      "GameCube",
      "Wii",
      "Wii U"
    ],
    "iconicQuote": "Link Lupo e Midna, la Principessa del Crepuscolo, per sconfiggere Zant.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/5/53/Zelda_Twilight_Princess_cover.png",
    "franchise": "The Legend of Zelda",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "dark-souls-2",
    "title": "Dark Souls II",
    "developer": "FromSoftware",
    "releaseYear": 2014,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "themes": [
      "Dark Fantasy",
      "Drangleic",
      "Re Vendrick"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS3",
      "Xbox 360",
      "PS4",
      "Xbox One"
    ],
    "iconicQuote": "Il regno decaduto di Drangleic alla ricerca di anime per non diventare Vacuo.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/ed/Dark_Souls_II_cover.jpg",
    "franchise": "Soulsborne",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "gameType": "Normale"
  },
  {
    "id": "dark-souls-remastered",
    "title": "Dark Souls: Remastered",
    "developer": "FromSoftware / QLOC",
    "releaseYear": 2018,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "themes": [
      "Dark Fantasy",
      "Lordran",
      "Lord Gwyn"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "iconicQuote": "Edizione rimasterizzata a 60 FPS con DLC Artorias of the Abyss e grafica migliorata.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
    "franchise": "Soulsborne",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "gameType": "Remaster"
  },
  {
    "id": "dark-souls-2-scholar-of-the-first-sin",
    "title": "Dark Souls II: Scholar of the First Sin",
    "developer": "FromSoftware",
    "releaseYear": 2015,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "themes": [
      "Dark Fantasy",
      "Drangleic",
      "Aldia"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS4",
      "Xbox One",
      "PS3",
      "Xbox 360"
    ],
    "iconicQuote": "Edizione definitiva con nemici e oggetti riposizionati, grafica next-gen e tutti i 3 DLC inclusi.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/ed/Dark_Souls_II_cover.jpg",
    "franchise": "Soulsborne",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ],
    "gameType": "Remaster"
  },
  {
    "id": "demons-souls-remake",
    "title": "Demon's Souls (Remake)",
    "developer": "Bluepoint Games",
    "releaseYear": 2020,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "themes": [
      "Dark Fantasy",
      "Boletaria",
      "Antico"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS5"
    ],
    "iconicQuote": "Remake totale next-gen del leggendario capostipite di FromSoftware a Boletaria.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/9/91/Demon%27s_Souls_Cover.jpg",
    "franchise": "Soulsborne",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online"
    ],
    "gameType": "Remake"
  },
  {
    "id": "dark-souls-3",
    "title": "Dark Souls III",
    "developer": "FromSoftware",
    "releaseYear": 2016,
    "genres": [
      "Action RPG",
      "Soulslike"
    ],
    "themes": [
      "Dark Fantasy",
      "Lothric",
      "Signori dei Tizzoni"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS4",
      "Xbox One"
    ],
    "iconicQuote": "Solo le ceneri rimangono... Il viaggio della Fiamma Sopita a Lothric.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg",
    "franchise": "Soulsborne",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ]
  },
  {
    "id": "final-fantasy-viii",
    "title": "Final Fantasy VIII",
    "developer": "Square",
    "releaseYear": 1999,
    "genres": [
      "JRPG",
      "A turni"
    ],
    "themes": [
      "Accademia Militare",
      "Streghe nel Tempo",
      "Gunblade"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS1",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "iconicQuote": "Squall Leonhart, Rinoa Heartilly e la lotta dei SeeD contro la Strega Artemisia.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/7/7a/Final_Fantasy_VIII_Box_Art.jpg",
    "franchise": "Final Fantasy",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "resident-evil-village",
    "title": "Resident Evil Village",
    "developer": "Capcom",
    "releaseYear": 2021,
    "genres": [
      "Survival Horror",
      "FPS"
    ],
    "themes": [
      "Horror Gotico",
      "Villaggio Romeno",
      "Lady Dimitrescu"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S",
      "Switch"
    ],
    "iconicQuote": "Ethan Winters in un villaggio misterioso tra vampiri, licantropi e Madre Miranda.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png",
    "franchise": "Resident Evil",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "gta-vice-city",
    "title": "Grand Theft Auto: Vice City",
    "developer": "Rockstar North",
    "releaseYear": 2002,
    "genres": [
      "Action-Adventure",
      "Open World"
    ],
    "themes": [
      "Anni 80 Miami",
      "Scarface",
      "Musica Synthwave",
      "Crime"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PS2",
      "Xbox",
      "PC",
      "PS4",
      "Xbox One",
      "Switch"
    ],
    "iconicQuote": "Tommy Vercetti domina le strade al neon di Vice City nel 1986.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/c/ce/Vice-city-cover.jpg",
    "franchise": "Grand Theft Auto",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "halo-3",
    "title": "Halo 3",
    "developer": "Bungie",
    "releaseYear": 2007,
    "genres": [
      "FPS",
      "Azione"
    ],
    "themes": [
      "Fantascienza Militare",
      "Guerra Galattica",
      "Master Chief"
    ],
    "perspective": "1a Persona",
    "mainPlatform": "Xbox",
    "platforms": [
      "Xbox 360",
      "Xbox One",
      "PC"
    ],
    "iconicQuote": "Finish the Fight. Master Chief e Arbiter per fermare il Profeta della Verità.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b4/Halo_3_final_boxshot.JPG",
    "franchise": "Halo",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo",
      "Co-op online",
      "Online PvP"
    ]
  },
  {
    "id": "god-of-war-3",
    "title": "God of War III",
    "developer": "Santa Monica Studio",
    "releaseYear": 2010,
    "genres": [
      "Action-Adventure",
      "Hack and Slash"
    ],
    "themes": [
      "Mitologia Greca",
      "Monte Olimpo",
      "Vendetta contro Zeus"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PlayStation",
    "platforms": [
      "PS3",
      "PS4"
    ],
    "iconicQuote": "Alla fine ci sarà solo il Caos! Kratos scala l'Olimpo sui Titani per sterminare gli dei.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/e/e5/God_of_War_III_cover.jpg",
    "franchise": "God of War",
    "pegi": "PEGI 18",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "shenmue-2",
    "title": "Shenmue II",
    "developer": "SEGA AM2",
    "releaseYear": 2001,
    "genres": [
      "Avventura Open World",
      "Picchiaduro 3D"
    ],
    "themes": [
      "Hong Kong Anni 80",
      "Arti Marziali",
      "Cultura Cinese"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "Xbox",
    "platforms": [
      "Dreamcast",
      "Xbox",
      "PS4",
      "Xbox One",
      "PC"
    ],
    "iconicQuote": "Ryo Hazuki sbarca a Hong Kong seguendo le tracce di Lan Di e degli Specchi.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/d/d4/Shenmue_II_Cover_Art.jpg",
    "franchise": "Shenmue",
    "pegi": "PEGI 12",
    "gameModes": [
      "Giocatore singolo"
    ]
  },
  {
    "id": "persona-3-reload",
    "title": "Persona 3 Reload",
    "developer": "Atlus",
    "releaseYear": 2024,
    "genres": [
      "JRPG",
      "A turni",
      "Simulazione Sociale"
    ],
    "themes": [
      "Ora Buia",
      "Morte ed Esistenza",
      "Scolastico",
      "Torre del Tartaro"
    ],
    "perspective": "3a Persona",
    "mainPlatform": "PC / Multi",
    "platforms": [
      "PC",
      "PS4",
      "PS5",
      "Xbox One",
      "Xbox Series X/S"
    ],
    "iconicQuote": "Memento Mori. Evoca la tua Persona durante l'Ora Buia a mezzanotte.",
    "coverUrl": "https://upload.wikimedia.org/wikipedia/en/b/b3/Persona_3_Reload_cover_art.png",
    "franchise": "Persona / Megami Tensei",
    "pegi": "PEGI 16",
    "gameModes": [
      "Giocatore singolo"
    ]
  }
];

function cleanCatalogTitle(title: string): string {
  return title
    .replace(/\s*\((Xbox|Xbox\s*360|Xbox\s*One|Xbox\s*Series\s*X|PS1|PS2|PS3|PS4|PS5|Switch|GameCube|N64|SNES)\)$/i, '')
    .trim();
}

function buildUnifiedSearchableCatalog(): VideoGameItem[] {
  const rawList: VideoGameItem[] = [
    ...IGDB_TOP_100_GAMES,
    ...EXTRA_FRANCHISE_SEARCH_GAMES,
    ...ALL_CONSOLE_GAMES,
  ];

  const map = new Map<string, VideoGameItem>();

  for (const g of rawList) {
    const cTitle = cleanCatalogTitle(g.title);
    const type = g.gameType || 'Normale';
    const normKey = (cTitle.toLowerCase().replace(/[^a-z0-9]/g, '') + '__' + type).toLowerCase();

    if (!map.has(normKey)) {
      map.set(normKey, {
        ...g,
        title: cTitle,
        platforms: Array.from(new Set(g.platforms && g.platforms.length > 0 ? g.platforms : [g.mainPlatform])),
      });
    } else {
      const existing = map.get(normKey)!;
      // Merge platforms
      const plats = new Set([...(existing.platforms || []), ...(g.platforms || [g.mainPlatform])]);
      existing.platforms = Array.from(plats);

      // Prefer canonical ID without console prefix
      const existingHasConsolePrefix = /^(ps[1-5]|xbox|n64|snes|switch|gamecube)-/i.test(existing.id);
      const gHasConsolePrefix = /^(ps[1-5]|xbox|n64|snes|switch|gamecube)-/i.test(g.id);
      if (existingHasConsolePrefix && !gHasConsolePrefix) {
        existing.id = g.id;
      }

      // Prefer HTTP coverUrl over data: SVG or placeholder
      if (g.coverUrl && g.coverUrl.startsWith('http') && (!existing.coverUrl || !existing.coverUrl.startsWith('http'))) {
        existing.coverUrl = g.coverUrl;
      }

      // Take earlier release year if valid
      if (g.releaseYear && (!existing.releaseYear || (g.releaseYear < existing.releaseYear && g.releaseYear > 1970))) {
        existing.releaseYear = g.releaseYear;
      }

      // Union genres
      if (g.genres && g.genres.length > 0) {
        existing.genres = Array.from(new Set([...(existing.genres || []), ...g.genres]));
      }

      // Union themes
      if (g.themes && g.themes.length > 0) {
        existing.themes = Array.from(new Set([...(existing.themes || []), ...g.themes]));
      }

      // Richer quote
      if (g.iconicQuote && (!existing.iconicQuote || g.iconicQuote.length > existing.iconicQuote.length)) {
        existing.iconicQuote = g.iconicQuote;
      }

      // If released across multiple console ecosystems, set mainPlatform to PC / Multi
      if (existing.platforms && existing.platforms.length > 1) {
        const platStr = existing.platforms.join(' ');
        const hasPlayStation = /PS/i.test(platStr);
        const hasXbox = /Xbox/i.test(platStr);
        const hasNintendo = /Switch|N64|SNES|GameCube|Wii/i.test(platStr);
        const hasPC = /PC/i.test(platStr);
        const ecosystemCount = (hasPlayStation ? 1 : 0) + (hasXbox ? 1 : 0) + (hasNintendo ? 1 : 0) + (hasPC ? 1 : 0);
        if (ecosystemCount > 1) {
          existing.mainPlatform = 'PC / Multi';
        }
      }
    }
  }

  return Array.from(map.values());
}

// Complete searchable catalog including all top 100 masterpieces, famous franchise titles, and full Sony, Microsoft & Nintendo console libraries (deduplicated and multiplatform-unified)
export const ALL_SEARCHABLE_GAMES: VideoGameItem[] = buildUnifiedSearchableCatalog();
