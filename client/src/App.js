// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/Store/LoginPage'; // Update path if necessary
import RegisterPage from './components/pages/Store/RegisterPage'; // Update path if necessary
import Dashboard from './components/pages/Store/Dashboard'; // Update path if necessary
import StoreRoutes from './components/pages/Store/StoreRoutes'; // Update path if necessary
import CheckoutPage from './components/pages/Store/CheckoutPage'; // Update path if 
import CartPage from './components/pages/Store/CartPage';
import BlogsPage from './components/pages/BlogsPage'; // Update path if necessary
import Navbar from './components/Navbar/NavBar'; // Update path if necessary
import Footer from './components/Footer/Footer'; // Update path if necessary

const App = () => {
  const isAdmin = true; // Replace with actual authentication logic

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store/*" element={<StoreRoutes />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />


          {isAdmin ? (
            <Route path="/blogs" element={<BlogsPage />} />
          ) : (
            <Route path="/blogs" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
