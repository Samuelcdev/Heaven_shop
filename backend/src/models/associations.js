import User from "./User.js";
import Role from "./Role.js";

Role.hasMany(User, {
    foreignKey: "id_role",
    as: "users",
});

User.belongsTo(Role, {
    foreignKey: "id_role",
    as: "role",
});

export { User, Role };
