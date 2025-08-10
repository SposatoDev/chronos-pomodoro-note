import { Container } from "../../components/Container/Container";
import { Heading } from "../../components/Heading/Heading";
import { MainTemplate } from "../../templates/MainTemplates";

import FormStyle from "../../components/Forms/Styles.module.css";
import { DefaultInput } from "../../components/DefaultInput/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton/DefaultButton";
import { SaveIcon } from "lucide-react";

export function Settings() {
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
        <form action="" className={FormStyle.form}>
          <div className={FormStyle.formRow}>
            <DefaultInput id="workTime" labelText="Foco" />
          </div>
          <div className={FormStyle.formRow}>
            <DefaultInput id="shortBreakTime" labelText="Descanso curto" />
          </div>
          <div className={FormStyle.formRow}>
            <DefaultInput id="longBreakTime" labelText="Descanso longo" />
          </div>
          <div className={FormStyle.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              buttonType="button"
              aria-label="Salvar configurações"
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
