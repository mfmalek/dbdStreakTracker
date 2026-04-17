const survivorPerks = [
    "Ace in the Hole", "Adrenaline", "Aftercare", "Alert", "Any Means Necessary",
    "Apocalyptic Ingenuity", "Appraisal", "Autodidact", "Babysitter", "Background Player",
    "Bada Bada Boom", "Balanced Landing", "Bardic Inspiration", "Better Together", "Better than New",
    "Bite the Bullet","Blast Mine", "Blood Pact", "Blood Rush", "Boil Over", "Bond",
    "Boon: Circle of Healing", "Boon: Dark Theory", "Boon: Exponential", "Boon: Illumination",
    "Boon: Shadow Step", "Borrowed Time", "Botany Knowledge", "Breakdown", "Breakout", "Buckle Up",
    "Built to Last", "Calm Spirit", "Camaraderie", "Champion of Light", "Change of Plan", "Chemical Trap",
    "Clairvoyance", "Clean Break", "Come and Get Me!", "Conviction", "Corrective Action", "Counterforce",
    "Cut Loose", "Dance With Me", "Dark Sense", "Dead Hard", "Deadline", "Deception", "Decisive Strike",
    "Déjà Vu", "Deliverance", "Desperate Measures", "Detective's Hunch", "Distortion", "Diversion",
    "Do No Harm", "Dramaturgy", "Duty Care", "Empathic Connection", "Empathy", "Extrasensory Perception",
    "Exultation", "Eyes of Belmont", "Fast Track", "Finesse", "Fixated", "Flashbang", "Flip-Flop", "Fogwise",
    "For the People", "Friendly Competition", "Ghost Notes", "Hardened", "Head On", "Hope", "Hyperfocus",
    "Inner Focus", "Inner Strength", "Invocation: Treacherous Crows", "Invocation: Weaving Spiders",
    "Iron Will", "Kindred", "Last Stand", "Leader", "Left Behind", "Light-Footed", "Lightweight", "Lithe",
    "Low Profile", "Lucky Break", "Lucky Star", "Made for This", "Mettle of Man", "Mirrored Illusion",
    "Moment of Glory", "No Mither", "No One Left Behind", "Object of Obsession", "Off the Record",
    "One-Two-Three-Four!", "Open-Handed", "Overcome", "Overzealous", "Parental Guidance", "Pharmacy",
    "Plot Twist", "Plunder's Instinct", "Poised", "Potential Energy", "Power Struggle", "Premonition",
    "Prove Thyself", "Quick & Quiet", "Quick Gambit", "Rapid Response", "Reactive Healing", "Reassurance",
    "Red Herring", "Repressed Alliance", "Residual Manifest", "Resilience", "Resurgence", "Road Life",
    "Rookie Spirit", "Saboteur", "Scavenger", "Scene Partner", "Second Wind", "Self-Care", "Self-Preservation",
    "Shoulder the Burden", "Slippery Meat", "Small Game", "Smash Hit", "Sole Survivor", "Solidarity", "Soul Guard",
    "Specialist", "Spine Chill", "Sprint Burst", "Stake Out", "Still Sight", "Streetwise", "Strength in Shadows",
    "Teamwork: Collective Stealth", "Teamwork: Full Circuit", "Teamwork: Power of Two", "Teamwork: Soft-Spoken",
    "Teamwork: Throw Down", "Teamwork: Toughen Up", "Technician", "Tenacity", "This Is Not Happening",
    "Troubleshooter", "Unbreakable", "Up the Ante", "Urban Evasion", "Vigil", "Visionary", "Wake Up!",
    "We See You", "We'll Make It", "We're Gonna Live Forever", "Wicked", "Windows of Opportunity", "Wiretap"
];

