import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container/Container";
import { DefaultButton } from "../../components/DefaultButton/DefaultButton";
import { Heading } from "../../components/Heading/Heading";
import { MainTemplate } from "../../templates/MainTemplates";

import styles from "./style.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { FormatTaskType } from "../../utils/FormatTaskType";

export function History() {
  const { state } = useTaskContext();

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
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {state.tasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{new Date(task.startDate).toISOString()}</td>
                      <td>{task.interruptDate}</td>
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
