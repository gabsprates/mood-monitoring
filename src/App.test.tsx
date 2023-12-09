import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("Component: App", () => {
  it("should render", () => {
    render(<App />);

    screen.debug();

    expect(document.querySelector("div")).toBeInTheDocument();
  });
});
