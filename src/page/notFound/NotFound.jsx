import React from "react";
import "./NotFound.scss";
import { NavBar } from "../../component/navbar/NavBar";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export const NotFound = () => {
  const { lang } = useLanguage();
  return (
    <>
      <NavBar />
      <div className="notFoundPage">
        <div className="notFound-content">
          <div className="error-code">404</div>
          <h2>{lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}</h2>
          <p>{lang === "ar" ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها." : "Sorry, the page you're looking for doesn't exist or has been moved."}</p>
          <Link to="/" className="home-btn">
            {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </>
  );
};
