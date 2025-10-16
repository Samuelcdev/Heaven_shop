import { Router } from "express";
import { body } from "express-validator";
import * as categoryCtrl from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

router.get("/", verifyToken, permit("admin"), categoryCtrl.getCategories);

router.get("/:id", verifyToken, permit("admin"), categoryCtrl.getCategoryByPk);

router.post(
    "/",
    verifyToken,
    permit("admin"),
    [
        body("name_category")
            .trim()
            .notEmpty()
            .withMessage("Name category cannot be empty"),
    ],
    categoryCtrl.createCategory
);

router.put(
    "/:id",
    verifyToken,
    permit("admin"),
    [
        body("name_category")
            .notEmpty()
            .withMessage("name_category cannot be empty"),
    ],
    categoryCtrl.updateCategory
);

router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    categoryCtrl.deleteCategory
);

export default router;
