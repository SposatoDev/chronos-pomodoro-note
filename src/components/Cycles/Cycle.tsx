import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { GetNextCycle } from "../../utils/GetNextCycle";
import { GetNextType } from "../../utils/GetNextType";
import styles from "./Styles.module.css";

export function Cycle() {
  const { state } = useTaskContext();

  const countCycle = Array.from({ length: state.currentCycle });

  const cycleDescription = {
    workTime: "foco",
    shortBreakTime: "descanso curto",
    longBreakTime: "descanso longo",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {countCycle.map((_, index) => {
          const NextCycle = GetNextCycle(index);
          const NextType = GetNextType(NextCycle);

          return (
            <span
              key={NextCycle}
              className={`${styles.cycleDot} ${styles[NextType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescription[NextType]}`}
              title={`Indicador de ciclo de ${cycleDescription[NextType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
