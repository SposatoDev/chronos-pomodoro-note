import type { TaskStatemodel } from "../../models/TaskStateModel";
import { TaskActionType, type TaskType } from "./actionType";
import { GetNextCycle } from "../../utils/GetNextCycle";
import { FormatSecondsToMinutes } from "../../utils/FormatSecondsToMinutes";

export function taskReducer(state: TaskStatemodel, action: TaskType) {
  switch (action.type) {
    case TaskActionType.START_TASK: {
      const newTask = action.payload;
      const nextCycle = GetNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: FormatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionType.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionType.RESET_TASK: {
      return state;
    }
    case TaskActionType.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: FormatSecondsToMinutes(
          action.payload.secondsRemaining
        ),
      };
    }
    case TaskActionType.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
  }

  return state;
}
