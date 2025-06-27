import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';
import NewsletterSection from './NewsletterSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoryGrid />
      <FeaturedProducts />
      <NewsletterSection />
    </>
  );
};

export default HomePage; 