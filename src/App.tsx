// src/App.tsx
import { Web3Provider } from './context/Web3Context';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Web3Provider>
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Sustainable Travel
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our eco-friendly travel packages
          </p>
        </div>
      </Layout>
    </Web3Provider>
  );
}

export default App;
