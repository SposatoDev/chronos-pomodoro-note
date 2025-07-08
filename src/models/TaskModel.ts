import type { TaskStatemodel } from "./TaskStateModel";

export type Taskmodel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStatemodel["config"];
};
