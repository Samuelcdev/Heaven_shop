import { Router } from "express";
import { body, param } from "express-validator";
import * as variantCtrl from "../controllers/variant.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Variants
 *   description: Product variant management and operations
 */

/**
 * @swagger
 * /api/variants:
 *   get:
 *     summary: Get all variants
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all variants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variant'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    verifyToken,
    permit("admin", "seller"),
    variantCtrl.getVariants
);

/**
 * @swagger
 * /api/variants/paginated:
 *   get:
 *     summary: Get paginated variants
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of variants per page
 *     responses:
 *       200:
 *         description: Paginated list of variants
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/paginated",
    verifyToken,
    permit("admin", "seller"),
    variantCtrl.getPaginatedVariants
);

/**
 * @swagger
 * /api/variants/{id}:
 *   get:
 *     summary: Get a variant by ID
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Variant ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Variant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Variant not found
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/:id",
    verifyToken,
    permit("admin", "seller", "client"),
    param("id").isInt().withMessage("ID must be an integer"),
    variantCtrl.getVariantByPk
);

/**
 * @swagger
 * /api/variants:
 *   post:
 *     summary: Create a new product variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantCreate'
 *     responses:
 *       201:
 *         description: Variant created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       409:
 *         description: Variant SKU already exists
 */
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

/**
 * @swagger
 * /api/variants/{id}:
 *   put:
 *     summary: Update an existing variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Variant ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantUpdate'
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Variant not found
 */
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

/**
 * @swagger
 * /api/variants/{id}:
 *   delete:
 *     summary: Delete a variant by ID
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Variant not found
 */
router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    param("id").isInt().withMessage("ID must be an integer"),
    variantCtrl.deleteVariant
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       properties:
 *         id_variant:
 *           type: integer
 *         color_variant:
 *           type: string
 *           example: "Red"
 *         size_variant:
 *           type: string
 *           example: "M"
 *         sku_variant:
 *           type: string
 *           example: "TSH-RED-M-12"
 *         price_variant:
 *           type: number
 *           example: 39.99
 *         status_variant:
 *           type: string
 *           enum: [active, inactive]
 *         id_product:
 *           type: integer
 *         product:
 *           type: object
 *           properties:
 *             name_product:
 *               type: string
 *               example: "T-Shirt Classic"
 *     VariantCreate:
 *       type: object
 *       required:
 *         - price_variant
 *       properties:
 *         id_product:
 *           type: integer
 *           example: 3
 *         productName:
 *           type: string
 *           example: "T-Shirt Classic"
 *         color_variant:
 *           type: string
 *           example: "Blue"
 *         size_variant:
 *           type: string
 *           example: "L"
 *         price_variant:
 *           type: number
 *           example: 49.99
 *     VariantUpdate:
 *       type: object
 *       properties:
 *         color_variant:
 *           type: string
 *         size_variant:
 *           type: string
 *         price_variant:
 *           type: number
 *         status_variant:
 *           type: string
 *           enum: [active, inactive]
 *         productName:
 *           type: string
 */
