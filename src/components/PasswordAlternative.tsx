import styles from "../styles/Password.module.css";

type PasswordProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  src: string;
  slideAnimation: boolean;
  Disable?: boolean;
  maxLength: number;
  isError?: boolean;
};

function passwordAlternative({
  value,
  onChange,
  onKeyDown,
  src,
  slideAnimation,
  Disable,
  maxLength,
  isError,
}: PasswordProps) {
  return (
    <>
      <div className={slideAnimation ? styles.container : styles.containerOut}>
        <img src={src} alt="clue" className={styles.clue} />
        <div className={styles.passwordContainer}>
          <h2>PASSWORD</h2>
          <input
            disabled={Disable}
            type="password"
            placeholder="Enter password"
            className={`${styles.password} ${isError ? styles.error : ""}`}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </>
  );
}

export default passwordAlternative;
