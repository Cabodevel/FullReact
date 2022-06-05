import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, nombre, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "Uptask-admin <cuentas@uptask.com>",
    to: email,
    subject: "Uptask confirm account",
    text: "Confirm account",
    html: `
    <p>Hola : ${nombre}, verifica tu cuenta en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Verificar cuenta</a>
    `,
  });
};
