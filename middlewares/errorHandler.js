const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            status: 400,
            message: "Validation error",
            errors: err.errors
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            status: 400,
            message: "Invalid ID"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            status: 409,
            message: "Email already registered"
        });
    }

    res.status(500).json({
        status: 500,
        message: "Internal server error"
    });
};

module.exports = errorHandler;
