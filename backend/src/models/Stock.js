import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Stock = sequelize.define(
    "Stock",
    {
        id_stock: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_variant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        quantity_stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        expiration_stock: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        lot_code_stock: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "stocks",
        timestamps: false,
    }
);

export default Stock;
