import { createContext } from "react";
import { initialState } from "./initialState";
import type { TaskStatemodel } from "../../models/TaskStateModel";

type TaskContextProps = {
  state: TaskStatemodel;
  setState: React.Dispatch<React.SetStateAction<TaskStatemodel>>;
};

const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
