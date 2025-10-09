import { validationResult } from "express-validator";
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const data = await authService.registerUser(req.body);
        return res.status(201).json({
            message: "User registered",
            user: data.user,
            token: data.token,
        });
    } catch (err) {
        const status = err.status || 500;
        return res
            .status(status)
            .json({ error: err.message || "Server Error" });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const data = await authService.loginUser(req.body);
        return res.status(201).json({
            message: "Login successful",
            user: data.user,
            token: data.token,
        });
    } catch (err) {
        const status = err.status || 500;
        return res
            .status(status)
            .json({ error: err.message || "Server Error" });
    }
};
