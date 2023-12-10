import { render, screen } from "@testing-library/react";
import { App, Mood, getMoodRepresentation, makeStorage } from "./App";

const mocked_moods = [Mood.DISTRACTED, Mood.FULL_ENERGY, Mood.SLEEPY];

describe("Component: App", () => {
  describe("rendering", () => {
    it("should render title", () => {
      render(<App moods={mocked_moods} />);

      expect(
        screen.getByRole("heading", { name: "mood monitoring" })
      ).toBeInTheDocument();
    });

    it("should render mood buttons", () => {
      render(<App moods={mocked_moods} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      expect(buttons[0]).toHaveTextContent("distracted");
      expect(buttons[1]).toHaveTextContent("full energy");
      expect(buttons[2]).toHaveTextContent("sleepy");
    });
  });
});

describe("Helper: getMoodRepresentation", () => {
  it("should return right color for each mood", () => {
    expect(getMoodRepresentation(Mood.DISTRACTED).label).toEqual("distracted");
    expect(getMoodRepresentation(Mood.FULL_ENERGY).label).toEqual(
      "full energy"
    );
    expect(getMoodRepresentation(Mood.SLEEPY).label).toEqual("sleepy");
  });
});

describe("Factory: makeStorage", () => {
  it("should give a valid storage", async () => {
    const storage = makeStorage<string>();

    expect(await storage.getFrom()).toEqual([]);

    await storage.add("foo");
    await storage.add("bar");

    expect(await storage.getFrom()).toEqual(["foo", "bar"]);

    await storage.edit(0, (data) => data.toUpperCase());

    const results = await storage.getFrom((item) => item === "FOO");
    expect(results).toEqual(["FOO"]);
  });
});
