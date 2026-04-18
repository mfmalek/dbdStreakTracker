const matchesService = require('./matches.service');

const getMatches = async (req, res) => {
    const user = req.user.username;
    const { mode, groupId } = req.query;
    const matches = await matchesService.getMatches(user, mode, groupId);
    res.json(matches);
};

const createMatch = async (req, res) => {
    const user = req.user.username;
    const { mode, ...matchData } = req.body;
    const newMatch = await matchesService.createMatch({
        user,
        mode,
        ...matchData
    });
    res.json(newMatch);
};

const deleteMatch = async (req, res) => {
    const username = req.user.username;
    const { id } = req.params;
    await matchesService.deleteMatch(id, username);
    res.json({ message: 'Deleted' });
};

const clearMatches = async (req, res) => {
    const user = req.user.username;
    const { mode, groupId } = req.query;
    await matchesService.clearMatches(user, mode, groupId);
    res.json({ message: "Cleared" });
};

module.exports = {
    getMatches,
    createMatch,
    deleteMatch,
    clearMatches
};