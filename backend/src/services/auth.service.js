/**
 * -------------------------------------------------------------
 * File: auth.service.js
 * Author: Samuel Useche
 * Description:
 *   Contiene la lógica de autenticación (registro, login, refresh, logout)
 *   utilizando JWT y Refresh Tokens con almacenamiento en base de datos.
 *
 * Dependencies:
 *   - bcrypt: para encriptar contraseñas
 *   - jwt: para generar tokens
 *   - crypto: para generar tokens de refresco aleatorios
 *   - dotenv: para variables de entorno
 *
 * Model:
 *   - Role: modelo de roles
 *   - User: modelo para usuarios
 *   - RefreshToken: model de tokens de actualización
 *
 * Notes:
 *   Este servicio no maneja respuestas HTTP directamente.
 *   Se comunica con los controladores para retornar resultados.
 * -------------------------------------------------------------
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import RefreshToken from "../models/RefreshToken.js";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

/**
 * Endpoint: POST /api/auth/register
 * Maneja la creacion del usuario.
 * Valida existencia de usuario en la base de datos.
 * Valida existencia del rol.
 * Crea el usuario y genera token de acceso.
 */
export const registerUser = async (payload) => {
    const { name_user, email_user, password_user, roleName } = payload;

    const email = (email_user || "").trim().toLowerCase();

    const existing = await User.findOne({ where: { email_user: email } });

    if (existing) {
        const err = new Error("Email already registered");
        err.status = 400;
        throw err;
    }

    const roleToFind = roleName || "client";
    const role = await Role.findOne({ where: { name_role: roleToFind } });

    if (!role) {
        const err = new Error(`Role '${roleName}' not found`);
        err.status = 400;
        throw err;
    }

    const hashed = await bcrypt.hash(password_user, SALT_ROUNDS);

    const user = await User.create({
        name_user: name_user.trim(),
        email_user: email,
        password_user: hashed,
        status_user: "active",
        id_role: role.id_role,
    });

    const userJson = user.toJSON();
    delete userJson.password_user;

    const tokenPayload = {
        id_user: user.id_user,
        name_user: user.name_user,
        email_user: user.email_user,
        role: role.name_role,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
    });

    return { user: userJson, token };
};

/**
 * Endpoint: POST /api/auth/refresh
 * Maneja el refresh token.
 * Valida el envio del refresh token.
 * Valida la fecha de expiracion del token.
 * Genera el nuevo token de acceso.
 */
export const refreshToken = async (refreshToken) => {
    if (!refreshToken) {
        const err = new Error("Missing refresh token");
        err.status = 400;
        throw err;
    }

    const stored = await RefreshToken.findOne({
        where: {
            token: refreshToken,
        },
        include: {
            model: User,
            as: "user",
            include: {
                model: Role,
                as: "role",
                attributes: ["name_role"],
            },
        },
    });

    if (!stored) {
        const err = new Error("Invalid refresh token");
        err.status = 403;
        throw err;
    }

    if (new Date() > new Date(stored.expires_at)) {
        await stored.destroy();
        const err = new Error("Expired refres token");
        err.status = 403;
        throw err;
    }

    const payload = {
        id_user: stored.user.id_user,
        name_user: stored.user.name_user,
        email_user: stored.user.email_user,
        role: stored.user.role.name_role,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return {
        accessToken: newAccessToken,
    };
};

/**
 * Endpoint: POST /api/auth/login
 * Maneja el inicio de sesión del usuario.
 * Valida el email y contraseña.
 * Genera data del usuario y tokens.
 */
export const loginUser = async ({ email_user, password_user }) => {
    const user = await User.findOne({
        where: { email_user },
        include: {
            model: Role,
            as: "role",
            attributes: ["name_role"],
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const validPassword = await bcrypt.compare(
        password_user,
        user.password_user
    );
    if (!validPassword) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    const tokenPayload = {
        id: user.id_user,
        email: user.email_user,
        role: user.role.name_role,
        name: user.name_user,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await RefreshToken.upsert({
        id_user: user.id_user,
        token: refreshToken,
        expires_at: expiresAt,
    });

    return {
        user: {
            id_user: user.id_user,
            name_user: user.name_user,
            email_user: user.email_user,
            role: user.role.name_role,
        },
        accessToken,
        refreshToken,
    };
};

/**
 * Endpoint: POST /api/auth/logout
 * Maneja el cierre de sesion y la destruccion del refresh token.
 * Valida el envio del refresh token.
 * Genera la destruccion del refresh token
 */
export const logout = async (refreshToken) => {
    if (!refreshToken) {
        const err = new Error("Missing refresh token");
        err.status = 400;
        throw err;
    }

    const stored = await RefreshToken.findOne({
        where: { token: refreshToken },
    });

    if (!stored) {
        const err = new Error("Token not found or already removed");
        err.status = 404;
        throw err;
    }

    await stored.destroy();

    return {
        message: "Logout succesful, token deleted",
    };
};
