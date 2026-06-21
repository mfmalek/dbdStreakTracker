import AppError from "./app.error";

class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden") {
        super(message, 403);
    }
}

export default ForbiddenError;