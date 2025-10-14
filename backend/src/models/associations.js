import User from "./User.js";
import Role from "./Role.js";
import RefreshToken from "./RefreshToken.js";

Role.hasMany(User, {
    foreignKey: "id_role",
    as: "users",
});

User.belongsTo(Role, {
    foreignKey: "id_role",
    as: "role",
});

User.hasOne(RefreshToken, {
    foreignKey: "id_user",
    as: "refreshToken",
});

RefreshToken.belongsTo(User, {
    foreignKey: "id_user",
    as: "user",
});

export { User, Role, RefreshToken };
