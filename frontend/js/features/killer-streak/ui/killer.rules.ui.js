import { uiElements } from "../../shared-streak/index.js";
import { sharedRulesUI } from "../../shared-streak/index.js";

function getRules() {
    return [
        "Event modes are not allowed.",
        "Dodging a match on purpose instantly counts as a loss.",
        "At least three survivors must be sacrificed.",
        "No restrictions on perks or add-ons.",
        "Match still counts if survivors disconnect."
    ];
}

function renderRules() {
    const ruleset = uiElements.getRuleset();

    if (!ruleset) return;

    const rules = getRules();

    sharedRulesUI.renderRulesList(ruleset, rules);
}

export const killerRulesUI = {
    renderRules
};