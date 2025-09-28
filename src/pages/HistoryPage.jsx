// HistoryPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import videoSrc from "../assets/robot.mp4";
import mapImage from "../assets/map.png";

export default function HistoryPage({ language = "en", onNext }) {
  const [bubbleText, setBubbleText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const videoRef = useRef(null);
  const starsContainerRef = useRef(null);

  const texts = {
    en: {
      hakimHello:
        "Our story begins thousands of years ago, in a land where myths were born. Legends whispered through the winds, shaping the destiny of generations.",
      next: "Next",
    },
    uz: {
      hakimHello:
        "Bizning hikoyamiz ming yillar avval, afsonalar tug‘ilgan diyorda boshlanadi. Shamollarda pichirlab aytilgan rivoyatlar avlodlar taqdirini shakllantirgan.",
      next: "Кейинги",
    },
    ru: {
      hakimHello:
        "Наша история начинается тысячи лет назад, в земле, где рождались мифы. Легенды шептали на ветру, формируя судьбу поколений.",
      next: "Далее",
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

  // 📝 تزامن النص مع الفيديو
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const progress = video.currentTime / video.duration;
      const charsToShow = Math.floor(fullText.length * progress);
      setBubbleText(fullText.slice(0, charsToShow));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    // 🎤 شغل الصوت مع بداية الفيديو
    const handlePlay = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(fullText);
        utter.lang = language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US";
        window.speechSynthesis.speak(utter);
      }
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
    };
  }, [language, fullText]);

  // 🏙️ المدن + أماكنها
  const cities = [
    { id: 1, name: "Tashkent", info: "Capital of Uzbekistan", x: "65%", y: "20%" },
    { id: 2, name: "Samarkand", info: "Ancient city on Silk Road", x: "55%", y: "40%" },
    { id: 3, name: "Bukhara", info: "Known for mosques & madrasas", x: "45%", y: "50%" },
    { id: 4, name: "Khiva", info: "Historic Itchan Kala fortress", x: "30%", y: "45%" },
    { id: 5, name: "Nukus", info: "Capital of Karakalpakstan", x: "15%", y: "25%" },
    { id: 6, name: "Fergana", info: "Fertile valley city", x: "75%", y: "35%" },
    { id: 7, name: "Namangan", info: "City in Fergana Valley", x: "78%", y: "28%" },
    { id: 8, name: "Qarshi", info: "Southern city", x: "48%", y: "65%" },
    { id: 9, name: "Andijan", info: "Historic Fergana city", x: "82%", y: "30%" },
    { id: 10, name: "Jizzakh", info: "Gateway between valleys", x: "58%", y: "30%" },
    { id: 11, name: "Termez", info: "Ancient Buddhist center", x: "52%", y: "85%" },
    { id: 12, name: "Navoi", info: "Industrial hub", x: "50%", y: "55%" },
    { id: 13, name: "Kokand", info: "Historic khanate city", x: "72%", y: "32%" },
    { id: 14, name: "Urgench", info: "Near Khiva, historic town", x: "25%", y: "42%" },
  ];

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

      {/* 🎥 الفيديو أو الخريطة */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {!showMap ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            onEnded={() => setShowMap(true)}
            className="video-player"
          />
        ) : (
          <div className="map-container">
            <img src={mapImage} alt="Silk Road Map" className="map-image" />
            {cities.map((city) => (
              <div
                key={city.id}
                className="city-dot"
                style={{ left: city.x, top: city.y }}
                onClick={() => setActiveCity(city)}
              />
            ))}
            {activeCity && (
              <div
                className="city-tooltip"
                style={{
                  left: `calc(${activeCity.x} + 25px)`,
                  top: activeCity.y,
                }}
              >
                <strong>{activeCity.name}</strong>
                <p>{activeCity.info}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ⏭️ زرار Next يظهر بعد الخريطة */}
      {showMap && (
        <button className="next" onClick={onNext}>
          {t.next}
        </button>
      )}
    </div>
  );
}
