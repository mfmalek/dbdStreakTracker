const AppError = require("./app.error");

class ZodError extends AppError {
    constructor(zodError) {
        super("Validation failed", 400, zodError.issues);
    }
}

module.exports = ZodError;