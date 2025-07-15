import { createContext, useContext, useState } from "react";
import type { TaskStatemodel } from "../../models/TaskStateModel";

type TaskContextProps = {
  state: TaskStatemodel;
  setState: React.Dispatch<React.SetStateAction<TaskStatemodel>>;
};

type TaskContextProviderProps = {
  children: React.ReactNode;
};

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

const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialState);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
