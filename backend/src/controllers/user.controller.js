import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users", err);
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
};

export const getUserByPk = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user", err);
        const status = err.status || 500;
        return res
            .status(status)
            .json({ error: err.message || "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({ message: "User created", user });
    } catch (err) {
        console.error("Error creating user", err);
        const status = err.status || 500;
        return res
            .status(status)
            .json({ error: err.message || "Internal server error" });
    }
};
