import { render, screen } from "@testing-library/react";
import { App, Mood, getMoodRepresentation, makeStorage } from "./App";

describe("Component: App", () => {
  it("should render", () => {
    render(<App />);

    screen.debug();

    expect(document.querySelector("div")).toBeInTheDocument();
  });
});

describe("Helper: getMoodRepresentation", () => {
  it("should return right color for each mood", () => {
    expect(getMoodRepresentation(Mood.DISTRACTED).color).toEqual("red");
    expect(getMoodRepresentation(Mood.FULL_ENERGY).color).toEqual("green");
    expect(getMoodRepresentation(Mood.SLEEPY).color).toEqual("blue");
  });
});
