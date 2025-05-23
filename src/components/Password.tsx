import styles from "../styles/Password.module.css";

type PasswordProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  src: string;
  slideAnimation: boolean;
  isError?: boolean;
};

function password({
  value,
  onChange,
  onKeyDown,
  src,
  slideAnimation,
  isError,
}: PasswordProps) {
  return (
    <>
      <div className={slideAnimation ? styles.container : styles.containerOut}>
        <img src={src} alt="clue" className={styles.clue} />
        <div className={styles.passwordContainer}>
          <h2>PASSWORD</h2>
          <input
            type="password"
            placeholder="Enter password"
            className={`${styles.password} ${isError ? styles.error : ""}`}
            maxLength={14}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </>
  );
}

export default password;
