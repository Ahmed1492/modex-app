import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { NavBar } from '../../component/navbar/NavBar';
import { Footer } from '../../component/Footer/Footer';
import { Card } from '../../component/card/Card';
import { searchProducts } from '../../mocks/searchIndex';
import './SearchResults.scss';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(searchProducts(query));
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-results-page">
        <div className="search-header">
          <h2>
            {query
              ? `Results for "${query}"`
              : 'Search for products'}
          </h2>
          <p className="count">
            {results.length > 0
              ? `${results.length} product${results.length > 1 ? 's' : ''} found`
              : query.length >= 2
              ? 'No products found'
              : ''}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((item, index) => (
              <Card
                key={`${item.category}-${item.type}-${item.id}-${index}`}
                feturedData={item}
                type={item.category}
                index={index}
              />
            ))}
          </div>
        ) : (
          query.length >= 2 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p>We couldn't find anything matching <strong>"{query}"</strong>.</p>
              <Link to="/" className="back-home">Back to Home</Link>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};
