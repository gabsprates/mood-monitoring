export enum Mood {
  DISTRACTED = "DISTRACTED",
  FULL_ENERGY = "FULL_ENERGY",
  SLEEPY = "SLEEPY",
}

export const getMoodRepresentation = (mood: Mood) => {
  const moods = {
    [Mood.DISTRACTED]: { color: "red", symbol: "😒" },
    [Mood.FULL_ENERGY]: { color: "green", symbol: "😃" },
    [Mood.SLEEPY]: { color: "blue", symbol: "😴" },
  };

  return moods[mood];
};

export const App = () => null;
