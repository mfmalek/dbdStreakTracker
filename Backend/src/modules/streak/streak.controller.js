const streakService = require("./streak.service");

const getBestStreak = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, groupId } = req.query;

        const bestStreak = await streakService.getBestStreak(user, mode, groupId);

        res.json({ bestStreak });
    } catch (error) {
        console.error("GET STREAK ERROR:", error);
        res.status(500).json({ error: "Failed to fetch best streak" });
    }
};

const resetBestStreak = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, groupId } = req.body;

        await streakService.resetBestStreak(user, mode, groupId);

        res.json({ success: true });
    } catch (error) {
        console.error("RESET STREAK ERROR:", error);
        res.status(500).json({ error: "Failed to reset best streak" });
    }
};

module.exports = {
    getBestStreak,
    resetBestStreak
};