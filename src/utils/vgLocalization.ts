import { LolLanguage, VideoGameItem } from '../types';

export const GENRE_TRANSLATIONS_EN: Record<string, string> = {
  'A turni': 'Turn-based',
  'Action': 'Action',
  'Action RPG': 'Action RPG',
  'Action-Adventure': 'Action-Adventure',
  'Alta Velocità': 'High Speed',
  'Arcade': 'Arcade',
  'Avventura': 'Adventure',
  'Avventura Grafica': 'Graphic Adventure',
  'Avventura Narrativa': 'Narrative Adventure',
  'Avventura Open World': 'Open World Adventure',
  'Avventura Poetica': 'Poetic Adventure',
  'Avventura Psicologica': 'Psychological Adventure',
  'Avventura Sandbox': 'Sandbox Adventure',
  'Avventura Spaziale': 'Space Adventure',
  'Azione': 'Action',
  'Azione Boomer Shooter': 'Boomer Shooter',
  'Boss Rush': 'Boss Rush',
  'Bullet Hell': 'Bullet Hell',
  'CRPG': 'CRPG',
  'Caccia cooperativa': 'Co-op Monster Hunting',
  'Collezione Mostri': 'Monster Taming',
  'Collezionismo': 'Collectathon',
  'Corse': 'Racing',
  'Esplorazione': 'Exploration',
  'FPS': 'FPS',
  'Fisica Creativa': 'Creative Physics',
  'Hack and Slash': 'Hack and Slash',
  'Immersive Sim': 'Immersive Sim',
  'Investigativo': 'Detective Mystery',
  'JRPG': 'JRPG',
  'Kart Arcade': 'Arcade Kart',
  'MMORPG': 'MMORPG',
  'Metroidvania': 'Metroidvania',
  'Minigiochi': 'Mini-games',
  'Mistero': 'Mystery',
  'Open World': 'Open World',
  'Party Game': 'Party Game',
  'Picchiaduro 2D': '2D Fighting',
  'Picchiaduro 3D': '3D Fighting',
  'Picchiaduro Platform': 'Platform Fighter',
  'Picchiaduro a Scorrimento': 'Beat \'em up',
  'Platform 2D': '2D Platformer',
  'Platform 3D': '3D Platformer',
  'Point and Click': 'Point and Click',
  'Precision Platformer': 'Precision Platformer',
  'Roguelike': 'Roguelike',
  'Rompicapo': 'Puzzle',
  'Rompicapo Logico': 'Logic Puzzle',
  'Run and Gun': 'Run and Gun',
  'Shoot em up': 'Shoot \'em up',
  'Simulazione Sociale': 'Social Sim',
  'Simulazione di Vita': 'Life Sim',
  'Skateboard Arcade': 'Arcade Skateboarding',
  'Soulslike': 'Soulslike',
  'Sparatutto in 3a': 'Third-Person Shooter',
  'Sportivo': 'Sports',
  'Stealth': 'Stealth',
  'Survival': 'Survival',
  'Survival Horror': 'Survival Horror',
};

