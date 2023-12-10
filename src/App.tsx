export enum Mood {
  DISTRACTED = "DISTRACTED",
  FULL_ENERGY = "FULL_ENERGY",
  SLEEPY = "SLEEPY",
}

export const getMoodRepresentation = (mood: Mood) => {
  const moods = {
    [Mood.DISTRACTED]: { symbol: "😒", label: "distracted" },
    [Mood.FULL_ENERGY]: { symbol: "😃", label: "full energy" },
    [Mood.SLEEPY]: { symbol: "😴", label: "sleepy" },
  };

  return moods[mood];
};

export interface MoodEntry {
  mood: Mood;
  timestamp: number;
}

export interface Storage<TData> {
  add: (data: TData) => Promise<number>;
  edit: (id: number, action: (currentData: TData) => TData) => Promise<void>;
  getFrom: (filter?: (item: TData) => boolean) => Promise<TData[]>;
}

export const makeStorage = <TData,>(): Storage<TData> => {
  const db: TData[] = [];

  return {
    add: async (data) => {
      return db.push(data) - 1;
    },
    edit: async (id, action) => {
      db[id] = action(db[id]);
    },
    getFrom: async (filter) => {
      if (!filter) return db;

      return db.filter(filter);
    },
  };
};

export interface UseCases {
  addMood: (data: MoodEntry) => Promise<number>;
  loadHistory: () => Promise<MoodEntry[]>;
}

interface AppProps {
  moods: Mood[];
  useCases: UseCases;
}

export const App = ({ moods, useCases }: AppProps) => {
  return (
    <main className="app">
      <h1 className="title">mood monitoring</h1>

      <ul className="mood-list">
        {moods.map((mood) => {
          const { label, symbol } = getMoodRepresentation(mood);

          const onClick = () => {
            useCases.addMood({ mood, timestamp: Date.now() });
          };

          return (
            <li key={mood} className="mood-item">
              <button
                onClick={onClick}
                className={`mood-button mood-button--${mood.toLowerCase()}`}
              >
                <span className="mood-button__symbol">{symbol}</span>
                <strong className="mood-button__name">{label}</strong>
              </button>
            </li>
          );
        })}
      </ul>

      {/*
      - TODO: add settings (reset, export)
      - TODO: add list view

      <div>
        <button className="button">view history</button>
        <button className="button">settings</button>
      </div>
      */}
    </main>
  );
};
