import { auth } from "./auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_GROUPS = `${API_URL}/groups`;

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function inviteUser(toUser, groupId) {
    const res = await fetch(`${API_GROUPS}/invite`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ toUser, groupId })
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    return res.json();
}

async function getInvites() {
    const res = await fetch(`${API_GROUPS}/invites`, {
        headers: getHeaders()
    });

    return res.json();
}

async function acceptInvite(inviteId) {
    const res = await fetch(`${API_GROUPS}/accept`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ inviteId })
    });

    return res.json();
}

async function getMyGroup(mode) {
    const res = await fetch(`${API_GROUPS}/me?mode=${mode}`, {
        headers: getHeaders()
    });

    if (!res.ok) throw new Error("Failed to fetch group");

    return res.json();
}

export const dbdGroups = {
    inviteUser,
    getInvites,
    acceptInvite,
    getMyGroup
};