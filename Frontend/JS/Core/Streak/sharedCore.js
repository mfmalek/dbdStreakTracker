import { coreData } from "../Data/coreData.js";

const MODE = document.body.dataset.mode;

function calculateCurrentStreak(matches) {
    let streak = 0;

    for (let i = matches.length - 1; i >= 0; i--) {
        if (matches[i].result === "win") streak++;
        else break;
    }
    return streak;
}

function calculateBestStreak(matches) {
    let best = 0;
    let temp = 0;

    for (const match of matches) {
        if (match.result === "win") {
            temp++;
            best = Math.max(best, temp);
        } else {
            temp = 0;
        }
    }
    return best;
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
            optgroup_header: function (data, escape) {
                return `
                    <div class="tsOptgroupHeader">
                        ${escape(data.label)}
                    </div>`;
            },
            option: function (data, escape) {
                return `
                    <div class="tsMapOption">
                        <span class="mapIcon">🗺️ </span>
                        ${escape(data.text)}
                    </div>
                `;
            }
        }
    };

    Object.entries(coreData.maps.mapGroups).forEach(([realm, maps], index) => {
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

    if (!mapSelect || !mapImage) return;
    mapSelect.addEventListener("change", () => {
        const selectedMap = mapSelect.value;
        const baseMapName = selectedMap.replace(/\s+(I{1,3}|IV|V)$/, "");
        const mapName = baseMapName.replace(/[^a-zA-Z0-9]/g, "");
        const realmFolder = coreData.maps.mapImageFolders[baseMapName];

        if ((!selectedMap) || (!realmFolder)) {
            mapImage.src = "../Images/Maps/Map_GenericMapBackground.png";
            return;
        }
        mapImage.src = `../Images/Maps/${realmFolder}/Map_${mapName}.png`;
        mapImage.alt = selectedMap;
    });
}

export const sharedCore = {
    MODE,
    calculateCurrentStreak,
    calculateBestStreak,
    setupMaps,
    setupMapImageOnChange
};