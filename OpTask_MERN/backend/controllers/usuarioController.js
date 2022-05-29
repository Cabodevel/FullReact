import Usuario from "../models/Usuario.js";
import createId from "../helpers/createId.js";
import genJwt from "../helpers/jwtGen.js";

const registrar = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Usuario.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exist");
      return res.status(400).json({ message: error.message });
    }

    const usuario = new Usuario(req.body);
    usuario.token = createId();

    const usuarioGuardado = await usuario.save();

    res.json(usuarioGuardado);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const autenticar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Usuario.findOne({ email });

    if (!existingUser) {
      const error = new Error("User does not exist");
      return res.status(400).json({ message: error.message });
    }

    if (!existingUser.confirmado) {
      const error = new Error("User is not confirmed");
      return res.status(400).json({ message: error.message });
    }

    const rightPassword = await existingUser.comprobarPassword(password);

    if (rightPassword) {
      res.json({
        _id: existingUser._id,
        nombre: existingUser.nombre,
        email: existingUser.email,
        token: genJwt(existingUser._id),
      });
    } else {
      const error = new Error("Incorrect password");
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const userConfirm = await Usuario.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Invalid token");
    return res.status(400).json({ message: error.message });
  }

  try {
    userConfirm.confirmado = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User confirmed" });
  } catch (error) {
    console.log(error);
  }

  res.json({
    token,
  });
};

export { registrar, autenticar, confirmar };
