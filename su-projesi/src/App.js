import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import FloatingTracker from './components/FloatingTracker';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <CompareProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/urunler" element={<ProductsPage />} />
                  <Route path="/sepet" element={<CartPage />} />
                </Routes>
              </main>
              <Footer />
              <CompareBar />
              <FloatingTracker />
            </div>
          </CompareProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
