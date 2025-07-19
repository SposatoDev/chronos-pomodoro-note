import type { Taskmodel } from "./TaskModel";

export type TaskStatemodel = {
  tasks: Taskmodel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: Taskmodel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
