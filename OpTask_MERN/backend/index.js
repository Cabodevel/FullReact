import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";

const app = express();
dotenv.config();

connectDb();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
