import { useContext, useEffect, useState } from "react";
import "./Product.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { NavBar } from "../navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishList, removeFromWishList } from "../../redux/wishListSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { ClipLoader } from "react-spinners";
import { getProductById } from "../../mocks";
import { useToastContext } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../Footer/Footer";

const ui = {
  en: {
    quantity: "Quantity",
    addToCart: "ADD TO CART",
    adding: "ADDING...",
    addFav: "Add to Wishlist",
    removeFav: "Remove from Wishlist",
    oldPrice: "Original",
    price: "Price",
    shipping: "Free shipping on orders over 500 EGP",
    returns: "Easy 30-day returns",
    vendor: "Vendor",
    type: "Product Type",
    tag: "Tags",
    description: "Description",
    additionalInfo: "Additional Information",
    faq: "FAQ",
  },
  ar: {
    quantity: "الكمية",
    addToCart: "أضف إلى السلة",
    adding: "جاري الإضافة...",
    addFav: "أضف للمفضلة",
    removeFav: "إزالة من المفضلة",
    oldPrice: "السعر الأصلي",
    price: "السعر",
    shipping: "شحن مجاني للطلبات فوق 500 جنيه",
    returns: "إرجاع سهل خلال 30 يوماً",
    vendor: "البائع",
    type: "نوع المنتج",
    tag: "الوسوم",
    description: "الوصف",
    additionalInfo: "معلومات إضافية",
    faq: "الأسئلة الشائعة",
  },
};

