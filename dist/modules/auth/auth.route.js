"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authRole_middleware_1 = require("../../middleware/authRole.middleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/", auth_controller_1.registerUser);
exports.userRouter.post("/logout", auth_controller_1.userLogoutController);
exports.userRouter.post("/login", auth_controller_1.loginUser);
exports.userRouter.get("/", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), auth_controller_1.totalUsers);
exports.userRouter.get("/me", auth_middleware_1.authenticateJWT, (0, authRole_middleware_1.authorizeRoles)("ADMIN"), auth_controller_1.getProfile);
exports.userRouter.put("/:id", auth_controller_1.updateUser);
exports.userRouter.delete("/:id", auth_controller_1.deleteUserData);
