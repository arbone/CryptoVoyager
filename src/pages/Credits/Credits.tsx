import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Credits.css';

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="credits-page">
      <button className="back-button" onClick={() => navigate(-1)} title="Torna indietro">
        <svg
          className="back-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 42 42"
          fill="currentColor"
        >
          <polygon
            fillRule="evenodd"
            points="27.066,1 7,21.068 26.568,40.637 31.502,35.704 16.865,21.068 32,5.933"
          />
        </svg>
      </button>

      <div className="credits-content">
        <div className="credits-container">
          <h1>Credits</h1>

          <div className="credits-section">
            <h2>Sviluppato da</h2>
            <h3>ARBI SHEHU</h3>
            <p>Blockchain Developer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/arbishehu/" target="_blank" rel="noopener noreferrer">
                <span className="social-icon" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83 
                    0 53.4S24.09-1.4 53.79-1.4 107.6 23.7 107.6 53.4c.1 
                    29.6-24 54.7-53.81 54.7zM447.9 
                    448h-92.4V302.4c0-34.7-.7-79.4-48.4-79.4-48.4 
                    0-55.8 37.8-55.8 76.8V448h-92.6V148.9h88.9v40.8h1.3c12.4-23.5 
                    42.6-48.4 87.7-48.4 93.8 0 111.1 61.8 111.1 
                    142.3V448z"/>
                  </svg>
                </span>
              </a>
              <a href="https://github.com/arbone" target="_blank" rel="noopener noreferrer">
                <span className="social-icon" title="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 
                    3.6-3.3 0-5.2-1.6-5.2-3.6 
                    0-2 2.3-3.6 5.2-3.6 2.9.1 
                    5.2 1.7 5.2 3.6zm-32.2-3.2c-.7 
                    1.6 1.2 3.4 4.1 4.1 3 .7 5.7 
                    0 6.3-1.6.6-1.6-1.2-3.4-4.1-4.1-3-.7-5.7 
                    0-6.3 1.6zm44.8-1.1c-2.9.4-4.8 
                    2.3-4.3 4.3.5 2 2.9 3.2 5.8 
                    2.8 2.9-.4 4.8-2.3 
                    4.3-4.3-.5-2-2.9-3.2-5.8-2.8zM248 
                    8C111 8 0 119 0 256c0 
                    102.2 65.8 189.1 157.3 
                    219.9 11.5 2.1 15.7-5 
                    15.7-11.1 0-5.5-.2-23.8-.3-43.1-64 
                    13.9-77.5-30.8-77.5-30.8-10.5-26.6-25.6-33.7-25.6-33.7-20.9-14.3 
                    1.6-14 1.6-14 23.1 1.6 35.3 
                    23.7 35.3 23.7 20.6 35.3 54 
                    25.1 67.1 19.2 2.1-14.9 8-25.1 
                    14.6-30.9-51.1-5.8-104.8-25.5-104.8-113.6 
                    0-25.1 9-45.6 23.7-61.6-2.4-5.8-10.3-29.2 
                    2.3-60.9 0 0 19.4-6.2 
                    63.6 23.6 18.4-5.1 38.2-7.6 
                    57.9-7.7 19.6.1 39.4 
                    2.6 57.9 7.7 44.1-29.9 
                    63.5-23.6 63.5-23.6 
                    12.7 31.6 4.8 55 .2 
                    60.9 14.8 16 23.7 36.5 
                    23.7 61.6 0 88.3-53.9 
                    107.7-105.2 113.4 8.2 7 
                    15.5 20.7 15.5 41.7 0 
                    30.1-.3 54.4-.3 61.8 
                    0 6.2 4.1 13.3 15.8 11C430.2 
                    445.1 496 358.2 496 256 
                    496 119 385 8 248 8z"/>
                  </svg>
                </span>
              </a>
              <a href="mailto:arbishehu.business@gmail.com">
                <span className="social-icon" title="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M502.3 190.8L320.3 
                    30.8c-22.6-18.8-53.9-18.8-76.5 
                    0L9.7 190.8C3.9 195.6 
                    0 202.7 0 210.2V456c0 
                    30.9 25.1 56 56 
                    56h400c30.9 0 56-25.1 
                    56-56V210.2c0-7.5-3.9-14.6-9.7-19.4zM464 
                    456c0 4.4-3.6 8-8 
                    8H56c-4.4 0-8-3.6-8-8V237.3l208 
                    173.3 208-173.3V456zm-208-113.5L64 
                    201.1V216l192 160 
                    192-160v-14.9L256 342.5z"/>
                  </svg>
                </span>
              </a>
              <a href="https://arbone.github.io/arbi-shehu-protocols/index.html" target="_blank" rel="noopener noreferrer">
                <span className="social-icon" title="Sito Web">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                    <path d="M248 8C111 8 0 119 0 
                    256s111 248 248 248c137 0 248-111 
                    248-248S385 8 248 8zm0 
                    448c-110.3 0-200-89.7-200-200S137.7 
                    56 248 56s200 89.7 200 
                    200-89.7 200-200 200z"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="credits-section">
            <h2>Tecnologie</h2>
            <div className="tech-grid">
              <div className="tech-item">React.js</div>
              <div className="tech-item">Vite</div>
              <div className="tech-item">CSS3</div>
              <div className="tech-item">ethers.js</div>
            </div>
          </div>

          <div className="credits-section">
            <h2>Curiosità</h2>
            <p>
              Questo progetto è stato realizzato per supportare Gianni e la sua agenzia di viaggi consapevoli.
              Tutti i dettagli sono stati curati per unire innovazione, sostenibilità e blockchain.
            </p>
          </div>

          <p className="copyright">
            © 2025 ARBI SHEHU PROTOCOLS — Gianni Travel dApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credits;