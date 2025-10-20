import { Router } from "express";
import { body, param } from "express-validator";
import * as variantCtrl from "../controllers/variant.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

router.get(
    "/",
    verifyToken,
    permit("admin", "seller"),
    variantCtrl.getVariants
);

router.get(
    "/paginated",
    verifyToken,
    permit("admin", "seller"),
    variantCtrl.getPaginatedVariants
);

router.get(
    "/:id",
    verifyToken,
    permit("admin", "seller", "client"),
    param("id").isInt().withMessage("ID must be an integer"),
    variantCtrl.getVariantByPk
);

router.post(
    "/",
    verifyToken,
    permit("admin", "seller"),
    [
        body("id_product")
            .optional()
            .isInt()
            .withMessage("Product ID must be an integer"),
        body("color_variant")
            .optional()
            .isLength({ min: 2 })
            .withMessage("Color must have at least 2 characters"),
        body("size_variant")
            .optional()
            .isLength({ min: 1 })
            .withMessage("Size must have at least 1 character"),
        body("price_variant")
            .optional()
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
        body("productName")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Product name must have at least 3 characters"),
    ],
    variantCtrl.createVariant
);

router.put(
    "/:id",
    verifyToken,
    permit("admin", "seller"),
    [
        param("id").isInt().withMessage("ID must be an integer"),
        body("color_variant")
            .optional()
            .isLength({ min: 2 })
            .withMessage("Color must have at least 2 characters"),
        body("size_variant")
            .optional()
            .isLength({ min: 1 })
            .withMessage("Size must have at least 1 character"),
        body("sku_variant")
            .optional()
            .isLength({ min: 3 })
            .withMessage("SKU must have at least 3 characters"),
        body("price_variant")
            .optional()
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
        body("status_variant")
            .optional()
            .isIn(["active", "inactive"])
            .withMessage("Status must be active or inactive"),
        body("productName")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Product name must have at least 3 characters"),
    ],
    variantCtrl.updateVariant
);

router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    param("id").isInt().withMessage("ID must be an integer"),
    variantCtrl.deleteVariant
);

export default router;
