const streakService = require("./streak.service");

const getBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, groupId } = req.query;
    const bestStreak = await streakService.getBestStreak(user, mode, groupId);
    res.json({ bestStreak });
};

const resetBestStreak = async (req, res) => {
    const user = req.user.username;
    const { mode, groupId } = req.body;
    await streakService.resetBestStreak(user, mode, groupId);
    res.json({ success: true });
};

module.exports = {
    getBestStreak,
    resetBestStreak
};