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

    // Only fire if the path has changed OR if it's been a while (to be safe)
    // but NEVER fire twice for the same path within a short window (1s)
    if (window.fbq && (currentPath !== lastTrackedPath || now - lastTrackedTime > 1000)) {
      
      // Strict identical data check
      if (currentPath === lastTrackedPath && now - lastTrackedTime < 2000) {
        return; // Skip if it's the exact same path within 2 seconds
      }

      window.fbq('track', 'PageView');
      lastTrackedPath = currentPath;
      lastTrackedTime = now;
    }
  }, [location.pathname]);

  return null;
};

export default MetaPixel;
