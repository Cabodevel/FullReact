import Usuario from "../models/Usuario.js";
import createId from "../helpers/createId.js";
import genJwt from "../helpers/jwtGen.js";
import { emailRegister } from "../helpers/emails.js";

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

    emailRegister({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

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
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const { existingUser } = findUser;

    if (!existingUser.confirmado) {
      const error = new Error("El usuario no está confirmado");
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
      const error = new Error("Contraseña incorrecta");
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
    return res.status(400).json({ message: "User does not exist" });
  }

  const { existingUser } = findUser;

  try {
    existingUser.confirmado = true;
    existingUser.token = "";
    await existingUser.save();
    res.json({ message: "User confirmed" });
  } catch (error) {
    console.log(error);
  }
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

    // TODO send email

    return res.json({
      message: "We've sent an email with instructions to reset your password",
      error: false,
    });
  } catch (error) {
    return res.json({ message: error.message, error: true });
  }
};

const forgotPasswordRecovery = async (req, res) => {
  const { token } = req.params;

  const findUser = await userExistsByToken(token);

  if (findUser.exists) {
    res.json({ message: "Valid user and token", error: false });
  } else {
    return res
      .status(404)
      .json({ message: "User does not exist", error: true });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const findUser = await userExistsByToken(token);

  if (findUser.exists) {
    const { existingUser } = findUser;
    existingUser.password = password;
    existingUser.token = "";

    try {
      await existingUser.save();
      res.json({ message: "Password changed!", error: false });
    } catch (error) {
      return res.status(500).json({ message: error.message, error: true });
    }
  } else {
    return res
      .status(404)
      .json({ message: "User does not exist", error: true });
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
