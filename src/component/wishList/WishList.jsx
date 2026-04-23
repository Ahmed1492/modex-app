import React from "react";
import "./WishList.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList } from "../../redux/wishListSlice";
import { NavBar } from "../navbar/NavBar";
import { Footer } from "../Footer/Footer";
import { useLanguage } from "../../context/LanguageContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const WishList = () => {
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const { lang } = useLanguage();

  const checkIsCategoryHasType = (item) =>
    item.category === "men" || item.category === "woman" || item.category === "children";

  const handleRemove = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWishList(item));
  };

  const buildProductLink = (item) => {
    // Categories that have a sub-type in the URL
    const typedCategories = ["men", "woman", "children"];

    // featured/trending are virtual sections — their products belong to real categories
    // but we stored them with category="featured" or "trending".
    // Route them as /product/{category}/{id} (no type segment)
    const noTypeCategories = ["featured", "trending", "sale", "newSesson", "bags", "accessories"];

    if (typedCategories.includes(item.category) && item.type && item.type !== "undefined" && item.type !== "null") {
      return `/product/${item.category}/${item.type}/${item.id}`;
    }

    return `/product/${item.category}/${item.id}`;
  };

  const displayTitle = (item) =>
    lang === "ar" && item.title_ar ? item.title_ar : item.title;

  return (
    <>
      <NavBar />
      <div className="wishList">
        <div className="wishList-header">
          <FavoriteIcon className="heart-icon" />
          <h1>{lang === "ar" ? "قائمة المفضلة" : "My Wishlist"}</h1>
          <p className="count">
            {wishList.products.length}{" "}
            {lang === "ar" ? "منتج" : `item${wishList.products.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {wishList.products.length === 0 ? (
          <div className="empty-wishlist">
            <FavoriteIcon className="empty-icon" />
            <h3>{lang === "ar" ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}</h3>
            <p>{lang === "ar" ? "أضف منتجات تعجبك لتجدها هنا" : "Save items you love and find them here"}</p>
            <Link to="/" className="shop-btn">
              {lang === "ar" ? "تسوق الآن" : "Start Shopping"}
            </Link>
          </div>
        ) : (
          <div className="allProducts">
            {wishList.products.map((item, index) => (
              <Link
                key={index}
                to={buildProductLink(item)}
                className="singleProduct"
              >
                <div className="image">
                  <img src={item?.images[0]} alt={displayTitle(item)} />
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemove(e, item)}
                    title={lang === "ar" ? "إزالة" : "Remove"}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
                <div className="info">
                  <p className="proTitle">{displayTitle(item)}</p>
                  <div className="price">
                    <del>{item.oldPrice} EGP</del>
                    <p>{item.currentPrice} EGP</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
