import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { WalletConnect } from '../WalletConnect/WalletConnect';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">CryptoVoyager</Link>
        <div className="navbar-actions">
          <WalletConnect />
          <div className="dropdown-container">
          </div>
        </div>
      </div>
    </nav>
  );
};