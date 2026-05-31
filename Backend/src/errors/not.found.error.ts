import AppError from "./app.error";

class NotFoundError extends AppError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}

export default NotFoundError;