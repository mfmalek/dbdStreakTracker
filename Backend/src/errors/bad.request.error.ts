import AppError from "./app.error";

class BadRequestError extends AppError {
    constructor(message: string = "Bad Request", details: unknown = null) {
        super(message, 400, details);
    }
}

export default BadRequestError;