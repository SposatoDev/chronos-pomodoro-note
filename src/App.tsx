import { Home } from "./pages/Home";
import type { TaskStatemodel } from "./models/TaskStateModel";
import { useState } from "react";

import "./styles/theme.css";
import "./styles/global.css";

const initialState: TaskStatemodel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    worktime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

export function App() {
  const [state, setState] = useState(initialState);

  return (
    <>
      <Home state={state} setState={setState} />
    </>
  );
}
