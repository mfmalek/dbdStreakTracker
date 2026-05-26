function renderRulesList(container, rules) {
    container.innerHTML = rules
        .map(rule => `<span class="streakRule">• ${rule}</span>`)
        .join("");
}

export const sharedRulesUI = {
    renderRulesList
};