const killerPerks = [
    "A Nurse's Calling", "Agitation", "Alien Instinct", "All-Shaking Thunder",
    "Awakened Awareness", "Bamboozle", "Barbecue & Chilli", "Batteries Included",
    "Beast of Prey", "Bitter Murmur", "Blood Echo", "Blood Warden", "Bloodhound",
    "Brutal Strength", "Call of Brine", "Corrupt Intervention", "Coulrophobia",
    "Coup de Grâce", "Cruel Limits", "Dark Arrogance", "Dark Devotion", "Darkness Reveal",
    "Dead Man's Switch", "Deadlock", "Deathbound", "Deerstalker", "Discordance", "Dissolution",
    "Distressing", "Dominance", "Dragon's Grip", "Dying Light", "Enduring", "Eruption", "Fire Up",
    "Forced Hesitation", "Forced Penance", "Forever Entwined", "Franklin's Demise", "Friends 'till the End",
    "Furtive Chase", "Game Afoot", "Gearhead", "Genetic Limits", "Grim Embrace", "Haywire", "Help Wanted",
    "Hex: Blood Favour", "Hex: Crowd Control", "Hex: Devour Hope", "Hex: Face the Darkness",
    "Hex: Haunted Ground", "Hex: Hive Mind", "Hex: Huntress Lullaby", "Hex: No One Escapes Death", "Hex: Nothing but Misery",
    "Hex: Overtune of Doom", "Hex: Pentimento", "Hex: Plaything", "Hex: Retribution", "Hex: Ruin", "Hex: The Third Seal",
    "Hex: Thrill of the Hunt", "Hex: Two Can Play", "Hex: Undying", "Hex: Wretched Fate",
    "Hoarder", "Hubris", "Human Greed", "Hysteria", "I'm All Ears", "Infectious Fright",
    "Insidious", "Iron Grasp", "Iron Maiden", "Knock Out", "Languid Touch", "Lethal Pursuer",
    "Leverage", "Lightborn", "Machine Learning", "Mad Grit", "Make Your Choice",
    "Merciless Storm", "Mindbreaker", "Monitor & Abuse", "Nemesis", "No Quarter", "No Way Out",
    "None Are Free", "Nowhere to Hide", "Oppression", "Overcharge", "Overwhelming Presence", "Phantom Fear",
    "Play with Your Food", "Pop Goes the Weasel", "Predator", "Rancor", "Rapid Brutality", "Ravenous", "Remember Me",
    "Save the Best for Last", "Scourge Hook: Floods of Rage", "Scourge Hook: Gift of Pain",
    "Scourge Hook: Hangman's Trick", "Scourge Hook: Jagged Compass",
    "Scourge Hook: Monstrous Shrine", "Scourge Hook: Pain Resonance", "Secret Project", "Septic Touch",
    "Shadowborn", "Shattered Hope", "Sloppy Butcher", "Spies from the Shadows", "Spirit Fury",
    "Starstruck", "Stridor", "Superior Anatomy", "Surge", "Surveillance", "Tanatophobia", "THWACK!",
    "Terminus", "Territorial Imperative", "Thrilling Tremors", "Tinkerer",
    "Trail of Torment", "Turn Back the Clock", "Ultimate Weapon", "Unbound", "Undone", "Unforseen",
    "Unnerving Presence", "Unrelenting", "Wandering Eye", "Weave Attunement", "Whispers", "Zanshin Tactics"
];

const survivorNames = [
    "Dwight Fairfield", "Meg Thomas", "Claudette Morel", "Jake Park", "Nea Karlsson",
    "Laurie Strode", "Ace Visconti", "Bill Overbeck", "Feng Min", "David King",
    "Quentin Smith", "Detective Tapp", "Kate Denson", "Adam Francis", "Jeff Johansen",
    "Jane Romero", "Ashley J. Williams", "Nancy Wheeler", "Steve Harrington", "Yui Kimura",
    "Zarina Kassir", "Cheryl Mason", "Felix Richter", "Élodie Rakoto", "Yun-Jin Lee",
    "Jill Valentine", "Leon S. Kennedy", "Mikaela Reid", "Jonah Vasquez", "Yoichi Asakawa",
    "Haddie Kaur", "Ada Wong", "Rebecca Chambers", "Vittorio Toscano", "Thalita Lyra",
    "Renato Lyra", "Gabriel Soma", "Nicolas Cage", "Ellen Ripley", "Alan Wake",
    "Sable Ward", "Aestri Yazar", "Lara Croft", "Trevor Belmont", "Taurie Cain",
    "Orela Rose", "Rick Grimes", "Michonne Grimes", "Vee Boonyasak", "Dustin Henderson",
    "Eleven"
];

const killerNames = [
    "The Trapper", "The Wraith", "The Hillbilly", "The Nurse", "The Huntress",
    "The Shape", "The Hag", "The Doctor", "The Cannibal", "The Nightmare",
    "The Pig", "The Clown", "The Spirit", "The Legion", "The Plague",
    "The Ghost Face", "The Demogorgon", "The Oni", "The Deathslinger", "The Executioner",
    "The Blight", "The Twins", "The Trickster", "The Nemesis", "The Cenobite",
    "The Artist", "The Onryo", "The Dredge", "The Mastermind", "The Knight",
    "The Skull Merchant", "The Singularity", "The Xenomorph", "The Good Guy", "The Unknown",
    "The Lich", "The Dark Lord", "The Houndmaster", "The Ghoul", "The Animatronic", "The Krasue", "The First"
];

