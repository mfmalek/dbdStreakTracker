const streakService = require("./streak.service");

const getBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.validatedQuery;
    const bestStreak = await streakService.getBestStreak(user, mode, role, killerName, groupId);

    res.json({ bestStreak });
};

const resetBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.validatedData;

    await streakService.resetBestStreak(user, mode, role, killerName, groupId);

    res.json({ success: true });
};

module.exports = {
    getBestStreak,
    resetBestStreak
};