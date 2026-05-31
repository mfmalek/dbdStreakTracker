import prisma from "../../config/prisma";
import BadRequestError from "../../errors/bad.request.error";
import NotFoundError from "../../errors/not.found.error";

function getSafeKiller(role, killerName) {
    return role === "killer" ? killerName : "__survivor__";
}

function buildWhere(user, mode, role, killerName, survivor) {
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer preset`);
    }

    if (role === "survivor" && (survivor === undefined || survivor === null)) {
        throw new BadRequestError(`"survivor" is required for survivor preset`);
    }

    return {
        user,
        mode,
        role,
        killerName: safeKiller,
        ...(role === "survivor"
            ? { survivor: Number(survivor) }
            : {})
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
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer preset`);
    }

    if (role === "survivor" && (survivor === undefined || survivor === null)) {
        throw new BadRequestError(`"survivor" is required for survivor preset`);
    }

    return await prisma.preset.create({
        data: {
            user,
            mode,
            role,
            killerName: safeKiller,
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
        throw new NotFoundError("Preset not found");
    }
    return true;
};

module.exports = {
    getPresets,
    createPreset,
    deletePreset
};