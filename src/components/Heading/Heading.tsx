import styles from "./Styles.module.css";

type HeadingChild = {
  children: React.ReactNode;
};

export function Heading({ children }: HeadingChild) {
  return <h1 className={styles.heading}>{children}</h1>;
}
