import type { Taskmodel } from "./TaskModel";

export type TaskStatemodel = {
  tasks: Taskmodel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: Taskmodel | null;
  isPaused: boolean;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
