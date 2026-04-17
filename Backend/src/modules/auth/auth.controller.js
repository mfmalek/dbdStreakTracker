const authService = require("./auth.service");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);

        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

module.exports = {
    register,
    login
};