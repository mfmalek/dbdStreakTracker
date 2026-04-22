import { http } from "./http.js";

async function login(username, password) {
    return await http.post("/auth/login", {
        username,
        password
    });
}

async function register(username, password) {
    return await http.post("/auth/register", {
        username,
        password
    });
}

export const authApi = {
    login,
    register
};