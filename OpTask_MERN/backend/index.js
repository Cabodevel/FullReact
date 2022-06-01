import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";

const app = express();
app.use(express.json());

dotenv.config({ path: "variables.env" });

connectDb();

//routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
