import Variant from "../models/Variant.js";
import Product from "../models/Product.js";
import { Op } from "sequelize";

export const getVariants = async () => {
    const variants = await Variant.findAll({
        include: {
            model: Product,
            as: "product",
            attributes: ["name_product", "image_product"],
        },
    });
    return variants;
};

export const getVariantById = async (id_variant) => {
    const variant = await Variant.findByPk(id_variant, {
        include: {
            model: Product,
            as: "product",
            attributes: ["name_product", "image_product"],
        },
    });

    if (!variant) {
        const err = new Error("Variant not found");
        err.status = 404;
        throw err;
    }

    return variant;
};

export const getPaginatedVariants = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const { count, rows: variants } = await Variant.findAndCountAll({
        include: {
            model: Product,
            as: "product",
            attributes: ["name_product", "image_product"],
        },
        limit,
        offset,
        order: [["id_variant", "ASC"]],
    });

    return {
        totalVariants: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        variants,
    };
};

export const createVariant = async (payload) => {
    const {
        color_variant,
        size_variant,
        sku_variant,
        price_variant,
        id_product,
        productName,
    } = payload;

    const existing = await Variant.findOne({ where: { sku_variant } });
    if (existing) {
        const err = new Error("Variant SKU already exists");
        err.status = 409;
        throw err;
    }

    let product = null;
    if (id_product) {
        product = await Product.findByPk(id_product);
    } else if (productName) {
        product = await Product.findOne({
            where: { name_product: productName },
        });
    }

    if (!product) {
        const err = new Error("Product not found");
        err.status = 404;
        throw err;
    }

    const variant = await Variant.create({
        color_variant: color_variant,
        size_variant: size_variant,
        sku_variant: sku_variant,
        price_variant: price_variant,
        status_variant: "active",
        id_product: product.id_product,
    });

    const variantJson = variant.toJSON();
    return variantJson;
};
