import prisma from "../../config/prisma";

import BadRequestError from "../../errors/bad.request.error";
import NotFoundError from "../../errors/not.found.error";

export interface CreatePresetInput {
    user: string;
    mode: string;
    role: string;
    killerName?: string;
    survivor?: number | string;
    name: string;
    perks: string[];
    addons?: string[];
}

function getSafeKiller(role: string, killerName?: string): string {
    return role === "killer" ? killerName! : "__survivor__";
}

function buildWhere(user: string, mode: string, role: string, killerName?: string, survivor?: number | string) {
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

export async function getPresets(user: string, mode: string, role: string, killerName?: string, survivor?: number | string) {
    return prisma.preset.findMany({
        where: buildWhere(
            user,
            mode,
            role,
            killerName,
            survivor
        ),
        orderBy: { createdAt: "asc" }
    });
}

export async function createPreset(data: CreatePresetInput) {
    const { user, mode, role, killerName, survivor, name, perks, addons } = data;
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer preset`);
    }

    if (role === "survivor" && (survivor === undefined || survivor === null)) {
        throw new BadRequestError(`"survivor" is required for survivor preset`);
    }

    return prisma.preset.create({
        data: {
            user,
            mode,
            role,
            killerName: safeKiller,
            survivor: role === "survivor" ? Number(survivor) : null,
            name,
            perks,
            addons
        }
    });
}

export async function deletePreset(id: string | number, user: string): Promise<boolean> {
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
}