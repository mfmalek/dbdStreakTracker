const service = require("./survivors.service");

const getConfigs = async (req, res) => {
    const user = req.user.username;
    const { mode } = req.validatedQuery;
    const configs = await service.getConfigs(user, mode);

    res.json(configs);
};

const saveConfigs = async (req, res) => {
    const user = req.user.username;
    const { mode, configs } = req.validatedBody;

    await service.saveConfigs(user, mode, configs);

    res.json({ message: "Configs saved" });
};

module.exports = {
    getConfigs,
    saveConfigs
};