import BadRequestError from "../../errors/bad.request.error";
import NotFoundError from "../../errors/not.found.error";
import UnauthorizedError from "../../errors/unauthorized.error";

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
    } catch (err) {
        if (err.code === "P2002") {
            throw new BadRequestError(`Username "${username}" is already taken`);
        }

        throw err;
    }
};

const login = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new UnauthorizedError("Invalid password");
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