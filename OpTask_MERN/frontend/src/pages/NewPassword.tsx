import { useState, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert, { IAlert } from "../components/Alert";

function NewPassword() {
  const params = useParams();
  console.log(params);
  const { token } = params;
  const [alert, setAlert] = useState<IAlert | undefined>();
  const [isValidToken, setIsValidToken] = useState(false);
  const [password, setPassword] = useState("");

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
          return;
        }
        setIsValidToken(true);
      } catch (error: any) {
        setAlert({ error: true, message: error.message });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablecer password
      </h1>
      {isValidToken ? (
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
      ) : (
        alert && <Alert {...alert} />
      )}
    </>
  );
}

export default NewPassword;
