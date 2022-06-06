import { useState } from "react";

interface IProyecto {
  nombre: string;
  descripcion: string;
  fechaEntrega: Date;
  nombreCliente: string;
}

const FormularioProyecto = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    fechaEntrega: new Date(Date.now()),
    nombreCliente: "",
  };

  const [proyecto, setProyecto] = useState<IProyecto>(initialState);

  const handleChange = <P extends keyof IProyecto>(
    name: P,
    value: IProyecto[P]
  ) => {
    setProyecto({
      ...proyecto,
      [name]: value,
    });
  };

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
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
          onChange={(e) =>
            handleChange("fechaEntrega", new Date(e.target.value))
          }
        ></input>
      </div>
      <div>
        <label
          className="text.gray-700 uppercase font-bold text-sm"
          htmlFor="nombre-cliente"
        >
          Nombre proyecto
        </label>
        <input
          id="nombre-cliente"
          type={"text"}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del cliente"
          onChange={(e) => handleChange("nombreCliente", e.target.value)}
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
