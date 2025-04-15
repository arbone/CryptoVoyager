import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { WalletConnect } from '../WalletConnect/WalletConnect';

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="menu-icon"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">CryptoVoyager</Link>
        <div className="navbar-actions">
          <WalletConnect />
          <div className="dropdown-container">
            <button
              onClick={toggleMenu}
              className="menu-button"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon />
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/" className="dropdown-item" onClick={closeMenu}>
                  Home
                </Link>
                <Link to="/my-bookings" className="dropdown-item" onClick={closeMenu}>
                  I Miei Ordini
                </Link>
                <Link to="/instructions" className="dropdown-item" onClick={closeMenu}>
                  Istruzioni
                </Link>
                <Link to="/credits" className="dropdown-item" onClick={closeMenu}>
                  Credits
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};