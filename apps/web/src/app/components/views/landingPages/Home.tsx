"use client";
import React from 'react';
import CarouselSection from '../../components/Carousel';
import EventCategory from '../../components/EventCategori';
import BrowseEvent from '../../components/BrowseEvents';
import LandingPage from '@/components/LandingPages/LandingPages';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <CarouselSection />
      <div className="w-full max-w-7xl p-4">
        <EventCategory />
      </div>
      <div className="w-full max-w-7xl p-4">
        {/* <BrowseEvent /> */}
        <LandingPage/>
      </div>
    </div>
  );
};

export default HomePage;
