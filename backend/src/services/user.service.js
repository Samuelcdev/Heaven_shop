/**
 * -------------------------------------------------------------
 * File: user.service.js
 * Author: Samuel Useche
 * Description:
 *   Contiene la logica de usuarios(obtener, crear, actualizar, eliminar)
 *   utilizando jwt, bcrypt y { Op } de sequelize
 *
 * Dependencies:
 *   - bcrypt: para encriptar contraseñas
 *   - jwt: para generar tokens
 *   - crypto: para generar tokens de refresco aleatorios
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
import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

/**
 * Endpoint: GET /api/users/
 * Maneja la extracción de los usuarios.
 * Genera la información de los usuarios
 */
export const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: [
            "id_user",
            "name_user",
            "email_user",
            "status_user",
            "created_at",
        ],
        include: {
            model: Role,
            as: "role",
            attributes: ["name_role"],
        },
    });
    return users;
};

/**
 * Endpoint: GET /api/users/:id
 * Maneja la extracción de usuario por id.
 * Valida que el usuario exista
 * Genera la información del usuario
 */
export const getUserById = async (id_user) => {
    const user = await User.findByPk(id_user, {
        attributes: { exclude: ["password_user"] },
        include: {
            model: Role,
            as: "role",
            attributes: ["name_role"],
        },
    });

    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    return user;
};

/**
 * Endpoint: GET /api/users/paginated
 * Maneja la extracción de los usuarios paginados.
 * Genera un maximo de 10 usuarios por pagina.
 */
export const getPaginatedUsers = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
        attributes: [
            "id_user",
            "name_user",
            "email_user",
            "status_user",
            "created_at",
        ],
        include: {
            model: Role,
            as: "role",
            attributes: ["name_role"],
        },
        limit,
        offset,
        order: [["created_at", "DESC"]],
    });

    return {
        totalUsers: count,
        totalPages: Math.ceil(count, limit),
        currentPage: page,
        users,
    };
};

/**
 * Endpoint: POST /api/users/
 * Maneja la creación de un usuario.
 * Valida que el correo no este en uso
 * Valida existencia del rol
 * Genera la informacion del usuario sin la contraseña
 */
export const createUser = async (payload) => {
    const { name_user, email_user, password_user, id_role, roleName } = payload;

    const email = (email_user || "").trim().toLowerCase();

    const existing = await User.findOne({ where: { email_user: email } });
    if (existing) {
        const err = new Error("User already exists");
        err.status = 409;
        throw err;
    }

    let role;
    if (id_role) {
        role = await Role.findByPk(id_role);
    } else if (roleName) {
        role = await Role.findOne({ where: { name_role: roleName } });
    } else {
        role = await Role.findOne({ where: { name_role: "client" } });
    }

    if (!role) {
        const err = new Error("Role not found");
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

    return userJson;
};

/**
 * Endpoint: PUT /api/users/
 * Maneja la actualización de un usuario.
 * Valida existencia del usuario
 * Valida que el correo no este en uso
 * Valida existencia del rol
 * Genera la informacion del usuario actualizado
 */
export const updateUser = async (id, payload) => {
    const user = await User.findByPk(id);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    const { name_user, email_user, password_user, status_user, roleName } =
        payload;

    if (email_user) {
        const existing = await User.findOne({
            where: { email_user, id_user: { [Op.ne]: id } },
        });
        if (existing) {
            const err = new Error("Email already in use");
            err.status = 409;
            throw err;
        }
    }

    let role = null;
    if (roleName) {
        role = await Role.findOne({ where: { name_role: roleName } });
        if (!role) {
            const err = new Error("Role not found");
            err.status = 404;
            throw err;
        }
    }

    if (password_user) {
        payload.password_user = await bcrypt.hash(password_user, 10);
    }

    await User.update(
        {
            name_user: name_user ?? user.name_user,
            email_user: email_user ?? user.email_user,
            password_user: payload.password_user ?? user.password_user,
            status_user: status_user ?? user.status_user,
            id_role: role ? role.id_role : user.id_role,
        },
        { where: { id_user: id } }
    );

    const updateUser = await User.findByPk(id);

    const userJson = updateUser.toJSON();
    delete userJson.password_user;
    return userJson;
};

/**
 * Endpoint: DELETE /api/users/
 * Maneja la desactivación de un usuario.
 * Valida existencia del usuario
 * Cambia el estado del usuario a inactivo
 * Genera la informacion del usuario sin la contraseña
 */
export const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    user.status_user = "inactive";
    await user.save();

    const userJson = user.toJSON();
    delete userJson.password_user;
    return userJson;
};
