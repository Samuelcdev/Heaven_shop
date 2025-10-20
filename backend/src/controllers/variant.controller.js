import { validationResult } from "express-validator";
import * as variantService from "../services/variant.service.js";

export const getVariants = async (req, res, next) => {
    try {
        const variants = await variantService.getVariants();
        return res.status(200).json(variants);
    } catch (err) {
        next(err);
    }
};

export const getVariantByPk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const variant = await variantService.getVariantById(id);
        return res.status(200).json(variant);
    } catch (err) {
        next(err);
    }
};

export const getPaginatedVariants = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);

        const variantsPaginated = await variantService.getPaginatedVariants(
            page,
            limit
        );
        return res.status(200).json(variantsPaginated);
    } catch (err) {
        next(err);
    }
};

export const createVariant = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const variant = await variantService.createVariant(req.body);
        return res.status(201).json({ message: "Variant created", variant });
    } catch (err) {
        next(err);
    }
};

export const updateVariant = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const variantUpdated = await variantService.updateVariant(id, req.body);
        return res
            .status(200)
            .json({ message: "Variant updated", variant: variantUpdated });
    } catch (err) {
        next(err);
    }
};

export const deleteVariant = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const variantDeleted = await variantService.deleteVariant(id);
        return res
            .status(200)
            .json({ message: "Variant deleted", variant: variantDeleted });
    } catch (err) {
        next(err);
    }
};
