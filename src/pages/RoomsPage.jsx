// RoomsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import videoSrc from "../assets/robot.mp4";

export default function RoomsPage({ language, onFinish }) {
  const [bubbleText, setBubbleText] = useState("");
  const videoRef = useRef(null);
  const starsContainerRef = useRef(null);

  const texts = {
    en: {
      hakimHello:
        "To learn more about these characters and history you can visit the different rooms.",
      button: "Start Your Journey",
    },
    uz: {
      hakimHello:
        "Bu qahramonlar va tarix haqida ko‘proq bilish uchun turli xonalarga tashrif buyurishingiz mumkin.",
      button: "Safaringizni boshlang",
    },
    ru: {
      hakimHello:
        "Чтобы узнать больше об этих персонажах и истории, вы можете посетить разные залы.",
      button: "Начните своё путешествие",
    },
  };

  const t = texts[language] || texts.en;
  const fullText = t.hakimHello;

  // ✨ نجوم الخلفية
  useEffect(() => {
    const createStars = () => {
      const container = starsContainerRef.current;
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
      }
    };
    createStars();
    window.addEventListener("resize", createStars);
    return () => window.removeEventListener("resize", createStars);
  }, []);

  
  
// 📝 عرض النص الأول ثم تشغيل الصوت بعده
useEffect(() => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  setBubbleText("");

  const sentences = fullText
    .split(/([.!?])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let current = 0;

  const showAndSpeakSentence = () => {
    if (current >= sentences.length) return;

    const sentence = sentences[current];

    // ✨ الأول: نكتب الجملة في البابل
    setBubbleText((prev) => (prev ? prev + " " : "") + sentence);

    // 🎤 بعد كتابة الجملة نسمع الصوت
    const utter = new SpeechSynthesisUtterance(sentence);
    utter.lang =
      language === "ru"
        ? "ru-RU"
        : language === "uz"
        ? "uz-UZ"
        : "en-US";

    utter.onend = () => {
      current++;
      showAndSpeakSentence(); // نكمل اللي بعدها
    };

    window.speechSynthesis.speak(utter);
  };

  showAndSpeakSentence();

  return () => {
    window.speechSynthesis.cancel();
  };
}, [language, fullText]);




  return (
    <div className="page">
      {/* 🌌 الخلفية */}
      <div className="space-background">
        <div ref={starsContainerRef} className="stars"></div>
      </div>

      {/* 🤖 الروبوت + البابل */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
        <img
          src={robotImage}
          alt="Hakim Robot"
          style={{ width: "220px", height: "auto" }}
        />
        <div className="speech-bubble">{bubbleText}</div>
      </div>

      {/* 🎥 الفيديو */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          className="video-player"
        />
      </div>

      {/* ⏭️ زرار Next */}
      <button className="next" onClick={onFinish}>
        {t.button}
      </button>
    </div>
  );
}
