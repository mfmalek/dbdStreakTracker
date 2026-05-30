const authService = require("./auth.service");

const register = async (req, res) => {
    const { username, password } = req.validatedData;
    const user = await authService.register(username, password);

    res.json(user);
};

const login = async (req, res) => {
    const { username, password } = req.validatedData;
    const result = await authService.login(username, password);

    res.json(result);
};

module.exports = {
    register,
    login
};