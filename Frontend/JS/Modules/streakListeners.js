function initListeners({ui, saveConfigs, submitMatch, deleteTableMatch, clearTableMatches, resetBestStreak, inviteUser, acceptInvite}) {
    setupSurvivorCustomization(ui, saveConfigs);
    bindSubmit(submitMatch);
    bindDelete(deleteTableMatch);
    bindClear(clearTableMatches);
    bindResetBest(resetBestStreak);
    bindInvite(inviteUser);
    bindAcceptInvite(acceptInvite, ui.renderInvites);
}

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

function bindInvite(inviteUser) {
    const btn = document.getElementById("inviteButton");

    btn?.addEventListener("click", async () => {
        const input = document.getElementById("inviteUsername");
        const username = input.value.trim();

        if (!username) {
            alert("Enter a username");
            return;
        }

        const groupId = window.currentGroupId;

        try {
            await inviteUser(username, groupId);
            input.value = "";
            alert("Invite sent!");
        } catch (err) {
            console.error(err);
            alert("Failed to send invite");
        }
    });
}

function bindAcceptInvite(acceptInvite, refreshInvites) {
    const container = document.getElementById("invitesContainer");
    if (!container) return;

    container.addEventListener("click", async (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const inviteId = Number(btn.dataset.id);

        try {
            await acceptInvite(inviteId);

            alert("Joined group!");

            await refreshInvites();
            location.reload()

        } catch (err) {
            console.error(err);
            alert("Failed to accept invite");
        }
    });
}

export const dbdListeners = {
    initListeners
}