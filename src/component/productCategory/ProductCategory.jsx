import "./ProductCategoru.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../navbar/NavBar";
import { Footer } from "../Footer/Footer";
import { MyContext } from "../../context/MyContext";
import { SortByPrice } from "../sortByPrice/SortByPrice";
import { FilterByPrice } from "../filterByPrice/FilterByPrice";
import { ClipLoader } from "react-spinners";
import { getProductsByCategory } from "../../mocks";
import { useLanguage } from "../../context/LanguageContext";

export const ProductCategory = () => {
  // ========== CONTEXT & HOOKS ==========
  const { data } = useContext(MyContext);
  const { lang } = useLanguage();
  const param = useParams();
  const navigate = useNavigate();

  // ========== STATE MANAGEMENT ==========
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("shirts");
  const [selectedFilters, setSelectedFilters] = useState(["shirts"]);

  // Filter states
  const [currentPrice, setCurrentPrice] = useState(500);
  const [isFilterByPriceMode, setIsFilterByPriceMode] = useState(false);
  const [isSortByPriceMode, setIsSortByPriceMode] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // ========== CONSTANTS ==========
  const bgImages = {
    men: "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    woman: "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg",
    children:
      "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    newSesson:
      "https://images.pexels.com/photos/3875430/pexels-photo-3875430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bags: "https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    sale: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    accessories:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  // ========== UTILITY FUNCTIONS ==========
  const t = (item) =>
    lang === "ar" && item.title_ar ? item.title_ar : item.title;

  const truncateString = (str) => {
    return str.length > 30 ? str.slice(0, 30) : str;
  };

  const checkIsCategoryHasType = () => {
    return ["men", "woman", "children"].includes(param.category);
  };

  const getDiscountPercentage = (oldPrice, currentPrice) => {
    const discount = ((+oldPrice - +currentPrice) / oldPrice) * 100;
    return `save ${Math.round(discount)}% `;
  };

  const getAvailableFilters = () => {
    if (param.category === "men" || param.category === "woman") {
      return ["shirts", "Jackets", "pullover", "hat", "shoes", "accessories"];
    } else if (param.category === "children") {
      return ["shirts", "Jackets", "hat", "shoes", "accessories"];
    }
    return [];
  };

  // ========== DATA FETCHING ==========
  const getProducts = (category, type) => {
    try {
      const products = getProductsByCategory(category, type);
      console.log("getProducts called with:", { category, type });
      console.log("Products returned:", products);
      console.log("Products length:", products?.length);
      setAllProducts(products);
    } catch (error) {
      console.log("Error in getProducts:", error);
      setAllProducts([]);
    }
  };

  // ========== FILTER HANDLERS ==========
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let newSelectedFilters = [...selectedFilters];

    if (checked) {
      if (!newSelectedFilters.includes(value)) {
        newSelectedFilters.push(value);
      }
    } else {
      newSelectedFilters = newSelectedFilters.filter(
        (filter) => filter !== value,
      );
    }

    setSelectedFilters(newSelectedFilters);

    if (newSelectedFilters.length === 0) {
      setFilteredProducts([]);
      setSelectedItem("");
    } else {
      // Get products for all selected filters and combine them
      let combinedProducts = [];
      newSelectedFilters.forEach((filter) => {
        const products = getProductsByCategory(param.category, filter);
        combinedProducts = [...combinedProducts, ...products];
      });

      // Remove duplicates based on product id
      const uniqueProducts = combinedProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id),
      );

      setFilteredProducts(uniqueProducts);
      setSelectedItem(newSelectedFilters[0]); // Set first selected as main
    }

    setCurrentPage(1); // Reset to first page
    setIsSortByPriceMode(null);
    setIsFilterByPriceMode(false);
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setFilteredProducts([]);
    setSelectedItem("");
    setCurrentPrice(500);
    setIsFilterByPriceMode(false);
    setIsSortByPriceMode(null);
    setCurrentPage(1);
  };

  const handleSelectAllFilters = () => {
    const availableFilters = getAvailableFilters();
    setSelectedFilters(availableFilters);

    // Get products for all filters and combine them
    let combinedProducts = [];
    availableFilters.forEach((filter) => {
      const products = getProductsByCategory(param.category, filter);
      combinedProducts = [...combinedProducts, ...products];
    });

    // Remove duplicates
    const uniqueProducts = combinedProducts.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id),
    );

    setFilteredProducts(uniqueProducts);
    setSelectedItem(availableFilters[0]);
    setCurrentPage(1);
  };

  const handleFilterByPrice = (e) => {
    setCurrentPrice(e.target.value);
    setIsFilterByPriceMode(true);
    setIsSortByPriceMode(null);
    setCurrentPage(1);
  };

  const handleSortByPrice = (e) => {
    setIsFilterByPriceMode(false);
    setIsSortByPriceMode(e.target.value);
    setCurrentPage(1);
  };

  // ========== PAGINATION LOGIC ==========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (
    filteredProducts.length > 0 ? filteredProducts : allProducts
  ).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    (filteredProducts.length > 0 ? filteredProducts : allProducts).length /
      itemsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          &laquo; Prev
        </button>,
      );
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-btn"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="pagination-dots">
            ...
          </span>,
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>,
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="pagination-dots">
            ...
          </span>,
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          {totalPages}
        </button>,
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next &raquo;
        </button>,
      );
    }

    return pages;
  };

  // ========== LEGACY FUNCTIONS (TO BE REFACTORED) ==========
  const filterProducts = (checkboxValue) => {
    console.log(" checkboxValue ", checkboxValue);
    setSelectedItem(checkboxValue);
    setCurrentPage(1);
    setIsSortByPriceMode(null);
    setIsFilterByPriceMode(false);

    const categoryHandlers = {
      men: () => getProducts(param.category, checkboxValue),
      woman: () => getProducts(param.category, checkboxValue),
      children: () => getProducts(param.category, checkboxValue),
    };

    if (categoryHandlers[param.category]) {
      categoryHandlers[param.category]();
    }
  };

  const handleGettingData = () => {
    if (selectedItem == "undefined") {
      setSelectedItem("shirts");
    }
    console.log("selectedItem", selectedItem);

    // Reset filtered products when getting new data
    setFilteredProducts([]);

    const categoryRoutes = {
      men: () => getProducts(param.category, selectedItem),
      woman: () => getProducts(param.category, selectedItem),
      children: () => getProducts(param.category, selectedItem),
      accessories: () => getProducts(param.category, null),
      newSesson: () => getProducts(param.category, null),
      sale: () => getProducts(param.category, null),
      bags: () => getProducts(param.category, null),
    };

    if (categoryRoutes[param.category]) {
      categoryRoutes[param.category]();
    } else {
      navigate("/notfound");
    }
  };

  // ========== EFFECTS ==========
  useEffect(() => {
    // Reset all state when category changes
    const resetState = () => {
      setSelectedFilters(["shirts"]);
      setFilteredProducts([]);
      setSelectedItem("shirts");
      setCurrentPrice(500);
      setIsFilterByPriceMode(false);
      setIsSortByPriceMode(null);
      setCurrentPage(1);
    };

    resetState();

    // Load initial data based on category
    setTimeout(() => {
      if (
        param.category === "men" ||
        param.category === "woman" ||
        param.category === "children"
      ) {
        getProducts(param.category, "shirts");
      } else if (param.category === "accessories") {
        getProducts(param.category, null);
      } else if (param.category === "newSesson") {
        getProducts(param.category, null);
      } else if (param.category === "sale") {
        getProducts(param.category, null);
      } else if (param.category === "bags") {
        getProducts(param.category, null);
      } else {
        navigate("/notfound");
      }
    }, 0);
  }, [param.category]);

  return (
    <>
      <NavBar />
      <div className="productCategory" key={param.category}>
        <div className="container">
          <div className="wrapper">
            <div className="leftSide">
              <div className="allFilters">
                {(param.category === "men" ||
                  param.category === "woman" ||
                  param.category === "children") && (
                  <>
                    <div className="filter-header">
                      <h3>Product Category</h3>
                      <div className="filter-actions">
                        <button
                          className="filter-action-btn select-all"
                          onClick={handleSelectAllFilters}
                          disabled={
                            selectedFilters.length ===
                            getAvailableFilters().length
                          }
                        >
                          Select All
                        </button>
                        <button
                          className="filter-action-btn clear-all"
                          onClick={handleClearAllFilters}
                          disabled={selectedFilters.length === 0}
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    <div className="filterItem">
                      <input
                        value="shirts"
                        id="t-SHIRT"
                        type="checkbox"
                        checked={selectedFilters.includes("shirts")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="t-SHIRT">T-SHIRT</label>
                    </div>

                    <div className="filterItem">
                      <input
                        value="Jackets"
                        id="Jackets"
                        type="checkbox"
                        checked={selectedFilters.includes("Jackets")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="Jackets">Jacket</label>
                    </div>
                    {(param.category === "men" ||
                      param.category === "woman") && (
                      <div className="filterItem">
                        <input
                          value="pullover"
                          id="pullover"
                          type="checkbox"
                          checked={selectedFilters.includes("pullover")}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="pullover">pullover</label>
                      </div>
                    )}

                    <div className="filterItem">
                      <input
                        value="hat"
                        id="hat"
                        type="checkbox"
                        checked={selectedFilters.includes("hat")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="hat">Hat</label>
                    </div>

                    <div className="filterItem">
                      <input
                        value="shoes"
                        id="shoes"
                        type="checkbox"
                        checked={selectedFilters.includes("shoes")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="shoes">Shoes</label>
                    </div>

                    <div className="filterItem">
                      <input
                        value="accessories"
                        id="accessories"
                        type="checkbox"
                        checked={selectedFilters.includes("accessories")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="accessories">Accessories</label>
                    </div>
                  </>
                )}
                <h3>Filter By Price</h3>
                <label htmlFor="">100</label>
                <input
                  min={100}
                  max={4000}
                  type="range"
                  onChange={handleFilterByPrice}
                />
                <label htmlFor="">{currentPrice}</label>

                <h3>Sorted By</h3>
                <div>
                  <input
                    onClick={handleSortByPrice}
                    value="Price Lowest First"
                    name="price"
                    type="radio"
                    id="low price"
                  />
                  <label htmlFor="low price">Price Lowest First</label>
                </div>
                <div>
                  <input
                    onClick={handleSortByPrice}
                    value="Price Hiest First"
                    name="price"
                    type="radio"
                    id="high price"
                  />
                  <label htmlFor="high price">Price Hiest First</label>
                </div>
              </div>
            </div>

            {allProducts.length > 0 ? (
              <>
                {isFilterByPriceMode ? (
                  <FilterByPrice
                    allProducts={allProducts}
                    bgImages={bgImages}
                    param={param}
                    truncateString={truncateString}
                    selectedItem={selectedItem}
                    price={currentPrice}
                    getDiscountPercentage={getDiscountPercentage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    renderPagination={renderPagination}
                  />
                ) : isSortByPriceMode ? (
                  <SortByPrice
                    allProducts={allProducts}
                    bgImages={bgImages}
                    param={param}
                    truncateString={truncateString}
                    selectedItem={selectedItem}
                    price={currentPrice}
                    isSortByPriceMode={isSortByPriceMode}
                    setAllProducts={setAllProducts}
                    getDiscountPercentage={getDiscountPercentage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    renderPagination={renderPagination}
                  />
                ) : (
                  <div className="rightSide">
                    <div className="cat-hero">
                      <div
                        className="cat-hero-bg"
                        style={{ backgroundImage: `url(${bgImages[param.category]})` }}
                      />
                      <div className="cat-hero-overlay" />
                      <div className="cat-hero-content">
                        <span className="cat-hero-tag">
                          {param.category === "newSesson"
                            ? (lang === "ar" ? "✨ موسم جديد" : "✨ New Season")
                            : param.category === "sale"
                            ? (lang === "ar" ? "🔥 تخفيضات" : "🔥 Sale")
                            : (lang === "ar" ? "🛍️ تسوق الآن" : "🛍️ Shop Now")}
                        </span>
                        <h1 className="cat-hero-title">
                          {lang === "ar"
                            ? { men: "رجال", woman: "نساء", children: "أطفال", bags: "حقائب", newSesson: "موسم جديد", sale: "تخفيضات", accessories: "إكسسوارات" }[param.category] || param.category
                            : param.category.charAt(0).toUpperCase() + param.category.slice(1).replace("Sesson", " Season")}
                        </h1>
                        <p className="cat-hero-count">
                          {(filteredProducts.length > 0 ? filteredProducts : allProducts).length}{" "}
                          {lang === "ar" ? "منتج" : "products"}
                        </p>
                      </div>
                    </div>
                    <div className="filteredCards">
                      {currentItems?.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            className="card-item"
                            to={`/product/${param.category}/${
                              checkIsCategoryHasType() ? selectedItem + "/" : ""
                            }${+item.id}`}
                          >
                            {param.category === "newSesson" && (
                              <span className="badge badge-new">NEW</span>
                            )}
                            {param.category === "sale" && (
                              <span className="badge badge-sale">Sale</span>
                            )}
                            <div className="images">
                              {item.images && item.images.length > 1 ? (
                                <>
                                  <img
                                    className="img1"
                                    src={item?.images[0]}
                                    alt={t(item)}
                                  />
                                  <img
                                    className="img2"
                                    src={item?.images[1]}
                                    alt={t(item)}
                                  />
                                </>
                              ) : (
                                <img
                                  className="img"
                                  src={item?.images?.[0]}
                                  alt={t(item)}
                                />
                              )}
                            </div>
                            <div className="card-info">
                              <p className="proTitle">
                                {truncateString(t(item))}
                              </p>
                              <div className="price">
                                <del>{item.oldPrice} EGP</del>
                                <p>{item.currentPrice} EGP</p>
                                <p className="discount">
                                  {getDiscountPercentage(
                                    +item.oldPrice,
                                    +item.currentPrice,
                                  )}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="pagination-container">
                        <div className="pagination">{renderPagination()}</div>
                        <div className="pagination-info">
                          Showing {indexOfFirstItem + 1} -{" "}
                          {Math.min(
                            indexOfLastItem,
                            (filteredProducts.length > 0
                              ? filteredProducts
                              : allProducts
                            ).length,
                          )}{" "}
                          of{" "}
                          {
                            (filteredProducts.length > 0
                              ? filteredProducts
                              : allProducts
                            ).length
                          }{" "}
                          products
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="loader">
                <ClipLoader color="#2196f3" speedMultiplier={2} size={40} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
