import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../../pages/Home";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";
import { useEffect } from "react";
import { History } from "../../pages/History";
import { Settings } from "../../pages/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-pomodoro" element={<AboutPomodoro />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
