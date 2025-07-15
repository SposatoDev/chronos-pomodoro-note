import { PlayCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import styles from "./Styles.module.css";
import { useState } from "react";

export function Forms() {
  const { state } = useTaskContext();

  const [taskName, setTaskName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form">
        <div className={styles.formRow}>
          <DefaultInput
            type="text"
            labeltext="Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
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
