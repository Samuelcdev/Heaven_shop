import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

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

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return {
        user: {
            id_user: user.id_user,
            name_user: user.name_user,
            email_user: user.email_user,
            role: user.role.name_role,
        },
        token,
    };
};
