import { PauseCircleIcon, PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useRef } from "react";
import type { Taskmodel } from "../../models/TaskModel";
import { GetNextCycle } from "../../utils/GetNextCycle";
import { GetNextType } from "../../utils/GetNextType";
import { TaskActionType } from "../../contexts/TaskContext/actionType";
import { messages } from "../adapters/messages";

import styles from "./Styles.module.css";

export function Forms() {
  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = GetNextCycle(state.currentCycle);

  const nextType = GetNextType(nextCycle);

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      messages.warning("Digite o nome da tarefa");
      return;
    }

    const newTask: Taskmodel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextType],
      type: nextType,
    };

    if (!state.isPaused && !state.activeTask) {
      dispatch({ type: TaskActionType.START_TASK, payload: newTask });

      messages.dismiss();
      messages.success("Tarefa iniciada");
    }

    if (state.isPaused && state.activeTask) {
      dispatch({ type: TaskActionType.RESUME_TASK });
      messages.dismiss();
      messages.success("Retomando tarefa");
    }
  }

  function handleInterrupt() {
    dispatch({ type: TaskActionType.INTERRUPT_TASK });
    messages.dismiss();
    messages.error("Tarefa interrompida");
  }

  function handlePause() {
    dispatch({ type: TaskActionType.PAUSE_TASK });
    messages.dismiss();
    messages.info("Tarefa pausada");
  }

  function handleMessage(child: Taskmodel["type"]) {
    switch (child) {
      case "workTime":
        return <span>Foque por {state.config.workTime}min</span>;
      case "shortBreakTime":
        return <span>Descanse por {state.config.shortBreakTime}min</span>;
      case "longBreakTime":
        return <span>Próximo descanso será longo</span>;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form">
        <div className={styles.formRow}>
          <DefaultInput
            id="meuInput"
            type="text"
            labelText="Task"
            placeholder="Digite algo"
            ref={taskNameInput}
            disabled={!!state.activeTask}
            defaultValue={lastTaskName}
          />
        </div>

        <div className={styles.formRow}>
          {!state.activeTask && (
            <p>Próximo intervalo é de {state.config[nextType]} minutos.</p>
          )}
          {!!state.activeTask && handleMessage(state.activeTask.type)}
        </div>

        {state.currentCycle > 0 && (
          <div className={styles.formRow}>
            <Cycle />
          </div>
        )}

        <div className={styles.formRow}>
          {!state.activeTask || state.isPaused ? (
            <DefaultButton
              aria-label="Iniciar uma nova tarefa"
              title="Iniciar uma nova tarefa"
              buttonType="submit"
              icon={<PlayCircleIcon />}
              key="submit"
            />
          ) : (
            <div style={{ display: "flex", gap: "2.4rem" }}>
              <DefaultButton
                aria-label="Interromper tarefa"
                title="Interromper tarefa"
                buttonType="button"
                color="red"
                icon={<StopCircleIcon />}
                onClick={handleInterrupt}
                key="interrupt"
              />

              <DefaultButton
                aria-label="Pausar tarefa"
                title="Pausar tarefa"
                buttonType="button"
                color="blue"
                icon={<PauseCircleIcon />}
                onClick={handlePause}
                key="pause"
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
