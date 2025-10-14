import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserByPk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getPaginatedUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);

        const usersPaginated = await userService.getPaginatedUsers(page, limit);
        return res.status(200).json(usersPaginated);
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({ message: "User created", user });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const userUpdated = await userService.updateUser(id, req.body);
        return res
            .status(200)
            .json({ message: "User updated", user: userUpdated });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await userService.deleteUser(id);
        return res
            .status(200)
            .json({ message: "User deleted", user: userDeleted });
    } catch (err) {
        next(err);
    }
};
