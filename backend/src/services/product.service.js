import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProducts = async () => {
    const products = await Product.findAll();
    return products;
};

export const getProductById = async (id_product) => {
    const product = await Product.findByPk(id_product);

    if (!product) {
        const err = new Error("Product not found");
        err.status = 404;
        throw err;
    }

    return product;
};

export const createProduct = async (payload) => {
    const {
        name_product,
        description_product,
        price_product,
        image_product,
        id_category,
        categoryName,
    } = payload;

    const existing = await Product.findOne({
        where: { name_product: name_product },
    });
    if (existing) {
        const err = new Error("Product already exists");
        err.status = 409;
        throw err;
    }

    let category;
    if (id_category) {
        category = await Category.findByPk(id_category);
    } else if (categoryName) {
        category = await Category.findOne({
            where: { name_category: categoryName },
        });
    }

    if (!category) {
        const err = new Error("Category not found");
        err.status = 404;
        throw err;
    }

    const defaultImage = "/images/default_image.png";

    const product = await Product.create({
        name_product: name_product,
        description_product: description_product,
        price_product: price_product,
        status_product: "active",
        image_product: image_product || defaultImage,
        id_category: category.id_category,
    });

    const productJson = product.toJSON();
    return productJson;
};
