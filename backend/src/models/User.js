import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_user: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: false,
            validate: {
                notEmpty: { msg: "name user cannot be empty" },
            },
        },
        email_user: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: "not validate email format" },
            },
        },
        password_user: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        status_user: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
        },
        id_role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default User;
