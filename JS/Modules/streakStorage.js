import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

function getSurvivorConfigKey() {
    const user = auth.getCurrentUser();
    return `survivorNames_${user}_${dbdCore.MODE}`;
}

function getSurvivorConfigs() {
    const key = getSurvivorConfigKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveSurvivorConfigs(configs) {
    const key = getSurvivorConfigKey();
    localStorage.setItem(key, JSON.stringify(configs));
}

function getMatchKey() {
    return `matches_${auth.getCurrentUser()}_${dbdCore.MODE}`;
}

function getMatches() {
    const data = localStorage.getItem(getMatchKey());
    return JSON.parse(data) || [];
}

function saveMatches(matches) {
    localStorage.setItem(getMatchKey(), JSON.stringify(matches));
}

function addMatch(match) {
    const matches = getMatches();
    matches.push(match);
    saveMatches(matches);
    return matches;
}

function deleteMatch(index) {
    const matches = getMatches();

    if(index < 0 || index >= matches.length) return matches;
    matches.splice(index, 1);
    saveMatches(matches);
    return matches;
}

function clearMatches() {
    localStorage.removeItem(getMatchKey());
}

function getBestStreakKey() {
    return `bestStreak_${auth.getCurrentUser()}_${dbdCore.MODE}`;
}

function getBestStreak() {
    return parseInt(localStorage.getItem(getBestStreakKey())) || 0;
}

function saveBestStreak(value) {
    localStorage.setItem(getBestStreakKey(), value);
}

export const dbdStorage = {
    getSurvivorConfigs,
    saveSurvivorConfigs,
    getMatches,
    saveMatches,
    addMatch,
    clearMatches,
    deleteMatch,
    getBestStreak,
    saveBestStreak
};