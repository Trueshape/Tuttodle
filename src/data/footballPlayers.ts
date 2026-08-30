import { FootballPlayer } from '../types';

export const FOOTBALL_PLAYERS: FootballPlayer[] = [
  {
    id: 'neymar-jr',
    name: 'Neymar Jr',
    nationality: 'Brasile',
    flag: '🇧🇷',
    position: 'ATT',
    currentLeague: 'Campeonato Brasileiro',
    currentClub: 'Santos',
    age: 33,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 10,
      nationalTeamApps: '128 presenze / 79 gol con il Brasile',
      quoteOrFact: 'Ha stabilito il record per il trasferimento più costoso della storia (222 milioni €) nel 2017.'
    },
    transfers: [
      { years: '2009–2013', club: 'Santos', countryFlag: '🇧🇷' },
      { years: '2013–2017', club: 'Barcellona', countryFlag: '🇪🇸' },
      { years: '2017–2023', club: 'Paris Saint-Germain', countryFlag: '🇫🇷' },
      { years: '2023–2025', club: 'Al-Hilal', countryFlag: '🇸🇦' },
      { years: '2025–', club: 'Santos', countryFlag: '🇧🇷' }
    ]
  },
  {
    id: 'cristiano-ronaldo',
    name: 'Cristiano Ronaldo',
    nationality: 'Portogallo',
    flag: '🇵🇹',
    position: 'ATT',
    currentLeague: 'Saudi Pro League',
    currentClub: 'Al-Nassr',
    age: 40,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 7,
      nationalTeamApps: '210+ presenze e vincitore di Euro 2016',
      quoteOrFact: 'Vincitore di 5 Palloni d\'Oro e capocannoniere all-time della Champions League.'
    },
    transfers: [
      { years: '2002–2003', club: 'Sporting CP', countryFlag: '🇵🇹' },
      { years: '2003–2009', club: 'Manchester United', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2009–2018', club: 'Real Madrid', countryFlag: '🇪🇸' },
      { years: '2018–2021', club: 'Juventus', countryFlag: '🇮🇹' },
      { years: '2021–2022', club: 'Manchester United', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2023–', club: 'Al-Nassr', countryFlag: '🇸🇦' }
    ]
  },
  {
    id: 'lionel-messi',
    name: 'Lionel Messi',
    nationality: 'Argentina',
    flag: '🇦🇷',
    position: 'ATT',
    currentLeague: 'MLS',
    currentClub: 'Inter Miami',
    age: 38,
    uclWinner: true,
    worldCupWinner: true,
    hints: {
      shirtNumber: 10,
      nationalTeamApps: 'Campione del Mondo 2022 con l\'Argentina',
      quoteOrFact: 'Detentore del record di 8 Palloni d\'Oro vinte e una carriera da leggenda a Barcellona.'
    },
    transfers: [
      { years: '2004–2021', club: 'Barcellona', countryFlag: '🇪🇸' },
      { years: '2021–2023', club: 'Paris Saint-Germain', countryFlag: '🇫🇷' },
      { years: '2023–', club: 'Inter Miami', countryFlag: '🇺🇸' }
    ]
  },
  {
    id: 'zlatan-ibrahimovic',
    name: 'Zlatan Ibrahimović',
    nationality: 'Svezia',
    flag: '🇸🇪',
    position: 'ATT',
    currentLeague: 'Ritirato',
    currentClub: 'AC Milan (Dirigente)',
    age: 43,
    uclWinner: false,
    worldCupWinner: false,
    hints: {
      shirtNumber: 11,
      nationalTeamApps: '62 gol in 122 presenze per la Svezia',
      quoteOrFact: 'Ha vinto il campionato nazionale in 4 paesi diversi (Olanda, Italia, Spagna, Francia).'
    },
    transfers: [
      { years: '1999–2001', club: 'Malmö FF', countryFlag: '🇸🇪' },
      { years: '2001–2004', club: 'Ajax', countryFlag: '🇳🇱' },
      { years: '2004–2006', club: 'Juventus', countryFlag: '🇮🇹' },
      { years: '2006–2009', club: 'Inter', countryFlag: '🇮🇹' },
      { years: '2009–2010', club: 'Barcellona', countryFlag: '🇪🇸' },
      { years: '2010–2012', club: 'AC Milan', countryFlag: '🇮🇹' },
      { years: '2012–2016', club: 'Paris Saint-Germain', countryFlag: '🇫🇷' },
      { years: '2016–2018', club: 'Manchester United', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2018–2019', club: 'LA Galaxy', countryFlag: '🇺🇸' },
      { years: '2020–2023', club: 'AC Milan', countryFlag: '🇮🇹' }
    ]
  },
  {
    id: 'kylian-mbappe',
    name: 'Kylian Mbappé',
    nationality: 'Francia',
    flag: '🇫🇷',
    position: 'ATT',
    currentLeague: 'La Liga',
    currentClub: 'Real Madrid',
    age: 26,
    uclWinner: false,
    worldCupWinner: true,
    hints: {
      shirtNumber: 9,
      nationalTeamApps: 'Campione del Mondo a 19 anni nel 2018',
      quoteOrFact: 'Ha segnato una tripletta nella finale dei Mondiali 2022 contro l\'Argentina.'
    },
    transfers: [
      { years: '2015–2017', club: 'Monaco', countryFlag: '🇫🇷' },
      { years: '2017–2018', club: 'Paris Saint-Germain', countryFlag: '🇫🇷', isLoan: true },
      { years: '2018–2024', club: 'Paris Saint-Germain', countryFlag: '🇫🇷' },
      { years: '2024–', club: 'Real Madrid', countryFlag: '🇪🇸' }
    ]
  },
  {
    id: 'erling-haaland',
    name: 'Erling Haaland',
    nationality: 'Norvegia',
    flag: '🇳🇴',
    position: 'ATT',
    currentLeague: 'Premier League',
    currentClub: 'Manchester City',
    age: 25,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 9,
      nationalTeamApps: 'Capocannoniere storico della Norvegia in giovanissima età',
      quoteOrFact: 'Ha infranto il record di gol stagionali in Premier League al suo primo anno col City (36 gol).'
    },
    transfers: [
      { years: '2016–2017', club: 'Bryne FK', countryFlag: '🇳🇴' },
      { years: '2017–2019', club: 'Molde', countryFlag: '🇳🇴' },
      { years: '2019–2020', club: 'Red Bull Salisburgo', countryFlag: '🇦🇹' },
      { years: '2020–2022', club: 'Borussia Dortmund', countryFlag: '🇩🇪' },
      { years: '2022–', club: 'Manchester City', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }
    ]
  },
  {
    id: 'luka-modric',
    name: 'Luka Modrić',
    nationality: 'Croazia',
    flag: '🇭🇷',
    position: 'CEN',
    currentLeague: 'La Liga',
    currentClub: 'Real Madrid',
    age: 39,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 10,
      nationalTeamApps: 'Vice-Campione del Mondo 2018 e 3° posto nel 2022 con la Croazia',
      quoteOrFact: 'Ha interrotto il dominio Messi-Ronaldo vincendo il Pallone d\'Oro nel 2018.'
    },
    transfers: [
      { years: '2003–2008', club: 'Dinamo Zagabria', countryFlag: '🇭🇷' },
      { years: '2003–2004', club: 'Zrinjski Mostar', countryFlag: '🇧🇦', isLoan: true },
      { years: '2004–2005', club: 'Inter Zaprešić', countryFlag: '🇭🇷', isLoan: true },
      { years: '2008–2012', club: 'Tottenham Hotspur', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2012–', club: 'Real Madrid', countryFlag: '🇪🇸' }
    ]
  },
  {
    id: 'kaka',
    name: 'Kaká',
    nationality: 'Brasile',
    flag: '🇧🇷',
    position: 'CEN',
    currentLeague: 'Ritirato',
    currentClub: 'AC Milan / Real Madrid (Leggenda)',
    age: 43,
    uclWinner: true,
    worldCupWinner: true,
    hints: {
      shirtNumber: 22,
      nationalTeamApps: 'Campione del Mondo 2002 con il Brasile',
      quoteOrFact: 'Ultimo vincitore del Pallone d\'Oro (2007) prima dell\'era Messi-Cristiano Ronaldo.'
    },
    transfers: [
      { years: '2001–2003', club: 'San Paolo', countryFlag: '🇧🇷' },
      { years: '2003–2009', club: 'AC Milan', countryFlag: '🇮🇹' },
      { years: '2009–2013', club: 'Real Madrid', countryFlag: '🇪🇸' },
      { years: '2013–2014', club: 'AC Milan', countryFlag: '🇮🇹' },
      { years: '2014', club: 'San Paolo', countryFlag: '🇧🇷', isLoan: true },
      { years: '2014–2017', club: 'Orlando City', countryFlag: '🇺🇸' }
    ]
  },
  {
    id: 'zinedine-zidane',
    name: 'Zinedine Zidane',
    nationality: 'Francia',
    flag: '🇫🇷',
    position: 'CEN',
    currentLeague: 'Ritirato',
    currentClub: 'Allenatore',
    age: 53,
    uclWinner: true,
    worldCupWinner: true,
    hints: {
      shirtNumber: 5,
      nationalTeamApps: 'Campione del Mondo 1998 e d\'Europa 2000 con la Francia',
      quoteOrFact: 'Famoso per il gol al volo nella finale di Champions 2002 col Real e per la finale Mondiale 2006.'
    },
    transfers: [
      { years: '1989–1992', club: 'Cannes', countryFlag: '🇫🇷' },
      { years: '1992–1996', club: 'Bordeaux', countryFlag: '🇫🇷' },
      { years: '1996–2001', club: 'Juventus', countryFlag: '🇮🇹' },
      { years: '2001–2006', club: 'Real Madrid', countryFlag: '🇪🇸' }
    ]
  },
  {
    id: 'andrea-pirlo',
    name: 'Andrea Pirlo',
    nationality: 'Italia',
    flag: '🇮🇹',
    position: 'CEN',
    currentLeague: 'Ritirato',
    currentClub: 'Allenatore',
    age: 46,
    uclWinner: true,
    worldCupWinner: true,
    hints: {
      shirtNumber: 21,
      nationalTeamApps: 'Campione del Mondo 2006 con l\'Italia',
      quoteOrFact: 'Maestro del "regista basso" e delle punizioni "maledette". Ha giocato per Inter, Milan e Juve.'
    },
    transfers: [
      { years: '1995–1998', club: 'Brescia', countryFlag: '🇮🇹' },
      { years: '1998–2001', club: 'Inter', countryFlag: '🇮🇹' },
      { years: '1999–2000', club: 'Reggina', countryFlag: '🇮🇹', isLoan: true },
      { years: '2001', club: 'Brescia', countryFlag: '🇮🇹', isLoan: true },
      { years: '2001–2011', club: 'AC Milan', countryFlag: '🇮🇹' },
      { years: '2011–2015', club: 'Juventus', countryFlag: '🇮🇹' },
      { years: '2015–2017', club: 'New York City FC', countryFlag: '🇺🇸' }
    ]
  },
  {
    id: 'francesco-totti',
    name: 'Francesco Totti',
    nationality: 'Italia',
    flag: '🇮🇹',
    position: 'ATT',
    currentLeague: 'Ritirato',
    currentClub: 'AS Roma (Bandiera)',
    age: 48,
    uclWinner: false,
    worldCupWinner: true,
    hints: {
      shirtNumber: 10,
      nationalTeamApps: 'Campione del Mondo 2006 con l\'Italia',
      quoteOrFact: 'Ha giocato l\'intera carriera professionistica in un unico club dal 1992 al 2017.'
    },
    transfers: [
      { years: '1992–2017', club: 'AS Roma', countryFlag: '🇮🇹' }
    ]
  },
  {
    id: 'lautaro-martinez',
    name: 'Lautaro Martínez',
    nationality: 'Argentina',
    flag: '🇦🇷',
    position: 'ATT',
    currentLeague: 'Serie A',
    currentClub: 'Inter',
    age: 28,
    uclWinner: false,
    worldCupWinner: true,
    hints: {
      shirtNumber: 10,
      nationalTeamApps: 'Capocannoniere della Copa América 2024 e Mondiale 2022',
      quoteOrFact: 'Capitano e numero 10 dell\'Inter con cui ha vinto lo Scudetto e la stella.'
    },
    transfers: [
      { years: '2015–2018', club: 'Racing Club', countryFlag: '🇦🇷' },
      { years: '2018–', club: 'Inter', countryFlag: '🇮🇹' }
    ]
  },
  {
    id: 'jude-bellingham',
    name: 'Jude Bellingham',
    nationality: 'Inghilterra',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'CEN',
    currentLeague: 'La Liga',
    currentClub: 'Real Madrid',
    age: 22,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 5,
      nationalTeamApps: 'Protagonista dell\'Inghilterra agli Europei 2024',
      quoteOrFact: 'Il Birmingham City ha ritirato la maglia numero 22 in suo onore quando aveva solo 17 anni.'
    },
    transfers: [
      { years: '2019–2020', club: 'Birmingham City', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2020–2023', club: 'Borussia Dortmund', countryFlag: '🇩🇪' },
      { years: '2023–', club: 'Real Madrid', countryFlag: '🇪🇸' }
    ]
  },
  {
    id: 'robert-lewandowski',
    name: 'Robert Lewandowski',
    nationality: 'Polonia',
    flag: '🇵🇱',
    position: 'ATT',
    currentLeague: 'La Liga',
    currentClub: 'Barcellona',
    age: 37,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 9,
      nationalTeamApps: 'Capocannoniere e capitano della Polonia',
      quoteOrFact: 'Ha segnato 5 gol in 9 minuti subentrando dalla panchina con il Bayern Monaco nel 2015.'
    },
    transfers: [
      { years: '2006–2008', club: 'Znicz Pruszków', countryFlag: '🇵🇱' },
      { years: '2008–2010', club: 'Lech Poznań', countryFlag: '🇵🇱' },
      { years: '2010–2014', club: 'Borussia Dortmund', countryFlag: '🇩🇪' },
      { years: '2014–2022', club: 'Bayern Monaco', countryFlag: '🇩🇪' },
      { years: '2022–', club: 'Barcellona', countryFlag: '🇪🇸' }
    ]
  },
  {
    id: 'mohamed-salah',
    name: 'Mohamed Salah',
    nationality: 'Egitto',
    flag: '🇪🇬',
    position: 'ATT',
    currentLeague: 'Premier League',
    currentClub: 'Liverpool',
    age: 33,
    uclWinner: true,
    worldCupWinner: false,
    hints: {
      shirtNumber: 11,
      nationalTeamApps: 'Leggenda e trascinatore della nazionale egiziana',
      quoteOrFact: 'Soprannominato "Il Re d\'Egitto", ha battuto il record di gol in una stagione di Premier League a 38 partite.'
    },
    transfers: [
      { years: '2010–2012', club: 'El Mokawloon', countryFlag: '🇪🇬' },
      { years: '2012–2014', club: 'Basilea', countryFlag: '🇨🇭' },
      { years: '2014–2016', club: 'Chelsea', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { years: '2015', club: 'Fiorentina', countryFlag: '🇮🇹', isLoan: true },
      { years: '2015–2017', club: 'AS Roma', countryFlag: '🇮🇹' },
      { years: '2017–', club: 'Liverpool', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }
    ]
  }
];
