import { JwtPayload } from "./auth.types";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;

            validatedBody?: unknown;
            validatedQuery?: unknown;
            validatedParams?: unknown;
            validatedPayload?: unknown;
        }
    }
}

export {};