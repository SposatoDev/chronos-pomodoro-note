import { useEffect, useReducer, useRef } from "react";
import { initialState } from "./initialState";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionType } from "./actionType";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStatemodel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState, () => {
    // Será utilizado para armazenar as tasks que foram abandonadas para notificar no histórico.
    const storageState = localStorage.getItem("state");

    if (storageState == null) return initialState;

    const parsedStorageState = JSON.parse(storageState) as TaskStatemodel; // Tenta converter o estado armazenado no navegador de string para o tipo modelo do estado.

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;

    if (countDownSeconds === 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionType.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionType.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));

    if (!state.activeTask) {
      console.log("Nenhuma task ativa, encerrando worker.");
      worker.terminate();
    }

    if (state.isPaused) {
      console.log("Pausar task");
      worker.postMessage({ type: "PAUSE" });
    }

    if (!state.isPaused && state.activeTask) {
      worker.postMessage({ type: "RESUME" });
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos`;

    worker.postMessage(state);
  }, [worker, state, state.isPaused]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
