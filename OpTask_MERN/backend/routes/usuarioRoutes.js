import express from "express";

import {
  autenticar,
  confirmar,
  forgotPassword,
  forgotPasswordRecovery,
  registrar,
} from "../controllers/usuarioController.js";

const router = express.Router();

//Auth
router.post("/", registrar);
router.post("/login", autenticar);

router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordRecovery);

router.get("/confirmar/:token", confirmar);

export default router;
