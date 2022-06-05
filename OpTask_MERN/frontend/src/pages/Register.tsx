import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Alert, { IAlert } from "../components/Alert";
import axiosClient from "../config/axiosClient";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alert, setAlert] = useState<IAlert | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlert({ message: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlert({ message: "Los passwords no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlert({ message: "Password mínimo 6 caracteres", error: true });
      return;
    }

    setAlert(undefined);

    try {
      const { data } = await axiosClient.post(`/usuarios`, {
        nombre,
        password,
        email,
      });
      setAlert(data);
      resetForm();
    } catch (err: any) {
      const { message, error } = err.response.data;
      setAlert({
        message,
        error,
      });
    }
  };

  const resetForm = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setRepetirPassword("");
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus
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
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type={"text"}
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={"password"}
            id="password"
            placeholder="Tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="passwordRepeat"
          >
            Repetir Password
          </label>
          <input
            type={"password"}
            id="passwordRepeat"
            placeholder="Repite password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          ></input>
        </div>
        <input
          type={"submit"}
          value="Registrar"
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
          to="/forgot-password"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
}

export default Register;
