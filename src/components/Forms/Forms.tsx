import { PlayCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useRef } from "react";
import type { Taskmodel } from "../../models/TaskModel";

import styles from "./Styles.module.css";

export function Forms() {
  const { state, setState } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current == null) return;

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
      duration: 1,
      type: "worktime",
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: 1,
        secondsRemaining,
        formattedSecondsRemaining: "00:00",
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form">
        <div className={styles.formRow}>
          <DefaultInput type="text" labeltext="Task" ref={taskNameInput} />
        </div>

        <div className={styles.formRow}>
          <p>Lorem ipsum dolor sit {state.config.worktime} amet.</p>
        </div>

        <div className={styles.formRow}>
          <Cycle />
        </div>

        <div className={styles.formRow}>
          <DefaultButton icon={<PlayCircleIcon />} />
        </div>
      </form>
    </>
  );
}
