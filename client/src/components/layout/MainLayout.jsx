import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActionButtons from './FloatingActionButtons';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-ayur-beige/30 overflow-x-hidden w-full">
            <Header />
            <main className="flex-grow pt-20 bg-white min-h-[calc(100vh-80px)]">
                {children}
            </main>
            <FloatingActionButtons />
            <Footer />
        </div>
    );
};

export default MainLayout;
