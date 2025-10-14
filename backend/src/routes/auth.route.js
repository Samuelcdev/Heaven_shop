import { Router } from "express";
import { body } from "express-validator";
import * as authCtrl from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user registration, login, logout, and token refresh
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_user
 *               - email_user
 *               - password_user
 *             properties:
 *               name_user:
 *                 type: string
 *                 example: "Laura Pérez"
 *               email_user:
 *                 type: string
 *                 example: "laura@example.com"
 *               password_user:
 *                 type: string
 *                 example: "123456"
 *               roleName:
 *                 type: string
 *                 example: "client"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered"
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *       400:
 *         description: Validation error or missing fields
 *       409:
 *         description: Email already exists
 */
router.post(
    "/register",
    [
        body("name_user").trim().notEmpty().withMessage("Name is required"),
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid email is required"),
        body("password_user")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    authCtrl.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email_user
 *               - password_user
 *             properties:
 *               email_user:
 *                 type: string
 *                 example: "laura@example.com"
 *               password_user:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *                 refreshToken:
 *                   type: string
 *                   example: "f5e8b39f12c4f0b21d93f..."
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post(
    "/login",
    [
        body("email_user")
            .trim()
            .isEmail()
            .withMessage("Valid email is required"),
        body("password_user").notEmpty().withMessage("Password required"),
    ],
    authCtrl.login
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     description: Deletes the refresh token associated with the user, invalidating the session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "f5e8b39f12c4f0b21d93f..."
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful, token deleted"
 *       400:
 *         description: Missing refresh token
 *       404:
 *         description: Token not found in database
 */
router.post("/logout", authCtrl.logout);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     description: Generates a new access token using a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "f5e8b39f12c4f0b21d93f..."
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access token refreshed"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *       400:
 *         description: Missing or invalid refresh token
 *       401:
 *         description: Unauthorized or expired refresh token
 */
router.post("/refresh", authCtrl.refreshToken);

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
 *           example: 1
 *         name_user:
 *           type: string
 *           example: "Laura Pérez"
 *         email_user:
 *           type: string
 *           example: "laura@example.com"
 *         status_user:
 *           type: string
 *           enum: [active, inactive]
 *           example: "active"
 *         role:
 *           type: string
 *           example: "client"
 */
