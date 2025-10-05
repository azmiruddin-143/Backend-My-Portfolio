import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById,  getProjectByIdController,  updateProject } from "./project.controller";
import { authenticateJWT } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authRole.middleware";

const projectRoute = express.Router();

projectRoute.post("/", authenticateJWT, authorizeRoles("ADMIN", "USER"),createProject );

projectRoute.get("/", getAllProjects);

projectRoute.get("/:id", authenticateJWT, authorizeRoles("USER", "ADMIN"), getProjectById);
projectRoute.put("/:id", authenticateJWT, authorizeRoles("USER", "ADMIN"), updateProject);
projectRoute.delete("/:id", authenticateJWT, authorizeRoles("ADMIN"), deleteProject );

// ---------- top views project and top click project ------------------

projectRoute.get("/top/:id", authenticateJWT, authorizeRoles("USER", "ADMIN"), getProjectByIdController);

export default projectRoute;