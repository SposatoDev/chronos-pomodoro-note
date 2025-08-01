import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RouterLink } from "../RouterLink";

import styles from "./Styles.module.css";

export function Menu() {
  type AvailableThemes = "dark" | "light";

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem("theme") as
      | AvailableThemes
      | "dark";
    return storageTheme;
  });
  // useState utilizado para criar e controlar um estado dentro de um componente
  // [Armazena o valor atual, function para atualizar esse valor]

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme((prevTheme) => {
      const nextTheme = prevTheme == "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("Data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // Executa o useEffect apenas quando o theme muda.

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Home"
        title="Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history/"
        aria-label="History"
        title="History"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings/"
        aria-label="Settings"
        title="Settings"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Theme"
        title="Theme"
        onClick={handleClick}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
