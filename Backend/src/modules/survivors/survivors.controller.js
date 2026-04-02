const service = require("./survivors.service");

const getConfigs = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode } = req.query;

        const configs = await service.getConfigs(user, mode);

        res.json(configs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch configs" });
    }
};

const saveConfigs = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, configs } = req.body;

        await service.saveConfigs(user, mode, configs);

        res.json({ message: "Configs saved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save configs" });
    }
};

module.exports = {
    getConfigs,
    saveConfigs
};