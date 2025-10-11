import { Router } from "express";
import { body } from "express-validator";
import * as userCtrl from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserByPk);
router.post(
    "/create",
    verifyToken,
    permit("admin"),
    [
        body("name_user").trim().notEmpty().withMessage("Name user required"),
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid format is required"),
        body("password_user")
            .isLength({ min: 6 })
            .withMessage("Password min 6 chars"),
        body("id_role")
            .optional()
            .isInt()
            .withMessage("id_role must be integer"),
        body("roleName").optional().isString(),
    ],
    userCtrl.createUser
);
router.put(
    "/:id",
    verifyToken,
    permit("admin", "client"),
    [
        body("name_user")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Name user required"),
        body("email_user")
            .optional()
            .isEmail()
            .withMessage("Valid format is required"),
        body("password_user")
            .optional()
            .isLength({ min: 6 })
            .withMessage("Password min 6 chars"),
        body("status_bar").optional().isIn(["active", "inactive"]),
        body("roleName").optional().isString(),
    ],
    userCtrl.updateUser
);
router.delete("/delete/:id", verifyToken, permit("admin"), userCtrl.deleteUser);

export default router;
