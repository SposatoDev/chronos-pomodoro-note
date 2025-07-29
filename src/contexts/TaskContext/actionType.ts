import type { Taskmodel } from "../../models/TaskModel";

export enum TaskActionType {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  RESET_TASK = "RESET_TASK",
}

export type TaskType =
  | {
      type: TaskActionType.START_TASK;
      payload: Taskmodel;
    }
  | {
      type: TaskActionType.INTERRUPT_TASK;
    }
  | {
      type: TaskActionType.RESET_TASK;
    };
