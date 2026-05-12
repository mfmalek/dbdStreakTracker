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

const mapImageNames = {
    "Azarov's Resting Place": "Map_AzarovsRestingPlace.png",
    "Blood Lodge": "Map_BloodLodge.png",
    "Gas Heaven": "Map_GasHeaven.png",
    "Wreckers' Yard": "Map_WreckersYard.png",
    "Wretched Shop": "Map_WretchedShop.png",
    "Grim Pantry": "Map_GrimPantry.png",
    "Pale Rose": "Map_PaleRose.png",
    "Fractured Cowshed": "Map_FracturedCowshed.png",
    "Rancid Abattoir": "Map_RancidAbattoir.png",
    "Rotten Fields": "Map_RottenFields.png",
    "Thompson House": "Map_ThompsonHouse.png",
    "Torment Creek": "Map_TormentCreek.png",
    "Disturbed Ward": "Map_DisturbedWard.png",
    "Father Campbell's Chapel": "Map_FatherCampbellsChapel.png",
    "Forgotten Ruins": "Map_ForgottenRuins.png",
    "The Shattered Square": "Map_TheShatteredSquare.png",
    "Nostromo Wreckage": "Map_NostromoWreckage.png",
    "Toba Landing": "Map_TobaLanding.png",
    "Dead Sands": "Map_DeadSands.png",
    "Eyrie of Crows": "Map_EyrieOfCrows.png",
    "The Game": "Map_TheGame.png",
    "Dead Dawg Saloon": "Map_DeadDawgSaloon.png",
    "Lampkin Lane": "Map_LampkinLane.png",
    "The Underground Complex": "Map_TheUndergroundComplex.png",
    "Treatment Theatre": "Map_TreatmentTheatre.png",
    "Coal Tower I": "Map_CoalTower.png",
    "Coal Tower II": "Map_CoalTower.png",
    "Groaning Storehouse I": "Map_GroaningStorehouse.png",
    "Groaning Storehouse II": "Map_GroaningStorehouse.png",
    "Ironworks of Misery I": "Map_IronworksOfMisery.png",
    "Ironworks of Misery II": "Map_IronworksOfMisery.png",
    "Shelter Woods I": "Map_ShelterWoods.png",
    "Shelter Woods II": "Map_ShelterWoods.png",
    "Suffocation Pit I": "Map_SuffocationPit.png",
    "Suffocation Pit II": "Map_SuffocationPit.png",
    "Mount Ormond Resort I": "Map_MountOrmondResort.png",
    "Mount Ormond Resort II": "Map_MountOrmondResort.png",
    "Mount Ormond Resort III": "Map_MountOrmondResort.png",
    "Ormond Lake Mine": "Map_OrmondLakeMine.png",
    "RPD East Wing": "Map_RpdEastWing.png",
    "RPD West Wing": "Map_RpdWestWing.png",
    "Mother's Dwelling": "Map_MothersDwelling.png",
    "Temple of Purgation": "Map_TempleOfPurgation.png",
    "Midwich Elementary School": "Map_MidwichElementarySchool.png",
    "Trickster's Delusion": "Map_TrickstersDelusion.png",
    "Badham Preschool I": "Map_BadhamPreschool.png",
    "Badham Preschool II": "Map_BadhamPreschool.png",
    "Badham Preschool III": "Map_BadhamPreschool.png",
    "Badham Preschool IV": "Map_BadhamPreschool.png",
    "Badham Preschool V": "Map_BadhamPreschool.png",
    "Fallen Refuge": "Map_FallenRefuge.png",
    "Freddy Fazbear's Pizza": "Map_FreddyFazbearsPizza.png",
    "Garden of Joy": "Map_GardenOfJoy.png",
    "Greenville Square": "Map_GreenvilleSquare.png",
    "Family Residence I": "Map_FamilyResidence.png",
    "Family Residence II": "Map_FamilyResidence.png",
    "Sanctum of Wrath I": "Map_SanctumOfWrath.png",
    "Sanctum of Wrath II": "Map_SanctumOfWrath.png"
};

export const coreData = Object.freeze({
    maps: {
        mapGroups,
        mapImageFolders,
        mapImageNames
    }
});