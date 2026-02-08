import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingCallButton from './FloatingCallButton';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-ayur-beige/30">
            <Header />
            <main className="flex-grow pt-20 bg-white">
                {children}
            </main>
            <FloatingCallButton />
            <Footer />
        </div>
    );
};

export default MainLayout;
