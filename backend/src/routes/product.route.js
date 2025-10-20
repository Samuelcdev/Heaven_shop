import { Router } from "express";
import { body, param } from "express-validator";
import * as productCtrl from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and operations
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    verifyToken,
    permit("admin", "seller"),
    productCtrl.getProducts
);

/**
 * @swagger
 * /api/products/paginated:
 *   get:
 *     summary: Get paginated products
 *     tags: [Products]
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
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Paginated product list
 */
router.get(
    "/paginated",
    verifyToken,
    permit("admin", "seller"),
    productCtrl.getPaginatedProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get(
    "/:id",
    verifyToken,
    permit("admin", "seller", "client"),
    param("id").isInt().withMessage("ID must be an integer"),
    productCtrl.getProductByPk
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
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
        body("description_product")
            .optional()
            .isLength({ max: 200 })
            .withMessage("Description too long"),
        body("price_product")
            .optional()
            .isFloat({ gt: 0 })
            .withMessage("Price must be a positive number"),
    ],
    productCtrl.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deactivate a product
 *     tags: [Products]
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
 *         description: Product deactivated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    param("id").isInt().withMessage("ID must be an integer"),
    productCtrl.deleteProduct
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id_product:
 *           type: integer
 *         name_product:
 *           type: string
 *         description_product:
 *           type: string
 *         price_product:
 *           type: number
 *           format: float
 *         status_product:
 *           type: string
 *           enum: [active, inactive]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         category:
 *           type: object
 *           properties:
 *             name_category:
 *               type: string
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name_product
 *         - price_product
 *       properties:
 *         name_product:
 *           type: string
 *           example: "Camiseta básica"
 *         description_product:
 *           type: string
 *           example: "Camiseta de algodón unisex"
 *         price_product:
 *           type: number
 *           example: 29.99
 *         id_category:
 *           type: integer
 *           example: 2
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         name_product:
 *           type: string
 *         description_product:
 *           type: string
 *         price_product:
 *           type: number
 *         status_product:
 *           type: string
 *           enum: [active, inactive]
 */
