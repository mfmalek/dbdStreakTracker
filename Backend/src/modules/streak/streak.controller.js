const streakService = require("./streak.service");

const getBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.query;
    const bestStreak = await streakService.getBestStreak(user, mode, role, killerName, groupId);
    res.json({ bestStreak });
};

const resetBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.body;
    await streakService.resetBestStreak(user, mode, role, killerName, groupId);
    res.json({ success: true });
};

module.exports = {
    getBestStreak,
    resetBestStreak
};