export const THEME_TRANSLATIONS_EN: Record<string, string> = {
  'Arti Marziali': 'Martial Arts',
  'Arti Marziali con Katana': 'Katana Martial Arts',
  'Storico': 'Historical',
  'Medievale': 'Medieval',
  'Fantascienza': 'Sci-Fi',
  'Sci-Fi': 'Sci-Fi',
  'Sci-Fi Retrò': 'Retro Sci-Fi',
  'Sci-Fi Spaziale': 'Space Sci-Fi',
  'Sci-Fi Fantasy': 'Sci-Fi Fantasy',
  'Fantascienza Militare': 'Military Sci-Fi',
  'Fantascienza Robotica': 'Robotic Sci-Fi',
  'Fantascienza Terrorizzante': 'Horror Sci-Fi',
  'Fantascienza Laboratorio': 'Laboratory Sci-Fi',
  'Fantasy': 'Fantasy',
  'High Fantasy': 'High Fantasy',
  'High Fantasy Medievale': 'Medieval High Fantasy',
  'Dark Fantasy': 'Dark Fantasy',
  'Dark Fantasy Esotico': 'Exotic Dark Fantasy',
  'Dark Fantasy Gotico': 'Gothic Dark Fantasy',
  'Fantasy Asiatico': 'Asian Fantasy',
  'Fantasy Cel-Shading': 'Cel-Shaded Fantasy',
  'Fantasy Creativo': 'Creative Fantasy',
  'Fantasy Fiabesco': 'Fairytale Fantasy',
  'Fantasy Minimalista': 'Minimalist Fantasy',
  'Fantasy Tropicale': 'Tropical Fantasy',
  'Cyberpunk': 'Cyberpunk',
  'Cyberpunk Anno 2023': 'Cyberpunk 2023',
  'Post-Apocalittico': 'Post-Apocalyptic',
  'Horror': 'Horror',
  'Horror Gotico': 'Gothic Horror',
  'Horror Psicologico': 'Psychological Horror',
  'Horror Spaziale': 'Space Horror',
  'Cosmic Horror': 'Cosmic Horror',
  'Lovecraftiano': 'Lovecraftian',
  'Crime': 'Crime',
  'Gangster Anni 90': '90s Gangster',
  'Rapine': 'Heists',
  'Urbano': 'Urban',
  'Spionaggio Militare': 'Military Espionage',
  'Spionaggio Sovietico': 'Soviet Espionage',
  'Spionaggio Internazionale': 'International Espionage',
  'Guerra Fredda': 'Cold War',
  'Guerra Fredda 1964': '1964 Cold War',
  'Guerra Aliena': 'Alien War',
  'Guerra Galattica': 'Galactic War',
  'Guerra Civile': 'Civil War',
  'Guerra tra Fazioni': 'Faction Warfare',
  'Space Opera': 'Space Opera',
  'Spaziale': 'Space',
  'Esplorazione Spaziale': 'Space Exploration',
  'Archeologia Spaziale': 'Space Archaeology',
  'Archeologia d\'Avventura': 'Adventure Archaeology',
  'Esplorazione Oceanica': 'Oceanic Exploration',
  'Sottomarino': 'Underwater',
  'Viaggi nel tempo': 'Time Travel',
  'Loop Temporale di 3 Giorni': '3-Day Time Loop',
  'Loop Temporale di 22 Minuti': '22-Minute Time Loop',
  'Mitologia Greca': 'Greek Mythology',
  'Mitologia Norrena': 'Norse Mythology',
  'Mitologia Giapponese': 'Japanese Mythology',
  'Mitologia Slava': 'Slavic Mythology',
  'Mitologico': 'Mythological',
  'Miti Antichi': 'Ancient Myths',
  'Dei': 'Gods',
  'Dei dell\'Olimpo': 'Olympian Gods',
  'Monte Olimpo': 'Mount Olympus',
  'Oltretomba': 'Underworld',
  'I Nove Regni': 'The Nine Realms',
  'Apocalisse Ragnarök': 'Ragnarök Apocalypse',
  'Apocalittico': 'Apocalyptic',
  'Fine del Mondo': 'End of the World',
  'Demoni': 'Demons',
  'Inferno': 'Hell',
  'Gothic Horror': 'Gothic Horror',
  'Vampiri': 'Vampires',
  'Infezione Zombie': 'Zombie Outbreak',
  'Infezione Fungina': 'Fungal Infection',
  'Bioterrorismo': 'Bioterrorism',
  'Occulto': 'Occult',
  'Gore': 'Gore',
  'Commedia': 'Comedy',
  'Commedia Cinematografica': 'Cinematic Comedy',
  'Commedia Assurda': 'Absurd Comedy',
  'Cartoonesco': 'Cartoonish',
  'Scolastico': 'School Life',
  'Accademia Militare': 'Military Academy',
  'Investigativo': 'Detective',
  'Giallo Investigativo': 'Murder Mystery',
  'Noir': 'Noir',
  'Filosofico': 'Philosophical',
  'Esistenzialismo': 'Existentialism',
  'Esistenzialismo Filosofico': 'Philosophical Existentialism',
  'Drammatico': 'Dramatic',
  'Dramma Familiare': 'Family Drama',
  'Dramma': 'Drama',
  'Tragico': 'Tragic',
  'Tragedia Familiare': 'Family Tragedy',
  'Vendetta': 'Revenge',
  'Vendetta Paterna': 'Paternal Revenge',
  'Vendetta contro Zeus': 'Revenge against Zeus',
  'Famiglia': 'Family',
  'Famiglia e Fratellanza': 'Family & Brotherhood',
  'Salute Mentale': 'Mental Health',
  'Senso di Colpa': 'Guilt',
  'Superamento dei Limiti': 'Overcoming Limits',
  'Meta-Narrativo': 'Meta-Narrative',
  'Satira Sociale': 'Social Satire',
  'Satira Moderna': 'Modern Satire',
  'Politica': 'Politics',
  'Politica Galattica': 'Galactic Politics',
  'Politica Teocratica': 'Theocratic Politics',
  'Fazioni Politiche': 'Political Factions',
  'Critica al Consumismo': 'Anti-Consumerism',
  'Postmodernismo': 'Postmodernism',
  'Controllo Informazioni': 'Information Control',
  'Transumanesimo': 'Transhumanism',
  'Distopico': 'Dystopian',
  'Cospirazione': 'Conspiracy',
  'Cospirazioni': 'Conspiracies',
  'Cospirazione IA': 'AI Conspiracy',
  'Cospirazioni Industriali': 'Corporate Conspiracies',
  'Cospirazione Black Mesa': 'Black Mesa Incident',
  'Corporazioni': 'Corporations',
  'Night City Distopica': 'Dystopian Night City',
  'Impianti Cibernetici': 'Cybernetic Implants',
  'Intelligenza Artificiale': 'Artificial Intelligence',
  'Androidi vs Biomacchine': 'Androids vs Biomachines',
  'Robot E.M.M.I. Assassini': 'Deadly E.M.M.I. Robots',
  'Replicanti Ribelli': 'Rogue Replicants',
  'Alieni': 'Aliens',
  'Invasione Aliena': 'Alien Invasion',
  'Pianeta Alieno': 'Alien Planet',
  'Alieni Psichedelici': 'Psychedelic Aliens',
  'Viaggio Spirituale': 'Spiritual Journey',
  'Deserto Infinito': 'Endless Desert',
  'Montagna Sacra': 'Sacred Mountain',
  'Montagna': 'Mountain',
  'Minimalista': 'Minimalist',
  'Minimalismo Poetico': 'Poetic Minimalism',
  'Nave Fantasma': 'Ghost Ship',
  'Mistero Marittimo 1807': '1807 Maritime Mystery',
  'Fisica Quantistica': 'Quantum Physics',
  'Costruzione e Fusione': 'Fuse & Ultrahand Building',
  'Isole Celesti': 'Sky Islands',
  'Antigravità': 'Anti-Gravity',
  'Gravità Cosmica': 'Cosmic Gravity',
  'Cosmico': 'Cosmic',
  'Fiabesco': 'Fairytale',
  'Fiaba Umoristica': 'Whimsical Fairytale',
  'Streghe': 'Witches',
  'Streghe nel Tempo': 'Sorceresses Across Time',
  'Magia': 'Magic',
  'Magia vs Tecnologia': 'Magic vs Technology',
  'Draghi': 'Dragons',
  'Draghi e Mostri Giganti': 'Dragons & Giant Monsters',
  'Ecosistemi Vivi': 'Living Ecosystems',
  'Crafting Armature': 'Armor Crafting',
  'Ladri Fantasma': 'Phantom Thieves',
  'Psicologia': 'Psychology',
  'Giappone Anni 80': '1980s Japan',
  'Giappone Feudale Sengoku': 'Feudal Sengoku Japan',
  'Cultura Asiatica': 'Asian Culture',
  'Cultura Cinese': 'Chinese Culture',
  'Tradizione Giapponese': 'Japanese Tradition',
  'Campagna Giapponese': 'Japanese Countryside',
  'Mistero del Midnight Channel': 'Midnight Channel Mystery',
  'Ora Buia': 'Dark Hour',
  'Torre del Tartaro': 'Tartarus Tower',
  'Morte ed Esistenza': 'Death & Existence',
  'Western': 'Western',
  'Western Retrò': 'Retro Western',
  'Skate Culture': 'Skate Culture',
  'Punk Rock Anni 2000': '2000s Punk Rock',
  'Crossover Nintendo': 'Nintendo Crossover',
  'Crossover Gaming Globale': 'Global Gaming Crossover',
  'Pirati dell\'aria': 'Air Pirates',
  'Velocità Sonica': 'Sonic Speed',
  'Cooperazione Spaziale': 'Space Cooperation',
  'Fantasy Cartaceo': 'Paper Fantasy',
  'Commedia Satirica': 'Satirical Comedy',
  'Goliardico': 'Raunchy Humor',
  'Lotte da Party': 'Party Brawling',
  'Piloti Stellari': 'Star Pilots',
  'Corse Funghi': 'Mushroom Racing',
  'Battaglie Spaziali': 'Space Battles',
  'Cyberpunk Urbano': 'Urban Cyberpunk',
  'Cultura Giovanile': 'Youth Culture',
  'Guida Arcade': 'Arcade Driving',
  'Spade e Magia': 'Swords & Sorcery',
  'Fantasy Storico': 'Historical Fantasy',
  'Collezionismo': 'Collectibles',
  'Avventura Giovanile': 'Youth Adventure',
  'Animali vs Robot': 'Animals vs Robots',
  'Smeraldi del Caos': 'Chaos Emeralds',
  'Ecologia': 'Ecology',
  'Castello delle Ombre': 'Castle of Shadows',
  'Ragazzo con le Corna': 'Horned Boy',
  'Manicomio Criminale': 'Criminal Asylum',
  'Supereroi DC': 'DC Super Heroes',
  'Città Prigione': 'Prison City',
  'Criminalità Notturna': 'Night Crime',
  'Joker': 'The Joker',
  'Shambhala': 'Shambhala',
  'Cinema d\'Azione': 'Action Cinema',
  'Tesoro dei Pirati Libertalia': 'Libertalia Pirate Treasure',
  'Pirati': 'Pirates',
  'Pirati Rettili': 'Kremling Pirates',
  'Giungla': 'Jungle',
  'Banane Rubate': 'Stolen Bananas',
  'Isola dei Dinosauri': 'Dinosaur Island',
  'Yoshi': 'Yoshi',
  'Giro del Mondo': 'Globetrotting Odyssey',
  'Cappello Magico Cappy': 'Cappy Magic Hat',
  'Regno del Crepuscolo': 'Twilight Realm',
  'Lupo': 'Wolf',
  'Villaggio Romeno': 'Romanian Village',
  'Lady Dimitrescu': 'Lady Dimitrescu',
  'Anni 80 Miami': '1980s Miami',
  'Scarface': 'Scarface',
  'Musica Synthwave': 'Synthwave Music',
  'Master Chief': 'Master Chief',
  'Covenant': 'The Covenant',
  'Geni Demoniaci': 'Devil Gene',
  'Torneo Mondiale': 'World Tournament',
  'Combattimento': 'Combat',
  'Competitivo': 'Competitive',
  'Festa': 'Party',
  'Isolamento': 'Isolation',
  'D&D': 'D&D',
  'Maledizione': 'Curse',
  'Anime': 'Anime',
  'Nebbia': 'Fog',
  'Rovine Antiche': 'Ancient Ruins',
  'Insetti': 'Insects',
  'Regno Dimenticato': 'Forgotten Kingdom',
  'Mistero': 'Mystery',
  'Folklore': 'Folklore',
  'Arte Sumi-e': 'Sumi-e Art',
  'Dimensioni Parallele': 'Parallel Dimensions',
  'Destino': 'Destiny',
  'Steampunk': 'Steampunk',
  'Pellegrinaggio Religioso': 'Religious Pilgrimage',
  'Giorno dei Morti Messicano': 'Day of the Dead',
  'Jedi vs Sith': 'Jedi vs Sith',
  'Morale Lato Oscuro / Chiaro': 'Dark / Light Side Morality',
  'Profezia': 'Prophecy',
  'Torneo': 'Tournament',
  'Orchi vs Umani': 'Orcs vs Humans',
  'Monstri Simpatici': 'Charming Monsters',
  'Mondo della Luce / Oscurità': 'World of Light & Dark',
  'Maschere': 'Masks',
  'Patriottismo': 'Patriotism',
  'Stazione di Polizia': 'Police Station',
  'Mr. X Stalker': 'Mr. X Stalker',
  'Incidente Scientifico': 'Scientific Incident',
  'GLaDOS IA Impazzita': 'Rogue AI GLaDOS',
  'Umorismo Nero': 'Dark Humor',
  'Esotico': 'Exotic',
  'Shinobi': 'Shinobi',
  'Immortalità': 'Immortality',
  'Regno di Boletaria': 'Kingdom of Boletaria',
  'Nebbia Infernale': 'Infernal Fog',
  'Titani Giganti Bionis e Mechanis': 'Giant Titans Bionis & Mechanis',
  'Spada Monado': 'Monado Blade',
  'Musica e Ritmo': 'Music & Rhythm',
  'Parodia America Anni 90': '90s American Parody',
  'Giygas': 'Giygas',
  'Umorismo': 'Humor',
  'Grafica 1-bit Retrò': '1-Bit Retro Art',
  'Isola Tropicale': 'Tropical Island',
  'Vacanze': 'Vacation',
  'Acqua': 'Water',
  'Drangleic': 'Drangleic',
  'Re Vendrick': 'King Vendrick',
  'Lothric': 'Lothric',
  'Signori dei Tizzoni': 'Lords of Cinder',
  'Gunblade': 'Gunblade',
  'Hong Kong Anni 80': '1980s Hong Kong',
  'Generale': 'General',
};

