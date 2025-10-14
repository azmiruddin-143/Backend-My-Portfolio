"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    console.error(" Error caught:", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong!",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
