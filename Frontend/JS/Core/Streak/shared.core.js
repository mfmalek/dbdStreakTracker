import { mapData } from "../Data/map.data.js";
import { dataManager } from "../Data/data.manager.js"

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

    Object.entries(mapData.maps).forEach(([realm, maps], index) => {
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

        const realmName = dataManager.mapRealms[selectedMap];
        const mapFileName = dataManager.mapImages[selectedMap];

        if (!realmName || !mapFileName) {
            mapImage.src = "../Images/Maps/Map_GenericMapBackground.png";
            return;
        }

        mapImage.src = `../Images/Maps/${realmName}/${mapFileName}`;
        mapImage.alt = selectedMap;
    });
}

function setupPerkImagesOnChange() {
    document.body.addEventListener("change", (e) => {
        if (e.target.tagName === "SELECT" && e.target.id.toLowerCase().includes("perk")) {
            updatePerkImageUI(e.target);
        }
    });
}

function updatePerkImageUI(selectElement) {
    const wrapper = selectElement.closest(".perkslot-wrapper");

    if (!wrapper) return;

    const diamond = wrapper.querySelector(".perk-diamond");
    const plusIcon = wrapper.querySelector(".plus-icon");
    const perkName = selectElement.value;

    if (perkName && diamond) {
        let cleanName = perkName
            .replace(/&/g, "and")
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(/\s+/)
            .map((word, index) => {
                if (index === 0) return word.toLowerCase();
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join('');

        let subfolder = "Survivor Perks";

        if (selectElement.id.toLowerCase().includes("kill")) {
            subfolder = "Killer Perks";
        }

        const fileName = `IconPerks_${cleanName}.png`;

        let img = diamond.querySelector(".perk-image");

        if (!img) {
            img = document.createElement("img");
            img.className = "perk-image";
            diamond.appendChild(img);
        }

        img.src = `../Images/Perks/${subfolder}/${fileName}`;
        img.alt = perkName;

        if (plusIcon) plusIcon.style.display = "none";
    } else {
        if (diamond) {
            const img = diamond.querySelector(".perk-image");
            if (img) img.remove();
        }
        if (plusIcon) plusIcon.style.display = "block";
    }
}

export const sharedCore = {
    MODE,
    calculateCurrentStreak,
    calculateBestStreak,
    setupMaps,
    setupMapImageOnChange,
    setupPerkImagesOnChange
};