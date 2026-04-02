const prisma = require("../../config/prisma");

const getConfigs = async (user, mode) => {
    return await prisma.survivorConfig.findMany({
        where: { user, mode },
        orderBy: { index: "asc" }
    });
};

const saveConfigs = async (user, mode, configs) => {
    await prisma.survivorConfig.deleteMany({
        where: { user, mode }
    });

    return await prisma.survivorConfig.createMany({
        data: configs.map((c, i) => ({
            user,
            mode,
            index: i,
            name: c.name,
            image: c.image
        }))
    });
};

module.exports = {
    getConfigs,
    saveConfigs
};