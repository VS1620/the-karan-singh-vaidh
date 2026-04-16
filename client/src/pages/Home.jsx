import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeatureCategories from '../components/home/FeatureCategories';
import BestSellers from '../components/home/BestSellers';
import PillsSection from '../components/home/PillsSection';
import TrustMarquee from '../components/home/TrustMarquee';
import WhyUs from '../components/home/WhyUs';
import HowItWorks from '../components/home/HowItWorks';
import RealStores from '../components/home/RealStores';
import Authenticity from '../components/home/Authenticity';
import Reviews from '../components/home/Reviews';
import FactoryVideo from '../components/home/FactoryVideo';


const Home = () => {
    return (
        <div className="bg-ayur-beige/20 min-h-screen">
            <Helmet>
                <title>The Karan Singh Vaidh | Ancient Ayurvedic Wellness & Treatments</title>
                <meta name="description" content="Discover authentic Ayurvedic treatments for chronic diseases by Dr. Karan Singh Vaidh. Natural healing for Asthma, Diabetes, Piles, and more. Authentic products since 2003." />
                <meta name="keywords" content="Ayurveda, Karan Singh Vaidh, Ayurvedic Doctor Solan, Natural Medicine, Ayurvedic Treatment Solan, Himachal Ayurveda" />
            </Helmet>
            <Hero />
            <TrustMarquee />
            <BestSellers />
            <PillsSection />
            <FeatureCategories />
            <WhyUs />
            <HowItWorks />
            <Authenticity />
            <RealStores />
            <FactoryVideo />
            <Reviews />
        </div>
    );
};

export default Home;
