import { auth } from "./auth.js";
import { dbdCore } from "./streakCore.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_GROUPS = `${API_URL}/groups`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function inviteUser(toUser, groupId) {
    const mode = dbdCore.MODE;
    
    const res = await fetch(`${API_GROUPS}/invite`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ toUser, groupId, mode })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("INVITE API ERROR:", err);
        throw new Error(err);
    }

    return res.json();
}

async function getInvites() {
    const res = await fetch(`${API_GROUPS}/invites`, {
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("GET INVITES ERROR:", err);
        throw new Error(err);
    }

    return res.json();
}

async function acceptInvite(inviteId) {
    const res = await fetch(`${API_GROUPS}/accept`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ inviteId })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("ACCEPT INVITE ERROR:", err);
        throw new Error(err);
    }

    return res.json();
}

async function getMyGroup(mode) {
    const res = await fetch(`${API_GROUPS}/me?mode=${mode}`, {
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("GETTING GROUPS ERROR:", err);
        throw new Error(err);
    }

    return res.json();
}

export const dbdGroups = {
    inviteUser,
    getInvites,
    acceptInvite,
    getMyGroup
};