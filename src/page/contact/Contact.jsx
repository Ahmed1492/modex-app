import React, { useState } from "react";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { useLanguage } from "../../context/LanguageContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SendIcon from "@mui/icons-material/Send";
import "./Contact.scss";

const content = {
  en: {
    hero: "Get in Touch",
    heroSub: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    infoTitle: "Contact Information",
    email: "support@store.com",
    phone: "+20 100 000 0000",
    address: "123 Fashion Street, Cairo, Egypt",
    hours: "Mon – Sat: 9:00 AM – 9:00 PM",
    formTitle: "Send a Message",
    name: "Full Name",
    namePh: "Enter your full name",
    emailLabel: "Email Address",
    emailPh: "Enter your email",
    subject: "Subject",
    subjectPh: "What is this about?",
    message: "Message",
    messagePh: "Write your message here…",
    send: "Send Message",
    sending: "Sending…",
    successTitle: "Message Sent! 🎉",
    successMsg: "Thank you for reaching out. We'll get back to you within 24 hours.",
    follow: "Follow Us",
    newsletter: "Newsletter",
    newsletterSub: "Subscribe for exclusive deals and new arrivals.",
    newsletterPh: "Your email address",
    subscribe: "Subscribe",
    subscribed: "Subscribed! 🎉",
  },
  ar: {
    hero: "تواصل معنا",
    heroSub: "يسعدنا سماعك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
    infoTitle: "معلومات التواصل",
    email: "support@store.com",
    phone: "+20 100 000 0000",
    address: "123 شارع الموضة، القاهرة، مصر",
    hours: "الاثنين – السبت: 9 ص – 9 م",
    formTitle: "أرسل رسالة",
    name: "الاسم الكامل",
    namePh: "أدخل اسمك الكامل",
    emailLabel: "البريد الإلكتروني",
    emailPh: "أدخل بريدك الإلكتروني",
    subject: "الموضوع",
    subjectPh: "ما موضوع رسالتك؟",
    message: "الرسالة",
    messagePh: "اكتب رسالتك هنا…",
    send: "إرسال الرسالة",
    sending: "جاري الإرسال…",
    successTitle: "تم الإرسال! 🎉",
    successMsg: "شكراً لتواصلك معنا. سنرد عليك خلال 24 ساعة.",
    follow: "تابعنا",
    newsletter: "النشرة البريدية",
    newsletterSub: "اشترك للحصول على عروض حصرية ووصولات جديدة.",
    newsletterPh: "بريدك الإلكتروني",
    subscribe: "اشترك",
    subscribed: "تم الاشتراك! 🎉",
  },
};

export const Contact = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletter.trim()) { setSubscribed(true); setNewsletter(""); }
  };

  const infoItems = [
    { icon: <EmailOutlinedIcon />,    label: t.email   },
    { icon: <PhoneOutlinedIcon />,    label: t.phone   },
    { icon: <LocationOnOutlinedIcon />, label: t.address },
    { icon: <AccessTimeOutlinedIcon />, label: t.hours  },
  ];

  return (
    <>
      <NavBar />
      <div className="contact-page">

        {/* ── Hero ── */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1>{t.hero}</h1>
            <p>{t.heroSub}</p>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="contact-main">

          {/* Left — info */}
          <div className="contact-info">
            <h2>{t.infoTitle}</h2>

            <div className="info-list">
              {infoItems.map((item, i) => (
                <div key={i} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="contact-social">
              <p>{t.follow}</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"  className="social-btn facebook"><FacebookIcon /></a>
                <a href="#" aria-label="Instagram" className="social-btn instagram"><InstagramIcon /></a>
                <a href="#" aria-label="Twitter"   className="social-btn twitter"><TwitterIcon /></a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="contact-newsletter">
              <h3>{t.newsletter}</h3>
              <p>{t.newsletterSub}</p>
              {subscribed ? (
                <div className="nl-success">{t.subscribed}</div>
              ) : (
                <form className="nl-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    placeholder={t.newsletterPh}
                    required
                  />
                  <button type="submit">{t.subscribe}</button>
                </form>
              )}
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-wrap">
            <h2>{t.formTitle}</h2>

            {sent ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>{t.successTitle}</h3>
                <p>{t.successMsg}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.name}</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder={t.namePh} required />
                  </div>
                  <div className="form-group">
                    <label>{t.emailLabel}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder={t.emailPh} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.subject}</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder={t.subjectPh} required />
                </div>

                <div className="form-group">
                  <label>{t.message}</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder={t.messagePh} rows={6} required />
                </div>

                <button type="submit" className="send-btn" disabled={sending}>
                  {sending ? t.sending : <><SendIcon /> {t.send}</>}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
