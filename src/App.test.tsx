import React from "react";
import { render } from "@testing-library/react"
import App from "./App"

test("renders the landing page", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("App")).toBeDefined
})