import Usuario from "../models/Usuario.js";
import createId from "../helpers/createId.js";
import genJwt from "../helpers/jwtGen.js";

import {
  userExistsByToken,
  userExistsByEmail,
} from "../services/userService.js";

const registrar = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await userExistsByEmail(email);

    if (existingUser.exists) {
      return res
        .status(400)
        .json({ message: "El usuario ya existe", error: true });
    }

    const usuario = new Usuario(req.body);
    usuario.token = createId();

    await usuario.save();

    res.json({ message: "Usuario creado", error: false });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

const autenticar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userExistsByEmail(email);

    if (!findUser.exists) {
      return res.status(400).json({ message: existingUser.errorMessage });
    }

    const { existingUser } = findUser;

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

  const findUser = await userExistsByToken(token);

  if (!findUser.exists) {
    return res.status(400).json({ message: userConfirm.errorMessage });
  }

  const { userConfirm } = findUser;

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const findUser = await userExistsByEmail(email);

  if (!findUser.exists) {
    return res.status(400).json({ message: existingUser.errorMessage });
  }

  const { existingUser } = findUser;

  try {
    existingUser.token = createId();
    await existingUser.save();
    res.json({
      msg: "We've sent an email with instructions to reset your password",
    });
  } catch (error) {
    console.log(error);
  }
};

const forgotPasswordRecovery = async (req, res) => {
  const { token } = req.body;

  const findUser = await userExistsByToken(token);

  if (findUser.exists) {
    res.json({ msg: "Valid user and token" });
  } else {
    return res.status(404).json({ message: existingUser.errorMessage });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const findUser = await userExistsByToken(token);

  if (findUser.exists) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
      res.json({ msg: "Password changed!" });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).json({ message: existingUser.errorMessage });
  }
};

const profile = (req, res) => {
  return res.status(200).json({ usuario: req.usuario });
};

export {
  registrar,
  autenticar,
  confirmar,
  forgotPassword,
  forgotPasswordRecovery,
  newPassword,
  profile,
};
