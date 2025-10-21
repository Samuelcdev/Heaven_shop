import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
import Category from "../models/Category.js";
import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { text } from "stream/consumers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fonts = {
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    },
};

const printer = new PdfPrinter(fonts);

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
            variants.forEach((v) => {
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

export const generateInventoryPDF = async () => {
    const products = await Product.findAll({
        include: [
            { model: Category, as: "category", attributes: ["name_category"] },
            {
                model: Variant,
                as: "variants",
                attributes: [
                    "color_variant",
                    "size_variant",
                    "price_variant",
                    "status_variant",
                ],
            },
        ],
        order: [["id_product", "ASC"]],
    });

    const body = [
        [
            { text: "Producto", bold: true },
            {
                text: "Categoría",
                bold: true,
            },
            {
                text: "Variante (Color / Talla)",
                bold: true,
            },
            {
                text: "Precio",
                bold: true,
            },
            {
                text: "Estado",
                bold: true,
            },
        ],
    ];

    let total = 0;

    for (const product of products) {
        if (product.variants.length === 0) {
            body.push([
                product.name_product,
                product.category?.name_category || "Sin categoría",
                "- / -",
                `$${Number(variant.price_product || 0).toFixed(2)}`,
                "N/A",
            ]);
            total += Number(product.price_product || 0);
        } else {
            for (const variant of product.variants) {
                body.push([
                    product.name_product,
                    product.category?.name_category || "Sin categoría",
                    `${variant.color_variant || "-"} / ${
                        variant.size_variant || "-"
                    }`,
                    `$${Number(variant.price_variant || 0).toFixed(2)}`,
                    variant.status_variant,
                ]);
                total += Number(price_variant || 0);
            }
        }
    }

    const docDefinition = {
        content: [
            { text: "Reporte de inventario", style: "header" },
            {
                text: `Fecha: ${new Date().toLocaleDateString()}`,
                margin: [0, 0, 0, 10],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "*", "*", "auto", "auto"],
                    body,
                },
                layout: "lightHorizontalLines",
            },
            {
                text: `\nValor total del inventario: $${total.toFixed(2)}`,
                style: "total",
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center",
                margin: [0, 0, 0, 10],
            },
            total: {
                bold: true,
                alignment: "right",
                fontSize: 14,
            },
            defaultStyle: { font: "Helvetica" },
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    const outputPath = path.join(
        __dirname,
        `../../public/reports/inventory_report_${timestamp}.pdf`
    );

    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();

    return outputPath;
};
