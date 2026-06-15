const errorHandler   = (error, req, res, next) => {

    const statusCode = error.statusCode || res.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : error.stack
    });
};

module.exports = errorHandler ;