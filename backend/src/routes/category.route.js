import { Router } from "express";
import { body } from "express-validator";
import * as categoryCtrl from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management and operations
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, permit("admin"), categoryCtrl.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", verifyToken, permit("admin"), categoryCtrl.getCategoryByPk);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Category already exists
 */
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

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdate'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       409:
 *         description: Category name already exists
 */
router.put(
    "/:id",
    verifyToken,
    permit("admin"),
    [
        body("name_category")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("name_category cannot be empty"),
    ],
    categoryCtrl.updateCategory
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete(
    "/:id",
    verifyToken,
    permit("admin"),
    categoryCtrl.deleteCategory
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id_category:
 *           type: integer
 *           example: 1
 *         name_category:
 *           type: string
 *           example: "Shoes"
 *         description_category:
 *           type: string
 *           example: "All kinds of footwear"
 *
 *     CategoryCreate:
 *       type: object
 *       required:
 *         - name_category
 *       properties:
 *         name_category:
 *           type: string
 *           example: "Accessories"
 *         description_category:
 *           type: string
 *           example: "Complementary items for clothing"
 *
 *     CategoryUpdate:
 *       type: object
 *       properties:
 *         name_category:
 *           type: string
 *           example: "Updated name"
 *         description_category:
 *           type: string
 *           example: "Updated description"
 */
