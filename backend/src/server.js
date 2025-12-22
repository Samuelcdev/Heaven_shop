import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import "./models/associations.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import variantRoutes from "./routes/variant.route.js";
import reportRoutes from "./routes/report.route.js";
import InventoryRoutes from "./routes/inventoryHistory.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use("/images", express.static(path.join(process.cwd(), "public/images")));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/inventory-history", InventoryRoutes);

app.get("/", (req, res) => {
    res.send("Servidor Corriendo exitosamente");
});

import { swaggerUi, swaggerSpecs } from "../docs/api/swagger.js";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado a la base de datos");
    } catch (err) {
        console.log("Error al conectar con la DB");
    }

    console.log("Servidor corriendo");
});

app.use(errorHandler);
