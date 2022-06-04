function NewPassword() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablecer password
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          value="Guardar nuevo password"
          className="mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        ></input>
      </form>
    </>
  );
}

export default NewPassword;
