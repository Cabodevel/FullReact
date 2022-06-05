import { useState, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert, { IAlert } from "../components/Alert";

function NewPassword() {
  const params = useParams();
  const { token } = params;
  const [alert, setAlert] = useState<IAlert | undefined>();
  const [isValidToken, setIsValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordChanged, setpasswordChanged] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/forgot-password/${token}`
        );

        const { error, message } = data;
        if (error) {
          setAlert({ error, message });
        }
        setIsValidToken(!error);
      } catch (error: any) {
        setAlert({ error: true, message: error.response.data.message });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({ message: "Password must be > 6 ", error: true });
      return;
    }

    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/usuarios/forgot-password/${token}`;
      const { data } = await axios.post(url, { password });

      const isSuccess = !data.error;
      setpasswordChanged(isSuccess);
      setIsValidToken(!isSuccess);

      setAlert(data);
    } catch (error: any) {
      setAlert({ error: true, message: error.response.data.message });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablecer password
      </h1>
      {alert && <Alert {...alert} />}
      {isValidToken && !alert && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
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
          <input
            type={"submit"}
            value="Guardar nuevo password"
            className="mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          ></input>
        </form>
      )}
      {passwordChanged && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  );
}

export default NewPassword;
