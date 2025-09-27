import React from "react";
import "../style.css";

export default function HistoryPage({ language, onNext }) {
  const texts = {
    en: {
      title: "Silk Road History",
      subtitle: "Our story begins thousands of years ago, along the Silk Road...",
      button: "Next",
    },
    uz: {
      title: "Ipak yo‘li tarixi",
      subtitle: "Bizning hikoyamiz ming yillar avval Ipak yo‘li bo‘ylab boshlanadi...",
      button: "Кейинги",
    },
    ru: {
      title: "История Шёлкового пути",
      subtitle: "Наша история начинается тысячи лет назад на Шёлковом пути...",
      button: "Далее",
    },
  };

  return (
    <div className="page" style={{ background: "dimgray" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>{texts[language].title}</h2>
      <p style={{ fontSize: "20px", marginBottom: "30px" }}>{texts[language].subtitle}</p>
      <div
        style={{
          background: "gray",
          width: "80%",
          height: "60%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        [Animated Silk Road Map Placeholder]
      </div>
      <button className="next" onClick={onNext}>
        {texts[language].button}
      </button>
    </div>
  );
}
