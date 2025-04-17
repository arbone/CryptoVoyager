import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Credits.css';

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="credits-page">

    <div className="instructions-container">
          <h1>Come Funziona</h1>
          <div className="instruction-card">
            <h2>1. Connetti il tuo Wallet</h2>
            <p>Usa il pulsante in alto a destra per connettere il tuo wallet MetaMask. Usa Chrome su Desktop e la relativa estensione. Da mobile, quando cliccherai su connetti, verrai renderizzato sul browser di Metamsk in cui dovrai di nuovo cliccare "Connetti" per autorizzare il link al tuo wallet.</p>
          </div>
          <div className="instruction-card">
            <h2>2. Scegli il tuo viaggio</h2>
            <p>Naviga tra i pacchetti disponibili e seleziona quello che preferisci, scegli il numero di partecipanti e clicca su Prenota.</p>
          </div>
          <div className="instruction-card">
            <h2>3. Completa l'acquisto</h2>
            <p>Conferma la transazione dal tuo wallet. Una volta autorizzata ti verrà data conferma e numero di transazione direttamente verificabile su Etherscan!</p>
          </div>
          <div className="instruction-card">
            <h2>4. Visualizza i tuoi ordini</h2>
            <p>Tutti i tuoi acquisti sono salvati nella sezione "I Miei Ordini" che trovi nella bottombar, pulsante centrale. Buon viaggio!</p>
          </div>
        </div>

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
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297 6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804 5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779 3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919 9.13724 4.14609 9.19053 4.18418V4.18418C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648 4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889 4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639 4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114 14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373 17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843 6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309 6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479 14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21" stroke="#4338ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855" stroke="#4338ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
              <div className="tech-item">React 18</div>
              <div className="tech-item">CSS3</div>
              <div className="tech-item">ethers.js v6</div>
              <div className="tech-item">TypeScript</div>
              <div className="tech-item">HTML5</div>
              <div className="tech-item">React Router v6</div>
              <div className="tech-item">Web3 Modal</div>
              <div className="tech-item">ESLint</div>
              <div className="tech-item">dotenv</div>
              <div className="tech-item">Node.js</div>
              <div className="tech-item">React Scripts</div>
              <div className="tech-item">TypeScript Compiler</div>

            </div>
          </div>

          <div className="credits-section">
            <h2>Info sul progetto</h2>
            <p>
              Questo progetto è stato realizzato per supportare Gianni e la sua agenzia di viaggi consapevoli.
              Tutti i dettagli sono stati curati per unire innovazione, sostenibilità e blockchain.
            </p>
          </div>

          <p className="copyright">
            © 2025 ARBI SHEHU PROTOCOLS — CryptoVoyager
          </p>
        </div>
      </div>

    </div>
    
  );
};

export default Credits;