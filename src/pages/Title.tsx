import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import PasswordAlternative from "../components/PasswordAlternative";
import { useCount } from "../context/CountContext";
import styles from "../styles/Homepage.module.css";
import image from "/proSkater.jpg";

export const Title = () => {
  const pageId = 14;
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();
  const { count, setCount } = useCount();
  const [slideAnimation, setSlideAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const valeur = h2Ref.current ? h2Ref.current.textContent : "";
    if (event.key === "Enter") {
      if (valeur === "tonyhawk") {
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
    const interval = setInterval(() => {
      const valeur = h2Ref.current ? h2Ref.current.textContent : "";
      if (valeur === "TonyHawk") {
        const completed = JSON.parse(
          localStorage.getItem("completedPages") || "[]"
        );
        if (!completed.includes(pageId)) {
          setSlideAnimation(false);
          setIsPasswordCorrect(true);
        } else {
          setShowModal(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPasswordCorrect) {
      const completed = JSON.parse(
        localStorage.getItem("completedPages") || "[]"
      );
      if (!completed.includes(pageId)) {
        setCount((prev) => prev + 1);
        localStorage.setItem("count", (count + 1).toString());
        const updated = [...completed, pageId];
        localStorage.setItem("completedPages", JSON.stringify(updated));
      }
      setTimeout(() => {
        setSlideAnimation(true);
        navigate("/BeautyInside");
      }, 400);
    }
  }, [isPasswordCorrect]);

  return (
    <>
      <h2 className={styles.pageTitle} ref={h2Ref} id="PasswordHere">
        {" "}
      </h2>
      <div className={styles.container}>
        <Modal isOpen={showModal} link="/BeautyInside" />
        <PasswordAlternative
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          src={image}
          slideAnimation={slideAnimation}
          Disable={false}
          maxLength={0}
          isError={isError}
        />
      </div>
    </>
  );
};
