import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu cuenta y administra tus
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
