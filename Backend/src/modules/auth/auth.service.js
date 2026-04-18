const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const register = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        return await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
    } catch(err) {
        if (err.code === "P2002") {
            const error = new Error(`Username "${username}" is already taken`);
            error.status = 400;
            throw error;
        }

        const error = new Error("Failed to register user");
        error.status = 500;
        throw error;
    }
};

const login = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        const err = new Error("Invalid password");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
    return { token };
};

module.exports = {
    register,
    login
};