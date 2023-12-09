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

describe("Factory: makeStorage", () => {
  it("should give a valid storage", () => {
    const storage = makeStorage<string>();

    expect(storage.getFrom()).toEqual([]);

    storage.add("foo");
    storage.add("bar");

    expect(storage.getFrom()).toEqual(["foo", "bar"]);

    storage.edit(0, "FOO");

    expect(storage.getFrom((item) => item === "FOO")).toEqual(["FOO"]);
  });
});
