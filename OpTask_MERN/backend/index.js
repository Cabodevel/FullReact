import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json());

dotenv.config({ path: "variables.env" });

connectDb();

//routes
app.use("/api/usuarios", usuarioRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
