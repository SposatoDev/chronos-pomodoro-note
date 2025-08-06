import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container/Container";
import { DefaultButton } from "../../components/DefaultButton/DefaultButton";
import { Heading } from "../../components/Heading/Heading";
import { MainTemplate } from "../../templates/MainTemplates";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { FormatTaskType } from "../../utils/FormatTaskType";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { useState } from "react";
import { orderBy } from "lodash";

import styles from "./style.module.css";

export function History() {
  const { state } = useTaskContext();

  type sortConfigsProps = {
    key: string;
    order: "asc" | "desc";
  };

  const [sortConfig, setSortConfig] = useState<sortConfigsProps>({
    key: "startDate",
    order: "desc",
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (key === "startDate" || key === "duration") {
        return {
          key,
          order: prev.key === key && prev.order === "desc" ? "asc" : "desc",
        };
      }
      return {
        key,
        order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
      };
    });
  };

  const sortedTasks = orderBy(
    state.tasks,
    [sortConfig.key],
    [sortConfig.order]
  );

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>History</span>
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                buttonType="button"
                color="red"
                aria-label="Apagar histórico"
                title="Apagar histórico"
              />
            </span>
          </Heading>
        </Container>

        <Container>
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() => handleSort("duration")}
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() => handleSort("startDate")}
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>
                        {getTaskStatus(task, state.activeTask, state.isPaused)}
                      </td>
                      <td>{FormatTaskType(task.type)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </MainTemplate>
    </>
  );
}
