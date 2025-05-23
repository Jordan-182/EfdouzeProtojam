import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Password from "../components/Password";
import { useCount } from "../context/CountContext";
import styles from "../styles/Over.module.css";
import { randomPassword } from "../utils/randomPassword";
import image from "/hover.jpg";

export const Over = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { count, setCount } = useCount();
  const [password, setPassword] = useState("");
  const [slideAnimation, setSlideAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const pageId = 2;
  const [isError, setIsError] = useState(false);

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
      } else if (inputValue === "password") {
        setShowVideo(true);
        setTimeout(() => {
          videoRef.current?.play();
        }, 0);
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
        navigate("/ThePasswordIsRickRollIPromessItsNotARickRoll");
      }, 400);
    }
  }, [isPasswordCorrect]);

  return (
    <>
      <div className={styles.container}>
        <Modal
          isOpen={showModal}
          link="/ThePasswordIsRickRollIPromessItsNotARickRoll"
        />
        <Password
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          src={image}
          slideAnimation={slideAnimation}
          isError={isError}
        />
      </div>
      <div
        className={styles.hover}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        password (again)
      </div>
      <div className={styles.video}>
        <video
          ref={videoRef}
          src="src/assets/video/rickroll.mp4"
          width="560"
          height="315"
          preload="auto"
          style={{ display: showVideo ? "block" : "none" }}
          onEnded={() => setShowVideo(false)}
        />
      </div>
      <div
        className={`${styles.password}${isHovered ? " " + styles.hovered : ""}`}
      >
        {password}
      </div>
    </>
  );
};
