const prisma = require("../../config/prisma");

const getPresets = async (user, mode, survivor) => {
    return await prisma.preset.findMany({
        where: {
            user,
            mode,
            survivor: Number(survivor)
        },
        orderBy: { createdAt: "asc" }
    });
};

const createPreset = async (data) => {
    const { user, mode, survivor, name, perks } = data;

    return await prisma.preset.create({
        data: {
            user,
            mode,
            survivor: Number(survivor),
            name,
            perks
        }
    });
};

const deletePreset = async (id, user) => {
    const deleted = await prisma.preset.deleteMany({
        where: {
            id: Number(id),
            user: user
        }
    });

    if (deleted.count === 0) {
        const err = new Error("Preset not found");
        err.status = 404;
        throw err;
    }
    return true;
};

module.exports = {
    getPresets,
    createPreset,
    deletePreset
};