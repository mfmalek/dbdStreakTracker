import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import BadRequestError from "../../errors/bad.request.error";
import NotFoundError from "../../errors/not.found.error";
import UnauthorizedError from "../../errors/unauthorized.error";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const register = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        return await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
    } catch (err) {
        if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
            throw new BadRequestError(`Username "${username}" is already taken`);
        }

        throw err;
    }
};

export const login = async (username: string, password: string) => {
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