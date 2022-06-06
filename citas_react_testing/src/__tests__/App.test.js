import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";
import userEvent from "@testing-library/user-event";

test("<App/> Add Schedule and verify heading", () => {
  render(<App />);
  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Carlos");
  userEvent.type(screen.getByTestId("fecha"), "2022-07-01");
  userEvent.type(screen.getByTestId("hora"), "20:00");
  userEvent.type(screen.getByTestId("sintomas"), "no duerme");

  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alert = screen.queryByTestId("alert");

  expect(alert).not.toBeInTheDocument();
});

test("<App />Verify schedule on DOM", async () => {
  render(<App />);

  const citas = await screen.findAllByTestId("cita");

  const deleteButton = screen.getByTestId("btn-eliminar");

  expect(deleteButton).toBeInTheDocument();
  expect(deleteButton.tagName).toBe("BUTTON");
  //   expect(citas).toMatchSnapshot();
});

test("<App />Delete schedule on DOM", async () => {
  render(<App />);
  const deleteButton = screen.getByTestId("btn-eliminar");
  userEvent.click(deleteButton);

  expect(deleteButton).not.toBeInTheDocument();
  expect(screen.queryByText("Hook")).not.toBeInTheDocument();
  expect(screen.queryByTestId("cita")).not.toBeInTheDocument();
});
