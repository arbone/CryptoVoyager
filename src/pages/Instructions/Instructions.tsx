// src/pages/Instructions/Instructions.tsx
import React from 'react';
import './Instructions.css';

const Instructions: React.FC = () => {
  return (
    <div className="instructions-container">
      <h1>Come Funziona</h1>
      <div className="instruction-card">
        <h2>1. Connetti il tuo Wallet</h2>
        <p>Usa il pulsante in alto a destra per connettere il tuo wallet MetaMask</p>
      </div>
      <div className="instruction-card">
        <h2>2. Scegli il tuo viaggio</h2>
        <p>Naviga tra i pacchetti disponibili e seleziona quello che preferisci</p>
      </div>
      <div className="instruction-card">
        <h2>3. Completa l'acquisto</h2>
        <p>Conferma la transazione con ETH dal tuo wallet</p>
      </div>
      <div className="instruction-card">
        <h2>4. Visualizza i tuoi ordini</h2>
        <p>Tutti i tuoi acquisti sono salvati nella sezione "I Miei Ordini"</p>
      </div>
    </div>
  );
};

export default Instructions;