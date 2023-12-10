import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  App,
  Mood,
  MoodEntry,
  getMoodRepresentation,
  makeStorage,
} from "./App";

const mocked_moods = [Mood.DISTRACTED, Mood.FULL_ENERGY, Mood.SLEEPY];

const mockUseCases = () => {
  const storage = makeStorage<MoodEntry>();

  return {
    addMood: vi.fn((mood) => storage.add(mood)),
    loadHistory: vi.fn(() => storage.getFrom()),
  };
};

describe("Component: App", () => {
  const waitLoadingToFinish = async () => {
    await waitForElementToBeRemoved(screen.getByText(/loading/i));
  };

  describe("rendering", () => {
    it("should render title", async () => {
      render(<App moods={mocked_moods} useCases={mockUseCases()} />);

      await waitLoadingToFinish();

      expect(
        screen.getByRole("heading", { name: "mood monitoring" })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: "mood history" })
      ).toBeInTheDocument();
    });

    it("should render mood buttons", async () => {
      render(<App moods={mocked_moods} useCases={mockUseCases()} />);

      await waitLoadingToFinish();

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      expect(buttons[0]).toHaveTextContent("distracted");
      expect(buttons[1]).toHaveTextContent("full energy");
      expect(buttons[2]).toHaveTextContent("sleepy");
    });
  });

  describe("use cases", () => {
    it("should load moods on first render", async () => {
      const mocked_useCases = mockUseCases();
      await mocked_useCases.addMood({
        mood: Mood.FULL_ENERGY,
        timestamp: Date.now(),
      });

      render(<App moods={mocked_moods} useCases={mocked_useCases} />);

      const moodList = await screen.findByRole("list", {
        name: "mood history",
      });

      const items = within(moodList).getAllByRole("listitem");

      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent(/full_energy/i);
    });

    it("should add mood", async () => {
      const user = userEvent.setup();

      const mocked_useCases = mockUseCases();
      render(<App moods={mocked_moods} useCases={mocked_useCases} />);

      await waitLoadingToFinish();

      const distractedButton = screen.getByRole("button", {
        name: /distracted/i,
      });

      await user.click(distractedButton);

      expect(mocked_useCases.addMood).toHaveBeenLastCalledWith({
        mood: Mood.DISTRACTED,
        timestamp: expect.any(Number),
      });
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
