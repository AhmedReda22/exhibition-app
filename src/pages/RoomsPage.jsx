import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import videoSrc from "../assets/robot.mp4";
import bgImage from "../assets/bg.png";

export default function RoomsPage({ language, onFinish }) {
  const [bubbleText, setBubbleText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const videoRef = useRef(null);
  const starsContainerRef = useRef(null);
  const robotRef = useRef(null);

  const texts = {
    en: {
      hakimHello: {
        display: "🌟 To explore more amazing stories and meet legendary characters, you can visit our magical rooms! Each room holds unique adventures waiting for you! 🏰✨",
        speak: "To explore more amazing stories and meet legendary characters, you can visit our magical rooms! Each room holds unique adventures waiting for you!"
      },
      button: "Begin Your Magical Journey 🚀",
      roomsTitle: "🎪 Choose Your Adventure Room!",
      rooms: [
        {
          id: 1,
          name: "Ancient Legends Room",
          emoji: "🏛️",
          description: "Discover myths and legends from thousands of years ago!",
          color: "linear-gradient(145deg, #FF6B6B, #FF8E53)"
        },
        {
          id: 2,
          name: "Heroes Gallery",
          emoji: "🦸‍♂️",
          description: "Meet the great heroes who shaped our history!",
          color: "linear-gradient(145deg, #4ECDC4, #44A08D)"
        },
        {
          id: 3,
          name: "Treasure Chamber",
          emoji: "💎",
          description: "Explore ancient artifacts and hidden treasures!",
          color: "linear-gradient(145deg, #FFD93D, #FF9C3D)"
        },
        {
          id: 4,
          name: "Time Travel Portal",
          emoji: "⏰",
          description: "Journey through different historical eras!",
          color: "linear-gradient(145deg, #6A11CB, #2575FC)"
        }
      ]
    },
    uz: {
      hakimHello: {
        display: "🌟 Ko'proq ajoyib hikoyalarni kashf etish va afsonaviy qahramonlar bilan uchrashish uchun bizning sehrli xonalarimizga tashrif buyuring! Har bir xona sizni kutayotgan noyob sarguzashtlarga ega! 🏰✨",
        speak: "Ko'proq ajoyib hikoyalarni kashf etish va afsonaviy qahramonlar bilan uchrashish uchun bizning sehrli xonalarimizga tashrif buyuring! Har bir xona sizni kutayotgan noyob sarguzashtlarga ega!"
      },
      button: "Sehrli Safaringizni Boshlang 🚀",
      roomsTitle: "🎪 O'zingizning Sarguzasht Xonangizni Tanlang!",
      rooms: [
        {
          id: 1,
          name: "Qadimiy Afsonalar Xonasi",
          emoji: "🏛️",
          description: "Ming yillar avvalgi miflar va afsonalarni kashf eting!",
          color: "linear-gradient(145deg, #FF6B6B, #FF8E53)"
        },
        {
          id: 2,
          name: "Qahramonlar Galereyasi",
          emoji: "🦸‍♂️",
          description: "Tariximizni shakllantirgan buyuk qahramonlar bilan uchrashing!",
          color: "linear-gradient(145deg, #4ECDC4, #44A08D)"
        },
        {
          id: 3,
          name: "Xazina Xonasi",
          emoji: "💎",
          description: "Qadimiy artefaktlar va yashirin xazinalarni kashf eting!",
          color: "linear-gradient(145deg, #FFD93D, #FF9C3D)"
        },
        {
          id: 4,
          name: "Vaqt Sayohati Portali",
          emoji: "⏰",
          description: "Turli tarixiy davrlar bo'ylab sayohat qiling!",
          color: "linear-gradient(145deg, #6A11CB, #2575FC)"
        }
      ]
    },
    ru: {
      hakimHello: {
        display: "🌟 Чтобы исследовать больше удивительных историй и встретить легендарных персонажей, вы можете посетить наши волшебные залы! Каждый зал хранит уникальные приключения, ожидающие вас! 🏰✨",
        speak: "Чтобы исследовать больше удивительных историй и встретить легендарных персонажей, вы можете посетить наши волшебные залы! Каждый зал хранит уникальные приключения, ожидающие вас!"
      },
      button: "Начните Своё Волшебное Путешествие 🚀",
      roomsTitle: "🎪 Выберите Свою Комнату Приключений!",
      rooms: [
        {
          id: 1,
          name: "Зал Древних Легенд",
          emoji: "🏛️",
          description: "Откройте мифы и легенды тысячелетней давности!",
          color: "linear-gradient(145deg, #FF6B6B, #FF8E53)"
        },
        {
          id: 2,
          name: "Галерея Героев",
          emoji: "🦸‍♂️",
          description: "Встретьтесь с великими героями, сформировавшими нашу историю!",
          color: "linear-gradient(145deg, #4ECDC4, #44A08D)"
        },
        {
          id: 3,
          name: "Сокровищница",
          emoji: "💎",
          description: "Исследуйте древние артефакты и скрытые сокровища!",
          color: "linear-gradient(145deg, #FFD93D, #FF9C3D)"
        },
        {
          id: 4,
          name: "Портал Путешествий во Времени",
          emoji: "⏰",
          description: "Путешествуйте через разные исторические эпохи!",
          color: "linear-gradient(145deg, #6A11CB, #2575FC)"
        }
      ]
    },
  };

  const t = texts[language] || texts.en;

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

  // 🌌 نجوم الخلفية المتحركة
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

  // 📝 تأثير الكتابة مع الصوت
  useEffect(() => {
    if (!window.speechSynthesis) return;

    const video = videoRef.current;
    if (!video) return;

    // إعادة التعيين
    setBubbleText("");
    window.speechSynthesis.cancel();

    // تشغيل الفيديو أولاً
    video.play();

    // ثم تشغيل الصوت بعد تأخير بسيط
    setTimeout(() => {
      speakText(t.hakimHello.speak, language, () => {
        // بعد انتهاء الصوت، إظهار الغرف
        setTimeout(() => {
          setShowRooms(true);
        }, 1000);
      });
    }, 1000);

    // عرض النص كاملاً مباشرة
    setBubbleText(t.hakimHello.display);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, t.hakimHello]);

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

  // تأثير عند النقر على الغرفة
  const handleRoomClick = (room) => {
    setActiveRoom(room);
    // تأثير صوتي بسيط
    speakText(`${room.name}. ${room.description}`, language);
  };

  return (
    <div className="page rooms-page">
      {/* 🌌 خلفية بصورة + نجوم */}
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

      {/* 🤖 الروبوت + البالون */}
      <div className="rooms-robot-container">
        <img 
          ref={robotRef}
          src={robotImage} 
          alt="Hakim Robot" 
          className="rooms-robot-image"
          onClick={handleRobotClick}
        />
        <div className="rooms-speech-bubble">
          <p className="fade-in-line">
            {bubbleText}
            {isSpeaking && <span className="speaking-dots">...</span>}
          </p>
        </div>
      </div>

      {/* 🎥 الفيديو */}
      <div className="rooms-video-container">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          className="rooms-video-player"
        />
        <div className="video-sparkles"></div>
      </div>

      {/* 🏰 عرض الغرف */}
      {showRooms && (
        <div className="rooms-container">
          <h2 className="rooms-title">{t.roomsTitle}</h2>
          
          <div className="rooms-grid">
            {t.rooms.map((room) => (
              <div
                key={room.id}
                className={`room-card ${activeRoom?.id === room.id ? 'active' : ''}`}
                style={{ background: room.color }}
                onClick={() => handleRoomClick(room)}
              >
                <div className="room-emoji">{room.emoji}</div>
                <h3 className="room-name">{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-glow"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⏭️ زرار البداية */}
      <button className="rooms-start-button" onClick={onFinish}>
        {t.button}
      </button>

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
