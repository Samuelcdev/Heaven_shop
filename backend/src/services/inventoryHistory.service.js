import { fn, col, literal } from "sequelize";
import InventoryHistory from "../models/InventoryHistory.js";
import Variant from "../models/Variant.js";

export const getMonthlyInventoryHistory = async () => {
    const reportMonthly = await InventoryHistory.findAll({
        attributes: [
            [fn("DATE_FORMAT", col("created_at"), "%Y-%m"), "month"],
            [
                fn(
                    "SUM",
                    literal(
                        `CASE WHEN type = 'in' THEN value WHEN type = 'out' THEN -value END`
                    )
                ),
                "total_value",
            ],
        ],
        group: [literal("month")],
        order: [[literal("month"), "ASC"]],
        raw: true,
    });

    return reportMonthly;
};

export const registerInventoryMovement = async ({
    id_variant,
    quantity,
    type,
}) => {
    const variant = await Variant.findByPk(id_variant);

    if (!variant) {
        const err = new Error("Variant not found");
        err.status = 404;
        throw err;
    }

    const value = quantity * variant.price_variant;

    const history = await InventoryHistory.create({
        id_variant,
        quantity,
        value,
        type,
    });

    return history;
};
