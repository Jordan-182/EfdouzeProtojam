import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Password from "../components/Password";
import { useCount } from "../context/CountContext";
import styles from "../styles/Console.module.css";
import { useRef as useReactRef } from "react";
import image from "../assets/images/consoles.jpg";
import video from "../assets/video/piege.mp4";

export const Console = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();
  const [slideAnimation, setSlideAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { count, setCount } = useCount();
  const pageId = 6;
  const [isError, setIsError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useReactRef<HTMLVideoElement>(null);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);

  useEffect(() => {
    setIsPasswordCorrect(false);
  }, []);

  const password = "PCFTW";
  console.log(password);

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
      } else if (
        inputValue === "sega" ||
        inputValue === "Sega" ||
        inputValue === "SEGA"
      ) {
        if (!hasPlayedVideo) {
          setShowVideo(true);
          setHasPlayedVideo(true);
          setTimeout(() => {
            videoRef.current?.play();
          }, 0);
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
        navigate("/Comique");
      }, 400);
    }
  }, [isPasswordCorrect]);

  return (
    <>
      <div className={styles.video}>
        <video
          ref={videoRef}
          src={video}
          width="560"
          height="315"
          preload="auto"
          style={{ display: showVideo ? "block" : "none" }}
          onEnded={() => setShowVideo(false)}
        />
      </div>

      <div className={styles.container}>
        <Modal isOpen={showModal} link="/Comique" />
        <Password
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          src={image}
          slideAnimation={slideAnimation}
          isError={isError}
        />
      </div>
    </>
  );
};
