import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import BadRequestError from "../errors/bad.request.error";

function createValidator(source: "body" | "query" | "params", target: "validatedBody" | "validatedQuery" | "validatedParams") {
    return (schema: ZodSchema) => {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                req[target] = schema.parse(req[source]);
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    next(new BadRequestError("Validation failed", err.issues));
                    return;
                }

                next(err);
            }
        };
    };
}

export const validateBody = createValidator("body", "validatedBody");
export const validateQuery = createValidator("query", "validatedQuery");
export const validateParams = createValidator("params", "validatedParams");