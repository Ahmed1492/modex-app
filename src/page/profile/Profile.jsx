import React from 'react';
import { NavBar } from '../../component/navbar/NavBar';
import { Footer } from '../../component/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './Profile.scss';

const translations = {
  en: {
    title: "My Profile",
    subtitle: "Manage your account information",
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    memberSince: "Member Since",
    loginTime: "Last Login",
    accountStats: "Account Statistics",
    totalOrders: "Total Orders",
    wishlistItems: "Wishlist Items",
    cartItems: "Cart Items"
  },
  ar: {
    title: "ملفي الشخصي",
    subtitle: "إدارة معلومات حسابك",
    personalInfo: "المعلومات الشخصية",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    memberSince: "عضو منذ",
    loginTime: "آخر تسجيل دخول",
    accountStats: "إحصائيات الحساب",
    totalOrders: "إجمالي الطلبات",
    wishlistItems: "عناصر المفضلة",
    cartItems: "عناصر السلة"
  }
};

export const Profile = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = translations[lang];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="user-avatar">
              <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
            </div>
            <div className="user-info">
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>
          </div>

          <div className="profile-content">
            <div className="info-card">
              <h2>{t.personalInfo}</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>{t.firstName}</label>
                  <span>{user?.firstName}</span>
                </div>
                <div className="info-item">
                  <label>{t.lastName}</label>
                  <span>{user?.lastName}</span>
                </div>
                <div className="info-item">
                  <label>{t.email}</label>
                  <span>{user?.email}</span>
                </div>
                <div className="info-item">
                  <label>{t.memberSince}</label>
                  <span>{formatDate(user?.registeredAt)}</span>
                </div>
                <div className="info-item">
                  <label>{t.loginTime}</label>
                  <span>{formatDate(user?.loginTime)}</span>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <h2>{t.accountStats}</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">{t.totalOrders}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">{t.wishlistItems}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">{t.cartItems}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};