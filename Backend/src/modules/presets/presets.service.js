const prisma = require("../../config/prisma");

function buildWhere(user, mode, role, killerName, survivor) {
    if (!role) {
        throw new Error("role is required for presets");
    }

    if (role === "killer" && !killerName) {
        throw new Error("killerName is required for killer presets");
    }

    if (role === "survivor" && (survivor === undefined || survivor === null)) {
        throw new Error("survivor is required for survivor presets");
    }

    return {
        user,
        mode,
        role,
        ...(role === "killer"
            ? { killerName }
            : { survivor: Number(survivor) })
    };
}

const getPresets = async (user, mode, role, killerName, survivor) => {
    return await prisma.preset.findMany({
        where: buildWhere(user, mode, role, killerName, survivor),
        orderBy: { createdAt: "asc" }
    });
};

const createPreset = async (data) => {
    const { user, mode, role, killerName, survivor, name, perks } = data;

    if (!role) {
        throw new Error("role is required for creating presets");
    }

    if (role === "killer" && !killerName) {
        throw new Error("killerName is required for killer presets");
    }

    if (role === "survivor" && (survivor === undefined || survivor === null)) {
        throw new Error("survivor is required for survivor presets");
    }

    return await prisma.preset.create({
        data: {
            user,
            mode,
            role,
            killerName: role === "killer" ? killerName : null,
            survivor: role === "survivor" ? Number(survivor) : null,
            name,
            perks
        }
    });
};

const deletePreset = async (id, user) => {
    const deleted = await prisma.preset.deleteMany({
        where: {
            id: Number(id),
            user
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