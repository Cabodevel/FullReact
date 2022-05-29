import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = Usuario.find({ email });

    if (existingUser) return res.json({ msg: "User already exists" });

    const usuario = new Usuario(req.body);

    const usuarioGuardado = await usuario.save();

    res.json(usuarioGuardado);
  } catch (error) {}
  res.json({ error });
};

export { registrar };
