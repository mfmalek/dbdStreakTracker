import { dbdData } from "./streakData.js";

const MODE = document.body.dataset.mode;
const SURVIVOR_COUNT = {
    solo: 1,
    duo: 2,
    trio: 3,
    squad: 4
}[MODE];

function initCore() {
    setupSurvivorPerks();
    setupKillerPerks();
    setupKillerNames();
    setupKillerImageOnChange();
    setupMaps();
    setupMapImageOnChange();
}

function createOptionsFromArray(array) {
    return array.map(item => ({
        value: item,
        text: item
    }));
}

function createTomSelect(id, options, placeholder) {
    new TomSelect(`#${id}`, {
        options,
        valueField: "value",
        labelField: "text",
        searchField: ["text"],
        create: false,
        maxItems: 1,
        placeholder,
        allowEmptyOption: true,
        maxOptions: null,
        sortField: { field: "text", direction: "asc" }
    });
}

function setupSurvivorPerks() {
    const perks = createOptionsFromArray(dbdData.perks.survivor);

    for(let s = 1; s <= SURVIVOR_COUNT; s++) {
        for(let p = 1; p <= 4; p++) {
            createTomSelect(`perk${p}Surv${s}`, perks, "Select a perk");
        }
    }
}

function setupKillerPerks() {
    const perks = createOptionsFromArray(dbdData.perks.killer);

    for(let p = 1; p <= 4; p++) {
        createTomSelect(`killerPerk${p}`, perks, "Select a perk");
    }
}

function setupKillerNames() {
    const options = createOptionsFromArray(dbdData.names.killer);

    createTomSelect("killerName", options, "Select Killer");
}

function setupKillerImageOnChange() {
    const killerSelect = document.getElementById("killerName");
    const killerImage = document.getElementById("killerImage");

    if(!killerSelect || !killerImage) return;

    killerSelect.addEventListener("change", () => {
        const selectedKiller = killerSelect.value;
        const killerName = selectedKiller.replace(/[^a-zA-Z0-9]/g, "");

        if(!selectedKiller) {
            killerImage.src = "../Images/Miscellaneous/Icon_Killer.png";
            return;
        }

        killerImage.src = `../Images/Portraits/Killers/Portrait_${killerName}.png`;
        killerImage.alt = selectedKiller;
    });
}

function setupMaps() {
    const mapSelect = document.getElementById("mapName");

    const config = {
        create: false,
        maxItems: 1,
        placeholder: "Select Map",
        valueField: "value",
        labelField: "text",
        searchField: ["text", "realm"],
        optgroups: [],
        options: [],
        maxOptions: null,
        render: {
            optgroup_header: function(data, escape) {
                return `
                    <div class="tsOptgroupHeader">
                        ${escape(data.label)}
                    </div>`;
            },
            option: function(data, escape) {
                return `
                    <div class="tsMapOption">
                        <span class="mapIcon">🗺️ </span>
                        ${escape(data.text)}
                    </div>
                `;
            }
        }
    };

    Object.entries(dbdData.maps.mapGroups).forEach(([realm, maps], index) => {
        const group = `group${index}`;

        config.optgroups.push({
            label: realm,
            value: group
        });

        maps.forEach(map => {
            config.options.push({
                value: map,
                text: map,
                realm: realm,
                optgroup: group
            });
        });
    });
    new TomSelect(mapSelect, config);
}

function setupMapImageOnChange() {
    const mapSelect = document.getElementById("mapName");
    const mapImage = document.getElementById("mapImage");

    if(!mapSelect || !mapImage) return;

    mapSelect.addEventListener("change", () => {
        const selectedMap = mapSelect.value;
        const baseMapName = selectedMap.replace(/\s+(I{1,3}|IV|V)$/, "");
        const mapName = baseMapName.replace(/[^a-zA-Z0-9]/g, "");
        const realmFolder = dbdData.maps.mapImageFolders[baseMapName];

        if((!selectedMap) || (!realmFolder)) {
            mapImage.src = "../Images/Maps/Map_GenericMapBackground.png";
            return;
        }

        mapImage.src = `../Images/Maps/${realmFolder}/Map_${mapName}.png`;
        mapImage.alt = selectedMap;
    });
}

function setWinCondition(match) {
    if(!match || !Array.isArray(match.survivors)) return false;

    const survivedCount = match.survivors.filter(s => s.survived).length;

    switch(MODE) {
        case "solo":
            return survivedCount === 1;
        case "duo":
            return survivedCount >= 1;
        case "trio":
            return survivedCount >= 2;
        case "squad":
            return survivedCount >= 3;
        default:
            return false;
    }
}

function calculateCurrentStreak(matches) {
    let currentStreak = 0;

    for(let i = matches.length - 1; i >= 0; i--) {
        if(setWinCondition(matches[i])) {
            currentStreak++;
        } else {
            break;
        }
    }
    return currentStreak;
}

function calculateBestStreak(matches) {
    let bestStreak = 0;
    let tempStreak = 0;

    matches.forEach(match => {
        if(setWinCondition(match)) {
            tempStreak++;
            bestStreak = Math.max(bestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    });
    return bestStreak;
}

export const dbdCore = {
    MODE,
    SURVIVOR_COUNT,
    initCore,
    calculateCurrentStreak,
    calculateBestStreak
}