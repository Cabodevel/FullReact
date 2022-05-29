import Usuario from "../models/Usuario.js";

const userExistsByEmail = async (email) => {
  const existingUser = await Usuario.findOne({ email });

  if (!existingUser) {
    const error = new Error("User does not exist");
    return {
      exists: false,
      errorMessage: error.message,
    };
  }

  return { exists: true, existingUser };
};

const userExistsByToken = async (token) => {
  const existingUser = await Usuario.findOne({ token });

  if (!existingUser) {
    const error = new Error("User does not exist");
    return {
      exists: false,
      errorMessage: error.message,
    };
  }

  return { exists: true, existingUser };
};

export { userExistsByEmail, userExistsByToken };
