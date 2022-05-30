import express from "express";
import {
  autenticar,
  confirmar,
  forgotPassword,
  forgotPasswordRecovery,
  registrar,
  profile,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Auth
router.post("/", registrar);
router.post("/login", autenticar);

router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordRecovery);
router.post("/forgot-password/:token", newPassword);
router.get("/confirmar/:token", confirmar);
router, get("/profile", checkAuth, profile);

export default router;
