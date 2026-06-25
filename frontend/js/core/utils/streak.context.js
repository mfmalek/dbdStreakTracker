const STORAGE_KEY = "streakContext";

function setContext({ role, killerName }) {
    if (!role) {
        throw new Error("role is required for context");
    }

    if (role === "killer" && !killerName) {
        throw new Error("killerName is required for killer context");
    }

    const context = {
        role,
        killerName: role === "killer" ? killerName : "__survivor__"
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
}

function getContext() {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
        throw new Error("No streak context found. User must select mode first.");
    }
    return JSON.parse(raw);
}

function clearContext() {
    sessionStorage.removeItem(STORAGE_KEY);
}

function syncKillerContextFromUrl() {
    const killer = new URLSearchParams(window.location.search).get("killer");

    if (!killer) return;

    try {
        const { role } = getContext();

        if (role !== "killer") {
            return;
        }
    } catch { }

    setContext({
        role: "killer",
        killerName: killer
    });
}

export const streakContext = {
    setContext,
    getContext,
    clearContext,
    syncKillerContextFromUrl
};