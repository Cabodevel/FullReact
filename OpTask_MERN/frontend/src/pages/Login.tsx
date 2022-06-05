import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert, { IAlert } from "../components/Alert";
import axiosClient from "../config/axiosClient";

interface Login {
  email: string;
  password: string;
}

function Login() {
  const defaultLogin = {
    email: "",
    password: "",
  };

  const [loginData, setloginData] = useState(defaultLogin);
  const [alert, setAlert] = useState<IAlert | undefined>();

  const handleChange = <P extends keyof Login>(name: P, value: Login[P]) => {
    setloginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if ([loginData.email, loginData.password].includes("")) {
      setAlert({ message: "Todos los campos son obligatorios", error: true });
      return;
    }

    try {
      const { data } = await axiosClient.post("/usuarios/login", {
        ...loginData,
      });

      if (data.token) {
        setAlert(undefined);
        localStorage.setItem("token", data.token);
      }
    } catch (error: any) {
      setAlert({ message: error.response.data.message, error: true });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus
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
            value={loginData.email}
            onChange={(e) => handleChange("email", e.target.value)}
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
            value={loginData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          ></input>
        </div>
        <input
          type={"submit"}
          value="Iniciar sesión"
          className="mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        ></input>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="register"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="forgot-password"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
}

export default Login;
