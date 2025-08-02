import type { Taskmodel } from "../../models/TaskModel";

export enum TaskActionType {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  PAUSE_TASK = "PAUSE_TASK",
  RESET_TASK = "RESET_TASK",
  COUNT_DOWN = "COUNT_DOWN",
  COMPLETE_TASK = "COMPLETE_TASK",
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
    }
  | {
      type: TaskActionType.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActionType.COMPLETE_TASK;
    }
  | {
      type: TaskActionType.PAUSE_TASK;
    };
