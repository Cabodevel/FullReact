import Jwt from "jsonwebtoken";

const genJwt = (id) => {
  return Jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "24h",
  });
};

export default genJwt;
