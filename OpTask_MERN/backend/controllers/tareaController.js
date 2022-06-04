import Proyecto from "../models/Proyecto";
import Tarea from "../models/Tarea";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const proyectoExists = await Proyecto.findById(proyecto);

  if (!proyectoExists) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json(error);
  }

  if (proyectoExists.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Forbidden");
    return res.status(403).json(error);
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json(error);
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Forbidden");
    return res.status(403).json(error);
  }

  return res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json(error);
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Forbidden");
    return res.status(403).json(error);
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaActualizada = await tarea.save();
    return res.json(tareaActualizada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Not found");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Forbidden");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne();
    return res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
