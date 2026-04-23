import { Card } from "../card/Card";
import "./FeaturedData.scss";
import { useEffect, useState } from "react";
import { featuredProducts, trendingProducts } from "../../mocks";
import { useLanguage } from "../../context/LanguageContext";

const sectionText = {
  en: {
    featured: { title: "Featured", desc: "Discover our hand-picked featured collection — timeless styles crafted for every occasion." },
    trending: { title: "Trending", desc: "Stay ahead of the curve with our trending picks — the styles everyone is talking about right now." },
  },
  ar: {
    featured: { title: "منتجات مميزة", desc: "اكتشف مجموعتنا المميزة المختارة بعناية — أناقة خالدة مصممة لكل مناسبة." },
    trending: { title: "الأكثر رواجاً", desc: "ابقَ في طليعة الموضة مع أحدث اختياراتنا الرائجة — الأساليب التي يتحدث عنها الجميع الآن." },
  },
};

export const FeaturedData = ({ type }) => {
  const [feturedData, setFeturedData] = useState([]);
  const { lang } = useLanguage();

  useEffect(() => {
    if (type === "featured") setFeturedData(featuredProducts);
    else if (type === "trending") setFeturedData(trendingProducts);
  }, [type]);

  const text = sectionText[lang]?.[type] || sectionText.en[type];

  return (
    <div className="featuredData">
      <div className="container">
        <div className="section-header">
          <div className="header-left">
            <h2>{text.title}</h2>
            <p>{text.desc}</p>
          </div>
        </div>
      </div>
      <div className="cards-container">
        {Array.isArray(feturedData) && feturedData.length > 0 ? (
          feturedData.map((item, index) => (
            <Card type={type} key={item.id} index={index} feturedData={item} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};
