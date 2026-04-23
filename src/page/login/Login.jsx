import React, { useState, useEffect } from "react";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";

const translations = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to your account to continue",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember me",
    forgot: "Forgot password?",
    btn: "Sign In",
    noAccount: "Don't have an account?",
    signup: "Sign up",
    or: "or",
  },
  ar: {
    title: "مرحباً بعودتك",
    subtitle: "سجل دخولك لحسابك للمتابعة",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    remember: "تذكرني",
    forgot: "نسيت كلمة المرور؟",
    btn: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    signup: "إنشاء حساب",
    or: "أو",
  },
};

export const Login = ({ redirectTo = "/" }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { lang } = useLanguage();
  const { loginWithCredentials, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from || redirectTo;
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state, redirectTo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return lang === "ar" ? "البريد الإلكتروني غير صحيح" : "Please enter a valid email";
    }
    if (!form.password) {
      return lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    }
    if (form.password.length < 6) {
      return lang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      const result = loginWithCredentials(form.email, form.password);
      
      if (result.success) {
        const redirectPath = location.state?.from || redirectTo;
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <NavBar />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>

            {error && (
              <div className="error-alert">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">{t.email}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t.password}</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t.passwordPlaceholder}
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  {t.remember}
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  {t.forgot}
                </Link>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <div className="spinner"></div> : t.btn}
              </button>
            </form>

            <div className="divider">
              <span>{t.or}</span>
            </div>

            <div className="auth-footer">
              <p>
                {t.noAccount}{" "}
                <Link to="/register" className="auth-link">
                  {t.signup}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
