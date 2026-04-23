import React, { useState, useEffect, useCallback } from "react";
import "./HomeSlider.scss";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useLanguage } from "../../context/LanguageContext";

const slidesData = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    en: {
      tag: "New Collection",
      title: "Elevate Your\nStyle",
      subtitle: "Discover the latest trends in fashion. Premium quality pieces crafted for the modern lifestyle.",
      cta: "Shop Women",
    },
    ar: {
      tag: "مجموعة جديدة",
      title: "ارتقِ\nبأسلوبك",
      subtitle: "اكتشفي أحدث صيحات الموضة. قطع فاخرة مصممة لأسلوب الحياة العصري.",
      cta: "تسوقي الآن",
    },
    link: "/products/woman",
    align: "left",
    accent: "#667eea",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/4062467/pexels-photo-4062467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    en: {
      tag: "New Season",
      title: "Men's\nEssentials",
      subtitle: "Timeless classics and bold new styles. Build your perfect wardrobe this season.",
      cta: "Shop Men",
    },
    ar: {
      tag: "موسم جديد",
      title: "أساسيات\nالرجال",
      subtitle: "كلاسيكيات خالدة وأساليب جريئة. ابنِ خزانة ملابسك المثالية هذا الموسم.",
      cta: "تسوق الآن",
    },
    link: "/products/men",
    align: "right",
    accent: "#2196f3",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1600",
    en: {
      tag: "Up to 50% Off",
      title: "Season\nSale",
      subtitle: "Don't miss out on our biggest sale of the year. Limited time offers on top brands.",
      cta: "Shop Sale",
    },
    ar: {
      tag: "خصم حتى ٥٠٪",
      title: "تخفيضات\nالموسم",
      subtitle: "لا تفوّت أكبر تخفيضاتنا هذا العام. عروض محدودة على أفضل الماركات.",
      cta: "تسوق التخفيضات",
    },
    link: "/products/sale",
    align: "left",
    accent: "#ff4757",
  },
];

export const HomeSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { lang } = useLanguage();

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prev = () => {
    const index = current === 0 ? slidesData.length - 1 : current - 1;
    goTo(index);
  };

  const next = useCallback(() => {
    const index = current === slidesData.length - 1 ? 0 : current + 1;
    goTo(index);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slidesData[current];
  const t = slide[lang] || slide.en;

  // For RTL: flip arrow directions
  const PrevIcon = lang === "ar" ? EastIcon : WestIcon;
  const NextIcon = lang === "ar" ? WestIcon : EastIcon;

  return (
    <div className="home-slider">
      {/* Slides */}
      {slidesData.map((s, i) => (
        <div key={s.id} className={`slide ${i === current ? "active" : ""}`}>
          <div className="slide-bg" style={{ backgroundImage: `url(${s.image})` }} />
          <div className="slide-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className={`slide-content align-${slide.align}`} key={`${current}-${lang}`}>
        <div className="content-inner">
          <span className="slide-tag" style={{ background: slide.accent }}>
            {t.tag}
          </span>
          <h1 className="slide-title">
            {t.title.split("\n").map((line, i) => (
              <span key={i} className="title-line" style={{ animationDelay: `${i * 0.1}s` }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="slide-subtitle">{t.subtitle}</p>
          <Link to={slide.link} className="slide-cta" style={{ "--accent": slide.accent }}>
            {t.cta}
            <NextIcon className="cta-arrow" />
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" key={`${current}-progress`} />
      </div>

      {/* Arrows */}
      <button className="arrow arrow-prev" onClick={prev} aria-label="Previous slide">
        <PrevIcon />
      </button>
      <button className="arrow arrow-next" onClick={next} aria-label="Next slide">
        <NextIcon />
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {slidesData.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="dot-fill" />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="slide-counter">
        <span className="current">{String(current + 1).padStart(2, "0")}</span>
        <span className="separator" />
        <span className="total">{String(slidesData.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
};
