import styles from "./Styles.module.css";
import type React from "react";

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: "green" | "red";
  buttonType: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & React.ComponentProps<"button">;

export function DefaultButton({
  icon,
  color = "green",
  buttonType,
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button
        type={buttonType}
        className={`${styles.button} ${styles[color]}`}
        {...props}
      >
        {icon}
      </button>
    </>
  );
}