export const MODE_TRANSLATIONS_EN: Record<string, string> = {
  'Giocatore singolo': 'Single-player',
  'Multiplayer': 'Multiplayer',
  'Co-op online': 'Online Co-op',
  'Online PvP': 'Online PvP',
  'Co-op Locale': 'Local Co-op',
  'Schermo condiviso': 'Split-screen',
};

export const PERSPECTIVE_TRANSLATIONS_EN: Record<string, string> = {
  '1a Persona': '1st Person',
  '3a Persona': '3rd Person',
  'Isometrica': 'Isometric',
  '2D Side-Scroller': '2D Side-Scroller',
  'Top-Down': 'Top-Down',
};

// English quotes dictionary for top games
export const GAME_QUOTES_EN: Record<string, string> = {
  'zelda-ocarina-of-time': "The Master Sword in the Temple of Time, the Ocarina and Link's journey through time to save Hyrule.",
  'super-mario-64': "It's-a me, Mario! The groundbreaking masterpiece that revolutionized 3D platformers inside Princess Peach's castle.",
  'the-witcher-3-wild-hunt': "Evil is evil. Lesser, greater, middling... Geralt of Rivia on the trail of Ciri and the Wild Hunt.",
  'chrono-trigger': "Crono, Lucca, and Marle journey across historical eras to prevent the planetary apocalypse caused by Lavos.",
  'portal-2': "The cake is a lie! GLaDOS, Wheatley, and the handheld portal device inside Aperture Science laboratories.",
  'red-dead-redemption-2': "We're more ghosts than people. Arthur Morgan and the Van der Linde gang fighting the dying days of the Wild West.",
  'half-life-2': "The right man in the wrong place can make all the difference in the world. Gordon Freeman with the crowbar in City 17.",
  'elden-ring': "Arise now, ye Tarnished! The Lands Between, the Erdtree and the shattering of the Elden Ring.",
  'the-last-of-us': "Endure and survive. Joel and Ellie traversing a fungal-devastated America in search of hope.",
  'the-last-of-us-part-2': "If I were to lose you, I'd surely lose myself. Ellie's brutal pursuit of vengeance in ruined Seattle.",
  'zelda-breath-of-the-wild': "Open your eyes. Link awakens after a 100-year slumber to explore a vast, untamed Hyrule with total freedom.",
  'metal-gear-solid': "A surveillance camera?! Tactical espionage action in Shadow Moses featuring Solid Snake and liquid genetics.",
  'final-fantasy-vii': "The lifestream, the Buster Sword of Cloud Strife and the meteor summoned by Sephiroth over Midgar.",
  'bloodborne': "May you find your worth in the waking world. The Hunter's Dream amidst the gothic and cosmic nightmare of Yharnam.",
  'dark-souls': "Praise the Sun! The First Flame, the Chosen Undead, Lordran and the cycle of fire and dark.",
  'dark-souls-3': "Ashen One, hearest thou my voice still? The Lords of Cinder and the twilight of Lothric.",
  'god-of-war-2018': "Don't be sorry, be better. Kratos and his son Atreus carrying Faye's ashes across the Norse realms.",
  'god-of-war-ragnarok': "Fimbulwinter grips Midgard: Kratos and Atreus stand against Odin and Thor before the end of the world.",
  'baldurs-gate-3': "A mind flayer parasite squirming behind your eye. Gather your party and venture forth across Faerûn.",
  'castlevania-sotn': "What is a man? A miserable little pile of secrets! Alucard infiltrates Dracula's inverted castle.",
  'super-metroid': "The last Metroid is in captivity. Samus Aran descends into the labyrinthine caverns of Planet Zebes.",
  'shadow-of-the-colossus': "Wander and Agro riding through the forbidden lands to fell sixteen titanic colossi and revive Mono.",
  'bioshock': "Would you kindly? The underwater objectivist ruins of Rapture, Big Daddies and Little Sisters.",
  'mass-effect-2': "Commander Shepard gathers an elite crew for an impossible suicide mission through the Omega-4 Relay.",
  'disco-elysium': "A hungover detective, an unsolved murder hanging from a tree, and twenty-four distinct voices inside your head.",
  'hollow-knight': "Descend into the fallen insect kingdom of Hallownest armed with a nail and the soul of the Void.",
  'hades': "In the name of Hades! Zagreus fighting his way out of the Underworld to reach Mount Olympus and Olympus' gods.",
  'diablo-2': "The Dark Wanderer marches east to free the Prime Evils: Mephisto, Diablo and Baal.",
  'world-of-warcraft': "For the Horde! For the Alliance! The lands of Azeroth welcoming millions of heroes across the globe.",
  'super-smash-bros-melee': "Nintendo's blazing-fast GameCube fighter with Fox, Marth and the most celebrated competitive wave-dash.",
  'super-smash-bros-ultimate': "Everyone is here! 89 legendary fighters clash in the ultimate celebration of video game history.",
  'tekken-3': "Jin Kazama, Hwoarang, Eddy Gordo and the monstrous Ogre in the King of Iron Fist tournament on PS1.",
  'crash-bandicoot-3': "Crash and Coco warp across time to collect the crystals before Neo Cortex and Uka Uka.",
  'spyro-2-riptos-rage': "Spyro the dragon and Sparx end up in the magical realm of Avalar to defeat the evil sorcerer Ripto.",
  'tony-hawks-pro-skater-2': "Insane combos, manual balancing, an unforgettable punk-rock soundtrack and the legend of Tony Hawk.",
  'celeste': "Madeline confronts her inner anxiety and self-doubt while climbing the steep peaks of Celeste Mountain.",
  'undertale': "The friendly RPG where nobody has to die. Sans, Papyrus, Megalovania and staying filled with determination.",
  'zelda-a-link-to-the-past': "The shift between Light World and Dark World that established the definitive blueprint of the Zelda formula.",
  'zelda-majoras-mask': "You've met with a terrible fate, haven't you? Three days to stop the menacing moon from crashing into Termina.",
  'zelda-wind-waker': "Toon Link and the King of Red Lions sailing across the vast Great Sea with the Wind Waker wand.",
  'zelda-tears-of-the-kingdom': "From the Sky Islands to the Depths of Hyrule: wield the Ultrahand to craft ingenious vehicles and weapons.",
  'metal-gear-solid-3': "Naked Snake in the Soviet jungle during the Cold War leading to the unforgettable duel with The Boss.",
  'metal-gear-solid-2': "The Big Shell, Raiden and Kojima's prescient vision of digital information control and memes.",
  'resident-evil-2-original': "Raccoon City Police Department overrun by zombies with rookie cop Leon S. Kennedy and Claire Redfield.",
  'resident-evil-2-remake': "The heavy, relentless footsteps of Mr. X echoing through the dark corridors of the R.P.D.",
  'half-life-1': "The resonance cascade at Black Mesa tears open portals to Xen: Gordon Freeman takes up the crowbar.",
  'portal-1': "Now you're thinking with portals. Chell solves GLaDOS's test chambers before the legendary Still Alive song.",
  'batman-arkham-city': "The Dark Knight glides over the open-air prison of Arkham City confronting the Joker and Hugo Strange.",
  'batman-arkham-asylum': "Welcome to the madhouse! Revolutionary FreeFlow combat through the gothic corridors of Arkham Asylum.",
  'uncharted-2': "Nathan Drake clinging to a derailed train dangling off a Himalayan cliff in search of Shambhala.",
  'uncharted-4': "One last time. Nathan Drake and his brother Sam track the legendary pirate utopia of Libertalia.",
  'journey': "A silent robed traveler glides over golden desert dunes toward the shining beacon atop the mountain.",
  'sekiro-shadows-die-twice': "Deflect katana on katana with rhythmic precision: the One-Armed Wolf protects Young Lord Kuro in Sengoku Japan.",
  'monster-hunter-world': "The Fifth Fleet sets sail for the New World to track Elder Dragons amidst vibrant, living ecosystems.",
  'cyberpunk-2077': "Wake up, samurai! We have a city to burn. V and Johnny Silverhand navigating corrupt Night City.",
  'metroid-dread': "Samus hunted by the relentless and terrifying E.M.M.I. research units in the depths of Planet ZDR.",
  'super-mario-world': "Yoshi's legendary debut in Dinosaur Land with the cape feather flight on the Super Nintendo.",
  'super-mario-odyssey': "Mario tosses Cappy to capture enemies and travel between New Donk City and globe-spanning kingdoms.",
  'mario-kart-8-deluxe': "Anti-gravity tracks, the notorious blue shell, and the best-selling party racer of all time.",
  'donkey-kong-country': "Donkey Kong and Diddy blast through minecart tracks across DK Island to reclaim their stolen banana hoard.",
  'banjo-kazooie': "The honey bear Banjo and the sassy bird Kazooie in their backpack taking on the wicked witch Gruntilda.",
  'goldeneye-007': "James Bond with the silenced PP7 and legendary four-player split-screen shootouts on the Nintendo 64.",
  'perfect-dark': "Agent Joanna Dark investigates alien conspiracies at the Carrington Institute with an arsenal of futuristic gadgetry.",
  'shenmue': "Ryo Hazuki searches for his father's killer on the streets of 1986 Yokosuka, questioning every passerby.",
  'sonic-the-hedgehog-2': "The Spin Dash, the introduction of two-tailed Miles 'Tails' Prower, and looping through Chemical Plant Zone.",
  'mega-man-x': "X, the reploid of infinite potential, armed with the X-Buster and wall-kick maneuver against rogue Mavericks.",
  'ico': "A horned boy takes the enigmatic girl Yorda by the hand, fleeing the shadow spirits of an ancient fortress.",
  'demons-souls': "The Old One has awakened, cloaking the once-proud kingdom of Boletaria in a colorless, soul-devouring fog.",
  'xenoblade-chronicles': "Shulk wields the prophetic Monado blade atop the colossal titan bodies of Bionis and Mechanis.",
  'persona-4-golden': "The Midnight Channel airs at midnight on rainy days in the peaceful rural town of Inaba.",
  'mother-3': "Lucas and his family on the Nowhere Islands: a profoundly emotional tale of love, loss, and industrial change.",
  'earthbound': "Ness, the trusty baseball bat, and PSI powers standing against the cosmic horror of Giygas in Onett.",
  'return-of-the-obra-dinn': "The Memento Mortem pocket watch reconstructs the exact instant of death for all 60 souls aboard the ghost vessel.",
  'outer-wilds': "A 22-minute time loop before the sun goes supernova: explore a handcrafted solar system to unravel the ancient Nomai.",
  'nier-automata': "Glory to mankind. Androids 2B and 9S fight an endless proxy war across a haunting, post-human Earth.",
};

