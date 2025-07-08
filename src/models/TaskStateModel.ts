import type { Taskmodel } from "./TaskModel";

export type TaskStatemodel = {
  tasks: Taskmodel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskStatemodel | null;
  currentCycle: number;
  config: {
    worktime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
