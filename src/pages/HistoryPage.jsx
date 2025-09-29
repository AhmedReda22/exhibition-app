import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import robotImage from "../assets/robot.png";
import videoSrc from "../assets/robot.mp4";
import mapImage from "../assets/map.png";
import bgImage from "../assets/bg.png";

export default function HistoryPage({ language = "en", onNext }) {
  const [bubbleText, setBubbleText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const videoRef = useRef(null);
  const starsContainerRef = useRef(null);
  const robotRef = useRef(null);

  const texts = {
    en: {
      hakimHello: "🌍 Our story begins thousands of years ago, in a land where myths were born! Legends whispered through the winds, shaping the destiny of generations. Click on the cities to discover their amazing stories! 🏛️",
      next: "Continue Journey 🚀",
      mapHint: "🗺️ Click on the glowing cities to learn their ancient secrets!",
      cities: [
        { id: 1, name: "Tashkent", info: "🌟 The vibrant capital city with 2000+ years of history!", x: "65%", y: "20%" },
        { id: 2, name: "Samarkand", info: "🏛️ Ancient jewel of the Silk Road - over 2750 years old!", x: "55%", y: "40%" },
        { id: 3, name: "Bukhara", info: "🕌 City of mosques & madrasas - a living museum!", x: "45%", y: "50%" },
        { id: 4, name: "Khiva", info: "🏰 Historic fortress with magical Itchan Kala!", x: "30%", y: "45%" },
        { id: 5, name: "Nukus", info: "🎨 Capital of Karakalpakstan - land of art!", x: "15%", y: "25%" },
        { id: 6, name: "Fergana", info: "🌄 Beautiful valley city with rich culture!", x: "75%", y: "35%" },
        { id: 7, name: "Namangan", info: "🏔️ City in the stunning Fergana Valley!", x: "78%", y: "28%" },
        { id: 8, name: "Qarshi", info: "🌅 Southern city with ancient roots!", x: "48%", y: "65%" },
        { id: 9, name: "Andijan", info: "📜 Historic city in Fergana region!", x: "82%", y: "30%" },
        { id: 10, name: "Jizzakh", info: "🚪 Gateway between beautiful valleys!", x: "58%", y: "30%" },
        { id: 11, name: "Termez", info: "🪷 Ancient Buddhist center - 2500+ years!", x: "52%", y: "85%" },
        { id: 12, name: "Navoi", info: "🏭 Industrial hub with golden history!", x: "50%", y: "55%" },
        { id: 13, name: "Kokand", info: "👑 Historic khanate city of rulers!", x: "72%", y: "32%" },
        { id: 14, name: "Urgench", info: "🏺 Ancient town near magical Khiva!", x: "25%", y: "42%" },
      ]
    },
    uz: {
      hakimHello: "🌍 Bizning hikoyamiz ming yillar avval, afsonalar tug'ilgan diyorda boshlanadi! Shamollarda pichirlab aytilgan rivoyatlar avlodlar taqdirini shakllantirgan. Shaharlarga bosing va ularning ajoyib hikoyalarini kashf eting! 🏛️",
      next: "Safarni Davom Ettirish 🚀",
      mapHint: "🗺️ Yorqin shaharlarga bosing va ularning qadimiy sirlarini biling!",
      cities: [
        { id: 1, name: "Toshkent", info: "🌟 2000+ yillik tarixga ega jonli poytaxt!", x: "65%", y: "20%" },
        { id: 2, name: "Samarqand", info: "🏛️ Buyuk Ipak Yo'lining qadimiy duri - 2750+ yil!", x: "55%", y: "40%" },
        { id: 3, name: "Buxoro", info: "🕌 Masjidlar va madrasalar shahri - tirik muzey!", x: "45%", y: "50%" },
        { id: 4, name: "Xiva", info: "🏰 Sehrli Itchan Qal'asi bilan tarixiy qal'a!", x: "30%", y: "45%" },
        { id: 5, name: "Nukus", info: "🎨 Qoraqalpog'iston poytaxti - san'at diyori!", x: "15%", y: "25%" },
        { id: 6, name: "Farg'ona", info: "🌄 Boy madaniyatga ega go'zal vodiyshahar!", x: "75%", y: "35%" },
        { id: 7, name: "Namangan", info: "🏔️ Ajoyib Farg'ona vodiysidagi shahar!", x: "78%", y: "28%" },
        { id: 8, name: "Qarshi", info: "🌅 Qadimiy ildizlarga ega janubiy shahar!", x: "48%", y: "65%" },
        { id: 9, name: "Andijon", info: "📜 Farg'ona viloyatining tarixiy shahri!", x: "82%", y: "30%" },
        { id: 10, name: "Jizzax", info: "🚪 Go'zal vodiylar orasidagi darvoza!", x: "58%", y: "30%" },
        { id: 11, name: "Termiz", info: "🪷 Qadimiy Buddist markazi - 2500+ yil!", x: "52%", y: "85%" },
        { id: 12, name: "Navoiy", info: "🏭 Oltin tarixga ega sanoat markazi!", x: "50%", y: "55%" },
        { id: 13, name: "Qo'qon", info: "👑 Hukmdorlarning tarixiy xonlik shahri!", x: "72%", y: "32%" },
        { id: 14, name: "Urganch", info: "🏺 Sehrli Xiva yaqinidagi qadimiy shahar!", x: "25%", y: "42%" },
      ]
    },
    ru: {
      hakimHello: "🌍 Наша история начинается тысячи лет назад, в земле, где рождались мифы! Легенды шептали на ветру, формируя судьбу поколений. Нажмите на города, чтобы открыть их удивительные истории! 🏛️",
      next: "Продолжить Путешествие 🚀",
      mapHint: "🗺️ Нажмите на светящиеся города, чтобы узнать их древние секреты!",
      cities: [
        { id: 1, name: "Ташкент", info: "🌟 Яркая столица с 2000+ летней историей!", x: "65%", y: "20%" },
        { id: 2, name: "Самарканд", info: "🏛️ Древняя жемчужина Шелкового пути - 2750+ лет!", x: "55%", y: "40%" },
        { id: 3, name: "Бухара", info: "🕌 Город мечетей и медресе - живой музей!", x: "45%", y: "50%" },
        { id: 4, name: "Хива", info: "🏰 Историческая крепость с волшебной Ичан-Калой!", x: "30%", y: "45%" },
        { id: 5, name: "Нукус", info: "🎨 Столица Каракалпакстана - земля искусства!", x: "15%", y: "25%" },
        { id: 6, name: "Фергана", info: "🌄 Красивый город долины с богатой культурой!", x: "75%", y: "35%" },
        { id: 7, name: "Наманган", info: "🏔️ Город в потрясающей Ферганской долине!", x: "78%", y: "28%" },
        { id: 8, name: "Карши", info: "🌅 Южный город с древними корнями!", x: "48%", y: "65%" },
        { id: 9, name: "Андижан", info: "📜 Исторический город Ферганской области!", x: "82%", y: "30%" },
        { id: 10, name: "Джизак", info: "🚪 Врата между прекрасными долинами!", x: "58%", y: "30%" },
        { id: 11, name: "Термез", info: "🪷 Древний буддийский центр - 2500+ лет!", x: "52%", y: "85%" },
        { id: 12, name: "Навои", info: "🏭 Промышленный центр с золотой историей!", x: "50%", y: "55%" },
        { id: 13, name: "Коканд", info: "👑 Исторический город ханов и правителей!", x: "72%", y: "32%" },
        { id: 14, name: "Ургенч", info: "🏺 Древний город рядом с волшебной Хивой!", x: "25%", y: "42%" },
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
    setCurrentWordIndex(0);
    window.speechSynthesis.cancel();

    const cleanText = t.hakimHello.replace(/[🔍🌍🏛️🗺️🌟🏰🎨🌄👑🚪🏭🪷🌅📜🏔️🕌🏛️🌟]/g, '');
    const words = cleanText.split(" ");
    let currentIndex = 0;

    const utter = new SpeechSynthesisUtterance(cleanText);
    
    if (language === "ru") {
      utter.lang = "ru-RU";
    } else if (language === "uz") {
      utter.lang = "tr-TR";
    } else {
      utter.lang = "en-US";
    }

    utter.rate = 0.9;
    utter.pitch = 1.1;

    utter.onboundary = (event) => {
      if (event.name === "word") {
        if (currentIndex < words.length) {
          currentIndex++;
          setCurrentWordIndex(currentIndex);
          setBubbleText(t.hakimHello.split(" ").slice(0, currentIndex).join(" "));
        }
      }
    };

    utter.onend = () => {
      setBubbleText(t.hakimHello);
      setCurrentWordIndex(words.length);
    };

    // تشغيل الفيديو والصوت معاً
    const handlePlay = () => {
      video.play();
      window.speechSynthesis.speak(utter);
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
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

  // تأثير عند النقر على المدينة
  const handleCityClick = (city, event) => {
    setActiveCity(city);
    // إزالة التأثير بعد 5 ثواني
    setTimeout(() => {
      setActiveCity(null);
    }, 5000);
  };

  return (
    <div className="page history-page">
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
      <div className="history-robot-container">
        <img 
          ref={robotRef}
          src={robotImage} 
          alt="Hakim Robot" 
          className="history-robot-image"
          onClick={handleRobotClick}
        />
        <div className="history-speech-bubble">
          <p className="fade-in-line">
            {bubbleText}
            {isSpeaking && <span className="speaking-dots">...</span>}
          </p>
        </div>
      </div>

      {/* 🎥 الفيديو أو الخريطة */}
      <div className="history-media-container">
        {!showMap ? (
          <div className="video-container">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              onEnded={() => setShowMap(true)}
              className="history-video-player"
            />
            <div className="video-overlay">
              <p className="video-hint">🎬 Playing the amazing history...</p>
            </div>
          </div>
        ) : (
          <div className="history-map-container">
            <h3 className="map-title">{t.mapHint}</h3>
            <div className="map-wrapper">
              <img src={mapImage} alt="Silk Road Map" className="history-map-image" />
              {t.cities.map((city) => (
                <div
                  key={city.id}
                  className={`history-city-dot ${activeCity?.id === city.id ? 'active' : ''}`}
                  style={{ left: city.x, top: city.y }}
                  onClick={(e) => handleCityClick(city, e)}
                >
                  <div className="city-pulse"></div>
                </div>
              ))}
            </div>
            
            {/* معلومات المدينة */}
            {activeCity && (
              <div className="history-city-popup">
                <div className="city-popup-content">
                  <h3 className="city-name">{activeCity.name}</h3>
                  <p className="city-info">{activeCity.info}</p>
                  <button 
                    className="city-close-btn"
                    onClick={() => setActiveCity(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ⏭️ زرار Next يظهر بعد الخريطة */}
      {showMap && (
        <button className="history-next-button" onClick={onNext}>
          {t.next}
        </button>
      )}

      {/* ✨ تأثيرات جسيمات إضافية */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
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
