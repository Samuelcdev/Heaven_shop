import User from "../models/User.js";
import Role from "../models/Role.js";
import dotenv from "dotenv";

dotenv.config();

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
