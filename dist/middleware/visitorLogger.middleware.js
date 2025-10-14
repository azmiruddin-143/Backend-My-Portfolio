"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorLogger = void 0;
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const db_1 = require("../config/db");
const visitorLogger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
        const userAgent = req.headers["user-agent"] || "Unknown";
        const parser = new ua_parser_js_1.default(userAgent);
        const result = parser.getResult();
        const deviceType = result.device.type || "Desktop";
        const osName = result.os.name || "Unknown";
        const browserName = result.browser.name || "Unknown";
        yield db_1.prisma.visitorLog.create({
            data: {
                ip: String(ip),
                userAgent,
                device: deviceType,
                os: osName,
                browser: browserName,
                page: req.originalUrl,
            },
        });
    }
    catch (error) {
        console.error("Visitor log error:", error);
    }
    next();
});
exports.visitorLogger = visitorLogger;
