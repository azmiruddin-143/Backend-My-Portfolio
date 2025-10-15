"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const globalErrorHandeler_1 = __importDefault(require("./utils/globalErrorHandeler"));
const auth_route_1 = require("./modules/auth/auth.route");
const blog_route_1 = __importDefault(require("./modules/blog/blog.route"));
const project_route_1 = __importDefault(require("./modules/project/project.route"));
const app = (0, express_1.default)();
// app.use(cors({ origin: "*" }));   
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    // origin: "https://myportfolio-dusky-eight.vercel.app", 
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
// user auth Route 
app.use("/api/v1/auth", auth_route_1.userRouter);
app.use("/api/v1/blog", blog_route_1.default);
// app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/project", project_route_1.default);
// app.use("/api/v1/dashboard", dashRoute);
// app.use(visitorLogger)
app.get("/", (_req, res) => {
    res.send("API is running");
});
app.get("/test-visitor", (req, res) => {
    res.json({ message: "Visitor logged successfully!" });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
app.use(globalErrorHandeler_1.default);
exports.default = app;
