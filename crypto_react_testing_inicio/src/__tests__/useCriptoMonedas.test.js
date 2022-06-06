import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import userEvent from "@testing-library/user-event";
import { monedas, criptos } from "../__mocks__/cirptomonedas.mock";
import axios from "axios";

const mockAxios = axios;
const guardarMoneda = jest.fn();
const guardarCriptoMoneda = jest.fn();

test("<UseCriptomonedas />", async () => {
  //mock
  mockAxios.get = jest.fn().mockResolvedValue({
    data: criptos,
  });
  render(
    <Formulario
      guardarMoneda={guardarMoneda}
      guardarCriptomoneda={guardarCriptoMoneda}
    />
  );

  //verify select options
  const monedasDropdown = screen.getByTestId("select-monedas");

  expect(monedasDropdown.children.length).toBe(monedas.length + 1);

  //Get crypto currencies
  const opciones = screen.findAllByTestId("opcion-cripto");

  //currencies length
  expect(await opciones).toHaveLength(10);
  //axios get is called once
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  //change selects
  userEvent.selectOptions(screen.getByTestId("select-monedas"), "USD");
  userEvent.selectOptions(screen.getByTestId("select-criptos"), "BTC");

  //submit form
  userEvent.click(screen.getByTestId("submit"));

  expect(guardarMoneda).toHaveBeenCalledTimes(1);
  expect(guardarCriptoMoneda).toHaveBeenCalledTimes(1);
});
