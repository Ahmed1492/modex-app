import React from "react";
import "./footer.scss";
import payment from "../../img/payment.png";
import { useLanguage } from "../../context/LanguageContext";

const t = {
  en: {
    category: "Category", women: "Women", men: "Men", shoes: "Shoes", accessory: "Accessory",
    links: "Links", faq: "FAQ", pages: "Pages", store: "Store", compare: "Compare",
    about: "About",
    aboutText: "A modern fashion store offering the latest trends for men, women, and children. Quality you can trust, style you'll love.",
    contact: "Contact",
    contactText: "Reach us at support@modex.com or visit our stores across the country. We're happy to help you find your perfect look.",
    copyright: "All Rights Reserved ©",
    by: "By",
  },
  ar: {
    category: "الفئات", women: "نساء", men: "رجال", shoes: "أحذية", accessory: "إكسسوارات",
    links: "روابط", faq: "الأسئلة الشائعة", pages: "الصفحات", store: "المتجر", compare: "المقارنة",
    about: "عن المتجر",
    aboutText: "متجر أزياء عصري يقدم أحدث صيحات الموضة للرجال والنساء والأطفال. جودة يمكنك الوثوق بها وأناقة ستعشقها.",
    contact: "تواصل معنا",
    contactText: "تواصل معنا على support@modex.com أو زر متاجرنا في جميع أنحاء البلاد. يسعدنا مساعدتك في إيجاد إطلالتك المثالية.",
    copyright: "جميع الحقوق محفوظة ©",
    by: "بواسطة",
  },
};

export const Footer = ({ footerRef }) => {
  const { lang } = useLanguage();
  const tr = t[lang];

  return (
    <div ref={footerRef} className="footer">
      <div className="wrapper">
        <div className="top">
          <div className="item">
            <h3>{tr.category}</h3>
            <p>{tr.women}</p>
            <p>{tr.men}</p>
            <p>{tr.shoes}</p>
            <p>{tr.accessory}</p>
          </div>
          <div className="item">
            <h3>{tr.links}</h3>
            <p>{tr.faq}</p>
            <p>{tr.pages}</p>
            <p>{tr.store}</p>
            <p>{tr.compare}</p>
          </div>
          <div className="item itemp">
            <h3>{tr.about}</h3>
            <p className="textItem">{tr.aboutText}</p>
          </div>
          <div className="item itemp">
            <h3>{tr.contact}</h3>
            <p className="textItem">{tr.contactText}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="item">
              <h2>Modex</h2>
              <p>
                {tr.copyright} {tr.by}{" "}
                <span className="signeture">Ahmed Mohamed</span>
              </p>
            </div>
          </div>
          <div className="right">
            <img src={payment} alt="payment methods" />
          </div>
        </div>
      </div>
    </div>
  );
};
