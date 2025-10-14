import { Router } from "express";
import { body } from "express-validator";
import * as authCtrl from "../controllers/auth.controller.js";

const router = Router();

router.post(
    "/register",
    [
        body("name_user").trim().notEmpty().withMessage("Name is required"),
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid format is required"),
        body("password_user")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars"),
    ],
    authCtrl.register
);

router.post(
    "/login",
    [
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid format is required"),
        body("password_user").notEmpty().withMessage("Password required"),
    ],
    authCtrl.login
);

router.post("/logout", authCtrl.logout);

router.post("/refresh", authCtrl.refreshToken);

export default router;
