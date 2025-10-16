import { validationResult } from "express-validator";
import * as categoryService from "../services/category.service.js";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
        return res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
};

export const getCategoryByPk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        return res.status(200).json(category);
    } catch (err) {
        next(err);
    }
};

export const createCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    try {
        const category = await categoryService.createCategory(req.body);
        return res.status(201).json({ message: "Category created", category });
    } catch (err) {
        next(err);
    }
};

export const updateCategory = async (req, res, next) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const categoryUpdated = await categoryService.updateCategory(
            id,
            req.body
        );
        return res
            .status(200)
            .json({ message: "Category updated", category: categoryUpdated });
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryDeleted = await categoryService.deleteCategory(id);
        return res
            .status(200)
            .json({ message: "Category deleted", categoryDeleted });
    } catch (err) {
        next(err);
    }
};
