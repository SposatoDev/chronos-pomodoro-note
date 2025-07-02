import { Container } from "./components/Container/Container";
import { Logo } from "./components/Logo/Logo";
import { Menu } from "./components/Menu/Menu";
import { CountDown } from "./components/CountDown/Count";
import { Forms } from "./components/Forms/Forms";
import { Footer } from "./components/Footer/Footer";

import "./styles/theme.css";
import "./styles/global.css";

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
      <Container>
        <Footer />
      </Container>
    </>
  );
}
