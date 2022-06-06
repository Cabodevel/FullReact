import { useState, useEffect, createContext, ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import { IAlert } from "../components/Alert";
import axiosClient from "../config/axiosClient";

export interface IProyecto {
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
}

interface IProyectosContext {
  proyectos: IProyecto[];
  submitProyecto: (proyecto: IProyecto) => void;
  showAlert: (alert: IAlert) => void;
  alert: IAlert | undefined;
}

const ProyectosContext = createContext<IProyectosContext>({
  proyectos: [],
  submitProyecto: (proyecto: IProyecto) => {},
  showAlert: (alert: IAlert) => {},
  alert: undefined,
});

interface IProyectosProviderComponent {
  children: ReactNode;
}

const ProyectosProvider: FC<IProyectosProviderComponent> = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alert, setAlert] = useState<IAlert | undefined>();
  const navigate = useNavigate();

  const showAlert = (alert: IAlert) => {
    setAlert(alert);

    setTimeout(() => setAlert(undefined), 3000);
  };

  const submitProyecto = async (proyecto: IProyecto) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/proyectos", proyecto, config);
      setAlert({ message: "Proyecto creado", error: false });

      setTimeout(() => {
        setAlert(undefined);
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProyectosContext.Provider
      value={{ proyectos, submitProyecto, showAlert, alert }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