export function getLocalizedQuote(game: VideoGameItem, lang?: LolLanguage | string): string {
  if (lang === 'en' && GAME_QUOTES_EN[game.id]) {
    return GAME_QUOTES_EN[game.id];
  }
  return game.iconicQuote;
}

export function localizeSpecLabel(label: string, lang?: LolLanguage | string): string {
  if (lang === 'en') {
    switch (label) {
      case 'Sviluppatore':
      case 'Developer':
        return 'Developer';
      case 'Genere':
      case 'Genre':
        return 'Genre';
      case 'Tema':
      case 'Theme':
        return 'Theme';
      case 'Anno Uscita':
      case 'Release Year':
        return 'Release Year';
      case 'Piattaforme':
      case 'Platforms':
        return 'Platforms';
      case 'PEGI':
        return 'PEGI';
      case 'Modalità':
      case 'Game Modes':
      case 'Mode':
        return 'Game Modes';
      case 'Prospettiva':
      case 'Perspective':
        return 'Perspective';
      case 'Tipo':
      case 'Type':
        return 'Type';
      default:
        return label;
    }
  } else {
    switch (label) {
      case 'Developer':
      case 'Sviluppatore':
        return 'Sviluppatore';
      case 'Genre':
      case 'Genere':
        return 'Genere';
      case 'Theme':
      case 'Tema':
        return 'Tema';
      case 'Release Year':
      case 'Anno Uscita':
        return 'Anno Uscita';
      case 'Platforms':
      case 'Piattaforme':
        return 'Piattaforme';
      case 'PEGI':
        return 'PEGI';
      case 'Game Modes':
      case 'Mode':
      case 'Modalità':
        return 'Modalità';
      case 'Perspective':
      case 'Prospettiva':
        return 'Prospettiva';
      case 'Type':
      case 'Tipo':
        return 'Tipo';
      default:
        return label;
    }
  }
}

