import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define(
    "Role",
    {
        id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
                notEmpty: { msg: "Role name cannot be empty" },
            },
        },
        description_role: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

export default Role;
