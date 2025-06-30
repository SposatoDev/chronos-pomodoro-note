import styles from "./Styles.module.css";

import type React from "react";

type DefaultInputProps = {
  labeltext: string;
} & React.ComponentProps<"input">;

export function DefaultInput({ type, labeltext }: DefaultInputProps) {
  return (
    <>
      <label htmlFor="">{labeltext}</label>
      <input
        className={styles.input}
        type={type}
        placeholder="Digite algo"
        id="meuInput"
      />
    </>
  );
}
