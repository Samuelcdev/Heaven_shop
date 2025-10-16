import Category from "../models/Category.js";
import { Op } from "sequelize";

export const getCategories = async () => {
    const categories = await Category.findAll();

    return categories;
};

export const getCategoryById = async (id_category) => {
    const category = await Category.findByPk(id_category);

    if (!category) {
        const err = new Error("Category not found");
        err.status = 404;
        throw err;
    }

    return category;
};

export const createCategory = async (payload) => {
    const { name_category, description_category } = payload;

    const existing = await Category.findOne({
        where: { name_category: name_category },
    });

    if (existing) {
        const err = new Error("Category already exists");
        err.status = 409;
        throw err;
    }

    const category = await Category.create({
        name_category: name_category,
        description_category: description_category,
    });

    const categoryJson = category.toJSON();
    return categoryJson;
};

export const updateCategory = async (id, payload) => {
    const category = await Category.findByPk(id);
    if (!category) {
        const err = new Error("Category not found");
        err.status = 404;
        throw err;
    }

    const { name_category, description_category } = payload;

    if (name_category !== category.name_category) {
        const existing = await Category.findOne({
            where: { name_category, id_category: { [Op.ne]: id } },
        });
        if (existing) {
            const err = new Error("Category name already exists");
            err.status = 409;
            throw err;
        }
    }

    await Category.update(
        {
            name_category: name_category ?? category.name_category,
            description_category:
                description_category ?? category.description_category,
        },
        {
            where: { id_category: id },
        }
    );

    const updateCategory = await Category.findByPk(id);

    const categoryJson = updateCategory.toJSON();
    return categoryJson;
};

export const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        const err = new Error("Category not found");
        err.status = 404;
        throw err;
    }

    await Category.destroy({ where: { id_category: id } });

    return { message: "Category deleted successfully" };
};
