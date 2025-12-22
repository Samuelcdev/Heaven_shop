import { fn, col, literal } from "sequelize";
import InventoryHistory from "../models/InventoryHistory.js";

export const getMonthlyInventoryHistory = async () => {
    const reportMonthly = await InventoryHistory.findAll({
        attributes: [
            [fn("DATE_FORMAT", col("created_at"), "%Y-%m"), "month"],
            [fn("SUM", col("value")), "total_value"],
            [fn("SUM", col("quantity")), "total_quantity"],
        ],
        where: {
            type: "in",
        },
        group: [literal("month")],
        order: [[literal("month"), "ASC"]],
        raw: true,
    });

    return reportMonthly;
};
