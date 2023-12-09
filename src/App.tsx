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

export const makeStorage = <TData,>() => {
  const db: TData[] = [];

  return {
    add: (data: TData) => {
      db.push(data);
    },
    edit: (id: number, data: TData) => {
      db[id] = data;
    },
    getFrom: (filter?: (item: TData) => boolean) => {
      if (!filter) return db;

      return db.filter(filter);
    },
  };
};

export const App = () => null;
