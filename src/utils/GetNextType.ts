import type { Taskmodel } from "../models/TaskModel";

export function GetNextType(currentCycle: number): Taskmodel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  else return "workTime";
}
