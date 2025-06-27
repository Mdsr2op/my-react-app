import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Award, Shield, Book, GraduationCap, Palette } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Your Next Favorite Book",
      subtitle: "Explore thousands of titles across all genres",
      gradient: "from-red-500 via-orange-500 to-red-600",
      icon: Book
    },
    {
      title: "Back to School Mega Sale",
      subtitle: "Up to 40% off on school bundles",
      gradient: "from-orange-500 via-red-500 to-orange-600",
      icon: GraduationCap
    },
    {
      title: "Premium Art Supplies",
      subtitle: "Unleash your creativity with professional tools",
      gradient: "from-red-600 via-orange-600 to-red-500",
      icon: Palette
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${searchQuery}`);
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-20 left-32 w-10 h-10 bg-white/10 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentSlide === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 absolute'
                }`}
              >
                <div className="text-8xl mb-4 block flex justify-center">
                  <slide.icon size={80} className="text-white" />
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center max-w-2xl mx-auto shadow-2xl">
            <input
              type="text"
              placeholder="Search for books, stationery, or school bundles..."
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/70 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="bg-white text-red-600 p-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 mr-1"
            >
              <Search size={24} />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up">
              <Zap size={20} />
              <span>Same Day Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up animation-delay-200">
              <Award size={20} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2 animate-fade-in-up animation-delay-400">
              <Shield size={20} />
              <span>Secure Payment</span>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 