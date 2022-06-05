import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, nombre, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b5b248bde66873",
      pass: "139fa4a7df7c2a",
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
