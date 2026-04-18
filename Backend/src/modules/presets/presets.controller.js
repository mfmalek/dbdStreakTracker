const presetsService = require("./presets.service");

const getPresets = async (req, res) => {
    const user = req.user.username;
    const { mode, survivor } = req.query;
    const presets = await presetsService.getPresets(user, mode, survivor);
    res.json(presets);
};

const createPreset = async (req, res) => {
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
};

const deletePreset = async (req, res) => {
    const { id } = req.params;
    const user = req.user.username;
    await presetsService.deletePreset(id, user);
    res.json({ success: true });
};

module.exports = {
    getPresets,
    createPreset,
    deletePreset
};