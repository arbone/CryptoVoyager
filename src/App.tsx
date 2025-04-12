import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './styles/global.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Home />
      </main>
    </div>
  );
};

export default App;
