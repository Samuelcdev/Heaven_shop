import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/database.js";

const Variant = sequelize.define(
    "Variant",
    {
        id_variant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color_variant: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        size_variant: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        sku_variant: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        price_variant: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        status_variant: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        tableName: "variants",
        timestamps: false,
    }
);

export default Variant;
