const matchesService = require('./matches.service');

const getMatches = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.query;
    const matches = await matchesService.getMatches(user, mode, role, killerName, groupId);
    res.json(matches);
};

const createMatch = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId, ...matchData } = req.body;
    const newMatch = await matchesService.createMatch({
        user,
        mode,
        role,
        killerName,
        groupId,
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
    const { mode, role, killerName, groupId } = req.query;
    await matchesService.clearMatches(user, mode, role, killerName, groupId);
    res.json({ message: "Cleared" });
};

module.exports = {
    getMatches,
    createMatch,
    deleteMatch,
    clearMatches
};