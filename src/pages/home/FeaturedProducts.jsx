import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '../../utils/data';
import ProductCard from '../../components/product/ProductCard';

const FeaturedProducts = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featuredProducts = products.filter(p => p.featured);

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-gray-600">Handpicked just for you</p>
          </div>
          <button className="text-red-500 font-bold flex items-center hover:gap-3 gap-2 transition-all">
            View All <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} showQuickView={setQuickViewProduct} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 