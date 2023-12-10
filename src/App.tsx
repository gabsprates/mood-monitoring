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

interface AppProps {
  moods: Mood[];
}

export const App = ({ moods }: AppProps) => {
  return (
    <main className="app">
      <h1 className="title">mood monitoring</h1>

      <ul className="mood-list">
        {moods.map((mood) => {
          const { label, symbol } = getMoodRepresentation(mood);

          return (
            <li key={mood} className="mood-item">
              <button
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
