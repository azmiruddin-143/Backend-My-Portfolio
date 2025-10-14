"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authRole_middleware_1 = require("../../middleware/authRole.middleware");
const projectRoute = express_1.default.Router();
projectRoute.post("/", project_controller_1.createProject);
projectRoute.get("/", project_controller_1.getAllProjects);
projectRoute.get("/:id", project_controller_1.getProjectById);
projectRoute.put("/:id", project_controller_1.updateProject);
projectRoute.delete("/:id", project_controller_1.deleteProject);
// ---------- top views project and top click project ------------------
projectRoute.get("/top/:id", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("USER", "ADMIN"), project_controller_1.getProjectByIdController);
exports.default = projectRoute;
