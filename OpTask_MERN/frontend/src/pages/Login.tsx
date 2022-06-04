import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
