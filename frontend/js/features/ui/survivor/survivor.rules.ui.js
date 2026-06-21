import { uiElements } from "../utils/ui.elements.js";
import { sharedCore } from  "../../../core/streak/shared.core.js";
import { sharedRulesUI } from "../shared/shared.rules.ui.js";

function getRulesByMode(mode) {
    const generalRules = [
        "Event modes are not allowed.",
        "No perk or item restrictions.",
        "Perks/items cannot be repeated.",
        "Match is ignored if the killer is AFK or disconnects before a chase happens."
    ];

    const modeSpecificRule = {
        solo: "The survivor must escape.",
        duo: "At least one survivor must escape.",
        trio: "At least two survivors must escape.",
        squad: "At least three survivors must escape."
    };

    const extraRule = {
        solo: "Hatch espace does count as a win.",
        duo: "Match ignored if any survivor gives up early.",
        trio: "Match ignored if any survivor gives up early.",
        squad: "Match still counts if the teammate disconnects."
    };

    return [
        modeSpecificRule[mode],
        ...(mode === "solo" ? generalRules.filter((_, i) => i !== 1) : generalRules),
        extraRule[mode]
    ];
}

function renderRules() {
    const ruleset = uiElements.getRuleset();

    if (!ruleset) return;

    const rules = getRulesByMode(sharedCore.MODE);

    sharedRulesUI.renderRulesList(ruleset, rules);
}

export const survivorRulesUI = {
    renderRules
};