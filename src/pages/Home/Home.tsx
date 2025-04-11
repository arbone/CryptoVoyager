// src/pages/Home/Home.tsx
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sustainable Travel Experiences
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover eco-friendly travel packages that make a positive impact on the environment and local communities.
        </p>
      </section>

      {/* Products Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-3xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Eco-Friendly
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All our packages are designed with sustainability in mind.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Crypto Payments
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easy and secure payments using cryptocurrency.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Community Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Direct support to local communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
