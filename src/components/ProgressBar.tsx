import { useCount } from "../context/CountContext";
import styles from "../styles/ProgressBar.module.css";

export const ProgressBar = () => {
  const { count } = useCount();
  const countPercent = count !== 0 ? (count / 18) * 100 : 0;
  return (
    <section className={styles.progressBarContainer}>
      <p>{`Progression : ${countPercent.toFixed(0)}%`}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progression}
          style={
            { "--progressWidth": `${countPercent}%` } as React.CSSProperties
          }
        ></div>
      </div>
    </section>
  );
};
