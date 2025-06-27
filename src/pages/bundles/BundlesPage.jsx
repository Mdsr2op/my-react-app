import React, { useState } from 'react';
import { ShoppingCart, GraduationCap, BookOpen, Star, Users } from 'lucide-react';
import { schoolBundles } from '../../utils/data';
import { useCart, useNotification } from '../../context';

const BundlesPage = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  const [selectedGrade, setSelectedGrade] = useState('');

  const filteredBundles = selectedGrade 
    ? schoolBundles.filter(bundle => bundle.grade === selectedGrade)
    : schoolBundles;

  const handleAddToCart = (bundle) => {
    addToCart(bundle);
    addNotification(`${bundle.name} added to cart!`, 'success');
  };

  const grades = [...new Set(schoolBundles.map(bundle => bundle.grade))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-2xl">
              <GraduationCap size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            School Bundles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete educational packages designed for each grade level. 
            Everything your child needs for academic success in one convenient bundle.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Filter by Grade</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedGrade('')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedGrade === '' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Grades
            </button>
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedGrade === grade 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBundles.map((bundle, index) => (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${bundle.color} p-6 text-white relative`}>
                <div className="absolute top-4 right-4">
                  {bundle.popular && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                      Popular
                    </span>
                  )}
                </div>
                <BookOpen size={32} className="mb-3" />
                <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                <p className="text-white/80">{bundle.description}</p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {bundle.grade}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{bundle.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{bundle.students}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Bundle Includes:</h4>
                  <ul className="space-y-2">
                    {bundle.items.slice(0, 4).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                    {bundle.items.length > 4 && (
                      <li className="text-sm text-gray-500 font-medium">
                        +{bundle.items.length - 4} more items
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-black text-red-600">₨{bundle.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">₨{bundle.originalPrice}</span>
                    <div className="text-sm text-green-600 font-medium">
                      Save ₨{bundle.originalPrice - bundle.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Per bundle</div>
                    <div className="text-xs text-gray-400">Free delivery</div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(bundle)}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add Bundle to Cart
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>✓ Curriculum Aligned</span>
                    <span>✓ Expert Selected</span>
                    <span>✓ Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our School Bundles?</h3>
            <p className="text-gray-600 text-lg">Thoughtfully curated educational packages</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Curriculum Aligned</h4>
              <p className="text-gray-600">All items are carefully selected to match your child's grade curriculum requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600">Premium quality educational materials from trusted brands and publishers.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Expert Selected</h4>
              <p className="text-gray-600">Curated by education experts and experienced teachers for optimal learning.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlesPage; 