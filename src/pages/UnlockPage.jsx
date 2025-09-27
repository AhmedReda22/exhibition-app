import React, { useState } from "react";
import "../style.css";

export default function UnlockPage({ language, onUnlock }) {
  const [message, setMessage] = useState("");

  const texts = {
    en: {
      title: "Choose the magic word",
      wrong: "Nice try! Try again.",
      correct: "✨ The book opens magically! ✨",
      options: ["Cabbage", "Cheese", "Curiosity"],
    },
    uz: {
      title: "Sehrli so‘zni tanlang",
      wrong: "Yaxshi urinish! Yana urinib ko‘ring.",
      correct: "✨ Kitob sehrli tarzda ochildi! ✨",
      options: ["Karam", "Pishloq", "Qiziquvchanlik"],
    },
    ru: {
      title: "Выберите волшебное слово",
      wrong: "Хорошая попытка! Попробуйте снова.",
      correct: "✨ Книга открывается волшебным образом! ✨",
      options: ["Капуста", "Сыр", "Любопытство"],
    },
  };

  const handleChoice = (word) => {
    const correctWord =
      language === "en" ? "Curiosity" : language === "uz" ? "Qiziquvchanlik" : "Любопытство";

    if (word === correctWord) {
      setMessage(texts[language].correct);
      setTimeout(onUnlock, 2000);
    } else {
      setMessage(texts[language].wrong);
    }
  };

  return (
    <div className="page" style={{ background: "midnightblue" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>{texts[language].title}</h2>
      <div>
        {texts[language].options.map((w) => (
          <button
            key={w}
            style={{ background: "skyblue", color: "black", margin: "10px" }}
            onClick={() => handleChoice(w)}
          >
            {w}
          </button>
        ))}
      </div>
      <p style={{ marginTop: "20px", fontSize: "22px", color: "yellow" }}>{message}</p>
    </div>
  );
}
