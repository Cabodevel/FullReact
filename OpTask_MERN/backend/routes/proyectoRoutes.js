import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";

const router = express.Router();

router.post("/", checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
