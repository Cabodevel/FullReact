import { FormEvent, useState } from "react";
import { IProyecto } from "../context/ProyectosProvider";
import useProyectos from "../hooks/useProyectos";
import Alert from "./Alert";

const FormularioProyecto = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    cliente: "",
  };

  const [proyecto, setProyecto] = useState(initialState);
  const { showAlert, alert, submitProyecto } = useProyectos();

  const handleChange = <P extends keyof IProyecto>(
    name: P,
    value: IProyecto[P]
  ) => {
    setProyecto({
      ...proyecto,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(proyecto);
    if (Object.values(proyecto).includes("")) {
      showAlert({ message: "Todos los campos son obligatorios", error: true });
      return;
    }

    await submitProyecto(proyecto);
    setProyecto(initialState);
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      {alert && <Alert {...alert} />}
      <div>
        <label
          className="text.gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre proyecto
        </label>
        <input
          id="nombre"
          type={"text"}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={proyecto.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        ></input>
      </div>
      <div>
        <label
          className="text.gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripcion proyecto
        </label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del proyecto"
          value={proyecto.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        ></textarea>
      </div>
      <div>
        <label
          className="text.gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha entrega
        </label>
        <input
          id="fecha-entrega"
          type={"date"}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={proyecto.fechaEntrega}
          onChange={(e) => handleChange("fechaEntrega", e.target.value)}
        ></input>
      </div>
      <div>
        <label
          className="text.gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Cliente
        </label>
        <input
          id="cliente"
          type={"text"}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del cliente"
          value={proyecto.cliente}
          onChange={(e) => handleChange("cliente", e.target.value)}
        ></input>
      </div>
      <input
        type={"submit"}
        value="Crear proyecto"
        className="bg-sky-600 w-full p-3 mt-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      ></input>
    </form>
  );
};

export default FormularioProyecto;
