import { Router } from "express";
import { body } from "express-validator";
import * as userCtrl from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, permit("admin"), userCtrl.getUsers);

/**
 * @swagger
 * /api/users/paginated:
 *   get:
 *     summary: Get paginated users
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
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
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Paginated users list
 */
router.get(
    "/paginated",
    verifyToken,
    permit("admin"),
    userCtrl.getPaginatedUsers
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get(
    "/:id",
    verifyToken,
    permit("admin", "client"),
    userCtrl.getUserByPk
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Email already exists
 *       404:
 *         description: Role not found
 */
router.post(
    "/",
    verifyToken,
    permit("admin"),
    [
        body("name_user").trim().notEmpty().withMessage("Name user required"),
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid email is required"),
        body("password_user")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("id_role")
            .optional()
            .isInt()
            .withMessage("id_role must be integer"),
        body("roleName").optional().isString(),
    ],
    userCtrl.createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put(
    "/:id",
    verifyToken,
    permit("admin", "client"),
    [
        body("name_user").optional().trim().notEmpty(),
        body("email_user").optional().isEmail(),
        body("password_user").optional().isLength({ min: 6 }),
        body("status_user").optional().isIn(["active", "inactive"]),
        body("roleName").optional().isString(),
    ],
    userCtrl.updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deactivate a user
 *     tags: [Users]
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
 *         description: User deactivated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/:id", verifyToken, permit("admin"), userCtrl.deleteUser);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id_user:
 *           type: integer
 *         name_user:
 *           type: string
 *         email_user:
 *           type: string
 *         status_user:
 *           type: string
 *           enum: [active, inactive]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         role:
 *           type: object
 *           properties:
 *             name_role:
 *               type: string
 *     UserCreate:
 *       type: object
 *       required:
 *         - name_user
 *         - email_user
 *         - password_user
 *       properties:
 *         name_user:
 *           type: string
 *           example: "Laura Perez"
 *         email_user:
 *           type: string
 *           example: "laura@example.com"
 *         password_user:
 *           type: string
 *           example: "123456"
 *         roleName:
 *           type: string
 *           example: "client"
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name_user:
 *           type: string
 *         email_user:
 *           type: string
 *         password_user:
 *           type: string
 *         status_user:
 *           type: string
 *           enum: [active, inactive]
 *         roleName:
 *           type: string
 */
