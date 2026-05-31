class AppError extends Error {
    status: number;
    details: unknown;

    constructor(message: string, status: number = 500, details: unknown = null) {
        super(message);

        this.name = this.constructor.name;
        this.status = status;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;