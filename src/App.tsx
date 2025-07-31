import { Home } from "./pages/Home";
import { TaskContextProvider } from "./contexts/TaskContext/taskContextProvider";
import { MessagesContainer } from "./components/Container/MessagesContainer";

import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";
import "./styles/global.css";

export function App() {
  return (
    <>
      <TaskContextProvider>
        <MessagesContainer>
          <Home />
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}
