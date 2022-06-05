import { useState, useEffect, createContext, ReactNode, FC } from "react";
import axiosClient from "../config/axiosClient";

interface IProyecto {}

interface IProyectosContext {
  proyectos: IProyecto[];
}

const ProyectosContext = createContext<IProyectosContext>({ proyectos: [] });

interface IProyectosProviderComponent {
  children: ReactNode;
}

const ProyectosProvider: FC<IProyectosProviderComponent> = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);

  return (
    <ProyectosContext.Provider value={{ proyectos }}>
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
