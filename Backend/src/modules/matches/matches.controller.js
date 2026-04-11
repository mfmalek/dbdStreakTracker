const matchesService = require('./matches.service');

const getMatches = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, groupId } = req.query;

        const matches = await matchesService.getMatches(user, mode, groupId);

        res.json(matches);
    } catch (error) {
        console.error("GET MATCHES ERROR:", error);
        res.status(500).json({
            error: "Failed to fetch matches",
            details: error.message
        });
    }
};

const createMatch = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, ...matchData } = req.body;

        const newMatch = await matchesService.createMatch({
            user,
            mode,
            ...matchData
        });

        res.json(newMatch);
    } catch (error) {
        console.error("CREATE MATCH ERROR:", error);
        res.status(500).json({ error: "Failed to create match" });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const username = req.user.username;
        const { id } = req.params;

        await matchesService.deleteMatch(id, username);

        res.json({ message: 'Deleted' });
    } catch (error) {
        console.error("DELETE MATCH ERROR:", error);
        res.status(500).json({ error: 'Failed to delete match' });
    }
};

const clearMatches = async (req, res) => {
    try {
        const user = req.user.username;
        const { mode, groupId } = req.query;

        await matchesService.clearMatches(user, mode, groupId);

        res.json({ message: "Cleared" });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear matches" });
    }
};

module.exports = {
    getMatches,
    createMatch,
    deleteMatch,
    clearMatches
};