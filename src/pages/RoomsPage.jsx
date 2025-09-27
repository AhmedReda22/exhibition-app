import React from "react";
import "../style.css";

export default function RoomsPage({ language, onFinish }) {
  const texts = {
    en: {
      title: "Explore the Exhibition Rooms",
      button: "Start Your Journey",
    },
    uz: {
      title: "Ko‘rgazma xonalarini o‘rganing",
      button: "Safaringizni boshlang",
    },
    ru: {
      title: "Исследуйте выставочные залы",
      button: "Начните своё путешествие",
    },
  };

  return (
    <div className="page" style={{ background: "black" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>{texts[language].title}</h2>
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
        [3D Floor Plan Placeholder]
      </div>
      <button className="room" onClick={onFinish}>
        {texts[language].button}
      </button>
    </div>
  );
}
