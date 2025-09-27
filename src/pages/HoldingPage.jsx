import React, { useState, useEffect } from "react";
import "../style.css";
import robotVideo from "../assets/robot.mp4";
import bookImage from "../assets/book.png"; // ✅ استدعاء صورة الكتاب

export default function HoldingPage({ onSelectLanguage }) {
  const [cycleLang, setCycleLang] = useState("en");
  const [visibleLine, setVisibleLine] = useState("");

  const texts = {
    en: [
      "Welcome to the Children’s Exhibition Hall",
      "Discover Uzbekistan’s past, present, and future through science, art, and imagination.",
      "Hello! I am Hakim, your guide today.",
    ],
    uz: [
      "Bolalar ko‘rgazma zaliga xush kelibsiz",
      "O‘zbekistonning o‘tmishi, buguni va kelajagini ilm-fan, san’at va tasavvur orqali kashf eting.",
      "Salom! Men Hakimman, bugun sizning yo‘lboshchingizman.",
    ],
    ru: [
      "Добро пожаловать в Детский выставочный зал",
      "Откройте прошлое, настоящее и будущее Узбекистана через науку, искусство и воображение.",
      "Здравствуйте! Я Хаким, ваш гид сегодня.",
    ],
  };

  const langs = ["en", "uz", "ru"];

  useEffect(() => {
    let langIndex = 0;
    let lineIndex = 0;

    setCycleLang(langs[langIndex]);
    setVisibleLine(texts[langs[langIndex]][lineIndex]);

    const interval = setInterval(() => {
      lineIndex++;

      if (lineIndex < texts[langs[langIndex]].length) {
        setVisibleLine(texts[langs[langIndex]][lineIndex]);
      } else {
        langIndex = (langIndex + 1) % langs.length;
        lineIndex = 0;
        setCycleLang(langs[langIndex]);
        setVisibleLine(texts[langs[langIndex]][lineIndex]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const buttons = [
    { lang: "en", label: "Start", color: "#ff595e" },
    { lang: "uz", label: "Бошлаш", color: "#1982c4" },
    { lang: "ru", label: "Начать", color: "#8ac926" },
  ];

  return (
    <div
      className="page"
      style={{
        background: "linear-gradient(to bottom, purple, black)",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* الروبوت + البالون */}
      <div className="robot-container">
        <video src={robotVideo} autoPlay loop muted className="robot-video" />
        <div className="speech-bubble fade-text">
          <p key={visibleLine} className="fade-in-line">
            {visibleLine}
          </p>
        </div>
      </div>

      {/* ✅ صورة الكتاب في النص */}
      <div className="book-container">
        <img
          src={bookImage}
          alt="Book"
          style={{
            width: "300px",
            height: "auto",
            margin: "30px 0",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* الأزرار */}
      <div className="circle-buttons">
        {buttons.map((btn) => (
          <button
            key={btn.lang}
            onClick={() => onSelectLanguage(btn.lang)}
            className="glow-button"
            style={{ background: btn.color }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
