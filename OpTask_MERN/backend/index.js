import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express();
app.use(express.json());

dotenv.config({ path: "variables.env" });

connectDb();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors Error"));
    }
  },
};

app.use(cors(corsOptions));

//routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
