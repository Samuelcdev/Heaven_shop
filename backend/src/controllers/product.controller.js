import { validationResult } from "express-validator";
import * as productService from "../services/product.service.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getProductByPk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        return res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).json({ message: "Product created", product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const productUpdated = await productService.updateProduct(id, req.body);
        return res
            .status(200)
            .json({ message: "Product updated", product: productUpdated });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const productDeleted = await productService.deleteProduct(id);
        return res
            .status(200)
            .json({ message: "Product deleted", product: productDeleted });
    } catch (err) {
        next(err);
    }
};
