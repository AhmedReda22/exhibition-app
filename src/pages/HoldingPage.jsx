import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import bookImage from "../assets/book.png";

export default function HoldingPage({ onSelectLanguage }) {
  const [cycleLang, setCycleLang] = useState("en");
  const [visibleLine, setVisibleLine] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const starsContainerRef = useRef(null);

  const texts = {
    en: [
      "Welcome to the Children's Exhibition Hall",
      "Discover Uzbekistan's past, present, and future through science, art, and imagination.",
      "Hello! I am Hakim, your guide today.",
    ],
    uz: [
      "Bolalar ko'rgazma zaliga xush kelibsiz",
      "O'zbekistonning o'tmishi, buguni va kelajagini ilm-fan, san'at va tasavvur orqali kashf eting.",
      "Salom! Men Hakimman, bugun sizning yo'lboshchingizman.",
    ],
    ru: [
      "Добро пожаловать в Детский выставочный зал",
      "Откройте прошлое, настоящее и будущее Узбекистана через науку, искусство и воображение.",
      "Здравствуйте! Я Хаким, ваш гид сегодня.",
    ],
  };

  const langs = ["en", "uz", "ru"];

  // ✅ دالة تشغيل الصوت
  const speakText = (text, lang, callback) => {
    if ("speechSynthesis" in window) {
      // إيقاف أي كلام سابق
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // تحديد اللغة
      if (lang === "uz") {
        utterance.lang = "tr-TR"; // الأوزبكية تستخدم التركية كبديل
      } else if (lang === "ru") {
        utterance.lang = "ru-RU";
      } else {
        utterance.lang = "en-US";
      }
      
      // تحسين إعدادات الصوت للأطفال
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(callback, 500); // تأخير قبل الجملة التالية
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setTimeout(callback, 1000); // fallback إذا فشل الصوت
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // إذا المتصفح لا يدعم Text-to-Speech
      setTimeout(callback, 2000);
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

      // تشغيل الصوت أولاً
      speakText(line, currentLang, () => {
        if (!isRunning) return;
        
        // الانتقال للجملة التالية بعد انتهاء الصوت
        lineIndex++;
        if (lineIndex >= texts[currentLang].length) {
          lineIndex = 0;
          langIndex = (langIndex + 1) % langs.length;
        }
        
        // تشغيل الجملة التالية
        playNextLine();
      });
    };

    // بدء التشغيل
    playNextLine();

    return () => {
      isRunning = false;
      window.speechSynthesis.cancel();
    };
  }, []);

  // إنشاء النجوم المتحركة
  useEffect(() => {
    const createStars = () => {
      const container = starsContainerRef.current;
      if (!container) return;
      
      container.innerHTML = '';
      
      // إنشاء 200 نجمة
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
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
    
    const handleResize = () => createStars();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttons = [
    { lang: "en", label: "Start", color: "linear-gradient(145deg, #ff595e, #ff8a8e)" },
    { lang: "uz", label: "Бошлаш", color: "linear-gradient(145deg, #1982c4, #4fa8f7)" },
    { lang: "ru", label: "Начать", color: "linear-gradient(145deg, #8ac926, #b5e655)" },
  ];

  return (
    <div className="page">
      {/* خلفية الكون المتحركة */}
      <div className="space-background">
        <div ref={starsContainerRef} className="stars"></div>
      </div>

      {/* مؤشر الصوت */}
      {isSpeaking && (
        <div className="speaking-indicator">
          <div className="pulse-animation"></div>
          🔊 Speaking...
        </div>
      )}

      {/* الروبوت + البالون */}
      <div className="robot-container">
        <img
          src={robotImage}
          alt="Robot"
          className="robot-image floating"
        />
        <div className="speech-bubble glow-effect">
          <p key={visibleLine} className="fade-in-line">
            {visibleLine}
            {isSpeaking && <span className="speaking-dots">...</span>}
          </p>
        </div>
      </div>

      {/* صورة الكتاب */}
      <div className="book-container floating-slow">
        <img
          src={bookImage}
          alt="Book"
          className="book-image"
        />
      </div>

      {/* الأزرار */}
      <div className="circle-buttons">
        {buttons.map((btn) => (
          <button
            key={btn.lang}
            onClick={() => {
              window.speechSynthesis.cancel();
              onSelectLanguage(btn.lang);
            }}
            className="glow-button pulse-glow"
            style={{ background: btn.color }}
          >
            <span className="button-text">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* تأثيرات إضافية */}
      <div className="floating-particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}></div>
        ))}
      </div>
    </div>
  );
}
