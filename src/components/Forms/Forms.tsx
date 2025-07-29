import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useRef } from "react";
import type { Taskmodel } from "../../models/TaskModel";
import { GetNextCycle } from "../../utils/GetNextCycle";
import { GetNextType } from "../../utils/GetNextType";
import { TaskActionType } from "../../contexts/TaskContext/actionType";

import styles from "./Styles.module.css";

export function Forms() {
  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = GetNextCycle(state.currentCycle);

  const nextType = GetNextType(nextCycle);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Digite o nome da tarefa");
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

    console.log("newTask:", { ...newTask });

    dispatch({ type: TaskActionType.START_TASK, payload: newTask });
  }

  function handleInterrupt() {
    dispatch({ type: TaskActionType.INTERRUPT_TASK });
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
          />
        </div>

        <div className={styles.formRow}>
          <p>Próximo intervalo é de {state.config[nextType]} minutos.</p>
        </div>

        {state.currentCycle > 0 && (
          <div className={styles.formRow}>
            <Cycle />
          </div>
        )}

        <div className={styles.formRow}>
          {!state.activeTask ? (
            <DefaultButton
              aria-label="Iniciar uma nova tarefa"
              title="Iniciar uma nova tarefa"
              buttonType="submit"
              icon={<PlayCircleIcon />}
              key="submit"
            />
          ) : (
            <DefaultButton
              aria-label="Interromper tarefa"
              title="Interromper tarefa"
              buttonType="button"
              color="red"
              icon={<StopCircleIcon />}
              onClick={handleInterrupt}
              key="interrupt"
            />
          )}
        </div>
      </form>
    </>
  );
}