const ITALIAN_COMMON_WORD_MAP: Record<string, string> = {
  'azione': 'Action',
  'avventura': 'Adventure',
  'grafica': 'Graphic',
  'grafico': 'Graphic',
  'narrativa': 'Narrative',
  'narrativo': 'Narrative',
  'spaziale': 'Space',
  'spaziali': 'Space',
  'militare': 'Military',
  'militari': 'Military',
  'giappone': 'Japan',
  'giapponese': 'Japanese',
  'cultura': 'Culture',
  'asiatico': 'Asian',
  'asiatica': 'Asian',
  'cinese': 'Chinese',
  'medievale': 'Medieval',
  'fantascienza': 'Sci-Fi',
  'corse': 'Racing',
  'sportivo': 'Sports',
  'rompicapo': 'Puzzle',
  'logico': 'Logic',
  'logica': 'Logic',
  'simulazione': 'Simulation',
  'psicologico': 'Psychological',
  'psicologica': 'Psychological',
  'creativo': 'Creative',
  'creativa': 'Creative',
  'esplorazione': 'Exploration',
  'investigativo': 'Investigative',
  'caccia': 'Hunting',
  'mostri': 'Monsters',
  'magia': 'Magic',
  'draghi': 'Dragons',
  'ombre': 'Shadows',
  'ladri': 'Thieves',
  'morte': 'Death',
  'esistenza': 'Existence',
  'viaggio': 'Journey',
  'viaggi': 'Travel',
  'spirituale': 'Spiritual',
  'minimalista': 'Minimalist',
  'minimalismo': 'Minimalism',
  'montagna': 'Mountain',
  'sacra': 'Sacred',
  'sacro': 'Sacred',
  'isola': 'Island',
  'isole': 'Islands',
  'celeste': 'Sky',
  'celesti': 'Sky',
  'fiaba': 'Fairytale',
  'fiabesco': 'Fairytale',
  'streghe': 'Witches',
  'alieni': 'Aliens',
  'alieno': 'Alien',
  'invasione': 'Invasion',
  'pianeta': 'Planet',
  'deserto': 'Desert',
  'infinito': 'Endless',
  'costruzione': 'Building',
  'fusione': 'Fusion',
  'gravità': 'Gravity',
  'cosmico': 'Cosmic',
  'cosmica': 'Cosmic',
  'ecosistemi': 'Ecosystems',
  'vivi': 'Living',
  'armature': 'Armor',
  'campagna': 'Countryside',
  'mistero': 'Mystery',
  'ora': 'Hour',
  'buia': 'Dark',
  'torre': 'Tower',
  'animali': 'Animals',
  'smeraldi': 'Emeralds',
  'caos': 'Chaos',
  'ecologia': 'Ecology',
  'castello': 'Castle',
  'ragazzo': 'Boy',
  'corna': 'Horns',
  'manicomio': 'Asylum',
  'criminale': 'Criminal',
  'supereroi': 'Super Heroes',
  'città': 'City',
  'prigione': 'Prison',
  'tempo': 'Time',
  'poetico': 'Poetic',
  'poetica': 'Poetic',
};

