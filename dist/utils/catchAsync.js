"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Higher-order function for async error handling
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.default = catchAsync;
