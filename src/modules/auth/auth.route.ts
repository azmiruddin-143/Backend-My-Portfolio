import express from "express";
import { getProfile, loginUser, registerUser, totalUsers, userLogoutController } from "./auth.controller";
import { authenticateJWT } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/authRole.middleware";


export const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/logout",userLogoutController);
userRouter.post("/login",  loginUser );
userRouter.get("/",authenticateJWT, authorizeRoles("ADMIN"), totalUsers);
userRouter.get("/me", authenticateJWT, getProfile);