import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { WalletConnect } from '../WalletConnect/WalletConnect';
const InfoIcon = () => (
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
    className="info-icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">CryptoVoyager</Link>
        <div className="navbar-actions">
          <WalletConnect />
          <button
            onClick={() => navigate('/credits')}
            className="info-button"
            title="Credits"
          >
            <InfoIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};
