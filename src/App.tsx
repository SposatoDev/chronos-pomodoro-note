import { Home } from "./pages/Home";
import { AboutPomodoro } from "./pages/AboutPomodoro";
import { TaskContextProvider } from "./contexts/TaskContext/taskContextProvider";
import { MessagesContainer } from "./components/Container/MessagesContainer";
import { BrowserRouter, Routes, Route } from "react-router";

import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";
import "./styles/global.css";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <>
      <TaskContextProvider>
        <MessagesContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-pomodoro/" element={<AboutPomodoro />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}
