import { PlayCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useRef } from "react";
import type { Taskmodel } from "../../models/TaskModel";
import { GetNextCycle } from "../../utils/GetNextCycle";
import { GetNextType } from "../../utils/GetNextType";

import styles from "./Styles.module.css";
import { FormatSecondsToMinutes } from "../../utils/FormatSecondsToMinutes";

export function Forms() {
  const { state, setState } = useTaskContext();

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

    const secondsRemaining = newTask.duration * 60;

    console.log("newTask:", { ...newTask });

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: FormatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form">
        <div className={styles.formRow}>
          <DefaultInput
            id="meuInput"
            type="text"
            labelText="Task"
            ref={taskNameInput}
          />
        </div>

        <div className={styles.formRow}>
          <p>Próximo intervalo é de {state.config[nextType]} minutos.</p>
        </div>

        <div className={styles.formRow}>
          <Cycle />
        </div>

        <div className={styles.formRow}>
          <DefaultButton buttonType="submit" icon={<PlayCircleIcon />} />
        </div>
      </form>
    </>
  );
}
