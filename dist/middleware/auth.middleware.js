"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const authenticateJWT = (req, res, next) => {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) ||
        (((_b = req.headers["authorization"]) === null || _b === void 0 ? void 0 : _b.toString().startsWith("Bearer "))
            ? req.headers["authorization"].toString().split(" ")[1]
            : req.headers["authorization"]);
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};
exports.authenticateJWT = authenticateJWT;
