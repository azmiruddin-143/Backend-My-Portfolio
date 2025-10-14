"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authRole_middleware_1 = require("../../middleware/authRole.middleware");
const dashRoute = express_1.default.Router();
dashRoute.get("/", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), dashboard_controller_1.dashboardController);
// ---------------- Visitor Logger ------------------
dashRoute.get("/visitor", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), dashboard_controller_1.getVisitorsController);
dashRoute.get("/stats", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), dashboard_controller_1.getVisitorStatsController);
dashRoute.get("/today", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), dashboard_controller_1.getTodayVisitorsController);
exports.default = dashRoute;
