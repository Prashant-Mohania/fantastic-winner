import express, { Router, Request, Response } from "express";
import { AuthController } from "../auth/auth_controller";
// import { UserController } from "../db/controller/user_controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("API is working");
});

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);

export { router };