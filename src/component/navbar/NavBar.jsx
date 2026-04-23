import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import enFlag from "../../img/en.png";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { Cart } from "../cart/Cart";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

const ArFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="22" height="15">
    <rect width="900" height="600" fill="#006C35" />
    <text x="450" y="340" textAnchor="middle" fill="white" fontSize="180" fontFamily="Arial">عربي</text>
  </svg>
);

export const NavBar = () => {
  const [cartOpen, setCartOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const searchInputRef = useRef(null);
  const userMenuRef    = useRef(null);

  const { lang, toggleLang }          = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const param    = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector((s) => s.cart);
  const wishList  = useSelector((s) => s.wishList);

  /* ── helpers ── */
  const isCat = (cat) =>
    param?.category?.toLowerCase() === cat.toLowerCase() ? "active-cat" : "";

  const isPage = (path) =>
    window.location.hash.replace("#", "") === path ? "active-page" : "";

  /* ── search ── */
  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };
  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };
  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q.length < 2) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
    setMobileOpen(false);
  };

  /* ── user menu ── */
  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate("/"); };

  useEffect(() => {
    const handler = (e) => {
      if (userMenuOpen && !userMenuRef.current?.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  /* ── close mobile on route change ── */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* ── nav links config ── */
  const shopLinks = [
    { to: "/products/men",       label: lang === "ar" ? "رجال"     : "Men",        cat: "men"       },
    { to: "/products/woman",     label: lang === "ar" ? "نساء"     : "Women",      cat: "woman"     },
    { to: "/products/children",  label: lang === "ar" ? "أطفال"    : "Children",   cat: "children"  },
    { to: "/products/bags",      label: lang === "ar" ? "حقائب"    : "Bags",       cat: "bags"      },
    { to: "/products/newSesson", label: lang === "ar" ? "موسم جديد": "New Season", cat: "newSesson" },
  ];
  const pageLinks = [
    { to: "/",        label: lang === "ar" ? "الرئيسية"  : "Home"    },
    { to: "/about",   label: lang === "ar" ? "عن المتجر" : "About"   },
    { to: "/contact", label: lang === "ar" ? "تواصل"     : "Contact" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nb-wrapper">

          {/* ── LOGO ── */}
          <Link to="/" className="nb-logo">
            Modex
          </Link>

          {/* ── CENTER NAV (desktop) ── */}
          <div className="nb-nav">
            {/* Page links */}
            {pageLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nb-link ${isPage(l.to)}`}>
                {l.label}
              </Link>
            ))}

            <span className="nb-divider" />

            {/* Shop links */}
            {shopLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nb-link ${isCat(l.cat)}`}>
                {l.label}
              </Link>
            ))}

            {/* Sale — special */}
            <Link to="/products/sale" className={`nb-link nb-sale ${isCat("sale")}`}>
              {lang === "ar" ? "تخفيضات" : "Sale"}
            </Link>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="nb-actions">

            {/* Language toggle */}
            <button className="nb-lang" onClick={toggleLang} title="Switch language">
              <span className="nb-flag">
                {lang === "en" ? <img src={enFlag} alt="EN" /> : <ArFlag />}
              </span>
              <span className="nb-lang-code">{lang.toUpperCase()}</span>
              <KeyboardArrowDownIcon className="nb-lang-arrow" />
            </button>

            {/* Search */}
            {searchOpen ? (
              <form className="nb-search-form" onSubmit={submitSearch}>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                  placeholder={lang === "en" ? "Search…" : "ابحث…"}
                  className="nb-search-input"
                />
                <button type="submit" className="nb-icon-btn" aria-label="Search">
                  <SearchIcon />
                </button>
                <button type="button" className="nb-icon-btn" onClick={closeSearch} aria-label="Close">
                  <CloseIcon />
                </button>
              </form>
            ) : (
              <button className="nb-icon-btn" onClick={openSearch} aria-label="Search">
                <SearchIcon />
              </button>
            )}

            {/* User */}
            {isAuthenticated ? (
              <div className="nb-user-wrap" ref={userMenuRef}>
                <button
                  className="nb-icon-btn nb-user-btn"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  title={user?.fullName}
                >
                  <span className="nb-avatar">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="nb-dropdown">
                    <div className="nb-dropdown-header">
                      <p className="nb-dropdown-name">{user?.fullName}</p>
                      <p className="nb-dropdown-email">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="nb-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <PersonIcon /> {lang === "en" ? "My Profile" : "ملفي الشخصي"}
                    </Link>
                    <button className="nb-dropdown-item nb-dropdown-logout" onClick={handleLogout}>
                      <LogoutIcon /> {lang === "en" ? "Sign Out" : "تسجيل الخروج"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`nb-icon-btn ${isPage("/login")}`}
                title={lang === "en" ? "Sign In" : "تسجيل الدخول"}
              >
                <PersonOutlineIcon />
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/products/wishList"
              className={`nb-icon-btn nb-badge-wrap ${isPage("/products/wishList")}`}
              title={lang === "en" ? "Wishlist" : "المفضلة"}
            >
              <FavoriteBorderIcon />
              {wishList.products.length > 0 && (
                <span className="nb-badge nb-badge-pink">{wishList.products.length}</span>
              )}
            </Link>

            {/* Cart */}
            <button
              className="nb-icon-btn nb-badge-wrap nb-cart-btn"
              onClick={() => setCartOpen((v) => !v)}
              title={lang === "en" ? "Cart" : "السلة"}
            >
              <ShoppingCartIcon />
              {cartItems.products.length > 0 && (
                <span className="nb-badge nb-badge-blue">{cartItems.products.length}</span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="nb-icon-btn nb-hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`nb-mobile ${mobileOpen ? "open" : ""}`}>
          <div className="nb-mobile-inner">
            {pageLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nb-mobile-link ${isPage(l.to)}`}>
                {l.label}
              </Link>
            ))}
            <div className="nb-mobile-sep" />
            {shopLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nb-mobile-link ${isCat(l.cat)}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/products/sale" className="nb-mobile-link nb-mobile-sale">
              {lang === "ar" ? "تخفيضات" : "Sale"}
            </Link>
            <div className="nb-mobile-sep" />
            <form className="nb-mobile-search" onSubmit={submitSearch}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "en" ? "Search products…" : "ابحث عن منتج…"}
              />
              <button type="submit"><SearchIcon /></button>
            </form>
          </div>
        </div>
      </nav>

      {cartOpen && <Cart />}
    </>
  );
};
