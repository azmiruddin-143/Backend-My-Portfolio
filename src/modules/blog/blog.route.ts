import express from "express";
import { createBlog, deleteBlogData, getAllBlog, getBlogById, updateBlog } from "./blog.controller";
import { authenticateJWT } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authRole.middleware";

const blogRouter = express.Router();
blogRouter.post("/", createBlog);
blogRouter.get("/",getAllBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/:id", updateBlog)
blogRouter.delete("/:id", deleteBlogData );
// blogRouter.delete("/:id", authenticateJWT, authorizeRoles("ADMIN"), deleteBlogData );

export default blogRouter;