import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";

export default function OriginPage({ language = "en", onNext }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [bubbleText, setBubbleText] = useState("");
  const starsContainerRef = useRef(null);

  const cities = [
    { id: "tashkent", label: { en: "Tashkent", uz: "Toshkent", ru: "Ташкент" }, x: 520, y: 140 },
    { id: "samarkand", label: { en: "Samarkand", uz: "Samarqand", ru: "Самарканд" }, x: 420, y: 230 },
    { id: "bukhara", label: { en: "Bukhara", uz: "Buxoro", ru: "Бухара" }, x: 300, y: 260 },
    { id: "khiva", label: { en: "Khiva", uz: "Xiva", ru: "Хива" }, x: 170, y: 200 },
    { id: "nukus", label: { en: "Nukus", uz: "Nukus", ru: "Нукус" }, x: 80, y: 90 },
    { id: "fergana", label: { en: "Fergana", uz: "Fargʻona", ru: "Фергана" }, x: 610, y: 200 },
    { id: "namangan", label: { en: "Namangan", uz: "Namangan", ru: "Наманган" }, x: 650, y: 160 },
    { id: "qarshi", label: { en: "Qarshi", uz: "Qarshi", ru: "Карши" }, x: 360, y: 320 },
  ];

  const localized = {
    en: {
      where: "Where are you visiting from?",
      welcome: (city) => `Welcome from ${city}!`,
      next: "Next",
      hint: "Tap a city",
      hakimHello: "Hello! I am Hakim — your guide.",
    },
    uz: {
      where: "Сиз қаердан ташриф буюрдингиз?",
      welcome: (city) => `${city}дан хуш келибсиз!`,
      next: "Кейинги",
      hint: "Шаҳарга босинг",
      hakimHello: "Салом! Мен — Ҳакім, сизнинг йўлбошчингиз.",
    },
    ru: {
      where: "Откуда вы нас посетили?",
      welcome: (city) => `Добро пожаловать из ${city}!`,
      next: "Далее",
      hint: "Нажмите на город",
      hakimHello: "Привет! Я Хаким — ваш гид.",
    },
  };

  const texts = localized[language] || localized.en;

  // 🌌 إنشاء النجوم المتحركة
  useEffect(() => {
    const createStars = () => {
      const container = starsContainerRef.current;
      if (!container) return;

      container.innerHTML = "";

      for (let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = Math.random() * 3 + 1;
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
    };

    createStars();
    window.addEventListener("resize", createStars);
    return () => window.removeEventListener("resize", createStars);
  }, []);

  // 🗣️ عند تحميل الصفحة: قول جملة Hakim الأولى
  useEffect(() => {
    setBubbleText(texts.hakimHello);

    if (window.speechSynthesis) {
      const utter = new SpeechSynthesisUtterance(texts.hakimHello);
      utter.lang = language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }, [language]);

  // 🗺️ لما يضغط على مدينة
  const handleCityClick = (city) => {
    const msg = texts.welcome(city.label[language]);
    setSelectedCity(city);
    setBubbleText(msg);

    if (window.speechSynthesis) {
      const utter = new SpeechSynthesisUtterance(msg);
      utter.lang = language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="page">
      {/* 🌌 خلفية النجوم */}
      <div className="space-background">
        <div ref={starsContainerRef} className="stars"></div>
      </div>

      {/* 🤖 الروبوت + البالون */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "40px",
          flexWrap: "wrap",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <img
          src={robotImage}
          alt="Hakim Robot"
          style={{
            width: "250px",
            height: "auto",
            filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))",
          }}
        />

        <div
          className="speech-bubble"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 209, 102, 0.9), rgba(255, 179, 71, 0.9))",
            color: "#000",
            padding: "20px 25px",
            borderRadius: "20px",
            maxWidth: "400px",
            position: "relative",
            fontSize: "20px",
            minHeight: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            border: "3px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {bubbleText}
          <div
            style={{
              position: "absolute",
              left: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "15px solid transparent",
              borderBottom: "15px solid transparent",
              borderRight: "20px solid rgba(255, 209, 102, 0.9)",
            }}
          />
        </div>
      </div>

      {/* 🗺️ الخريطة */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 className="page-title">{texts.where}</h2>
        <p className="page-subtitle">{texts.hint}</p>
      </div>

      <div className="city-map-container">
        <div className="city-map">
          <svg
            viewBox="0 0 800 500"
            style={{ width: "100%", maxWidth: "900px", height: "auto" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b3b2e" />
                <stop offset="100%" stopColor="#1a5a4c" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="800" height="500" fill="url(#mapGradient)" />

            <g opacity="0.15">
              <path
                d="M0,250 C120,200 240,280 360,240 C480,200 600,260 800,230 L800,500 L0,500 Z"
                fill="#ffffff"
              />
            </g>

            {cities.map((c) => {
              const isSelected = selectedCity?.id === c.id;
              return (
                <g
                  key={c.id}
                  transform={`translate(${c.x}, ${c.y})`}
                  className={`city-point ${isSelected ? "city-selected" : ""}`}
                  onClick={() => handleCityClick(c)}
                  role="button"
                  tabIndex="0"
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="20"
                    fill={isSelected ? "#ff595e" : "#ffd166"}
                    stroke="#222"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  <text
                    x="35"
                    y="8"
                    fontSize="18"
                    fill="#fff"
                    fontFamily="'Comic Sans MS', sans-serif"
                    fontWeight="bold"
                  >
                    {c.label[language]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 📌 Popup للمدينة */}
      {selectedCity && (
        <div className="city-popup" role="dialog" aria-modal="true">
          <div className="city-popup-inner">
            <h3>{texts.welcome(selectedCity.label[language])}</h3>
            <button
              onClick={() => {
                setSelectedCity(null);
                onNext();
              }}
            >
              {texts.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
