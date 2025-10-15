import sequelize from "../config/database.js";
import Role from "../models/Role.js";

const seedRoles = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync({ alter: true });

        const roles = [
            { name_role: "admin", description_role: "System administrator" },
            { name_role: "seller", description_role: "Manage sales and inventory" },
            { name_role: "client", description_role: "Regular customer" },
        ];

        for (const role of roles) {
            const existing = await Role.findOne({
                where: { name_role: role.name_role },
            });

            if (existing) {
                console.log(`Role ${role.name_role} already exists`);
                continue;
            }

            await Role.create(role);
            console.log(`Role ${role.name_role} created`);
        }

        console.log("Roles seeded successfully");
    } catch (err) {
        console.log("Error seeding roles: ", err);
    } finally {
        await sequelize.close();
    }
};

seedRoles();
