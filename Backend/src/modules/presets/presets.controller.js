const presetsService = require("./presets.service");

const getPresets = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, survivor } = req.query;

        const presets = await presetsService.getPresets(user, mode, survivor);

        res.json(presets);
    } catch (error) {
        console.error("GET PRESETS ERROR:", error);
        res.status(500).json({ error: "Failed to fetch presets" });
    }
};

const createPreset = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, survivor, name, perks } = req.body;

        const newPreset = await presetsService.createPreset({
            user,
            mode,
            survivor,
            name,
            perks
        });

        res.json(newPreset);
    } catch (error) {
        console.error("CREATE PRESET ERROR:", error);
        res.status(500).json({ error: "Failed to create preset" });
    }
};

const deletePreset = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user.username;

        const deleted = await presetsService.deletePreset(id, user);

        if (deleted.count === 0) {
            return res.status(404).json({ error: "Preset not found or not yours" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("DELETE PRESET ERROR:", error);
        res.status(500).json({ error: "Failed to delete preset" });
    }
};

module.exports = {
    getPresets,
    createPreset,
    deletePreset
};