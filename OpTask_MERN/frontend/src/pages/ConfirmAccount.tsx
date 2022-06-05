import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert, { IAlert } from "../components/Alert";
import axiosClient from "../config/axiosClient";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState<IAlert | undefined>();
  const [confirmedAccount, setConfirmedAccount] = useState<boolean>(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/usuarios/confirmar/${token}`;

        const { data } = await axiosClient.get(url);
        setAlert({ message: data.message, error: false });
        setConfirmedAccount(true);
      } catch (error: any) {
        console.log(error);
        const { message } = error.response.data;
        setAlert({ message, error: true });
        setConfirmedAccount(false);
      }
    };

    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirmar cuenta
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert && <Alert {...alert} />}
        {confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
