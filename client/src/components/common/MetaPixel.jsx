import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Track last path globally to prevent double-firing even on component re-mount (StrictMode)
let lastTrackedPath = '';

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq && lastTrackedPath !== location.pathname) {
      window.fbq('track', 'PageView');
      lastTrackedPath = location.pathname;
    }
  }, [location.pathname]);

  return null;
};

export default MetaPixel;
