import express from "express";

import { registrar } from "../controllers/usuarioController.js";

const router = express.Router();

//Auth
router.post("/", registrar);

export default router;
