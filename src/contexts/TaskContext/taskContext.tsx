import { createContext } from "react";
import { initialState } from "./initialState";
import type { TaskStatemodel } from "../../models/TaskStateModel";
import type { TaskType } from "./actionType";

type TaskContextProps = {
  state: TaskStatemodel;
  dispatch: React.Dispatch<TaskType>;
};

const initialContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
