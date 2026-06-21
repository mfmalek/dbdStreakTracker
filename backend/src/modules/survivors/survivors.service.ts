import prisma from "../../config/prisma";

export type SurvivorConfigInput = {
    name: string;
    image: string;
};

export const getConfigs = async (user: string, mode: string) => {
    return prisma.survivorConfig.findMany({
        where: {
            user,
            mode
        },
        orderBy: { index: "asc" }
    });
};

export const saveConfigs = async (user: string, mode: string, configs: SurvivorConfigInput[]) => {
    await prisma.survivorConfig.deleteMany({
        where: {
            user,
            mode
        }
    });

    return prisma.survivorConfig.createMany({
        data: configs.map((config, index) => ({
            user,
            mode,
            index,
            name: config.name,
            image: config.image
        }))
    });
};