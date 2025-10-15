import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
    "Category",
    {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_category: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: "name category cannot be empty" },
            },
        },
        description_category: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "categories",
        timestamps: false,
    }
);

export default Category;
