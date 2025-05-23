import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Password from "../components/Password";
import { useCount } from "../context/CountContext";
import styles from "../styles/CSS.module.css";
import { randomPassword } from "../utils/randomPassword";

export const CSS = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [slideAnimation, setSlideAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { setCount } = useCount();
  const [isError, setIsError] = useState(false);
  const pageId = 10;

  useEffect(() => {
    setIsPasswordCorrect(false);
    setPassword(randomPassword());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue === password) {
        const completed = JSON.parse(
          localStorage.getItem("completedPages") || "[]"
        );
        if (!completed.includes(pageId)) {
          setSlideAnimation(false);
          setIsPasswordCorrect(true);
        } else {
          setShowModal(true);
        }
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (isPasswordCorrect) {
      setCount((prev) => prev + 1);
      setTimeout(() => {
        setSlideAnimation(true);
        navigate("/Bug");
      }, 400);
    }
  }, [isPasswordCorrect]);

  return (
    <>
      <div className={styles.container}>
        <Modal isOpen={showModal} link="/Bug" />
        <Password
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          src="src/assets/images/key.png"
          slideAnimation={slideAnimation}
          isError={isError}
        />
      </div>
      <div className={styles.hidden}>{password}</div>
    </>
  );
};
