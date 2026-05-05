import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, url, image, keywords, children }) => {
  const location = useLocation();
  const siteTitle = title 
    ? (title.includes('Karan Singh Vaidh') ? title : `${title} | The Karan Singh Vaidh`) 
    : 'The Karan Singh Vaidh - Authentic Ayurvedic Treatments & Products';
  const siteDesc = description || 'Experience the power of ancient Ayurveda. Trusted Ayurvedic doctor in Solan, HP, providing natural treatments for Asthma, Diabetes, Piles, and more.';
  
  // Use provided url or fallback to current pathname
  const currentPath = url || location.pathname;
  const siteUrl = `https://thekaransinghvaidh.com${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;
  const siteImage = image || 'https://thekaransinghvaidh.com/logo.png';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDesc} />
      <meta property="twitter:image" content={siteImage} />
      {children}
    </Helmet>
  );
};

export default SEO;
