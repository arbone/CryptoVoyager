// src/App.tsx
import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './styles/global.css';
import { Web3Provider } from './context/Web3Context';

const App = () => {
  return (
    <Web3Provider>
      <div className="app">
        <Navbar />
        <main className="main">
          <Home />
        </main>
      </div>
    </Web3Provider>
  );
};

export default App;
