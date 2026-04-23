import React from "react";
import { HomeSlider } from "../../component/slider/HomeSlider";
import "./Home.scss";
import { Categories } from "../../component/categories/Categories";
import { Contact } from "../../component/contact/Contact";
import { FeaturedData } from "../../component/FeaturedData/FeaturedData";
import { Cart } from "../../component/cart/Cart";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { lang } = useLanguage();

  return (
    <div className="home">
      <NavBar />
      {/* {isAuthenticated && (
        <div className="welcome-banner">
          <div className="welcome-content">
            <h2>
              {lang === "en" 
                ? `Welcome back, ${user?.firstName}!` 
                : `مرحباً بعودتك، ${user?.firstName}!`
              }
            </h2>
            <p>
              {lang === "en" 
                ? "Discover our latest collections and exclusive offers just for you." 
                : "اكتشف أحدث مجموعاتنا والعروض الحصرية المخصصة لك."
              }
            </p>
            <Link to="/profile" className="profile-link">
              {lang === "en" ? "View Profile" : "عرض الملف الشخصي"}
            </Link>
          </div>
        </div>
      )} */}
      <HomeSlider />
      <FeaturedData type="featured" />
      <Categories />
      <FeaturedData type="trending" />
      <Contact />
      <Footer />
    </div>
  );
};
