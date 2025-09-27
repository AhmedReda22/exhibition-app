import React, { useState } from "react";
import "../style.css";

/**
 * OriginPage.jsx
 * Props:
 *   - language: "en" | "uz" | "ru"
 *   - onNext: function to go to next page
 *
 * Notes:
 * - Uses a simple responsive SVG (viewBox) with clickable city circles.
 * - Cities have coordinates in SVG viewBox units (800x500).
 * - Touch-friendly: circles are large and have hover/active styles.
 * - Shows a popup with localized welcome text and a Next button.
 */

export default function OriginPage({ language = "en", onNext }) {
  const [selectedCity, setSelectedCity] = useState(null);

  // قائمة المدن: الاسم بالإنجليزي ويُستخدم كنص في الرسالة.
  // إحداثيات تقريبية داخل viewBox (800 x 500)
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
      welcome: (city) => `${city}дан хуш келibsiz!`,
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

  const handleCityClick = (city) => {
    setSelectedCity(city);
    // speech (optional): Web Speech API
    if (window.speechSynthesis) {
      try {
        const utter = new SpeechSynthesisUtterance(texts.welcome(city.label[language]));
        // try to set language for voice:
        utter.lang = language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      } catch (e) {
        // ignore if not supported
      }
    }
  };

  return (
    <div className="page" style={{ padding: 20, boxSizing: "border-box", background: "#1f2937" }}>
      <div style={{ width: "100%", maxWidth: 1200 }}>
        <h2 style={{ fontSize: 34, marginBottom: 8 }}>{texts.where}</h2>
        <p style={{ marginTop: 0, marginBottom: 16, color: "#ddd" }}>{texts.hint}</p>
      </div>

      <div className="map-container" role="application" aria-label="Uzbekistan map">
        {/* Responsive SVG map placeholder (simplified shape) */}
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
          {/* background land shape (very simplified) */}
          <rect x="0" y="0" width="800" height="500" fill="#0b3b2e" />
          {/* decorative rivers/mountains (optional) */}
          <g opacity="0.08">
            <path d="M0,250 C120,200 240,280 360,240 C480,200 600,260 800,230 L800,500 L0,500 Z" fill="#ffffff" />
          </g>

          {/* City dots */}
          {cities.map((c) => (
            <g
              key={c.id}
              transform={`translate(${c.x}, ${c.y})`}
              style={{ cursor: "pointer", touchAction: "manipulation" }}
              onClick={() => handleCityClick(c)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCityClick(c);
              }}
              role="button"
              tabIndex="0"
              aria-label={c.label[language]}
            >
              {/* ripple ring for touch target */}
              <circle className="city-dot-ring" cx="0" cy="0" r="28" fill="transparent" />
              <circle className="city-dot" cx="0" cy="0" r="18" fill="#ffd166" stroke="#222" strokeWidth="2" />
              <text x="30" y="6" fontSize="16" fill="#fff" fontFamily="Arial, sans-serif">
                {c.label[language]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Hakim speech bubble */}
      <div className="hakim-bubble" style={{ marginTop: 18 }}>
        {texts.hakimHello}
      </div>

      {/* Popup when city selected */}
      {selectedCity && (
        <div className="city-popup" role="dialog" aria-modal="true">
          <div className="city-popup-inner">
            <h3 style={{ marginTop: 0 }}>{texts.welcome(selectedCity.label[language])}</h3>
            <p style={{ margin: "6px 0 12px 0", color: "#333" }}>
              {/* short friendly line (translated) */}
              {language === "en" && "Thanks for visiting our exhibition!"}
              {language === "uz" && "Кўргазмамизга ташриф буюрганингиз учун раҳмат!"}
              {language === "ru" && "Спасибо за посещение нашей выставки!"}
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => {
                  // Close popup but stay on page
                  setSelectedCity(null);
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: "#e5e7eb",
                }}
              >
                {language === "en" ? "Close" : language === "uz" ? "Ёпиш" : "Закрыть"}
              </button>

              <button
                onClick={() => {
                  setSelectedCity(null);
                  onNext();
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: "#ffd166",
                }}
              >
                {texts.next}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
