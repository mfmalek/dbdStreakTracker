import { auth } from "../Auth/auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

function buildUrl(path, query = {}) {
    const url = new URL(API_URL + path);

    Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            url.searchParams.append(key, value);
        }
    });
    return url.toString();
}

async function request(path, { method = "GET", body, query } = {}) {
    const res = await fetch(buildUrl(path, query), {
        method,
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
        const err = await res.text();
        console.error(`${method} ${path} ERROR:`, err);
        throw new Error(err);
    }
    return res.status !== 204 ? res.json() : null;
}

export const http = {
    get: (path, query) => request(path, { query }),
    post: (path, body) => request(path, { method: "POST", body }),
    del: (path, query, body) => request(path, { method: "DELETE", query, body })
};