export const Product = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const { data, setData } = useContext(MyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [product, setProduct] = useState({});
  const wishList = useSelector((state) => state.wishList);
  const { showCartToast, showFavoriteToast } = useToastContext();
  const { lang } = useLanguage();
  const tr = ui[lang];

  const displayTitle = lang === "ar" && product.title_ar ? product.title_ar : product.title;
  const displayDescription = lang === "ar" && product.description_ar ? product.description_ar : product.description;

  const discount = product.oldPrice && product.currentPrice
    ? Math.round(((+product.oldPrice - +product.currentPrice) / +product.oldPrice) * 100)
    : 0;

  const getProducts = (category, type, id) => {
    try {
      const found = getProductById(category, type, id);
      if (found) setProduct(found);
      else navigate("/notfound");
    } catch {
      navigate("/notfound");
    }
  };

  const increaseProduct = () => setProductQuantity((q) => Math.min(q + 1, 100));
  const decreaseProduct = () => setProductQuantity((q) => Math.max(q - 1, 1));

  const checkIfItemInWishList = () => {
    const obj = { ...product, type: param.type, category: param.category };
    const isCatWithType = ["men", "woman", "children"].includes(param.category);
    return wishList.products.some((pro) =>
      isCatWithType
        ? pro.id === obj.id && pro.title === obj.title && pro.type === obj.type && pro.category === obj.category
        : pro.id === obj.id && pro.title === obj.title && pro.category === obj.category
    );
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    dispatch(addToCart({ ...product, productQuantity, totalPrice: +product.currentPrice * productQuantity }));
    showCartToast(product.title || "Product");
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleToggleWishList = () => {
    setIsTogglingFavorite(true);
    const inList = checkIfItemInWishList();
    const payload = { ...product, category: param.category, type: param.type };
    if (inList) {
      dispatch(removeFromWishList(payload));
      showFavoriteToast(product.title || "Product", false);
    } else {
      dispatch(addToWishList(payload));
      showFavoriteToast(product.title || "Product", true);
    }
    setTimeout(() => setIsTogglingFavorite(false), 600);
  };

  const handleWrongPath = () => {
    const validTypes = ["shirts", "Jackets", "hat", "shoes", "accessories", "pullover", "undefined"];
    if (param.type && !validTypes.includes(param.type)) navigate("/notfound");
  };

  const handleGettingData = () => {
    if (param.type === "undefined") {
      navigate(`/product/${param.category}/shirts/${param.id}`);
      return;
    }
    const cats = ["men", "woman", "children", "accessories", "newSesson", "sale", "bags", "trending", "featured"];
    if (cats.includes(param.category)) {
      getProducts(param.category, param.type, param.id);
    } else {
      navigate("/notfound");
    }
  };

  useEffect(() => {
    setCurrentImage(0);
    setProductQuantity(1);
    setData(param.type);
    if (param.type) handleWrongPath();
    handleGettingData();
  }, [param.category, param.id, param.type]);

  const breadcrumb = (
    <div className="pagePath">
      <Link to="/">Home</Link>
      <span>/</span>
      <Link to={`/products/${param.category}`}>{param.category}</Link>
      {param.type && param.type !== "undefined" && (
        <>
          <span>/</span>
          <Link to={`/products/${param.category}`}>{param.type}</Link>
        </>
      )}
      {displayTitle && (
        <>
          <span>/</span>
          <span className="current">{displayTitle}</span>
        </>
      )}
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="singleProduct">
        {breadcrumb}

        {Object.keys(product).length > 0 ? (
          <div className="container">
            {/* ── LEFT: images ── */}
            <div className="left">
              <div className="thumbnails">
                {product.images?.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${i === currentImage ? "active" : ""}`}
                    onClick={() => setCurrentImage(i)}
                  >
                    <img src={img} alt={`view ${i + 1}`} />
                  </button>
                ))}
              </div>
              <div className="mainImage">
                {discount > 0 && <span className="badge">-{discount}%</span>}
                <img
                  className={param.category === "accessories" ? "contain" : ""}
                  src={product.images?.[currentImage]}
                  alt={displayTitle}
                />
              </div>
            </div>

            {/* ── RIGHT: info ── */}
            <div className="right">
              <h1 className="product-title">{displayTitle}</h1>

              {/* Price */}
              <div className="price-row">
                <span className="current-price">{product.currentPrice} EGP</span>
                {product.oldPrice && (
                  <del className="old-price">{product.oldPrice} EGP</del>
                )}
                {discount > 0 && (
                  <span className="discount-badge">Save {discount}%</span>
                )}
              </div>

              {/* Description */}
              <p className="short-desc">{displayDescription}</p>

              <div className="divider" />

              {/* Quantity */}
              <div className="quantity-row">
                <span className="qty-label">{tr.quantity}</span>
                <div className="qty-control">
                  <button onClick={decreaseProduct} disabled={productQuantity <= 1}>−</button>
                  <span>{productQuantity}</span>
                  <button onClick={increaseProduct} disabled={productQuantity >= 100}>+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="actions">
                <button
                  className={`btn-cart ${isAddingToCart ? "adding" : ""}`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCartIcon />
                  {isAddingToCart ? tr.adding : tr.addToCart}
                </button>
                <button
                  className={`btn-wish ${checkIfItemInWishList() ? "active" : ""} ${isTogglingFavorite ? "toggling" : ""}`}
                  onClick={handleToggleWishList}
                  title={checkIfItemInWishList() ? tr.removeFav : tr.addFav}
                >
                  {checkIfItemInWishList()
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon />}
                </button>
              </div>

              {/* Perks */}
              <div className="perks">
                <div className="perk">
                  <LocalShippingOutlinedIcon />
                  <span>{tr.shipping}</span>
                </div>
                <div className="perk">
                  <VerifiedOutlinedIcon />
                  <span>{tr.returns}</span>
                </div>
              </div>

              <div className="divider" />

              {/* Meta */}
              <div className="meta">
                <p><strong>{tr.vendor}:</strong> Polo</p>
                <p><strong>{tr.type}:</strong> {param.type || param.category}</p>
                <p><strong>{tr.tag}:</strong> Fashion, {param.category}</p>
              </div>

              {/* Tabs */}
              <div className="tabs">
                <div className="tab-headers">
                  {["description", "additionalInfo", "faq"].map((tab) => (
                    <button
                      key={tab}
                      className={activeTab === tab ? "active" : ""}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tr[tab]}
                    </button>
                  ))}
                </div>
                <div className="tab-content">
                  {activeTab === "description" && <p>{displayDescription}</p>}
                  {activeTab === "additionalInfo" && (
                    <p>{lang === "ar" ? "لا توجد معلومات إضافية متاحة حالياً." : "No additional information available."}</p>
                  )}
                  {activeTab === "faq" && (
                    <p>{lang === "ar" ? "لا توجد أسئلة شائعة حالياً." : "No FAQs available yet."}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loader">
            <ClipLoader speedMultiplier={2} color="#2196f3" size={40} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
