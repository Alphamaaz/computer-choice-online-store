import React, { useState, useEffect } from "react";
import {
  FaReact,
  FaHome,
  FaLaptop,
  FaHdd,
  FaChargingStation,
  FaEnvelope,
  FaUserPlus,
  FaShoppingCart,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import AuthForm from "../AuthForm"; // ✅ make sure the path is correct
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginSignupClick = () => {
    setShowAuthForm(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // ✅ redirect to home
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-container">
            <a href="/" className="logo-link">
              <FaReact className="react-icon" />
              <span className="logo-text">Computer Choice</span>
              <p className="tagline">Trust us</p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="/" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </a>
            <a href="/laptops" className="nav-link">
              <FaLaptop className="nav-icon" /> Laptops
            </a>
            <a href="/ssds" className="nav-link">
              <FaHdd className="nav-icon" /> SSDs
            </a>
            <a href="/chargers" className="nav-link">
              <FaChargingStation className="nav-icon" /> Chargers
            </a>
            <a href="/contact" className="nav-link">
              <FaEnvelope className="nav-icon" /> Contact
            </a>
            <a href="/cart" className="cart-btn">
              <FaShoppingCart className="nav-icon" /> Cart
            </a>

            {isLoggedIn ? (
              <button className="signup-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="signup-btn" onClick={handleLoginSignupClick}>
                <FaUserPlus className="nav-icon" /> Login / Signup
              </button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
            <a href="/" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </a>
            <a href="/laptops" className="nav-link">
              <FaLaptop className="nav-icon" /> Laptops
            </a>
            <a href="/ssds" className="nav-link">
              <FaHdd className="nav-icon" /> SSDs
            </a>
            <a href="/chargers" className="nav-link">
              <FaChargingStation className="nav-icon" /> Chargers
            </a>
            <a href="/contact" className="nav-link">
              <FaEnvelope className="nav-icon" /> Contact
            </a>
            <a href="/cart" className="nav-link cart-btn">
              <FaShoppingCart className="nav-icon" /> Cart
            </a>

            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="signup-btn" onClick={handleLoginSignupClick}>
                <FaUserPlus className="nav-icon" /> Login / Signup
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* AuthForm Modal */}
      {showAuthForm && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <button className="auth-close" onClick={handleCloseAuthForm}>
              ×
            </button>
            <AuthForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
