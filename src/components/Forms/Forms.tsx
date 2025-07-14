import { PlayCircleIcon } from "lucide-react";
import { Cycle } from "../Cycles/Cycle";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { DefaultInput } from "../DefaultInput/DefaultInput";

import styles from "./Styles.module.css";

export function Forms() {
  return (
    <>
      <form action="" className="form">
        <div className={styles.formRow}>
          <DefaultInput type="text" labeltext="Task" />
        </div>
      </form>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <Cycle />
      </div>

      <div className={styles.formRow}>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </>
  );
}
