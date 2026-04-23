import { Link } from "react-router-dom";
import "./Card.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishList, removeFromWishList } from "../../redux/wishListSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useToastContext } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";

function truncateString(str) {
  return str.length > 30 ? str.slice(0, 30) : str;
}

export const Card = ({ feturedData, type, index }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const { showCartToast, showFavoriteToast } = useToastContext();
  const { lang } = useLanguage();

  const displayTitle =
    lang === "ar" && feturedData.title_ar ? feturedData.title_ar : feturedData.title;

  const checkIfItemInWishList = () => {
    return wishList.products.find(
      (pro) => pro.id === feturedData.id && pro.title === feturedData.title
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);

    dispatch(addToCart({
      ...feturedData,
      productQuantity: 1,
      totalPrice: feturedData.currentPrice,
    }));

    showCartToast(feturedData.title);

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTogglingFavorite(true);

    const isInWishList = checkIfItemInWishList();

    if (isInWishList) {
      dispatch(removeFromWishList(feturedData));
      showFavoriteToast(feturedData.title, false);
    } else {
      // Always store category + type so WishList can build the correct link
      dispatch(addToWishList({ ...feturedData, category: type, type: feturedData.type || null }));
      showFavoriteToast(feturedData.title, true);
    }

    setTimeout(() => {
      setIsTogglingFavorite(false);
    }, 600);
  };

  return (
    <div className="card-wrapper">
      <Link to={`product/${type}/${feturedData.id}`}>
        <div className="card">
          <div className="card-actions">
            <button
              className={`action-btn favorite-btn ${isTogglingFavorite ? "toggling" : ""} ${checkIfItemInWishList() ? "active" : ""}`}
              onClick={handleToggleFavorite}
              title={checkIfItemInWishList() ? "Remove from favorites" : "Add to favorites"}
            >
              {checkIfItemInWishList() ? (
                <FavoriteIcon className="icon filled" />
              ) : (
                <FavoriteBorderIcon className="icon" />
              )}
            </button>
            <button
              className={`action-btn cart-btn ${isAddingToCart ? "adding" : ""}`}
              onClick={handleAddToCart}
              title="Add to cart"
            >
              <ShoppingCartIcon className="icon" />
            </button>
          </div>

          <div className="images">
            {feturedData.images.length > 1 ? (
              <>
                <img className="img1" src={feturedData?.images[0]} alt="" />
                <img className="img2" src={feturedData?.images[1]} alt="" />
              </>
            ) : (
              <img className="img" src={feturedData?.images[0]} alt="" />
            )}
          </div>
        </div>
      </Link>
      <div className="texts">
        <h3>{truncateString(displayTitle)}</h3>
        <div className="price">
          <del>{feturedData.oldPrice}</del>
          <p>${feturedData.currentPrice}</p>
        </div>
      </div>
    </div>
  );
};
