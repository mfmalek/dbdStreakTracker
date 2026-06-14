import { survivorData } from "./survivor.data";
import { killerData } from "./killer.data";
import { mapData } from "./map.data";

// NAME CONVERTERS

function perkToFileName(perkName) {
    const normalized = perkName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[:'!&.,-]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const words = normalized.split(" ");

    return (
        "IconPerks_" +
        words.map((word, index) =>
            index === 0 ? word.charAt(0).toLowerCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)).join("") +
        ".png");
}

function mapToFileName(mapName) {
    const normalized = mapName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[':!&.,-]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const words = normalized.split(" ");

    return ("Map_" + words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + ".png");
}

// MAP REALM NAMES

const mapRealms = Object.fromEntries(
    Object.entries(mapData.maps).flatMap(([realm, maps]) => maps.map(map => [map, realm]))
);

// DATA IMAGES

const survivorPerkImages = Object.fromEntries(
    survivorData.perks.map(perk => [perk, perkToFileName(perk)])
);

const killerPerkImages = Object.fromEntries(
    killerData.perks.map(perk => [perk, perkToFileName(perk)])
);

const mapImages = Object.fromEntries(
    Object.values(mapData.maps)
        .flat()
        .map(map => [map, mapToFileName(map)])
);

export const dataManager = {
    survivorPerkImages,
    killerPerkImages,
    mapImages,
    mapRealms
};