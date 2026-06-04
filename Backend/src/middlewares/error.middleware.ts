import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);

    if (err instanceof ZodError) {
        res.status(400).json({
            error: true,
            message: "Validation failed",
            details: err.issues
        });
        return;
    }

    res.status(err.status || 500).json({
        error: true,
        message: err.message || "Internal server error",
        details: err.details || null
    });
};

export default errorMiddleware;