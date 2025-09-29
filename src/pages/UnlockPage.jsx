import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import robotVideo from "../assets/robot.mp4";
import bookImage from "../assets/book.png";
import bgImage from "../assets/bg.png";

export default function UnlockPage({ language, onUnlock }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const starsContainerRef = useRef(null);
  const robotRef = useRef(null);

  const texts = {
    en: {
      speech: {
        display: "🔒 This magical book is locked! To open it, you need to choose the right magic word from below! ✨",
        speak: "This magical book is locked! To open it, you need to choose the right magic word from below!"
      },
      title: "🔮 Choose the Magic Word!",
      wrong: {
        display: "❌ Nice try little explorer! Try another word! 🧙‍♂️",
        speak: "Nice try little explorer! Try another word!"
      },
      correct: {
        display: "🎉 Congratulations! You found the magic word! 📖",
        speak: "Congratulations! You found the magic word!"
      },
      options: ["Cabbage", "Cheese", "Curiosity"],
      next: "Continue Adventure 🚀"
    },
    uz: {
      speech: {
        display: "🔒 Bu sehrli kitob qulflangan! Uni ochish uchun quyidagi sehrli so'zlardan to'g'risini tanlashingiz kerak! ✨",
        speak: "Bu sehrli kitob qulflangan! Uni ochish uchun quyidagi sehrli so'zlardan to'g'risini tanlashingiz kerak!"
      },
      title: "🔮 Sehrli So'zni Tanlang!",
      wrong: {
        display: "❌ Yaxshi urinish, kichik tadqiqotchi! Boshqa so'zni sinab ko'ring! 🧙‍♂️",
        speak: "Yaxshi urinish, kichik tadqiqotchi! Boshqa so'zni sinab ko'ring!"
      },
      correct: {
        display: "🎉 Tabriklaymiz! Siz sehrli so'zni topdingiz! 📖",
        speak: "Tabriklaymiz! Siz sehrli so'zni topdingiz!"
      },
      options: ["Karam", "Pishloq", "Qiziquvchanlik"],
      next: "Sarguzashtni Davom Ettirish 🚀"
    },
    ru: {
      speech: {
        display: "🔒 Эта волшебная книга заперта! Чтобы открыть её, выберите правильное волшебное слово! ✨",
        speak: "Эта волшебная книга заперта! Чтобы открыть её, выберите правильное волшебное слово!"
      },
      title: "🔮 Выберите Волшебное Слово!",
      wrong: {
        display: "❌ Хорошая попытка, маленький исследователь! Попробуйте другое слово! 🧙‍♂️",
        speak: "Хорошая попытка, маленький исследователь! Попробуйте другое слово!"
      },
      correct: {
        display: "🎉 Поздравляем! Вы нашли волшебное слово! 📖",
        speak: "Поздравляем! Вы нашли волшебное слово!"
      },
      options: ["Капуста", "Сыр", "Любопытство"],
      next: "Продолжить Приключение 🚀"
    },
  };

  // ✅ دالة تشغيل الصوت المحسنة
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

      utterance.pitch = 1.2;
      utterance.volume = 1;

      setIsSpeaking(true);

      // تأثيرات بصرية أثناء التحدث
      if (robotRef.current) {
        robotRef.current.style.animation = "robot-talking 0.5s ease-in-out infinite";
      }

      utterance.onend = () => {
        setIsSpeaking(false);
        if (robotRef.current) {
          robotRef.current.style.animation = "float 4s ease-in-out infinite";
        }
        if (callback) setTimeout(callback, 800);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        if (robotRef.current) {
          robotRef.current.style.animation = "float 4s ease-in-out infinite";
        }
        if (callback) setTimeout(callback, 1000);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (callback) setTimeout(callback, 2500);
    }
  };

  useEffect(() => {
    speakText(texts[language].speech.speak, language);
  }, [language]);

  // ✅ نجوم الخلفية المتحركة
  useEffect(() => {
    const createStars = () => {
      const container = starsContainerRef.current;
      if (!container) return;

      container.innerHTML = "";
      for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 8;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = Math.random() * 0.8 + 0.2;

        container.appendChild(star);
      }
    };

    createStars();
    window.addEventListener("resize", createStars);
    return () => window.removeEventListener("resize", createStars);
  }, []);

  const handleChoice = (word) => {
    const correctWord =
      language === "en" ? "Curiosity" : 
      language === "uz" ? "Qiziquvchanlik" : 
      "Любопытство";

    setSelectedWord(word);

    if (word === correctWord) {
      setMessage(texts[language].correct.display);
      speakText(texts[language].correct.speak, language, () => {
        setShowVideo(true);
      });
    } else {
      setMessage(texts[language].wrong.display);
      speakText(texts[language].wrong.speak, language);
    }
  };

  // تأثير تفاعلي للروبوت
  const handleRobotClick = () => {
    if (robotRef.current) {
      robotRef.current.style.transform = "scale(1.1) rotate(5deg)";
      setTimeout(() => {
        if (robotRef.current) {
          robotRef.current.style.transform = "scale(1) rotate(0deg)";
        }
      }, 300);
    }
  };

  return (
    <div className="page unlock-page">
      {/* ✅ خلفية بصورة + نجوم */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div ref={starsContainerRef} className="stars"></div>
      </div>
      
      {/* طبقة شفافة فوق الخلفية */}
      <div className="background-overlay"></div>

      {/* 🎙️ مؤشر الصوت */}
      {isSpeaking && (
        <div className="speaking-indicator">
          <div className="pulse-animation"></div>
          🔊 {language === 'en' ? 'Hakim is speaking...' : language === 'uz' ? 'Hakim gapiramiz...' : 'Хаким говорит...'}
        </div>
      )}

      {/* ✅ الروبوت + البالون */}
      <div className="unlock-robot-container">
        <img 
          ref={robotRef}
          src={robotImage} 
          alt="Robot" 
          className="unlock-robot-image"
          onClick={handleRobotClick}
        />
        <div className="unlock-speech-bubble">
          <p className="fade-in-line">
            {texts[language].speech.display}
            {isSpeaking && <span className="speaking-dots">...</span>}
          </p>
        </div>
      </div>

      {/* ✅ السؤال والاختيارات */}
      <div className="unlock-content">
        <h2 className="unlock-page-title">
          {texts[language].title}
        </h2>
        
        {/* ✅ رسالة الخطأ أو النجاح */}
        {message && (
          <div className={`unlock-message ${message.includes('❌') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="unlock-buttons">
          {texts[language].options.map((word) => {
            const isCorrect = 
              language === "en" ? word === "Curiosity" :
              language === "uz" ? word === "Qiziquvchanlik" :
              word === "Любопытство";
            
            const isSelected = selectedWord === word;
            
            return (
              <button
                key={word}
                onClick={() => handleChoice(word)}
                className={`unlock-choice-button ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              >
                <span className="button-emoji">
                  {word === "Cabbage" || word === "Karam" || word === "Капуста" ? "🥬" :
                   word === "Cheese" || word === "Pishloq" || word === "Сыр" ? "🧀" : "🔍"}
                </span>
                <span className="button-text">{word}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ صورة الكتاب أو الفيديو */}
      <div className="unlock-media-container">
        {!showVideo ? (
          <div className="book-container floating-slow">
            <img
              src={bookImage}
              alt="Magic Book"
              className="unlock-book-image"
            />
            <div className="book-lock-effect"></div>
          </div>
        ) : (
          <div className="video-container">
            <video
              className="unlock-video"
              controls
              autoPlay
              muted
              onPlay={() => setVideoPlayed(true)}
              onEnded={() => setVideoPlayed(true)}
            >
              <source src={robotVideo} type="video/mp4" />
              Your browser does not support video.
            </video>
            <div className="video-sparkles"></div>
          </div>
        )}
      </div>

      {/* ✅ زرار Next */}
      {videoPlayed && (
        <button
          onClick={onUnlock}
          className="unlock-next-button"
        >
          {texts[language].next}
        </button>
      )}

      {/* ✨ تأثيرات جسيمات إضافية */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 5 + 3}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
