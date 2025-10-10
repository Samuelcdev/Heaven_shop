import User from "../models/User.js";
import Role from "../models/Role.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

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
        err.status = 400;
        throw err;
    }

    return user;
};

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
