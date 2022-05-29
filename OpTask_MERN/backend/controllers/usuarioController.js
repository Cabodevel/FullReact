import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Usuario.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exist");
      return res.status(400).json({ message: error.message });
    }

    const usuario = new Usuario(req.body);

    const usuarioGuardado = await usuario.save();

    res.json(usuarioGuardado);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export { registrar };
