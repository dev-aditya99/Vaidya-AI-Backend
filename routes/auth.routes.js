import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// signup user 
authRouter.post("/sign-up", signupUser);

// login user 
authRouter.post("/login", loginUser);

// logout user 
authRouter.post("/logout", logoutUser);

export default authRouter;