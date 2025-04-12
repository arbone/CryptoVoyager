import React from 'react';
import './Navbar.css';
import WalletConnect from '../WalletConnect/WalletConnect';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <h1 className="navbar-logo">Gianni's Travel</h1>
        <WalletConnect />
      </div>
    </nav>
  );
};
