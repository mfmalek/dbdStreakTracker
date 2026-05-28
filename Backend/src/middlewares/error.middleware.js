const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: true,
            message: "Validation failed",
            details: err.issues
        });
    }

    res.status(err.status || 500).json({
        error: true,
        message: err.message || "Internal server error",
        details: err.details || null
    });
};