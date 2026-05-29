const matchesService = require('./matches.service');

const getMatches = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId } = req.validatedQuery;
    const matches = await matchesService.getMatches(user, mode, role, killerName, groupId);
    res.json(matches);
};

const createMatch = async (req, res) => {
    const user = req.user.username;
    const { mode, role, killerName, groupId, ...matchData } = { ...req.body, ...req.validatedData};
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

const updateMatch = async (req, res) => {
    const user = req.user.username;
    const { id } = req.params;

    const updatedMatch = await matchesService.updateMatch(
        id,
        user,
        req.body
    );

    res.json(updatedMatch);
};

const deleteMatch = async (req, res) => {
    const username = req.user.username;
    const { id } = req.validatedParams;

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
    updateMatch,
    deleteMatch,
    clearMatches
};