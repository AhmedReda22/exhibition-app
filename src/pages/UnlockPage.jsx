import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import robotVideo from "../assets/robot.mp4";
import bookImage from "../assets/book.png";

export default function UnlockPage({ language, onUnlock }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [message, setMessage] = useState(""); // ✅ رسالة الخطأ
  const starsContainerRef = useRef(null);

  const texts = {
    en: {
      speech: "This book is locked and to open the book you have to choose the right magic word.",
      title: "Choose the magic word",
      wrong: "Nice try! Try again.",
      options: ["Cabbage", "Cheese", "Curiosity"],
      next: "Next"
    },
    uz: {
      speech: "Bu kitob qulflangan, uni ochish uchun to‘g‘ri sehrli so‘zni tanlashingiz kerak.",
      title: "Sehrli so‘zni tanlang",
      wrong: "Yaxshi urinish! Yana urinib ko‘ring.",
      options: ["Karam", "Pishloq", "Qiziquvchanlik"],
      next: "Keyingi"
    },
    ru: {
      speech: "Эта книга заперта, и чтобы открыть её, нужно выбрать правильное волшебное слово.",
      title: "Выберите волшебное слово",
      wrong: "Хорошая попытка! Попробуйте снова.",
      options: ["Капуста", "Сыр", "Любопытство"],
      next: "Далее"
    },
  };

  // ✅ الكلام بصوت الروبوت
  const speakText = (text, lang) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      if (lang === "uz") utterance.lang = "tr-TR";
      else if (lang === "ru") utterance.lang = "ru-RU";
      else utterance.lang = "en-US";

      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speakText(texts[language].speech, language);
  }, [language]);

  // ✅ نجوم الخلفية
  useEffect(() => {
    const container = starsContainerRef.current;
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1.5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 5 + 3;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(star);
    }
  }, []);

  const handleChoice = (word) => {
    const correctWord =
      language === "en" ? "Curiosity" : language === "uz" ? "Qiziquvchanlik" : "Любопытство";

    if (word === correctWord) {
      setMessage(""); // ✅ مسح رسالة الخطأ
      setShowVideo(true);
    } else {
      setMessage(texts[language].wrong); // ✅ إظهار رسالة الخطأ
    }
  };

  return (
    <div className="page" style={{ padding: "10px" }}>
      {/* ✅ خلفية الكون */}
      <div className="space-background">
        <div ref={starsContainerRef} className="stars"></div>
      </div>

      {/* ✅ الروبوت + البالون */}
      <div className="robot-container" style={{ marginBottom: "10px" }}>
        <img src={robotImage} alt="Robot" className="robot-image" />
        <div className="speech-bubble">
          <p>{texts[language].speech}</p>
        </div>
      </div>

      {/* ✅ السؤال والاختيارات */}
      <div style={{ marginTop: "-20px" }}>
        <h2 className="page-title" style={{ marginBottom: "8px" }}>
          {texts[language].title}
        </h2>
        <div className="circle-buttons" style={{ marginBottom: "10px" }}>
          {texts[language].options.map((w) => (
            <button
              key={w}
              onClick={() => handleChoice(w)}
              className="glow-button"
              style={{
                background: "linear-gradient(145deg, #00c6ff, #0072ff)",
                width: "120px",
                height: "120px",
                fontSize: "16px"
              }}
            >
              {w}
            </button>
          ))}
        </div>

        {/* ✅ رسالة الخطأ تظهر تحت الأزرار */}
        {message && (
          <p style={{ color: "red", fontSize: "20px", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </div>

      {/* ✅ صورة الكتاب (thumbnail) أو الفيديو */}
      <div className="media-container" style={{ marginTop: "10px" }}>
        {!showVideo ? (
          <img
            src={bookImage}
            alt="Book Thumbnail"
            style={{
              width: "300px",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
          />
        ) : (
          <video
            width="450"
            controls
            autoPlay
            onPlay={() => setVideoPlayed(true)}
            style={{
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
          >
            <source src={robotVideo} type="video/mp4" />
            Your browser does not support video.
          </video>
        )}
      </div>

      {/* ✅ زرار Next */}
      {videoPlayed && (
        <button
          onClick={onUnlock}
          style={{
            marginTop: "12px",
            padding: "10px 25px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(145deg, #ffd166, #ffb347)",
            color: "black",
            fontWeight: "bold",
            boxShadow: "0 6px 15px rgba(0,0,0,0.4)"
          }}
        >
          {texts[language].next}
        </button>
      )}
    </div>
  );
}
