"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const blogRouter = express_1.default.Router();
blogRouter.post("/", blog_controller_1.createBlog);
blogRouter.get("/", blog_controller_1.getAllBlog);
blogRouter.get("/:id", blog_controller_1.getBlogById);
blogRouter.put("/:id", blog_controller_1.updateBlog);
blogRouter.delete("/:id", blog_controller_1.deleteBlogData);
// blogRouter.delete("/:id", authenticateJWT, authorizeRoles("ADMIN"), deleteBlogData );
exports.default = blogRouter;
