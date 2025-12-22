import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InventoryHistory = sequelize.define(
    "InventoryHistory",
    {
        id_history: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_variant: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("in", "out"),
            allowNull: false,
            defaultValue: "in",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "inventory_history",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default InventoryHistory;