/**
 * Automatically translates Italian gaming terms, genres, themes, and phrases to English.
 */
export function autoTranslateItalianToEnglish(text: string): string {
  if (!text) return text;
  const trimmed = text.trim();

  // 1. Direct dictionaries
  if (GENRE_TRANSLATIONS_EN[trimmed]) return GENRE_TRANSLATIONS_EN[trimmed];
  if (THEME_TRANSLATIONS_EN[trimmed]) return THEME_TRANSLATIONS_EN[trimmed];
  if (MODE_TRANSLATIONS_EN[trimmed]) return MODE_TRANSLATIONS_EN[trimmed];
  if (PERSPECTIVE_TRANSLATIONS_EN[trimmed]) return PERSPECTIVE_TRANSLATIONS_EN[trimmed];

  // 2. Comma-separated list handling
  if (trimmed.includes(',')) {
    return trimmed
      .split(/,\s*/)
      .map((item) => autoTranslateItalianToEnglish(item))
      .join(', ');
  }

  // 3. Multi-word or phrase replacement
  const lower = trimmed.toLowerCase();
  let translated = lower;
  for (const [itWord, enWord] of Object.entries(ITALIAN_COMMON_WORD_MAP)) {
    const regex = new RegExp(`\\b${itWord}\\b`, 'gi');
    translated = translated.replace(regex, enWord);
  }

  // If words were replaced, capitalize nicely
  if (translated !== lower) {
    return translated
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return trimmed;
}

export function localizeSpecValue(label: string, value: any, lang?: LolLanguage | string): any {
  if (!value) return value;

  const normalizedLabel = label.toLowerCase();

  if (lang === 'en') {
    if (normalizedLabel.includes('prospettiv') || normalizedLabel.includes('perspective')) {
      return PERSPECTIVE_TRANSLATIONS_EN[String(value)] || autoTranslateItalianToEnglish(String(value));
    }

    if (normalizedLabel === 'tipo' || normalizedLabel === 'type') {
      const v = String(value);
      if (v === 'Normale') return 'Standard';
      return v;
    }

    if (normalizedLabel.includes('modalit') || normalizedLabel.includes('mode')) {
      const rawStr = String(value);
      const parts = rawStr.split(/,\s*/);
      const translated = parts.map((p) => MODE_TRANSLATIONS_EN[p] || autoTranslateItalianToEnglish(p));
      return translated.join(', ');
    }

    if (normalizedLabel.includes('gener') || normalizedLabel.includes('genre')) {
      const rawStr = String(value);
      const parts = rawStr.split(/,\s*/);
      const translated = parts.map((p) => GENRE_TRANSLATIONS_EN[p] || autoTranslateItalianToEnglish(p));
      return translated.join(', ');
    }

    if (normalizedLabel.includes('tem') || normalizedLabel.includes('theme')) {
      const rawStr = String(value);
      const parts = rawStr.split(/,\s*/);
      const translated = parts.map((p) => THEME_TRANSLATIONS_EN[p] || autoTranslateItalianToEnglish(p));
      return translated.join(', ');
    }

    if (normalizedLabel === 'pegi') {
      if (String(value) === 'N/D') return 'N/A';
      return value;
    }

    return autoTranslateItalianToEnglish(String(value));
  }

  // IT language fallback/normalization
  if (normalizedLabel === 'pegi' && String(value) === 'N/A') {
    return 'N/D';
  }

  return value;
}
