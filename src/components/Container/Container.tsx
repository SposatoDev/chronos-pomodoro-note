//  Container tem a função de estruturar e organizar o layout da página.

import styles from "./Styles.module.css";

type ContainerChild = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerChild) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>{children}</section>
      </div>
    </div>
  );
}
