import React, { useState } from "react";
import { NavBar } from "../../component/navbar/NavBar";
import { Footer } from "../../component/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Checkout.scss";

const translations = {
  en: {
    title: "Checkout",
    shipping: "Shipping Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    country: "Country",
    payment: "Payment Method",
    card: "Credit / Debit Card",
    cash: "Cash on Delivery",
    cardNumber: "Card Number",
    cardName: "Name on Card",
    expiry: "Expiry Date",
    cvv: "CVV",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping2: "Shipping",
    free: "Free",
    total: "Total",
    placeOrder: "Place Order",
    items: "items",
    successTitle: "Order Placed!",
    successMsg: "Thank you for your order. We'll send a confirmation to your email shortly.",
    continueShopping: "Continue Shopping",
  },
  ar: {
    title: "إتمام الطلب",
    shipping: "معلومات الشحن",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    country: "الدولة",
    payment: "طريقة الدفع",
    card: "بطاقة ائتمان / خصم",
    cash: "الدفع عند الاستلام",
    cardNumber: "رقم البطاقة",
    cardName: "الاسم على البطاقة",
    expiry: "تاريخ الانتهاء",
    cvv: "CVV",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping2: "الشحن",
    free: "مجاني",
    total: "الإجمالي",
    placeOrder: "تأكيد الطلب",
    items: "منتجات",
    successTitle: "تم تقديم الطلب!",
    successMsg: "شكراً لطلبك. سنرسل تأكيداً إلى بريدك الإلكتروني قريباً.",
    continueShopping: "مواصلة التسوق",
  },
};

export const Checkout = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", country: "",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      dispatch(reset());
    }, 1200);
  };

  if (success) {
    return (
      <>
        <NavBar />
        <div className="checkout-success">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>{t.successTitle}</h2>
            <p>{t.successMsg}</p>
            <button onClick={() => navigate("/")} className="continue-btn">
              {t.continueShopping}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="checkout-page">
        <h1 className="checkout-title">{t.title}</h1>

        <div className="checkout-layout">
          {/* Left — form */}
          <form className="checkout-form" onSubmit={handleSubmit}>

            {/* Shipping */}
            <section className="form-section">
              <h3>{t.shipping}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.firstName}</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t.lastName}</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.email}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t.phone}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group full">
                <label>{t.address}</label>
                <input name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.city}</label>
                  <input name="city" value={form.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t.country}</label>
                  <input name="country" value={form.country} onChange={handleChange} required />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="form-section">
              <h3>{t.payment}</h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                  <input type="radio" value="card" checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")} />
                  💳 {t.card}
                </label>
                <label className={`payment-option ${paymentMethod === "cash" ? "selected" : ""}`}>
                  <input type="radio" value="cash" checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")} />
                  💵 {t.cash}
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-fields">
                  <div className="form-group full">
                    <label>{t.cardNumber}</label>
                    <input name="cardNumber" placeholder="1234 5678 9012 3456"
                      value={form.cardNumber} onChange={handleChange} required />
                  </div>
                  <div className="form-group full">
                    <label>{t.cardName}</label>
                    <input name="cardName" value={form.cardName} onChange={handleChange} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.expiry}</label>
                      <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>{t.cvv}</label>
                      <input name="cvv" placeholder="123" maxLength={4} value={form.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? "..." : t.placeOrder}
            </button>
          </form>

          {/* Right — order summary */}
          <div className="order-summary">
            <h3>{t.orderSummary}</h3>
            <p className="item-count">{cartItems.products.length} {t.items}</p>

            <div className="summary-items">
              {cartItems.products.map((item, i) => (
                <div key={i} className="summary-item">
                  <img src={item.images?.[0]} alt={item.title} />
                  <div className="summary-item-info">
                    <p className="summary-item-title">{item.title}</p>
                    <p className="summary-item-qty">x{item.productQuantity}</p>
                  </div>
                  <p className="summary-item-price">
                    {(+item.currentPrice * item.productQuantity).toFixed(2)} EGP
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>{t.subtotal}</span>
                <span>{(+cartItems.totalPrice).toFixed(2)} EGP</span>
              </div>
              <div className="summary-row">
                <span>{t.shipping2}</span>
                <span className="free">{t.free}</span>
              </div>
              <div className="summary-row total-row">
                <span>{t.total}</span>
                <span>{(+cartItems.totalPrice).toFixed(2)} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
