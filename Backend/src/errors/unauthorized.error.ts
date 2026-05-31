import AppError from "./app.error";

class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export default UnauthorizedError;