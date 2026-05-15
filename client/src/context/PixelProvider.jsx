import React, { createContext, useContext } from 'react';
import { metaPixelService } from '../services/metaPixel';
import { usePageTracking } from '../hooks/usePageTracking';

const PixelContext = createContext(null);

/**
 * PixelProvider
 * High-level wrapper to manage Meta Pixel lifecycle and global page tracking.
 * Integrate this into App.jsx to enable automatic route tracking.
 */
export const PixelProvider = ({ children }) => {
  // Initialize automatic page tracking
  usePageTracking();

  return (
    <PixelContext.Provider value={metaPixelService}>
      {children}
    </PixelContext.Provider>
  );
};

export const usePixel = () => {
  const context = useContext(PixelContext);
  if (!context) {
    throw new Error('usePixel must be used within a PixelProvider');
  }
  return context;
};
