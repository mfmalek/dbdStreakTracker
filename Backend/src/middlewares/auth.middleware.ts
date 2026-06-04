import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/auth.types";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized.error";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;

    if (!header) {
        next(new UnauthorizedError("No token provided"));
        return;
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        req.user = decoded;
        next();
    } catch {
        next(new UnauthorizedError("Invalid token"));
    }
};

export default authMiddleware;