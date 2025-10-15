import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_product: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: { msg: "name product cannot be empty" },
            },
        },
        description_product: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price_product: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "price product cannot be empty",
                },
                isDecimal: { msg: "price product must be a decimal number" },
            },
        },
        status_product: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: true,
            defaultValue: "active",
        },
        image_product: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "products",
        timestamps: false,
    }
);

export default Product;
