import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders task list heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Task List/i);
  expect(headingElement).toBeInTheDocument();
});
