import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Password from "../components/Password";
import { useCount } from "../context/CountContext";
import styles from "../styles/LastChapter.module.css";
import { useRef as useReactRef } from "react";
import image from "/urlquery.png";
import video from "/video/cheh.mp4";

export const LastChapter = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();
  const { count, setCount } = useCount();
  const [slideAnimation, setSlideAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const pageId = 18;
  const [isError, setIsError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useReactRef<HTMLVideoElement>(null);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue === "congratz") {
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
        if (!hasPlayedVideo) {
          setShowVideo(true);
          setHasPlayedVideo(true);
          setTimeout(() => {
            videoRef.current?.play();
          }, 0);
        }
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
        navigate("/Final");
      }, 400);
    }
  }, [isPasswordCorrect]);

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (id === "password") {
    alert("MDP : CONGRATZ");
    window.location.replace(window.location.pathname);
  }

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
        <Modal isOpen={showModal} link="/Final" />
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
