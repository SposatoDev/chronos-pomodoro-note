import { TaskContextProvider } from "./contexts/TaskContext/taskContextProvider";
import { MessagesContainer } from "./components/Container/MessagesContainer";
import { MainRouter } from "./routers/MainRouter";

import "./styles/theme.css";
import "./styles/global.css";

export function App() {
  return (
    <>
      <TaskContextProvider>
        <MessagesContainer>
          <MainRouter />
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}
