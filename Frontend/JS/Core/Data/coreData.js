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

export const coreData = Object.freeze({
    maps: {
        mapGroups,
        mapImageFolders
    }
});