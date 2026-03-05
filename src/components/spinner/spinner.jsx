import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <div className={`${styles.loader} h-screen overflow-auto`}>Loading...</div>
  );
}

export default Spinner;
