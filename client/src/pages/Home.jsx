import React from 'react';
import Hero from '../components/home/Hero';
import FeatureCategories from '../components/home/FeatureCategories';
import BestSellers from '../components/home/BestSellers';
import PillsSection from '../components/home/PillsSection';
import TrustMarquee from '../components/home/TrustMarquee';
import WhyUs from '../components/home/WhyUs';
import HowItWorks from '../components/home/HowItWorks';
import Authenticity from '../components/home/Authenticity';
import Reviews from '../components/home/Reviews';


const Home = () => {
    return (
        <div className="bg-ayur-beige/20 min-h-screen">
            <Hero />
            <TrustMarquee />
            <BestSellers />
            <PillsSection />
            <FeatureCategories />
            <WhyUs />
            <HowItWorks />
            <Authenticity />
            <Reviews />
        </div>
    );
};

export default Home;
