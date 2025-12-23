import User from "./User.js";
import Role from "./Role.js";
import RefreshToken from "./RefreshToken.js";
import Category from "./Category.js";
import Product from "./Product.js";
import Variant from "./Variant.js";
import Stock from "./Stock.js";
import InventoryHistory from "./InventoryHistory.js";

// User ↔ Role
Role.hasMany(User, {
    foreignKey: "id_role",
    as: "users",
});

User.belongsTo(Role, {
    foreignKey: "id_role",
    as: "role",
});

// User ↔ RefreshToken
User.hasOne(RefreshToken, {
    foreignKey: "id_user",
    as: "refreshToken",
});

RefreshToken.belongsTo(User, {
    foreignKey: "id_user",
    as: "user",
});

// Category ↔ Product
Category.hasMany(Product, {
    foreignKey: "id_category",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: "id_category",
    as: "category",
});

Product.hasMany(Variant, {
    foreignKey: "id_product",
    as: "variants",
});

Variant.belongsTo(Product, {
    foreignKey: "id_product",
    as: "product",
});

Variant.hasOne(Stock, {
    foreignKey: "id_variant",
    as: "stock",
});

Stock.belongsTo(Variant, {
    foreignKey: "id_variant",
    as: "variant",
});

Variant.hasMany(InventoryHistory, {
    foreignKey: "id_variant",
    as: "history",
});

InventoryHistory.belongsTo(Variant, {
    foreignKey: "id_variant",
    as: "variant",
});

export { User, Role, RefreshToken, Product, Category, Variant };
