import React from "react";
import "./About.scss";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

const content = {
  en: {
    hero: "About Us",
    heroSub: "We believe fashion is more than clothing — it's a way of expressing who you are.",
    story: "Our Story",
    storyText1: "Founded with a passion for style and quality, our store has been bringing the latest fashion trends to customers across the country. We curate collections for men, women, and children — ensuring there's something for everyone.",
    storyText2: "From everyday essentials to statement pieces, every item in our store is selected with care, quality, and affordability in mind.",
    mission: "Our Mission",
    missionText: "To make premium fashion accessible to everyone, while delivering an exceptional shopping experience both online and in-store.",
    values: "Our Values",
    v1: "Quality First",
    v1t: "Every product is carefully selected to meet our high standards.",
    v2: "Customer Focus",
    v2t: "Your satisfaction is our top priority, always.",
    v3: "Sustainability",
    v3t: "We're committed to responsible and ethical fashion practices.",
    v4: "Inclusivity",
    v4t: "Fashion for every body, every age, every style.",
    cta: "Start Shopping",
    stats: [
      { value: "10K+", label: "Happy Customers" },
      { value: "500+", label: "Products" },
      { value: "5+", label: "Years Experience" },
      { value: "4.9★", label: "Average Rating" },
    ],
  },
  ar: {
    hero: "من نحن",
    heroSub: "نؤمن بأن الموضة أكثر من مجرد ملابس — إنها طريقة للتعبير عن هويتك.",
    story: "قصتنا",
    storyText1: "تأسس متجرنا بشغف للأناقة والجودة، وقد كنا نجلب أحدث صيحات الموضة للعملاء في جميع أنحاء البلاد. نختار مجموعات للرجال والنساء والأطفال — لضمان وجود شيء للجميع.",
    storyText2: "من الأساسيات اليومية إلى القطع المميزة، كل عنصر في متجرنا يُختار بعناية مع مراعاة الجودة والسعر المناسب.",
    mission: "مهمتنا",
    missionText: "جعل الموضة الراقية في متناول الجميع، مع تقديم تجربة تسوق استثنائية.",
    values: "قيمنا",
    v1: "الجودة أولاً",
    v1t: "كل منتج يُختار بعناية ليلبي معاييرنا العالية.",
    v2: "التركيز على العميل",
    v2t: "رضاك هو أولويتنا القصوى دائماً.",
    v3: "الاستدامة",
    v3t: "نلتزم بممارسات الموضة المسؤولة والأخلاقية.",
    v4: "الشمولية",
    v4t: "موضة لكل جسم، كل عمر، كل أسلوب.",
    cta: "ابدأ التسوق",
    stats: [
      { value: "+10K", label: "عميل سعيد" },
      { value: "+500", label: "منتج" },
      { value: "+5", label: "سنوات خبرة" },
      { value: "4.9★", label: "متوسط التقييم" },
    ],
  },
};

export const About = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <>
      <NavBar />
      <div className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>{t.hero}</h1>
            <p>{t.heroSub}</p>
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          <div className="stats-container">
            {t.stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="about-story">
          <div className="story-container">
            <div className="story-image">
              <img src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Our store" />
            </div>
            <div className="story-text">
              <h2>{t.story}</h2>
              <p>{t.storyText1}</p>
              <p>{t.storyText2}</p>
              <div className="mission-box">
                <h3>{t.mission}</h3>
                <p>{t.missionText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <div className="values-container">
            <h2>{t.values}</h2>
            <div className="values-grid">
              {[
                { icon: "⭐", title: t.v1, text: t.v1t },
                { icon: "💙", title: t.v2, text: t.v2t },
                { icon: "🌿", title: t.v3, text: t.v3t },
                { icon: "🤝", title: t.v4, text: t.v4t },
              ].map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>{lang === "ar" ? "مستعد للتسوق؟" : "Ready to Shop?"}</h2>
          <Link to="/" className="cta-btn">{t.cta}</Link>
        </section>
      </div>
      <Footer />
    </>
  );
};
