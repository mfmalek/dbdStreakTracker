import UnauthorizedError from "../errors/unauthorized.error";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return next(new UnauthorizedError("No token provided"));
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return next(new UnauthorizedError("Invalid token"));
    }
};

module.exports = authMiddleware;