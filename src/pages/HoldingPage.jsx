// HoldingPage.jsx - مع خلفية bg.jpeg
import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import bookImage from "../assets/book.png";
import startUzImage from "../assets/start-auz.png";
import startRuImage from "../assets/start-ru.png";
import startEnImage from "../assets/start-en.png";
import bgImage from "../assets/bg.jpeg"; // ✅ استيراد الخلفية الجديدة

export default function HoldingPage({ onSelectLanguage }) {
  const [cycleLang, setCycleLang] = useState("en");
  const [visibleLine, setVisibleLine] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const robotRef = useRef(null);
  const speechBubbleRef = useRef(null);

  const texts = {
  en: [
    "Welcome to the Children's Exhibition Hall!"
  ],
  uz: [
    "Bolalar ko'rgazma zaliga xush kelibsiz!"
  ],
  ru: [
    "Добро пожаловать в Детский выставочный зал!"
  ],
};


  const langs = ["en", "uz", "ru"];

  // ✅ دالة تشغيل الصوت
  const speakText = (text, lang, callback) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (lang === "uz") {
        utterance.lang = "tr-TR";
        utterance.rate = 0.85;
      } else if (lang === "ru") {
        utterance.lang = "ru-RU";
        utterance.rate = 0.9;
      } else {
        utterance.lang = "en-US";
        utterance.rate = 0.9;
      }

      utterance.pitch = 1.1;
      utterance.volume = 1;

      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(callback, 800);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setTimeout(callback, 1000);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(callback, 2500);
    }
  };

  useEffect(() => {
    let langIndex = 0;
    let lineIndex = 0;
    let isRunning = true;

    const playNextLine = () => {
      if (!isRunning) return;

      const currentLang = langs[langIndex];
      const line = texts[currentLang][lineIndex];

      setCycleLang(currentLang);
      setVisibleLine(line);
      setCurrentTextIndex(lineIndex);

      speakText(line, currentLang, () => {
        if (!isRunning) return;

        lineIndex++;
        if (lineIndex >= texts[currentLang].length) {
          lineIndex = 0;
          langIndex = (langIndex + 1) % langs.length;
        }

        setTimeout(playNextLine, 1000);
      });
    };

    playNextLine();

    return () => {
      isRunning = false;
      window.speechSynthesis.cancel();
    };
  }, []);

  const buttons = [
    { lang: "uz", image: startUzImage, label: "O'zbekiston" },
    { lang: "ru", image: startRuImage, label: "Россия" },
    { lang: "en", image: startEnImage, label: "English" },
  ];

  const handleLanguageSelect = (lang) => {
    document.body.style.opacity = "0.9";
    setTimeout(() => {
      document.body.style.opacity = "1";
      onSelectLanguage(lang);
    }, 300);
  };

  return (
    <div className="page">
      {/* 🖼️ خلفية صورة */}
      
      <div
        className="background-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>


{/* 🌌 طبقة النجوم */}
<div className="stars">
  {Array.from({ length: 40 }).map((_, i) => (
    <div
      key={i}
      className="star"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 2}px`,
        height: `${Math.random() * 3 + 2}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ))}
</div>


      {/* 🎙️ مؤشر الصوت */}
      {isSpeaking && (
        <div className="speaking-indicator">
          <div className="pulse-animation"></div>
          🔊 {cycleLang === 'en' ? 'Speaking...' : cycleLang === 'uz' ? 'Gapiramiz...' : 'Говорим...'}
        </div>
      )}

      {/* 🤖 الروبوت */}
      <div className="robot-container-fixed">
        <img 
          ref={robotRef}
          src={robotImage} 
          alt="Robot Hakim" 
          className="robot-image-fixed" 
        />
        <div ref={speechBubbleRef} className="speech-bubble-with-box">
          <p key={visibleLine} className="fade-in-line">
            {visibleLine}
            {isSpeaking && <span className="speaking-dots">...</span>}
          </p>
        </div>
      </div>

      {/* 📖 الكتاب */}
      <div className="book-container-huge">
        <img src={bookImage} alt="Magic Book" className="book-image-huge" />
      </div>

      {/* 🟢 أزرار اختيار اللغة */}
      <div className="vertical-buttons">
        {buttons.map((btn) => (
          <button
            key={btn.lang}
            onClick={() => {
              window.speechSynthesis.cancel();
              handleLanguageSelect(btn.lang);
            }}
            className="language-button"
          >
            <img src={btn.image} alt={btn.label} className="button-image" />
          </button>
        ))}
      </div>

      {/* 🔘 مؤشر التقدم */}
      <div className="progress-indicator">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentTextIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
