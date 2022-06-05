import axiosClient from "../config/axiosClient";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Alert, { IAlert } from "../components/Alert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState<IAlert | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "") {
      setAlert({ message: "Email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/usuarios/forgot-password`, {
        email,
      });

      const { message, error } = data;
      setAlert({ message, error });
    } catch (error: any) {
      const { message } = error.response.data;
      setAlert({ message, error: true });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu cuenta y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>
      {alert && <Alert {...alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type={"email"}
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <input
          type={"submit"}
          value="Enviar instrucciones"
          className="mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        ></input>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Ya tengo una cuenta
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          Regístrate
        </Link>
      </nav>
    </>
  );
}

export default ForgotPassword;
