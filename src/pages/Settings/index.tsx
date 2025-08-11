import { Container } from "../../components/Container/Container";
import { Heading } from "../../components/Heading/Heading";
import { MainTemplate } from "../../templates/MainTemplates";
import { DefaultInput } from "../../components/DefaultInput/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton/DefaultButton";
import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import FormStyle from "../../components/Forms/Styles.module.css";
import { TaskActionType } from "../../contexts/TaskContext/actionType";
import { messages } from "../../components/adapters/messages";

export function Settings() {
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortTimeInput = useRef<HTMLInputElement>(null);
  const longTimeInput = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useTaskContext();

  function handleSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    messages.dismiss();

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortTimeInput.current?.value);
    const longBreakTime = Number(longTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      messages.error("Digite apenas números!");
      return;
    }

    if (workTime < 1 || workTime > 99) {
      messages.error("Digite números entre 1 e 99");
      return;
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      messages.error("Digite números entre 1 e 30");
      return;
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      messages.error("Digite números entre 1 e 60");
      return;
    }

    dispatch({
      type: TaskActionType.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    messages.success("Configurações salvas");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as Configurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSettings} action="" className={FormStyle.form}>
          <div className={FormStyle.formRow}>
            <DefaultInput
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>

          <div className={FormStyle.formRow}>
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortTimeInput}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>

          <div className={FormStyle.formRow}>
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longTimeInput}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>

          <div className={FormStyle.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              buttonType="submit"
              aria-label="Salvar configurações"
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
