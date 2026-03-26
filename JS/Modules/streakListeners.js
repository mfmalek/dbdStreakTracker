function initListeners({ui, saveConfigs, submitMatch, deleteTableMatch, clearTableMatches, resetBestStreak}) {
    setupSurvivorCustomization(ui, saveConfigs);
    bindSubmit(submitMatch);
    bindDelete(deleteTableMatch);
    bindClear(clearTableMatches);
    bindResetBest(resetBestStreak);
}

// function setupSurvivorCustomization(core, ui, saveConfigs) {
//     for(let i = 1; i <= core.SURVIVOR_COUNT; i++) {
//         const name = document.getElementById(`nicknameSurv${i}`);
//         const image = document.getElementById(`imageSurv${i}`);
//         const grid = document.getElementById(`portraitGridSurv${i}`);

//         name?.addEventListener("click", () => {
//             const input = document.createElement("input");
//             input.type = "text";
//             input.value = name.textContent;
//             input.className = "nicknameInput";

//             name.replaceWith(input);
//             input.focus();

//             input.addEventListener("blur", () => {
//                 const newName = input.value || `Surv${i}`;
//                 name.textContent = newName;
//                 input.replaceWith(name);
//                 saveConfigs();
//                 ui.renderTitle();
//                 ui.renderTableHeader();
//             });
//         });

//         image?.addEventListener("click", () => {
//             grid.classList.toggle("hidden");
//         });

//         grid?.addEventListener("click", (e) => {
//             const option = e.target.closest(".portraitOption");
//             if(!option) return;

//             grid.querySelectorAll(".portraitOption").forEach(opt => {
//                 opt.classList.remove("selected");
//             });

//             option.classList.add("selected");

//             const img = option.dataset.image;
//             image.src = `../Images/Portraits/Survivors/${img}`;

//             grid.classList.add("hidden");
//             saveConfigs();
//         });
//     }
// }

function setupSurvivorCustomization(ui, saveConfigs) {
    const container = document.getElementById("survivorContainer");
    if(!container) return;

    container.addEventListener("click", (e) => {
        const name = e.target.closest(".nickname");
        const image = e.target.closest(".characterPortrait");
        const option = e.target.closest(".portraitOption");

        if(name) {
            const index = name.dataset.index;

            const input = document.createElement("input");
            input.type = "text";
            input.value = name.textContent;
            input.className = "nicknameInput";

            name.replaceWith(input);
            input.focus();

            input.addEventListener("blur", () => {
                const newName = input.value || `Surv${index}`;
                name.textContent = newName;
                input.replaceWith(name);

                saveConfigs();
                ui.renderTitle();
                ui.renderTableHeader();
            });
            return;
        }

        if(image) {
            const index = image.dataset.index;
            const grid = document.getElementById(`portraitGridSurv${index}`);

            grid?.classList.toggle("hidden");
            return;
        }

        if(option) {
            const grid = option.closest(".portraitGrid");
            if(!grid) return;

            const index = grid.id.replace("portraitGridSurv", "");
            const imageEl = document.getElementById(`imageSurv${index}`);

            grid.querySelectorAll(".portraitOption").forEach(opt => {
                opt.classList.remove("selected");
            });

            option.classList.add("selected");

            const img = option.dataset.image;
            imageEl.src = `../Images/Portraits/Survivors/${img}`;

            grid.classList.add("hidden");
            saveConfigs();
        }
    });
}

function bindSubmit(submitMatch) {
    document.getElementById("submitMatchButton")?.addEventListener("click", submitMatch);
}

function bindClear(clearTableMatches) {
    document.getElementById("clearMatchesButton")?.addEventListener("click", clearTableMatches);
}

function bindDelete(deleteTableMatch) {
    document.getElementById("deleteMatchButton")?.addEventListener("click", deleteTableMatch);
}

function bindResetBest(resetBestStreak) {
    document.getElementById("resetBestStreakButton")?.addEventListener("click", resetBestStreak);
}

export const dbdListeners = {
    initListeners
}