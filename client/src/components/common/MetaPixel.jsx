import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Global state to prevent double-firing across re-renders and StrictMode
let lastTrackedPath = '';
let lastTrackedTime = 0;

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    const now = Date.now();
    const currentPath = location.pathname;

    // Skip the VERY FIRST fire on initial load because GTM (GTM-5PL65H47) 
    // is likely already firing a PageView for the initial load.
    if (lastTrackedPath === '') {
      lastTrackedPath = currentPath;
      lastTrackedTime = now;
      console.log('[PIXEL] Skipping initial fire (GTM fallback)');
      return;
    }

    // Only fire for SUBSEQUENT navigations
    if (window.fbq && (currentPath !== lastTrackedPath || now - lastTrackedTime > 1000)) {
      window.fbq('track', 'PageView');
      lastTrackedPath = currentPath;
      lastTrackedTime = now;
      console.log('[PIXEL] Tracking internal PageView:', currentPath);
    }
  }, [location.pathname]);

  return null;
};

export default MetaPixel;
