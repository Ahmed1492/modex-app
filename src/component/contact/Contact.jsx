import React, { useState } from "react";
import "./Contact.scss";
import { useLanguage } from "../../context/LanguageContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const t = {
  en: {
    heading: "Stay in the Loop",
    sub: "Subscribe to get exclusive deals, new arrivals, and style inspiration delivered to your inbox.",
    placeholder: "Enter your email address",
    btn: "Subscribe",
    success: "You're subscribed! 🎉",
    follow: "Follow us",
  },
  ar: {
    heading: "ابقَ على اطلاع",
    sub: "اشترك للحصول على عروض حصرية ووصولات جديدة وإلهام أسلوبي مباشرة في بريدك الإلكتروني.",
    placeholder: "أدخل عنوان بريدك الإلكتروني",
    btn: "اشترك",
    success: "تم الاشتراك! 🎉",
    follow: "تابعنا",
  },
};

export const Contact = () => {
  const { lang } = useLanguage();
  const tr = t[lang];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-text">
          <h2>{tr.heading}</h2>
          <p>{tr.sub}</p>
        </div>

        <div className="newsletter-right">
          {subscribed ? (
            <div className="success-msg">{tr.success}</div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tr.placeholder}
                required
              />
              <button type="submit">{tr.btn}</button>
            </form>
          )}

          <div className="social-links">
            <span>{tr.follow}</span>
            <div className="icons">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
