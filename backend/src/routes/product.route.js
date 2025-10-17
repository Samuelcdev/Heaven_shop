import { Router } from "express";
import { body, param } from "express-validator";
import * as productCtrl from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

router.get(
    "/",
    verifyToken,
    permit("admin", "seller"),
    productCtrl.getProducts
);

router.get(
    "/:id",
    verifyToken,
    permit("admin", "seller", "client"),
    param("id").isInt().withMessage("ID must be an integer"),
    productCtrl.getProductByPk
);

router.post(
    "/",
    verifyToken,
    permit("admin", "seller"),
    [
        body("name_product")
            .notEmpty()
            .withMessage("Product name is required")
            .isLength({ min: 3 })
            .withMessage("Name must have at least 3 characters"),
        body("description_product")
            .optional()
            .isLength({ max: 200 })
            .withMessage("Description too long"),
        body("price_product")
            .notEmpty()
            .withMessage("Price is required")
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
        body("id_category")
            .optional()
            .isInt()
            .withMessage("Category ID must be an integer"),
    ],
    productCtrl.createProduct
);

router.put(
    "/:id",
    verifyToken,
    permit("admin", "seller"),
    [
        param("id").isInt().withMessage("ID must be an integer"),
        body("name_product")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Name must have at least 3 characters"),
        body("price_product")
            .optional()
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
    ],
    productCtrl.updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    param("id").isInt().withMessage("ID must be an integer"),
    productCtrl.deleteProduct
);

export default router;
