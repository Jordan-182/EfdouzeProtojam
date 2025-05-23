import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import dogeKing from "../../public/dogeKing.webp";
import styles from "../styles/Final.module.css";

export const Final = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <img src={dogeKing} alt="WELL DONE KING" className={styles.doge} />
      <h2 className={styles.wow}>WOW</h2>
      <h2 className={styles.gpt}>BETTER THAN CHATGPT</h2>
      <h2 className={styles.such}>SUCH CODING SKILLZ</h2>
      <Confetti
        width={width}
        height={height}
        gravity={0.05}
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />
      <div className={styles.pyro}>
        <div className={styles.before}></div>
        <div className={styles.after}></div>
      </div>
    </>
  );
};
