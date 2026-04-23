import React, { useState, useEffect } from "react";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import "./Register.scss";

const translations = {
  en: {
    title: "Create Account",
    subtitle: "Join us and start your journey",
    firstName: "First Name",
    firstNamePlaceholder: "Enter your first name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Create a password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your password",
    terms: "I agree to the Terms of Service and Privacy Policy",
    btn: "Create Account",
    hasAccount: "Already have an account?",
    signin: "Sign In",
    or: "or",
    passwordStrength: {
      weak: "Weak",
      medium: "Medium", 
      strong: "Strong"
    }
  },
  ar: {
    title: "إنشاء حساب",
    subtitle: "انضم إلينا وابدأ رحلتك",
    firstName: "الاسم الأول",
    firstNamePlaceholder: "أدخل اسمك الأول",
    lastName: "اسم العائلة",
    lastNamePlaceholder: "أدخل اسم العائلة",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أنشئ كلمة مرور",
    confirmPassword: "تأكيد كلمة المرور",
    confirmPasswordPlaceholder: "أكد كلمة المرور",
    terms: "أوافق على شروط الخدمة وسياسة الخصوصية",
    btn: "إنشاء حساب",
    hasAccount: "لديك حساب بالفعل؟",
    signin: "تسجيل الدخول",
    or: "أو",
    passwordStrength: {
      weak: "ضعيفة",
      medium: "متوسطة",
      strong: "قوية"
    }
  },
};

export const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const { lang } = useLanguage();
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = lang === "ar" ? "الاسم الأول مطلوب" : "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = lang === "ar" ? "اسم العائلة مطلوب" : "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صحيح" : "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = lang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = lang === "ar" ? "تأكيد كلمة المرور مطلوب" : "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = lang === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = lang === "ar" ? "يجب الموافقة على الشروط" : "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // Simulate network delay
    setTimeout(() => {
      const result = register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setErrors({ general: result.error });
      }

      setLoading(false);
    }, 1000);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak": return "#ef4444";
      case "medium": return "#f59e0b";
      case "strong": return "#10b981";
      default: return "#e5e7eb";
    }
  };

  const getPasswordStrengthWidth = () => {
    switch (passwordStrength) {
      case "weak": return "33%";
      case "medium": return "66%";
      case "strong": return "100%";
      default: return "0%";
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-page register-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>

            {errors.general && (
              <div className="error-alert">
                <span>⚠️</span>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t.firstName}</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder={t.firstNamePlaceholder}
                    value={form.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">{t.lastName}</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder={t.lastNamePlaceholder}
                    value={form.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.email}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
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
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{
                          width: getPasswordStrengthWidth(),
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {t.passwordStrength[passwordStrength]}
                    </span>
                  </div>
                )}
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">{t.confirmPassword}</label>
                <div className="password-input">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={t.confirmPasswordPlaceholder}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

              <div className="form-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">{t.terms}</span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
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
                {t.hasAccount}{" "}
                <Link to="/login" className="auth-link">
                  {t.signin}
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