import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import SEO from '../components/seo/SEO';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#FAFAFA]">
      <SEO 
        title="404 - Page Not Found | The Karan Singh Vaidh"
        description="The page you are looking for does not exist."
        url="/404"
      />
      <div className="text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-ayur-green mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Please check the URL for typos or return to our homepage.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-3 bg-ayur-green text-white font-medium rounded-full hover:bg-ayur-olive transition-colors duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
