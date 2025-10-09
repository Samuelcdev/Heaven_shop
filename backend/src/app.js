import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import "./models/associations.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Servidor Corriendo exitosamente");
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion con la DB exitosa");
    } catch (error) {
        console.log("Algo fallo en la conexion a la DB", error);
    }
};

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

