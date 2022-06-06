import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test("<Formulario /> Load and works", () => {
  //   const wrapper = render(<Formulario />);
  //   wrapper.debug();

  render(<Formulario crearCita={crearCita} />);

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByTestId("title").tagName).toBe("H2");

  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
});

test("<Formulario /> Validation fails on empty fields", () => {
  render(<Formulario crearCita={crearCita} />);
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alert = screen.getByTestId("alert");
  expect(alert.textContent).toBe("Todos los campos son obligatorios");
});

test("<Formulario /> Validation works on valid fields", () => {
  render(<Formulario crearCita={crearCita} />);

  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Carlos");
  userEvent.type(screen.getByTestId("fecha"), "2022-07-01");
  userEvent.type(screen.getByTestId("hora"), "20:00");
  userEvent.type(screen.getByTestId("sintomas"), "no duerme");

  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alert = screen.queryByTestId("alert");

  expect(alert).not.toBeInTheDocument();

  expect(crearCita).toHaveBeenCalledTimes(1);
});
