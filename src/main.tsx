import React from "react";
import ReactDOM from "react-dom/client";
import { App, Mood, MoodEntry, UseCases, makeStorage } from "./App.tsx";
import "./index.css";

const storage = makeStorage<MoodEntry>();
const useCases: UseCases = {
  addMood: async (data) => {
    return storage.add(data);
  },
  loadHistory: async () => {
    return Array.from(await storage.getFrom());
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App
      moods={[Mood.DISTRACTED, Mood.FULL_ENERGY, Mood.SLEEPY]}
      useCases={useCases}
    />
  </React.StrictMode>
);
