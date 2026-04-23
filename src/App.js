import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { ProductCategory } from './component/productCategory/ProductCategory';
import { HomePage } from './page/homePage/HomePage';
import { Product } from './component/product/Product';
import { NavBar } from './component/navbar/NavBar';
import { About } from './page/about/About';
import { Contact } from './page/contact/Contact';
import { Footer } from './component/Footer/Footer';
import { MyProvider } from './context/MyProvider';
import { WishList } from './component/wishList/WishList';
import { NotFound } from './page/notFound/NotFound';
import { ToastProvider } from './context/ToastContext';
import { Login } from './page/login/Login';
import { Register } from './page/register/Register';
import { SearchResults } from './page/searchResults/SearchResults';
import { Checkout } from './page/checkout/Checkout';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Profile } from './page/profile/Profile';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

export default function App() {
  return (
    <div className='app'>
      <AuthProvider>
        <MyProvider>
          <ToastProvider>
            <LanguageProvider>
              <HashRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products/:category" element={<ProductCategory />} />
                  <Route path="/products/wishList" element={<WishList />} />
                  <Route path="/product/:category/:type/:id" element={<Product />} />
                  <Route path="/product/:category/:id" element={<Product />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/notfound" element={<NotFound />} />
                </Routes>
              </HashRouter>
            </LanguageProvider>
          </ToastProvider>
        </MyProvider>
      </AuthProvider>
    </div>
  );
}