const mapGroups = {
    "Autohaven": [
        "Azarov's Resting Place", "Blood Lodge", "Gas Heaven", "Wreckers' Yard", "Wretched Shop"
    ],
    "Backwater Swamp": [
        "Grim Pantry", "Pale Rose"
    ],
    "Coldwind Farm": [
        "Fractured Cowshed", "Rancid Abattoir", "Rotten Fields", "Thompson House", "Torment Creek"
    ],
    "Crotus Prenn Asylum": [
        "Disturbed Ward", "Father Campbell's Chapel"
    ],
    "Decimated Borgo": [
        "The Shattered Square", "Forgotten Ruins"
    ],
    "Dvarka Deepwood": [
        "Toba Landing", "Nostromo Wreckage"
    ],
    "Forsaken Boneyard": [
        "Eyrie of Crows", "Dead Sands"
    ],
    "Gideon Meat Plant": [
        "The Game"
    ],
    "Grave of Glenvale": [
        "Dead Dawg Saloon"
    ],
    "Haddonfield": [
        "Lampkin Lane"
    ],
    "Hawkins National Laboratory": [
        "The Underground Complex"
    ],
    "Léry's Memorial Institute": [
        "Treatment Theatre"
    ],
    "MacMillan Estate": [
        "Coal Tower I", "Coal Tower II", "Groaning Storehouse I", "Groaning Storehouse II",
        "Ironworks of Misery I", "Ironworks of Misery II", "Shelter Woods I", "Shelter Woods II",
        "Suffocation Pit I", "Suffocation Pit II"
    ],
    "Ormond": [
        "Mount Ormond Resort I", "Mount Ormond Resort II", "Mount Ormond Resort III", "Ormond Lake Mine"
    ],
    "Raccoon City": [
        "RPD East Wing", "RPD West Wing"
    ],
    "Red Forest": [
        "Mother's Dwelling", "Temple of Purgation"
    ],
    "Silent Hill": [
        "Midwich Elementary School"
    ],
    "Sleepless District": [
        "Trickster's Delusion"
    ],
    "Springwood": [
        "Badham Preschool I", "Badham Preschool II", "Badham Preschool III",
        "Badham Preschool IV", "Badham Preschool V"
    ],
    "Withered Isle": [
        "Fallen Refuge", "Freddy Fazbear's Pizza", "Garden of Joy", "Greenville Square"
    ],
    "Yamaoka Estate": [
        "Family Residence I", "Family Residence II", "Sanctum of Wrath I", "Sanctum of Wrath II"
    ]
};

const mapImageFolders = {
    "Azarov's Resting Place": "Autohaven",
    "Blood Lodge": "Autohaven",
    "Gas Heaven": "Autohaven",
    "Wreckers' Yard": "Autohaven",
    "Wretched Shop": "Autohaven",
    "Grim Pantry": "Backwater Swamp",
    "Pale Rose": "Backwater Swamp",
    "Fractured Cowshed": "Coldwind Farm",
    "Rancid Abattoir": "Coldwind Farm",
    "Rotten Fields": "Coldwind Farm",
    "Thompson House": "Coldwind Farm",
    "Torment Creek": "Coldwind Farm",
    "Disturbed Ward": "Crotus Prenn Asylum",
    "Father Campbell's Chapel": "Crotus Prenn Asylum",
    "Forgotten Ruins": "Decimated Borgo",
    "The Shattered Square": "Decimated Borgo",
    "Nostromo Wreckage": "Dvarka Deepwood",
    "Toba Landing": "Dvarka Deepwood",
    "Dead Sands": "Forsaken Boneyard",
    "Eyrie of Crows": "Forsaken Boneyard",
    "The Game": "Gideon Meat Plant",
    "Dead Dawg Saloon": "Grave of Glenvale",
    "Lampkin Lane": "Haddonfield",
    "The Underground Complex": "Hawkins National Laboratory",
    "Treatment Theatre": "Lérys Memorial Institute",
    "Coal Tower": "MacMillan Estate",
    "Groaning Storehouse": "MacMillan Estate",
    "Ironworks of Misery": "MacMillan Estate",
    "Shelter Woods": "MacMillan Estate",
    "Suffocation Pit": "MacMillan Estate",
    "Mount Ormond Resort": "Ormond",
    "Ormond Lake Mine": "Ormond",
    "RPD East Wing": "Raccoon City",
    "RPD West Wing": "Raccoon City",
    "Mother's Dwelling": "Red Forest",
    "Temple of Purgation": "Red Forest",
    "Midwich Elementary School": "Silent Hill",
    "Trickster's Delusion": "Sleepless District",
    "Badham Preschool": "Springwood",
    "Fallen Refuge": "Withered Isle",
    "Freddy Fazbear's Pizza": "Withered Isle",
    "Garden of Joy": "Withered Isle",
    "Greenville Square": "Withered Isle",
    "Family Residence": "Yamaoka Estate",
    "Sanctum of Wrath": "Yamaoka Estate"
};

export const dbdData = Object.freeze({
    perks: {
        survivor: survivorPerks,
        killer: killerPerks
    },
    names: {
        survivor: survivorNames,
        killer: killerNames
    },
    maps: {
        mapGroups,
        mapImageFolders
    }
});