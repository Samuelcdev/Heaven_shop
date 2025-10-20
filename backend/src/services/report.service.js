import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
import Category from "../models/Category.js";

export const getInventoryReportData = async () => {
    const products = await Product.findAll({
        include: [
            {
                model: Variant,
                as: "variants",
                attributes: [
                    "id_variant",
                    "color_variant",
                    "size_variant",
                    "price_variant",
                    "status_variant",
                ],
            },
            {
                model: Category,
                as: "category",
                attributes: ["name_category"],
            },
        ],
        order: [["id_product", "ASC"]],
    });

    let totalValue = 0;

    const formattedProducts = products.map((product) => {
        const variants = product.variants || [];

        if (variants.length === 0) {
            totalValue += Number(product.price_product || 0);
        } else {
            variants.ForEach((v) => {
                if (v.status_variant === "active") {
                    totalValue += Number(v.price_variant || 0);
                }
            });
        }

        return {
            id: product.id_product,
            name: product.name_product,
            category: product.category?.name_category || "Sin categoría",
            price: product.price_product,
            variants: variants.map((v) => ({
                id: v.id_variant,
                color: v.color_variant,
                size: v.size_variant,
                price: v.price_variant,
                status: v.status_variant,
            })),
        };
    });

    return {
        date: new Date().toISOString(),
        totalProducts: products.length,
        totalValue: totalValue.toFixed(2),
        products: formattedProducts,
    };
};
