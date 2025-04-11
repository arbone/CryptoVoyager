// src/App.tsx
import { Web3Provider } from './context/Web3Context';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';

function App() {
  return (
    <Web3Provider>
      <Layout>
        <Home />
      </Layout>
    </Web3Provider>
  );
}

export default App;
