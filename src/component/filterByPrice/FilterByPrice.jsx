import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export const FilterByPrice = ({
  allProducts, bgImages, param, truncateString, selectedItem,
  price, getDiscountPercentage, currentPage, itemsPerPage, renderPagination
}) => {
  const { lang } = useLanguage();
  const t = (item) => (lang === "ar" && item.title_ar ? item.title_ar : item.title);

  const filteredProducts = allProducts?.filter(
    (product) => Number(product.currentPrice) <= Number(price)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const filteredTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const checkIsCategoryHasType = () =>
    ["men", "woman", "children"].includes(param.category);

  return (
    <div className="rightSide">
      <div className="cat-hero">
        <div className="cat-hero-bg" style={{ backgroundImage: `url(${bgImages[param.category]})` }} />
        <div className="cat-hero-overlay" />
        <div className="cat-hero-content">
          <span className="cat-hero-tag">
            {param.category === "sale" ? "🔥 Sale" : param.category === "newSesson" ? "✨ New Season" : "🛍️ Shop Now"}
          </span>
          <h1 className="cat-hero-title">
            {param.category.charAt(0).toUpperCase() + param.category.slice(1).replace("Sesson", " Season")}
          </h1>
          <p className="cat-hero-count">{filteredProducts.length} products</p>
        </div>
      </div>
      <div className="filteredCards">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <Link
              key={index}
              className="card-item"
              to={`/product/${param.category}/${checkIsCategoryHasType() ? selectedItem + "/" : ""}${item.id}`}
            >
              {param.category === "newSesson" && <span className="badge badge-new">NEW</span>}
              {param.category === "sale" && <span className="badge badge-sale">Sale</span>}
              <div className="images">
                {item.images && item.images.length > 1 ? (
                  <>
                    <img className="img1" src={item?.images[0]} alt={t(item)} />
                    <img className="img2" src={item?.images[1]} alt={t(item)} />
                  </>
                ) : (
                  <img className="img" src={item?.images?.[0]} alt={t(item)} />
                )}
              </div>
              <div className="card-info">
                <p className="proTitle">{truncateString(t(item))}</p>
                <div className="price">
                  <del>{item.oldPrice} EGP</del>
                  <p>{item.currentPrice} EGP</p>
                  <p className="discount">{getDiscountPercentage(+item.oldPrice, +item.currentPrice)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="emptyData">
            <p>No products match or are below {price} EGP.</p>
          </div>
        )}
      </div>

      {filteredProducts?.length > 0 && filteredTotalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination">{renderPagination()}</div>
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length}
          </div>
        </div>
      )}
    </div>
  );
};
