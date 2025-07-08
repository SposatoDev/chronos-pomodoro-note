import { Container } from "../../components/Container/Container";
import { CountDown } from "../../components/CountDown/Count";
import { Forms } from "../../components/Forms/Forms";
import { MainTemplate } from "../../templates/MainTemplates";

export function Home() {
  return (
    <>
      <MainTemplate>
        <Container>
          <CountDown />
        </Container>

        <Container>
          <Forms />
        </Container>
      </MainTemplate>
    </>
  );
}
