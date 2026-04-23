import { useEffect, useState } from "react";
import "./Cart.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const translations = {
  en: {
    subtotal: "SUBTOTAL",
    checkout: "PROCEED TO CHECKOUT",
    reset: "RESET THE CART",
    empty: "Your cart is empty",
  },
  ar: {
    subtotal: "المجموع الفرعي",
    checkout: "إتمام الطلب",
    reset: "إفراغ السلة",
    empty: "سلة التسوق فارغة",
  },
};

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleReset = () => dispatch(reset());

  const handleRemoveItem = (item) => dispatch(removeFromCart(item));

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      // Save intended destination then redirect to login
      navigate("/login", { state: { redirectTo: "/checkout" } });
    }
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="allProducts">
          {cartItems.products.length === 0 ? (
            <p className="empty-cart">{t.empty}</p>
          ) : (
            <>
              {cartItems.products.map((item, index) => (
                <div key={index} className="product">
                  <div className="productImage">
                    <img src={item.images[0]} alt={item.title} />
                  </div>
                  <div className="productDetails">
                    <div className="description">
                      <p>{lang === "ar" && item.title_ar ? item.title_ar : item.title}</p>
                      <span>
                        {item.productQuantity} x {item.currentPrice} EGP
                      </span>
                    </div>
                    <div onClick={() => handleRemoveItem(item)} className="delete">
                      <DeleteOutlineIcon />
                    </div>
                  </div>
                </div>
              ))}

              <div className="total">
                <h4>{t.subtotal}</h4>
                <p>{(+cartItems.totalPrice).toFixed(2)} EGP</p>
              </div>

              <div className="checkOut">
                <button onClick={handleCheckout}>{t.checkout}</button>
              </div>
            </>
          )}

          {cartItems.products.length > 0 && (
            <div onClick={handleReset} className="reset">
              <p>{t.reset}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
