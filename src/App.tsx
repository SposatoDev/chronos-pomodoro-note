import { Container } from "./components/Container/Container";
import { Logo } from "./components/Logo/Logo";
import { Menu } from "./components/Menu/Menu";

import "./styles/theme.css";
import "./styles/global.css";
import { CountDown } from "./components/CountDown/Count";
import { Forms } from "./components/Forms/Forms";

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <Forms />
      </Container>
    </>
  );
}
